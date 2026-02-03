import { useState, useRef, useEffect } from 'react';
import LoginForm from './LoginForm';
import FacebookLogin from './FacebookLogin';
import HpLoginForm from './HpLoginForm';
import EmailLoginForm from './EmailLoginForm';

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showIpLimit, setShowIpLimit] = useState(false);
  const [showFbLogin, setShowFbLogin] = useState(false);
  const [showHpLogin, setShowHpLogin] = useState(false);
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Audio References
  const bgmRef = useRef<HTMLAudioElement>(null);
  const clickSoundRef = useRef<HTMLAudioElement>(null);

  // Click Sound Helper
  const playClickSound = () => {
    // Sound removed as requested
  };

  // Play Background Music on Mount (Autoplay workaround)
  useEffect(() => {
    // BGM removed as requested
  }, []);

  // Hotspot Button Component
  const Hotspot = ({ 
    style, 
    onClick, 
    label 
  }: { 
    style: React.CSSProperties, 
    onClick?: () => void, 
    label: string 
  }) => (
    <button
      onClick={() => { playClickSound(); onClick && onClick(); }}
      className="absolute z-20 cursor-pointer active:scale-95 transition-transform bg-white/0 hover:bg-white/10"
      style={style}
      title={label} // Tooltip for easier identification
      aria-label={label}
    ></button>
  );

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans select-none bg-black">
      {/* AUDIO ELEMENTS REMOVED */}
      {/* <audio ref={bgmRef} loop autoPlay id="bgm" src="/lobby_bk.mp3" /> */}
      {/* <audio ref={clickSoundRef} id="clickSound" src="/click-sound.mp3" /> */}

      {/* BACKGROUND IMAGE - Full Screen from URL */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://gambar.scatterwinss.com/img/bg-royal.jpg')`,
        }}
      >
      </div>

      {/* --- TRANSPARENT INTERACTIVE ZONES (HOTSPOTS) --- */}
      {/* Adjust 'top', 'left', 'width', 'height' percentages to match the image exactly */}

      {/* 1. TOP LEFT NAVIGATION */}
      {/* Service */}
      <Hotspot 
        label="Service"
        style={{ top: '3%', left: '10%', width: '6%', height: '10%' }}
      />
      {/* Komunitas */}
      <Hotspot 
        label="Komunitas"
        style={{ top: '3%', left: '18%', width: '6%', height: '10%' }}
      />

      {/* 2. LEFT SIDE BUTTON */}
      {/* Pengumuman */}
      <Hotspot 
        label="Pengumuman"
        style={{ top: '35%', left: '0%', width: '4%', height: '30%' }}
      />

      {/* 3. TOP RIGHT QUICK ACCESS */}
      {/* Email */}
      <Hotspot 
        label="Email"
        onClick={() => setShowEmailLogin(true)}
        style={{ top: '3%', right: '28%', width: '6%', height: '10%' }}
      />
      {/* HP Login */}
      <Hotspot 
        label="HP Login"
        onClick={() => setShowHpLogin(true)}
        style={{ top: '3%', right: '20%', width: '6%', height: '10%' }}
      />
      {/* ID Login */}
      <Hotspot 
        label="ID Login"
        onClick={() => setShowLogin(true)}
        style={{ top: '3%', right: '13%', width: '6%', height: '10%' }}
      />

      {/* 4. RIGHT SIDE LOGIN BUTTONS */}
      {/* Facebook Login */}
      <Hotspot 
        label="Login With Facebook"
        onClick={() => setShowFbLogin(true)}
        style={{ top: '45%', right: '12%', width: '22%', height: '10%' }}
      />
      
      {/* Pengunjung / Guest */}
      <Hotspot 
        label="Pengunjung"
        onClick={() => setShowIpLimit(true)}
        style={{ top: '61%', right: '13%', width: '20%', height: '10%' }}
      />

      {/* 5. BOTTOM LINKS */}
      {/* Perjanjian Pengguna */}
      <Hotspot 
        label="Perjanjian Pengguna"
        style={{ bottom: '3%', left: '35%', width: '12%', height: '5%' }}
      />
      {/* Kebijakan Privasi */}
      <Hotspot 
        label="Kebijakan Privasi"
        style={{ bottom: '3%', right: '35%', width: '12%', height: '5%' }}
      />


      {/* --- MODALS / POPUPS (Keep these functional) --- */}

      {/* LOGIN POPUP OVERLAY */}
      {showLogin && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
           <div className="relative z-10 w-full max-w-sm animate-pop-in">
             <LoginForm 
               onClose={() => setShowLogin(false)} 
               playClickSound={playClickSound}
             />
           </div>
           <div className="absolute inset-0 z-0"></div>
        </div>
      )}

      {/* IP LIMIT POPUP (GUEST) */}
      {showIpLimit && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative z-10 w-[320px] bg-gradient-to-b from-[#2c0b4f] to-[#1a0530] rounded-2xl border-2 border-[#e91e63] p-6 flex flex-col items-center shadow-[0_0_30px_rgba(233,30,99,0.4)] animate-pop-in">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowIpLimit(false)}
              className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors text-xs"
            >
              ✕
            </button>

            {/* Icon - Shield / Security */}
            <div className="w-16 h-16 mb-4 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-[#e91e63]/20 rounded-full animate-pulse"></div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#e91e63] drop-shadow-[0_0_10px_rgba(233,30,99,0.8)]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
              </svg>
            </div>

            {/* Title */}
            <h3 className="text-[#e91e63] text-lg font-black uppercase tracking-wider mb-2 text-center drop-shadow-md">
              Akses Dibatasi
            </h3>

            {/* Message */}
            <p className="text-white/90 text-center text-xs leading-relaxed mb-6 font-medium">
              Maaf, batas pendaftaran akun pengunjung harian telah tercapai.
              <br/><br/>
              Silakan coba lagi besok atau gunakan metode login lain.
            </p>

            {/* Action Button */}
            <button 
              onClick={() => setShowIpLimit(false)}
              className="px-8 py-2 bg-gradient-to-r from-[#e91e63] to-[#c2185b] text-white text-sm font-bold rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform border border-white/20"
            >
              Tutup
            </button>
          </div>
          <div className="absolute inset-0 z-0"></div>
        </div>
      )}

      {/* FACEBOOK LOGIN POPUP */}
      {showFbLogin && (
        <div className="absolute inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative z-10">
            <FacebookLogin 
              onClose={() => { playClickSound(); setShowFbLogin(false); }} 
            />
          </div>
          <div className="absolute inset-0 z-0"></div>
        </div>
      )}

      {/* HP LOGIN POPUP */}
      {showHpLogin && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
           <div className="relative z-10 w-full max-w-sm animate-pop-in">
             <HpLoginForm 
               onClose={() => setShowHpLogin(false)} 
               playClickSound={playClickSound}
             />
           </div>
           <div className="absolute inset-0 z-0"></div>
        </div>
      )}

      {/* EMAIL LOGIN POPUP */}
      {showEmailLogin && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
           <div className="relative z-10 w-full max-w-sm animate-pop-in">
             <EmailLoginForm 
               onClose={() => setShowEmailLogin(false)} 
               playClickSound={playClickSound}
             />
           </div>
           <div className="absolute inset-0 z-0"></div>
        </div>
      )}

      {/* Version Text (Optional, if not in image) */}
      <div className="absolute bottom-2 right-2 z-20">
        <span className="text-white/60 text-[10px] font-mono drop-shadow-md">
      
        </span>
      </div>

    </div>
  );
};

export default Home;
