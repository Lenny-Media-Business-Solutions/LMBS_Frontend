import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center w-16 h-16 mb-4">
        <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-gold-500 rounded-full border-t-transparent animate-spin"></div>
        <span className="text-navy-900 font-bold text-xl">L</span>
      </div>
      <p className="text-navy-900 font-heading font-bold animate-pulse">Loading...</p>
    </div>
  );
};

export default Loading;