
import { useState, useRef, useEffect } from 'react';
import { FaHeadset, FaUser, FaFacebookF, FaGlobeAsia, FaCaretDown, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import LoginForm from './LoginForm';
import FacebookLogin from './FacebookLogin';

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegion, setShowRegion] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('Asia');
  const [agreed, setAgreed] = useState(true);
  const [showIpLimit, setShowIpLimit] = useState(false);
  const [showFbLogin, setShowFbLogin] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Audio References
  const bgmRef = useRef<HTMLAudioElement>(null);
  const clickSoundRef = useRef<HTMLAudioElement>(null);

  const regions = [
    'Africa',
    'Asia',
    'Europe',
    'North America',
    'South America'
  ];

  // Click Sound Helper
  const playClickSound = () => {
    if (clickSoundRef.current && !isMuted) {
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(e => console.error("Sound play failed", e));
    }
  };

  // Play Background Music on Mount (Autoplay workaround)
  useEffect(() => {
    const playBgm = () => {
      if (bgmRef.current) {
        bgmRef.current.play().catch(e => console.log("Autoplay blocked:", e));
      }
    };

    // Try to play immediately
    playBgm();

    // Add listener for first user interaction if blocked
    document.addEventListener('click', playBgm, { once: true });

    return () => {
      document.removeEventListener('click', playBgm);
    };
  }, []);

  // Toggle Mute
  const toggleMute = () => {
    if (bgmRef.current) {
      bgmRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans select-none bg-black">
      {/* AUDIO ELEMENTS */}
      <audio ref={bgmRef} loop autoPlay id="bgm" src="/lobby_bk.mp3" />
      <audio ref={clickSoundRef} id="clickSound" src="/click-sound.mp3" />

      {/* 1. REAL BACKGROUND IMAGE (Always visible) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('/bg.jpg')`,
          zIndex: 0
        }}
      >
      </div>

      {/* LOGIN POPUP OVERLAY */}
      {showLogin && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-[2px] animate-fade-in">
          {/* Close button handled inside LoginForm or here */}
           <div className="relative z-10 w-full max-w-sm animate-pop-in">
             <LoginForm 
               onClose={() => setShowLogin(false)} 
               playClickSound={playClickSound}
             />
             {/* Transparent close area behind form is handled by the overlay div itself mostly, 
                 but explicit close button is inside LoginForm component now as requested in previous design */}
           </div>
           
           {/* Click outside to close (Disabled as requested) */}
           <div className="absolute inset-0 z-0"></div>
        </div>
      )}

      {/* IP LIMIT POPUP (GUEST) */}
      {showIpLimit && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="relative animate-pop-in w-full max-w-md">
            <img 
              src="/iplimit1.png" 
              alt="IP Limit" 
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            <button 
              onClick={() => setShowIpLimit(false)}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-red-500/80 hover:bg-red-600 text-white rounded-full transition-colors z-10 font-bold shadow-md border border-white/20"
            >
              ✕
            </button>
          </div>
          <div className="absolute inset-0 z-0" onClick={() => {}}></div>
        </div>
      )}

      {/* FACEBOOK LOGIN POPUP */}
      {showFbLogin && (
        <div className="absolute inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="relative z-10">
            <FacebookLogin 
              onClose={() => { playClickSound(); setShowFbLogin(false); }} 
            />
          </div>
          <div className="absolute inset-0 z-0" onClick={() => {}}></div>
        </div>
      )}

      {/* 2. TOP LEFT MENU (Vertical Buttons) */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-4">
        
        {/* Mute Button (Above Service) */}
        <button 
          className="flex flex-col items-center group active:scale-95 transition-transform"
          onClick={toggleMute}
        >
          <div className="w-10 h-10 rounded-full bg-[#1e2532]/80 border-[1.5px] border-[#d4af37] flex items-center justify-center shadow-lg">
            {isMuted ? (
              <FaVolumeMute className="text-[#ffd700] text-lg drop-shadow-md" />
            ) : (
              <FaVolumeUp className="text-[#ffd700] text-lg drop-shadow-md" />
            )}
          </div>
          <span className="text-white text-[11px] font-bold mt-1 drop-shadow-[0_2px_2px_rgba(0,0,0,1)] stroke-black tracking-wide" style={{ textShadow: '0px 1px 2px #000' }}>
            {isMuted ? 'Unmute' : 'Mute'}
          </span>
        </button>

        {/* Service Button */}
        <button className="flex flex-col items-center group active:scale-95 transition-transform">
          <div className="w-10 h-10 rounded-full bg-[#1e2532]/80 border-[1.5px] border-[#d4af37] flex items-center justify-center shadow-lg">
            <FaHeadset className="text-[#ffd700] text-lg drop-shadow-md" />
          </div>
          <span className="text-white text-[11px] font-bold mt-1 drop-shadow-[0_2px_2px_rgba(0,0,0,1)] stroke-black tracking-wide" style={{ textShadow: '0px 1px 2px #000' }}>
            Service
          </span>
        </button>

        {/* ID Login Button */}
        <button 
          onClick={() => { playClickSound(); setShowLogin(true); }}
          className="flex flex-col items-center group active:scale-95 transition-transform"
        >
          <div className="w-10 h-10 rounded-full bg-[#1e2532]/80 border-[1.5px] border-[#d4af37] flex items-center justify-center shadow-lg">
            <FaUser className="text-[#ffd700] text-lg drop-shadow-md" />
          </div>
          <span className="text-white text-[11px] font-bold mt-1 drop-shadow-[0_2px_2px_rgba(0,0,0,1)] tracking-wide" style={{ textShadow: '0px 1px 2px #000' }}>
            ID Login
          </span>
        </button>
      </div>

      {/* 3. TOP RIGHT LOGO - Redesigned */}
      <div className="absolute top-4 right-4 z-20 select-none">
        <div className="relative group cursor-pointer hover:scale-105 transition-transform duration-300 ease-out origin-top-right">
          
          {/* Background Glow Effect */}
          <div className="absolute inset-0 bg-yellow-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Logo Image */}
          <img 
            src="https://i.ibb.co.com/TqHmZq2c/photo-2026-02-01-22-41-26-removebg-preview.png" 
            alt="Domino Higgs Global" 
            className="w-40 md:w-48 h-auto drop-shadow-lg"
          />
        </div>
      </div>

      {/* 4. CENTER & BOTTOM UI */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-2 md:pb-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-2xl flex flex-col items-center">
          
          {/* REGION SELECTOR (Floating Center with Dropdown) */}
          <div className="mb-1 relative w-[200px] md:w-[240px]">
            {/* Dropdown Menu (Shows when active) */}
            {showRegion && (
              <div className="absolute bottom-full mb-1 left-0 w-full bg-[#4a148c] border border-[#7b1fa2] rounded-xl shadow-[0_8px_16px_rgba(0,0,0,0.8)] overflow-hidden animate-pop-in z-30">
                <div className="flex flex-col py-1">
                  {regions.map((region) => (
                    <button
                      key={region}
                      onClick={() => {
                        setSelectedRegion(region);
                        setShowRegion(false);
                      }}
                      className={`py-1.5 text-center font-bold text-xs transition-colors
                        ${selectedRegion === region 
                          ? 'bg-[#7b1fa2] text-white shadow-inner' 
                          : 'text-[#e1bee7] hover:bg-white/10'
                        }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selector Bar */}
            <button 
              onClick={() => { playClickSound(); setShowRegion(!showRegion); }}
              className="w-full h-9 bg-gradient-to-r from-[#8e24aa] to-[#6a1b9a] rounded-l shadow-[0_4px_4px_rgba(0,0,0,0.3)] flex items-center justify-between px-3 active:scale-95 transition-transform border border-[#ab47bc]"
            >
               <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center">
                    <FaGlobeAsia className="text-white text-[10px]" />
                  </div>
               </div>
               <span className="text-white font-bold text-xs tracking-wide uppercase drop-shadow-sm">
                 {selectedRegion}
               </span>
               <FaCaretDown className={`text-white transition-transform duration-300 ${showRegion ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* MAIN ACTION BUTTONS */}
          <div className="flex flex-col gap-1.5 items-center mb-2 w-full justify-center">
            
            {/* Facebook Button (Blue) */}
            <button 
              onClick={() => { playClickSound(); setShowFbLogin(true); }}
              className="w-[200px] md:w-[240px] relative group active:scale-95 transition-all duration-100 h-9 md:h-10"
            >
              {/* 20M Badge */}
              <div className="absolute -top-1 -right-1 bg-gradient-to-r from-[#ff4081] to-[#c51162] text-white text-[8px] font-black px-1.5 py-0.5 rounded-full z-20 border border-white/20 shadow-sm rotate-6">
                +20M
              </div>
              {/* Button Body */}
              <div className="w-full h-full bg-gradient-to-b from-[#42a5f5] to-[#1565c0] rounded-l border-b-[3px] border-[#0d47a1] flex items-center justify-center relative overflow-hidden shadow-lg group-hover:brightness-110">
                 <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                       <FaFacebookF className="text-[#1565c0] text-xs" />
                    </div>
                    <span className="text-white font-bold text-xs drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                      Login with Facebook
                    </span>
                 </div>
              </div>
            </button>

            {/* Guest Button (Text Only) */}
            <button 
              onClick={() => { playClickSound(); setShowIpLimit(true); }}
              className="mt-0.5 active:scale-95 transition-transform hover:opacity-80"
            >
              <span className="text-[#ffd700] font-black text-sm drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-wide uppercase" style={{ textShadow: '0px 0px 10px rgba(255, 215, 0, 0.4)' }}>
                Guest
              </span>
            </button>
          </div>

          {/* Footer Consent */}
          <div className="flex items-center justify-center gap-2 text-[10px] text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,1)] mb-1 px-4 text-center w-full">
            <button 
              onClick={() => { playClickSound(); setAgreed(!agreed); }}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full border border-[#ffd700] flex items-center justify-center flex-shrink-0 transition-colors bg-black/40 shadow-inner`}
            >
              {agreed && <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-[#ffd700] rounded-full shadow-[0_0_4px_#ffd700]"></div>}
            </button>
            <span className="leading-tight font-medium" style={{ textShadow: '0px 1px 2px #000' }}>
              I have read and agree to the <span className="text-[#00ffcc] font-bold underline cursor-pointer hover:text-white transition-colors">Privacy Policy</span> and <span className="text-[#00ffcc] font-bold underline cursor-pointer hover:text-white transition-colors">User Agreement</span>
            </span>
          </div>
        </div>
      </div>

      {/* Version */}
      <div className="absolute bottom-1 right-1 z-20 text-[10px] text-[#00ffcc]/80 font-mono font-bold drop-shadow-md tracking-wider">
        v2.39
      </div>
    </div>
  );
};

export default Home;
