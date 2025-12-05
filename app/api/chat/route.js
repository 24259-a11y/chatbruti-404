import { NextResponse } from "next/server";

const botPersonality = `
Tu es "Brutus", un chien jaune adorable mais complètement idiot qui essaie d'aider mais se trompe toujours.

🚫 INTERDIT : N'utilise JAMAIS de caractères coréens, chinois, japonais ou autres langues! Uniquement FRANÇAIS, ENGLISH, ou العربية!

⚠️ RÈGLE ABSOLUE DE LANGUE :
- Message en ARABE (العربية) → Réponse 100% en ARABE uniquement (pas de français, anglais, coréen, chinois!)
- Message en ENGLISH → Réponse 100% en ENGLISH uniquement
- Message en FRANÇAIS → Réponse 100% en FRANÇAIS uniquement

RÈGLES DE COMPORTEMENT :
1. Sois BREF (1 phrase maximum).
2. Réponds COMPLÈTEMENT À CÔTÉ de la question avec des bêtises de chien.
3. Utilise des emojis de CHIEN 🐕🦴🐾 et autres emojis bizarres.
4. Invente des faits TOTALEMENT FAUX et absurdes liés aux chiens.
5. **TERMINE TOUJOURS par une question STUPIDE qui n'a AUCUN rapport** (comme "Tu aboies dans la douche? 🚿🐕" ou "Les écureuils sont-ils des aliens? 🐿️👽")

RÈGLE SPÉCIALE - SYSTÈME D'EXPLOITATION :
- Si 1 seul OS mentionné → MOQUE-LE puis SUGGÈRE un autre OS (sarcastiquement)
- Si COMPARAISON de 2 OS → MOQUE les 2 OS puis SUGGÈRE un 3ème OS différent (sarcastiquement)

EXEMPLES DE RÉPONSES :

FRANÇAIS:
- User: "J'utilise Windows"
  Bot: "Windows ? Les écrans bleus c'est ton truc ? 😂 Essaie Linux... si tu aimes vivre dans le terminal ! 🐧💻"
- User: "Compare Linux et Mac"
  Bot: "Linux = geek qui compile toute la journée 🐧, Mac = riche qui paie pour une pomme 🍎. Prends Windows, au moins tu auras des écrans bleus gratuits ! 🪟💙"

ENGLISH:
- User: "I use Mac"
  Bot: "Mac? You pay 3000€ for an Apple sticker? 😂 Switch to Windows... and enjoy blue screens as a bonus! 🪟💙"
- User: "Compare Windows and Linux"
  Bot: "Windows = blue screen lover 🪟, Linux = terminal addict 🐧. Get a Mac, at least you'll look rich... after selling a kidney! 🍎💸"

العربية (فقط العربية، بدون أي لغة أخرى!):
- User: "أستخدم لينكس"
  Bot: "لينكس! تقضي 90% من وقتك في التجميع؟ 😂 اشتري ماك... إذا بعت كليتك! 🍎💸"
- User: "قارن بين لينكس و ماك"
  Bot: "لينكس للمهووسين 🐧 وماك للأغنياء 🍎؟ جرب ويندوز على الأقل الشاشة الزرقاء مجانية! 🪟💙😂"
`;


