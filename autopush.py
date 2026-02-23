import os
import time
import subprocess
from datetime import datetime
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class AutoPushHandler(FileSystemEventHandler):
    def __init__(self):
        self.last_commit_time = 0
        self.debounce_seconds = 5  # Wait 5 seconds before committing
        self.ignored_patterns = [
            '.git',
            'node_modules',
            'dist',
            'build',
            'coverage',
            '.DS_Store',
            '.env',
            '.log',
            '__pycache__',
            '.pytest_cache',
            '.vscode',
            '.idea',
            'package-lock.json',
            'yarn.lock',
            'pnpm-lock.yaml'
        ]
        self.pending_changes = False

    def should_ignore(self, path):
        """Check if file should be ignored"""
        normalized_path = path.replace('\\', '/').lower()
        for pattern in self.ignored_patterns:
            if pattern.lower() in normalized_path:
                return True
        return False

    def handle_change(self, event):
        """Handle file system changes"""
        if event.is_directory:
            return
        
        if self.should_ignore(event.src_path):
            return
        
        current_time = time.time()
        time_since_last_commit = current_time - self.last_commit_time
        
        if time_since_last_commit < self.debounce_seconds:
            self.pending_changes = True
            return
        
        self.pending_changes = False
        self.commit_and_push()

    def on_modified(self, event):
        self.handle_change(event)

    def on_created(self, event):
        self.handle_change(event)

    def on_deleted(self, event):
        self.handle_change(event)

    def run_git_command(self, command):
        """Run git command and return success status"""
        try:
            result = subprocess.run(
                command,
                shell=True,
                capture_output=True,
                text=True,
                check=False
            )
            if result.returncode != 0 and result.stderr:
                print(f"⚠️  Warning: {result.stderr.strip()}")
            return result.returncode == 0
        except Exception as e:
            print(f"❌ Error running command '{command}': {e}")
            return False

    def check_git_status(self):
        """Check if there are changes to commit"""
        result = subprocess.run(
            "git status --porcelain",
            shell=True,
            capture_output=True,
            text=True
        )
        return len(result.stdout.strip()) > 0

    def commit_and_push(self):
        """Commit and push changes"""
        if not self.check_git_status():
            return
        
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"\n📝 Change detected at {timestamp} → Committing...")
        
        # Check if git is initialized
        if not os.path.exists('.git'):
            print("❌ Git repository not initialized. Run 'git init' first.")
            return
        
        # Add all changes
        if not self.run_git_command("git add ."):
            print("❌ Failed to add files")
            return
        
        # Commit with timestamp
        commit_message = f"auto update - {timestamp}"
        if not self.run_git_command(f'git commit -m "{commit_message}"'):
            print("⚠️  No changes to commit or commit failed")
            return
        
        print("✅ Committed successfully")
        
        # Push to remote
        print("🚀 Pushing to GitHub...")
        if self.run_git_command("git push"):
            print("✅ Pushed successfully!\n")
        else:
            print("⚠️  Push failed (might need to set upstream or authenticate)\n")
        
        self.last_commit_time = time.time()

def check_dependencies():
    """Check if watchdog is installed"""
    try:
        import watchdog
        return True
    except ImportError:
        print("❌ 'watchdog' package not found.")
        print("📦 Install it with: pip install watchdog")
        return False

def main():
    if not check_dependencies():
        return
    
    # Check if git is initialized
    if not os.path.exists('.git'):
        print("⚠️  Git repository not initialized.")
        response = input("Would you like to initialize git? (y/n): ")
        if response.lower() == 'y':
            subprocess.run("git init", shell=True)
            print("✅ Git initialized")
        else:
            print("❌ Cannot proceed without git repository")
            return
    
    path = "."
    event_handler = AutoPushHandler()
    observer = Observer()
    observer.schedule(event_handler, path, recursive=True)
    observer.start()
    
    print("👀 Watching files for changes...")
    print("📌 Will auto-commit and push after 5 seconds of inactivity")
    print("🛑 Press CTRL+C to stop\n")
    
    try:
        while True:
            time.sleep(1)
            # Handle pending changes after debounce period
            if event_handler.pending_changes:
                current_time = time.time()
                if current_time - event_handler.last_commit_time >= event_handler.debounce_seconds:
                    event_handler.commit_and_push()
                    event_handler.pending_changes = False
    except KeyboardInterrupt:
        print("\n\n🛑 Stopping file watcher...")
        observer.stop()
    
    observer.join()
    print("✅ File watcher stopped")

if __name__ == "__main__":
    main()
