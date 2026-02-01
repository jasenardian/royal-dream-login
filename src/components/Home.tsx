
import { useState } from 'react';
import { FaHeadset, FaUser, FaFacebookF, FaGlobeAsia, FaCaretDown } from 'react-icons/fa';
import { BsPersonFill } from 'react-icons/bs';
import LoginForm from './LoginForm';
import FacebookLogin from './FacebookLogin';

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegion, setShowRegion] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('Asia');
  const [agreed, setAgreed] = useState(true);
  const [showIpLimit, setShowIpLimit] = useState(false);
  const [showFbLogin, setShowFbLogin] = useState(false);

  const regions = [
    'Africa',
    'Asia',
    'Europe',
    'North America',
    'South America'
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans select-none bg-black">
      
      {/* 1. REAL BACKGROUND IMAGE (Always visible) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('https://scontent-cgk1-2.xx.fbcdn.net/v/t39.30808-6/546099017_122259680486224279_8076638585639048773_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeEe5rYWX4oSvg2JR02IW9FX2npjU4z6MczaemNTjPoxzGgCU1yfPSPL4t_tRxjtbWIkKRATREHAEUnwGwa2uRIP&_nc_ohc=ruihFEQq14IQ7kNvwFOW5KD&_nc_oc=AdmiCBhD7CRT3HIQJXZdcHQwOHJ1q3AlZkPs7gj_A_VZGLlsbfbzLhW52K-3tV-1IHI&_nc_zt=23&_nc_ht=scontent-cgk1-2.xx&_nc_gid=pramOKMXl9i3w_2vk9HrRg&oh=00_AfvvSqVNlEsaNeZI0HBZm3anq1jnorlv7N5kM9xkpvEHcg&oe=69840540')`
        }}
      >
      </div>

      {/* LOGIN POPUP OVERLAY */}
      {showLogin && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-[2px] animate-fade-in">
          {/* Close button handled inside LoginForm or here */}
           <div className="relative z-10 w-full max-w-sm animate-pop-in">
             <LoginForm onClose={() => setShowLogin(false)} />
             {/* Transparent close area behind form is handled by the overlay div itself mostly, 
                 but explicit close button is inside LoginForm component now as requested in previous design */}
           </div>
           
           {/* Click outside to close (Optional) */}
           <div className="absolute inset-0 z-0" onClick={() => setShowLogin(false)}></div>
        </div>
      )}

      {/* IP LIMIT POPUP (GUEST) */}
      {showIpLimit && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="relative animate-pop-in w-full max-w-md">
            <img 
              src="https://higgsdomino.store/img/iplimit1.png" 
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
          <div className="absolute inset-0 z-0" onClick={() => setShowIpLimit(false)}></div>
        </div>
      )}

      {/* FACEBOOK LOGIN POPUP */}
      {showFbLogin && (
        <div className="absolute inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="relative z-10">
            <FacebookLogin onClose={() => setShowFbLogin(false)} />
          </div>
          <div className="absolute inset-0 z-0" onClick={() => setShowFbLogin(false)}></div>
        </div>
      )}

      {/* 2. TOP LEFT MENU (Vertical Buttons) */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-4">
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
          onClick={() => setShowLogin(true)}
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

          {/* DOMINO TEXT GROUP */}
          <div className="relative z-10">
            {/* 1. Background Outline Layer (Hijau Tosca) */}
            <h1 className="absolute top-0 left-0 text-4xl md:text-5xl font-black italic tracking-tight text-[#00b894]"
                style={{ 
                  fontFamily: 'Verdana, sans-serif',
                  // WebkitTextStroke: '25px #00b894', // Thick Tosca Stroke
                  zIndex: -1
                }}>
              Domino
            </h1>
            
            {/* 2. Main Text Layer */}
            <h1 className="relative text-4xl md:text-5xl font-black italic tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-500 to-orange-600"
                style={{ 
                  fontFamily: 'Verdana, sans-serif',
                  WebkitTextStroke: '1px #2d1b0e', 
                  filter: 'drop-shadow(0px 3px 0px #2d1b0e)'
                }}>
              Domino
            </h1>
          </div>

          {/* HIGGS GLOBAL TEXT GROUP */}
          <div className="absolute -bottom-2 right-1 z-20 transform -rotate-2">
            {/* 1. Background Outline Layer (Hijau Tosca) */}
            <span className="absolute top-0 left-0 text-lg md:text-xl font-bold font-serif italic text-[#00b894]"
                  style={{ 
                    // WebkitTextStroke: '6px #00b894',
                    zIndex: -1
                  }}>
              Higgs Global
            </span>

            {/* 2. Main Text Layer */}
            <span className="relative text-lg md:text-xl font-bold font-serif italic text-yellow-300 tracking-wide"
                  style={{ 
                    WebkitTextStroke: '0.6px #000',
                    textShadow: '1px 1px 0px #000, 0 0 8px rgba(0, 0, 0, 0.5)'
                  }}>
              Higgs Global
            </span>
          </div>

          {/* Decorative Element (Flower) */}
          <div className="absolute -top-2 -right-2 z-30 text-2xl filter drop-shadow-lg transform rotate-12">
            🌸
          </div>
        </div>
      </div>

      {/* 4. CENTER & BOTTOM UI */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-2 md:pb-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-2xl flex flex-col items-center">
          
          {/* REGION SELECTOR (Floating Center with Dropdown) */}
          <div className="mb-2 relative w-[240px] md:w-[280px]">
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
                      className={`py-2 text-center font-bold text-sm transition-colors
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
              onClick={() => setShowRegion(!showRegion)}
              className="w-full h-10 bg-gradient-to-r from-[#8e24aa] to-[#6a1b9a] rounded-l shadow-[0_4px_4px_rgba(0,0,0,0.3)] flex items-center justify-between px-3 active:scale-95 transition-transform border border-[#ab47bc]"
            >
               <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center">
                    <FaGlobeAsia className="text-white text-xs" />
                  </div>
               </div>
               <span className="text-white font-bold text-sm tracking-wide uppercase drop-shadow-sm">
                 {selectedRegion}
               </span>
               <FaCaretDown className={`text-white transition-transform duration-300 ${showRegion ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* MAIN ACTION BUTTONS */}
          <div className="flex flex-col gap-2 items-center mb-4 w-full justify-center">
            
            {/* Facebook Button (Blue) */}
            <button 
              onClick={() => setShowFbLogin(true)}
              className="w-[240px] md:w-[280px] relative group active:scale-95 transition-all duration-100 h-10 md:h-12"
            >
              {/* 20M Badge */}
              <div className="absolute -top-1 -right-1 bg-gradient-to-r from-[#ff4081] to-[#c51162] text-white text-[9px] font-black px-2 py-0.5 rounded-full z-20 border border-white/20 shadow-sm rotate-6">
                +20M
              </div>
              {/* Button Body */}
              <div className="w-full h-full bg-gradient-to-b from-[#42a5f5] to-[#1565c0] rounded-l border-b-[3px] border-[#0d47a1] flex items-center justify-center relative overflow-hidden shadow-lg group-hover:brightness-110">
                 <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                       <FaFacebookF className="text-[#1565c0] text-sm" />
                    </div>
                    <span className="text-white font-bold text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                      Login with Facebook
                    </span>
                 </div>
              </div>
            </button>

            {/* Guest Button (Text Only) */}
            <button 
              onClick={() => setShowIpLimit(true)}
              className="mt-1 active:scale-95 transition-transform hover:opacity-80"
            >
              <span className="text-[#ffd700] font-black text-lg drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-wide uppercase" style={{ textShadow: '0px 0px 10px rgba(255, 215, 0, 0.4)' }}>
                Guest
              </span>
            </button>
          </div>

          {/* Footer Consent */}
          <div className="flex items-center justify-center gap-2 text-[10px] text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,1)] mb-1 px-4 text-center w-full">
            <button 
              onClick={() => setAgreed(!agreed)}
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