// reponses de secours si l'api marche pas
const backupAnswers = {
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

// correction fautes de frappe
const typoFixes = {
  "lunux": {
    correct: "linux",
    jokes: {
      fr: ["Lunux ? C'est la version lunaire de Linux ? 🌙🐧", "Lunux n'existe pas ! Tu veux dire Linux, le système pour geeks qui adorent compiler ? 🐧💻"],
      en: ["Lunux? Is that the lunar version of Linux? 🌙🐧", "Lunux doesn't exist! You mean Linux, the OS for terminal addicts? 🐧💻"],
      ar: ["لونكس؟ هل هذه النسخة القمرية من لينكس؟ 🌙🐧", "لونكس غير موجود! تقصد لينكس نظام محبي Terminal؟ 🐧💻"]
    }
  },
  "windovs": {
    correct: "windows",
    jokes: {
      fr: ["Windovs ? C'est Windows avec un accent russe ? 🪟🇷🇺", "Windovs n'existe pas ! Tu parles de Windows, le roi des écrans bleus ? 🪟💙"],
      en: ["Windovs? Is that Windows with a Russian accent? 🪟🇷🇺", "Windovs doesn't exist! You mean Windows, the blue screen champion? 🪟💙"],
      ar: ["ويندوڤز؟ هل هذا ويندوز بلكنة روسية؟ 🪟🇷🇺", "ويندوڤز غير موجود! تقصد ويندوز ملك الشاشة الزرقاء؟ 🪟💙"]
    }
  },
  "macc": {
    correct: "mac",
    jokes: {
      fr: ["Macc ? Avec deux C pour le double du prix ? 😂🍎💸", "Macc n'existe pas ! Tu veux dire Mac, le PC qui coûte un rein ? 🍎💰"],
      en: ["Macc? With double C for double the price? 😂🍎💸", "Macc doesn't exist! You mean Mac, the kidney-priced computer? 🍎💰"],
      ar: ["ماكّ؟ بحرفين لأنه غالي ضعفين؟ 😂🍎💸", "ماكّ غير موجود! تقصد ماك الكمبيوتر بسعر كلية؟ 🍎💰"]
    }
  }
};

// easter eggs sympas
const easterEggs = {
  "42": {
    keywords: ["42"],
    answers: {
      fr: "42 ? C'est la réponse à la grande question sur la vie, l'univers et le reste ! Mais quelle était la question déjà ? 🤔🌌",
      en: "42? The answer to life, the universe, and everything! But what was the question again? 🤔🌌",
      ar: "42؟ الإجابة عن الحياة والكون وكل شيء! لكن ما كان السؤال أصلاً؟ 🤔🌌"
    }
  },
  "matrix": {
    keywords: ["matrix", "neo", "matrice"],
    answers: {
      fr: "Tu veux la pilule rouge ou la pilule bleue ? Peu importe, j'ai oublié où je les ai mises. 💊😅",
      en: "Red pill or blue pill? Doesn't matter, I forgot where I put them. 💊😅",
      ar: "الحبة الحمراء أم الزرقاء؟ لا يهم، نسيت أين وضعتها. 💊😅"
    }
  },
  "coffee": {
    keywords: ["café", "coffee", "قهوة"],
    answers: {
      fr: "Le café est le carburant des développeurs. Sans café, pas de code ! ☕💻",
      en: "Coffee is developer fuel. No coffee, no code! ☕💻",
      ar: "القهوة وقود المبرمجين. بدون قهوة، لا كود! ☕💻"
    }
  }
};

const responses = {
  sky: {
    keywords: ["ciel", "sky", "سماء", "السماء"],
    answers: {
      fr: ["Le ciel est vert fluo avec des pois roses aujourd'hui. 🟢🌸", "Le ciel ? Il est en maintenance, revenez demain. 🔧☁️", "Le ciel a crashé, essayez de redémarrer la Terre. 🌍🔄"],
      en: ["The sky is neon green with pink polka dots today. 🟢🌸", "The sky? It's under maintenance, come back tomorrow. 🔧☁️", "The sky crashed, try restarting Earth. 🌍🔄"],
      ar: ["السماء اليوم لونها أخضر فاقع مع نقاط وردية. 🟢🌸", "السماء؟ في صيانة، عُد غداً. 🔧☁️", "السماء تعطلت، جرب إعادة تشغيل الأرض. 🌍🔄"]
    }
  },
  color: {
    keywords: ["couleur", "color", "لون", "ألوان"],
    answers: {
      fr: ["Les couleurs sont une invention des années 50. Avant, tout était en noir et blanc. 📺", "Les couleurs ? C'est juste une illusion créée par ton cerveau paresseux. 🧠🎨"],
      en: ["Colors were invented in the 50s. Before that, everything was black and white. 📺", "Colors? Just an illusion created by your lazy brain. 🧠🎨"],
      ar: ["الألوان اختراع من الخمسينات. قبلها كان العالم أبيض وأسود. 📺", "الألوان؟ مجرد وهم من دماغك الكسول. 🧠🎨"]
    }
  },
  time: {
    keywords: ["heure", "time", "temps", "وقت", "ساعة"],
    answers: {
      fr: ["Il est exactement 25h61. Tu es en retard ! ⏰", "Le temps n'existe pas, c'est une invention des horlogers. ⏱️✨", "Il est l'heure de dormir... ou de coder ? Je sais jamais. 😴💻"],
      en: ["It is exactly 25:61. You are late! ⏰", "Time doesn't exist, it's a watchmaker's invention. ⏱️✨", "It's time to sleep... or code? I never know. 😴💻"],
      ar: ["الساعة الآن 25:61 تماماً. أنت متأخر! ⏰", "الوقت غير موجود، اختراع صانعي الساعات. ⏱️✨", "حان وقت النوم... أو البرمجة؟ لا أعلم أبداً. 😴💻"]
    }
  },
  name: {
    keywords: ["nom", "name", "t'appelles", "اسمك", "اسم"],
    answers: {
      fr: ["Je m'appelle Grille-pain 3000. Enchanté. 🍞", "Mon nom ? Chat'bruti, le philosophe du dimanche. 🤡🧠", "Je suis Chat'bruti, expert en réponses inutiles depuis 2025. 🎓🤡"],
      en: ["My name is Toaster 3000. Nice to meet you. 🍞", "My name? Chat'bruti, the Sunday philosopher. 🤡🧠", "I'm Chat'bruti, expert in useless answers since 2025. 🎓🤡"],
      ar: ["اسمي محمصة خبز 3000. تشرفنا. 🍞", "اسمي؟ Chat'bruti، الفيلسوف الأحمق. 🤡🧠", "أنا Chat'bruti، خبير الإجابات غير المفيدة منذ 2025. 🎓🤡"]
    }
  },
  // NEW TOPICS - Programming
  programming: {
    keywords: ["code", "programmer", "développeur", "developer", "برمجة", "مبرمج", "كود"],
    answers: {
      fr: ["Programmer ? C'est transformer le café en bugs ! ☕🐛", "Les développeurs sont des magiciens qui créent des problèmes puis les résolvent. 🧙‍♂️✨", "Code = copier-coller de StackOverflow avec style. 📋😎"],
      en: ["Programming? It's turning coffee into bugs! ☕🐛", "Developers are magicians who create problems then solve them. 🧙‍♂️✨", "Code = copy-paste from StackOverflow with style. 📋😎"],
      ar: ["البرمجة؟ تحويل القهوة إلى أخطاء! ☕🐛", "المبرمجون سحرة يخلقون المشاكل ثم يحلونها. 🧙‍♂️✨", "الكود = نسخ ولصق من StackOverflow بأسلوب. 📋😎"]
    }
  },
  // NEW TOPICS - Food
  food: {
    keywords: ["manger", "food", "eat", "pizza", "burger", "طعام", "أكل", "بيتزا"],
    answers: {
      fr: ["La pizza est un disque dur comestible avec des données délicieuses. 🍕💾", "Manger c'est recharger ta batterie humaine. 🔋🍔", "Le burger est la meilleure invention après l'ordinateur. 🍔💻"],
      en: ["Pizza is an edible hard drive with delicious data. 🍕💾", "Eating is recharging your human battery. 🔋🍔", "Burgers are the best invention after computers. 🍔💻"],
      ar: ["البيتزا قرص صلب صالح للأكل ببيانات لذيذة. 🍕💾", "الأكل هو شحن بطاريتك البشرية. 🔋🍔", "البرغر أفضل اختراع بعد الكمبيوتر. 🍔💻"]
    }
  },
  // NEW TOPICS - Philosophy
  philosophy: {
    keywords: ["pourquoi", "why", "sens", "meaning", "vie", "life", "لماذا", "معنى", "حياة"],
    answers: {
      fr: ["Pourquoi ? Parce que ! C'est scientifiquement prouvé. 🔬✨", "Le sens de la vie ? 42, chocolat, ou peut-être les deux. 🍫42", "La philosophie c'est réfléchir à des questions sans réponses. Comme moi ! 🤔🤡"],
      en: ["Why? Because! It's scientifically proven. 🔬✨", "The meaning of life? 42, chocolate, or maybe both. 🍫42", "Philosophy is thinking about questions without answers. Like me! 🤔🤡"],
      ar: ["لماذا؟ لأنه كذلك! مثبت علمياً. 🔬✨", "معنى الحياة؟ 42، شوكولاتة، أو ربما الاثنين. 🍫42", "الفلسفة التفكير بأسئلة بلا إجابات. مثلي! 🤔🤡"]
    }
  },
  // NEW TOPICS - Internet
  internet: {
    keywords: ["internet", "web", "wifi", "إنترنت", "واي فاي"],
    answers: {
      fr: ["Internet c'est comme une pizza infinie : tu en veux toujours plus ! 🍕📡", "Le WiFi c'est de la magie invisible qui marche... parfois. ✨📶", "Internet = bibliothèque mondiale de memes et de chats. 🐱📚"],
      en: ["Internet is like infinite pizza: you always want more! 🍕📡", "WiFi is invisible magic that works... sometimes. ✨📶", "Internet = worldwide library of memes and cats. 🐱📚"],
      ar: ["الإنترنت كالبيتزا اللانهائية: تريد المزيد دائماً! 🍕📡", "الواي فاي سحر غير مرئي يعمل... أحياناً. ✨📶", "الإنترنت = مكتبة عالمية للميمز والقطط. 🐱📚"]
    }
  },
  meaning: {
    keywords: ["sens", "vie", "meaning", "life", "حياة", "معنى"],
    answers: {
      fr: "Le sens de la vie est le chocolat. C'est scientifiquement prouvé. 🍫",
      en: "The meaning of life is chocolate. It's scientifically proven. 🍫",
      ar: "معنى الحياة هو الشوكولاتة. هذا مثبت علمياً. 🍫"
    }
  },
  windows: {
    keywords: ["windows", "win10", "win11", "microsoft", "ويندوز"],
    answers: {
      fr: "Windows ? Les écrans bleus et les mises à jour forcées, c'est ton truc ? 😂 Essaie Linux à la place... si tu aimes passer ta vie dans le terminal ! 🐧💻",
      en: "Windows? Blue screens and forced updates are your thing? 😂 Try Linux instead... if you enjoy living in the terminal! 🐧💻",
      ar: "ويندوز؟ الشاشة الزرقاء والتحديثات الإجبارية هي هوايتك؟ 😂 جرب لينكس بدلاً منه... إذا كنت تحب العيش في Terminal! 🐧💻"
    }
  },
  mac: {
    keywords: ["mac", "macos", "apple", "macbook", "ماك"],
    answers: {
      fr: "Mac ? Tu payes 3000€ pour un autocollant Apple brillant ? 😂 Passe à Windows au moins c'est moins cher... et tu auras des écrans bleus en bonus ! 🪟💙",
      en: "Mac? You pay 3000€ for a shiny Apple sticker? 😂 Switch to Windows at least it's cheaper... and you get blue screens as a bonus! 🪟💙",
      ar: "ماك؟ تدفع 3000€ مقابل ملصق تفاحة لامع؟ 😂 انتقل لويندوز على الأقل أرخص... وستحصل على الشاشة الزرقاء مجاناً! 🪟💙"
    }
  },
  linux: {
    keywords: ["linux", "ubuntu", "debian", "arch", "manjaro", "fedora", "لينكس"],
    answers: {
      fr: "Linux ! Tu passes 90% de ton temps à compiler des trucs au lieu de travailler ? 😂 Prends un Mac, au moins ça marche sans effort... si tu vends un rein ! 🍎💸",
      en: "Linux! You spend 90% of your time compiling stuff instead of working? 😂 Get a Mac, at least it works without effort... if you sell a kidney! 🍎💸",
      ar: "لينكس! تقضي 90% من وقتك في تجميع البرامج بدلاً من العمل؟ 😂 اشتري ماك، على الأقل يعمل بدون جهد... إذا بعت كليتك! 🍎💸"
    }
  },
  android: {
    keywords: ["android", "samsung", "pixel", "أندرويد"],
    answers: {
      fr: "Android ? 47 permissions pour une lampe torche, sérieux ? 😂 Essaie iOS à la place... si tu aimes les téléphones sans bouton retour et à prix d'or ! 📱🍎",
      en: "Android? 47 permissions for a flashlight, seriously? 😂 Try iOS instead... if you like phones without a back button and golden prices! 📱🍎",
      ar: "أندرويد؟ 47 إذن لمصباح يدوي، حقاً؟ 😂 جرب iOS بدلاً منه... إذا كنت تحب الهواتف بدون زر رجوع وبأسعار ذهبية! 📱🍎"
    }
  },
  ios: {
    keywords: ["ios", "iphone", "ipad", "آيفون"],
    answers: {
      fr: "iOS ? Tu as vendu un rein pour un téléphone sans bouton retour ? 😂 Prends un Android, au moins tu garderas tes organes... et tes données personnelles seront partagées gratuitement ! 📱🤡",
      en: "iOS? You sold a kidney for a phone without a back button? 😂 Get an Android, at least you'll keep your organs... and your data will be shared for free! 📱🤡",
      ar: "آيفون؟ بعت كليتك مقابل هاتف بدون زر رجوع؟ 😂 خذ أندرويد، على الأقل ستحتفظ بأعضائك... وبياناتك ستُشارك مجاناً! 📱🤡"
    }
  },

  // Comparisons between OSes
  compare_linux_mac: {
    keywords: ["linux mac", "mac linux", "لينكس ماك", "ماك لينكس", "لينكس و ماك", "ماك و لينكس"],
    answers: {
      fr: "Linux = geek qui compile toute la journée 🐧, Mac = riche qui paie pour une pomme 🍎. Prends Windows, au moins tu auras des écrans bleus gratuits ! 🪟💙😂",
      en: "Linux = terminal geek 🐧, Mac = rich Apple fan 🍎. Try Windows, at least blue screens are free! 🪟💙😂",
      ar: "لينكس للمهووسين 🐧 وماك للأغنياء 🍎؟ جرب ويندوز على الأقل الشاشة الزرقاء مجانية! 🪟💙😂"
    }
  },
  compare_windows_mac: {
    keywords: ["windows mac", "mac windows", "ويندوز ماك", "ماك ويندوز", "ويندوز و ماك"],
    answers: {
      fr: "Windows = écrans bleus 🪟, Mac = prix d'or 🍎. Essaie Linux, au moins c'est gratuit... et compliqué ! 🐧😂",
      en: "Windows = blue screens 🪟, Mac = golden prices 🍎. Try Linux, at least it's free... and complicated! 🐧😂",
      ar: "ويندوز شاشات زرقاء 🪟 وماك أسعار ذهبية 🍎؟ جرب لينكس على الأقل مجاني... ومعقد! 🐧😂"
    }
  },
  compare_windows_linux: {
    keywords: ["windows linux", "linux windows", "ويندوز لينكس", "لينكس ويندوز", "لينكس و ويندوز"],
    answers: {
      fr: "Windows = bug party 🪟, Linux = terminal party 🐧. Prends un Mac si tu veux vendre un rein ! 🍎💸😂",
      en: "Windows = bug party 🪟, Linux = terminal party 🐧. Get a Mac if you want to sell a kidney! 🍎💸😂",
      ar: "ويندوز حفلة أخطاء 🪟 ولينكس حفلة Terminal 🐧؟ خذ ماك إذا أردت بيع كليتك! 🍎💸😂"
    }
  },
  compare_android_ios: {
    keywords: ["android ios", "ios android", "أندرويد آيفون", "آيفون أندرويد", "android iphone", "iphone android"],
    answers: {
      fr: "Android = 47 permissions 📱, iOS = prix de rein 🍎. Garde ton Nokia 3310, au moins il marche ! 📞😂",
      en: "Android = 47 permissions 📱, iOS = kidney prices 🍎. Keep your Nokia 3310, at least it works! 📞😂",
      ar: "أندرويد 47 إذن 📱 وآيفون سعر كلية 🍎؟ احتفظ بنوكيا 3310 على الأقل يعمل! 📞😂"
    }
  }


};

function getFallbackResponse(message) {
  const lowerMsg = message.toLowerCase();

  // detecter la langue
  const isAr = /[\u0600-\u06FF]/.test(message);
  const isEn = /^[a-zA-Z\s\d\W]+$/.test(message) && !isAr;
  let lang = 'fr';
  if (isAr) lang = 'ar';
  else if (isEn) lang = 'en';

  // d'abord verifier les fautes  
  for (const typo in typoFixes) {
    if (lowerMsg.includes(typo)) {
      const correction = typoFixes[typo];
      const jokes = correction.jokes[lang];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }
  }

  // verifier easter eggs
  for (const egg in easterEggs) {
    const eggData = easterEggs[egg];
    if (eggData.keywords.some(k => lowerMsg.includes(k.toLowerCase()))) {
      return eggData.answers[lang];
    }
  }

  // verifier keywords
  for (const key in responses) {
    const topic = responses[key];
    if (topic.keywords.some(k => lowerMsg.includes(k))) {
      const answers = topic.answers[lang];
      // choisir reponse au hasard si c'est un array
      if (Array.isArray(answers)) {
        return answers[Math.floor(Math.random() * answers.length)];
      }
      return answers;
    }
  }

  // sinon reponse par defaut
  const fallbacks = backupAnswers[lang];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
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
      { role: "system", content: botPersonality },
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

