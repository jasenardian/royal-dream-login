import React from 'react';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  subMessage?: string;
}

const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, title, message, subMessage }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative z-10 w-[320px] bg-gradient-to-b from-[#2b0e3a] to-[#341042] rounded-2xl border-2 border-[#ff2e7a] p-6 flex flex-col items-center shadow-[0_0_30px_rgba(255,46,122,0.4)] animate-pop-in">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors text-xs"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Icon - Shield / Security */}
        <div className="w-16 h-16 mb-4 relative flex items-center justify-center">
          <div className="absolute inset-0 bg-[#ff2e7a]/20 rounded-full animate-pulse"></div>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#ff2e7a] drop-shadow-[0_0_10px_rgba(255,46,122,0.8)]" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Title */}
        <h3 className="text-[#ff2e7a] text-lg font-black uppercase tracking-wider mb-2 text-center drop-shadow-md">
          {title}
        </h3>

        {/* Message */}
        <div className="text-white/90 text-center text-xs leading-relaxed mb-6 font-medium">
          <p>{message}</p>
          {subMessage && (
            <p className="mt-2">{subMessage}</p>
          )}
        </div>

        {/* Action Button */}
        <button 
          onClick={onClose}
          className="px-10 py-2 bg-gradient-to-r from-[#ff3b86] to-[#ff679e] text-white text-sm font-bold rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform border border-white/20"
        >
          Tutup
        </button>
      </div>
      {/* Background overlay for clicking outside */}
      <div className="absolute inset-0 z-0" onClick={onClose}></div>
    </div>
  );
};

export default AlertModal;
