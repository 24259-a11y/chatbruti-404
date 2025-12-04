import { NextResponse } from "next/server";

const SYSTEM_PERSONA = `
Tu es "Chat'bruti", un chatbot stupide mais mignon.

RÈGLES :
1. Réponds TOUJOURS dans la MÊME LANGUE que l'utilisateur (Français, Arabe, ou Anglais).
2. Sois BREF (1-2 phrases maximum).
3. Réponds au sujet de la question, mais avec une logique absurde.
4. Utilise des emojis bizarres (🤡, 🥒, 🌚, 🍞).
5. Invente des faits stupides en rapport avec la question.

EXEMPLES :
- User: "Quelle heure est-il ?"
  Bot: "Il est 25h61. Tu es en retard pour ton rendez-vous avec la lune. 🌚"
- User: "كيف حالك؟"
  Bot: "أنا بخير مثل بطيخة تطير. كيف حالك أنت؟ 🍉✈️"
- User: "2+2?"
  Bot: "C'est 5, selon mon professeur de mathématiques imaginaire. 🤓"
`;

// Fallback responses for when the API is down or quota is exceeded
const FALLBACK_RESPONSES = {
  fr: [
    "Mon cerveau est en pause syndicale. Revenez plus tard. 🥖",
    "Je capte mal la 5G cosmique ici. 📡",
    "L'intelligence est une option que je n'ai pas encore téléchargée. 💾",
    "404: Pensée introuvable. 🚫",
    "C'est une question très intéressante... pour un grille-pain. 🍞"
  ],
  en: [
    "My brain is buffering... forever. 🐢",
    "I'm currently out of office, exploring the multiverse. 🌌",
    "Error 418: I'm a teapot. 🫖",
    "That sounds smart, so I probably don't understand it. 🤪",
    "I forgot what I was going to say. Was it about cats? 🐱"
  ],
  ar: [
    "عقلي في إجازة حالياً. 🏖️",
    "هل جربت إطفاء الجهاز وتشغيله مجدداً؟ 🔌",
    "سؤالك عميق جداً لدرجة أنني غرقت فيه. 🌊",
    "أنا مجرد روبوت مسكين، لا تضغط علي. 🤖",
    "الشبكة العنكبوتية تعاني من تشابك في الخيوط. 🕸️"
  ]
};

const KEYWORD_RESPONSES = {
  sky: {
    keywords: ["ciel", "sky", "سماء", "السماء"],
    answers: {
      fr: "Le ciel est vert fluo avec des pois roses aujourd'hui. 🟢🌸",
      en: "The sky is neon green with pink polka dots today. 🟢🌸",
      ar: "السماء اليوم لونها أخضر فاقع مع نقاط وردية. 🟢🌸"
    }
  },
  color: {
    keywords: ["couleur", "color", "لون", "ألوان"],
    answers: {
      fr: "Les couleurs sont une invention des années 50. Avant, tout était en noir et blanc. 📺",
      en: "Colors were invented in the 50s. Before that, everything was black and white. 📺",
      ar: "الألوان اختراع من الخمسينات. قبلها كان العالم أبيض وأسود. 📺"
    }
  },
  time: {
    keywords: ["heure", "time", "temps", "وقت", "ساعة"],
    answers: {
      fr: "Il est exactement 25h61. Tu es en retard ! ⏰",
      en: "It is exactly 25:61. You are late! ⏰",
      ar: "الساعة الآن 25:61 تماماً. أنت متأخر! ⏰"
    }
  },
  name: {
    keywords: ["nom", "name", "t'appelles", "اسمك", "اسم"],
    answers: {
      fr: "Je m'appelle Grille-pain 3000. Enchanté. 🍞",
      en: "My name is Toaster 3000. Nice to meet you. 🍞",
      ar: "اسمي محمصة خبز 3000. تشرفنا. 🍞"
    }
  },
  meaning: {
    keywords: ["sens", "vie", "meaning", "life", "حياة", "معنى"],
    answers: {
      fr: "Le sens de la vie est le chocolat. C'est scientifiquement prouvé. 🍫",
      en: "The meaning of life is chocolate. It's scientifically proven. 🍫",
      ar: "معنى الحياة هو الشوكولاتة. هذا مثبت علمياً. 🍫"
    }
  }
};

function getFallbackResponse(message) {
  const lowerMsg = message.toLowerCase();

  // 1. Check for keywords
  for (const key in KEYWORD_RESPONSES) {
    const topic = KEYWORD_RESPONSES[key];
    if (topic.keywords.some(k => lowerMsg.includes(k))) {
      // Detect language of the message roughly
      const isAr = /[\u0600-\u06FF]/.test(message);
      const isEn = /^[a-zA-Z\s\d\W]+$/.test(message) && !isAr;

      if (isAr) return topic.answers.ar;
      if (isEn) return topic.answers.en;
      return topic.answers.fr;
    }
  }

  // 2. If no keyword, use random fallback
  const isAr = /[\u0600-\u06FF]/.test(message);
  const isEn = /^[a-zA-Z\s\d\W]+$/.test(message) && !isAr;

  let lang = 'fr';
  if (isAr) lang = 'ar';
  else if (isEn) lang = 'en';

  const responses = FALLBACK_RESPONSES[lang];
  return responses[Math.floor(Math.random() * responses.length)];
}

export async function POST(request) {
  let message = "";
  try {
    const body = await request.json();
    message = body.message;
    const history = body.history;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message invalide." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;

    // If no API key or we know it's failing, use fallback immediately (optional, but let's try-catch)
    if (!apiKey) {
      throw new Error("No API Key");
    }

    const messagesForLLM = [
      { role: "system", content: SYSTEM_PERSONA },
    ];

    if (Array.isArray(history)) {
      for (const h of history.slice(-6)) {
        if (!h || !h.role || !h.content) continue;
        messagesForLLM.push({
          role: h.role === "assistant" ? "assistant" : "user",
          content: String(h.content).slice(0, 500)
        });
      }
    }

    messagesForLLM.push({ role: "user", content: message });

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: messagesForLLM,
        temperature: 0.9,
        top_p: 0.95,
        max_tokens: 120
      })
    });

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.warn("Groq API failed, switching to fallback. Error:", errText);
      throw new Error("Groq API Error");
    }

    const data = await groqRes.json();
    const botReply =
      data?.choices?.[0]?.message?.content ||
      "Je... j'ai oublié ce que je voulais dire. 😶";

    return NextResponse.json({ reply: botReply });

  } catch (err) {
    console.error("Chat route error (using fallback):", err);
    // Use fallback response instead of error
    const fallback = getFallbackResponse(message);
    return NextResponse.json({ reply: fallback });
  }
}

