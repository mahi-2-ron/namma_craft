import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl font-display font-bold text-accent">404</span>
            </div>
            <h1 className="text-3xl font-display font-bold text-primary mb-4">Page Not Found</h1>
            <p className="text-text-soft max-w-md mb-8">
                We couldn't find the page you were looking for. It might have been moved or doesn't exist.
            </p>
            <div className="flex gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-3 bg-white text-primary border border-primary/20 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-cream transition-colors flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" /> Go Back
                </button>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-primary text-white rounded-full font-bold uppercase tracking-widest text-xs shadow-lg shadow-primary/20 hover:bg-primary-light transition-colors flex items-center gap-2"
                >
                    <Home className="w-4 h-4" /> Go Home
                </button>
            </div>
        </div>
    );
};
