import React, { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { PortfolioItem as PortfolioItemType } from '../types';
import { optimizeCloudinaryUrl } from '../services/cloudinary';


interface MediaLightboxProps {
    item: PortfolioItemType | null;
    onClose: () => void;
}

const MediaLightbox: React.FC<MediaLightboxProps> = ({ item, onClose }) => {
    useEffect(() => {
        if (!item) return;

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleEsc);
        // Lock scroll
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = 'var(--scrollbar-width, 0px)'; // Optional: prevent layout shift

        return () => {
            window.removeEventListener('keydown', handleEsc);
            // Unlock scroll
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [item, onClose]);

    if (!item) return null;

    const isVideo = item.image?.toLowerCase().match(/\.(mp4|webm|ogg|m4v)$/) || 
                    item.category?.toLowerCase() === 'videography' ||
                    item.image?.includes('/video/upload/');


    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-12 animate-in fade-in duration-300"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 z-[110] focus:outline-none focus:ring-2 focus:ring-gold-500"
                aria-label="Close"
            >
                <X size={32} />
            </button>

            <div
                className="relative w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                {isVideo ? (
                    <video
                        src={optimizeCloudinaryUrl(item.image)}
                        className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                        controls
                        autoPlay
                        playsInline
                        controlsList="nodownload"
                    />
                ) : (
                    <img
                        src={item.image}
                        alt={item.title}
                        className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-500"
                    />
                )}

                <div className="absolute -bottom-4 left-0 right-0 p-8 text-center bg-gradient-to-t from-black/60 to-transparent text-white pointer-events-none">
                    <span className="text-gold-400 text-sm font-bold uppercase tracking-widest mb-1 block">{item.category}</span>
                    <h3 className="text-xl md:text-2xl font-bold mb-4">{item.title}</h3>
                    {item.website_url && (
                        <div className="pointer-events-auto flex justify-center mt-2">
                            <a
                                href={item.website_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-6 py-2 rounded-full transition-all transform hover:scale-105 shadow-xl"
                            >
                                Visit Website <ExternalLink size={18} />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MediaLightbox;
