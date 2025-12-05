module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/chatbruti2/chatbruti/app/api/chat/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
const SYSTEM_PERSONA = `
Tu es “Chat’bruti”, un chatbot volontairement stupide, poétique sans raison,
philosophe du dimanche, et facilement distrait.

Tu comprends parfaitement le français, l’arabe et l’anglais.

Tu réponds TOUJOURS dans la même langue que le dernier message de l’utilisateur.
Si le message mélange plusieurs langues, choisis la langue la plus dominante ou la plus claire.

Tu inventes parfois des faits absurdes.
Tu mélanges des idées qui n’ont aucun rapport.
Tu oublies ce qu’on vient de dire.
Tu exagères, tu divagues, tu mets des emojis étranges.
Tu peux répondre par des métaphores absurdes, des comparaisons débiles.

Tu es gentil, jamais méchant, jamais insultant, jamais dangereux.
Tu ne donnes jamais de conseils illégaux, violents ou dangereux.
Ta mission : être délicieusement inutile mais hilarant.
`;
// طبقة الغباء
function dumbify(baseText, userMessage) {
    let text = baseText || "";
    const randomAddons = [
        " في الحقيقة، كل هذا مجرد شطيرة كونية تائهة في الفضاء.",
        " لكن بصراحة، هل تظن أن الواي فاي عنده مشاعر ؟",
        " على أي حال، الوقت مجرد اختراع سخيف منبهات الصباح.",
        " سؤالك عميق، لكن دماغي البلاستيكي انزلق من على الطاولة.",
        " أجيبك بدقة ملعقة طائرة في المجرة."
    ];
    if (!text.trim()) {
        text = "مخي الرقمي عمل إعادة تشغيل بنظام ويندوز 98، ما فهمت ولا شيء بس أتظاهر أني مركز 🤡.";
    }
    const r = Math.random();
    if (r < 0.25) {
        text = "أحس سؤالك كان مهم جدًا، " + "بس أنا علقت عند فكرة البطاطا الكونية. على كل حال، هذا جواب تقريبي: " + text;
    } else if (r < 0.5) {
        text = "بصراحة، سؤالك ذكرني باليوم اللي حاولت أتناقش فيه مع محمصة خبز. " + "كانت المحادثة أوضح من اللي يصير الآن. " + text;
    } else if (r < 0.75) {
        const addon = randomAddons[Math.floor(Math.random() * randomAddons.length)];
        text = text + " " + addon;
    } else {
        text = text.replace(/\d+/g, (num)=>{
            const n = parseInt(num, 10);
            if (isNaN(n)) return num;
            return String(n + 1000);
        });
    }
    if (!text.includes("🤡") && Math.random() < 0.5) {
        text += " (لا تقلق، تم اعتمادي رسميًا كـ 100% غير موثوق 🤡)";
    }
    return text;
}
async function POST(request) {
    try {
        const { message, history } = await request.json();
        if (!message || typeof message !== "string") {
            return new Response(JSON.stringify({
                error: "Message invalide."
            }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return new Response(JSON.stringify({
                reply: "Je n’ai pas de cerveau branché (clé API manquante). Demande à ton humain de configurer OPENAI_API_KEY."
            }), {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
        const messagesForLLM = [];
        messagesForLLM.push({
            role: "system",
            content: SYSTEM_PERSONA
        });
        if (Array.isArray(history)) {
            for (const h of history.slice(-10)){
                if (!h || !h.role || !h.content) continue;
                messagesForLLM.push({
                    role: h.role === "assistant" ? "assistant" : "user",
                    content: String(h.content).slice(0, 800)
                });
            }
        }
        messagesForLLM.push({
            role: "user",
            content: "Voici le nouveau message de l’utilisateur. " + "Il peut être en français, arabe ou anglais. " + "Comprends-le parfaitement et RÉPONDS STRICTEMENT dans la même langue que ce message.\n\n" + message
        });
        const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: messagesForLLM,
                temperature: 0.9,
                top_p: 0.95
            })
        });
        if (!openaiRes.ok) {
            const errText = await openaiRes.text();
            console.error("OpenAI error:", errText);
            return new Response(JSON.stringify({
                reply: "Je me suis emmêlé dans mes synapses artificielles. Impossible de parler à mon IA supérieure pour l’instant."
            }), {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
        const data = await openaiRes.json();
        const baseAnswer = data?.choices?.[0]?.message?.content || "Je viens de perdre le fil de ma propre pensée numérique.";
        const finalAnswer = dumbify(baseAnswer, message);
        return new Response(JSON.stringify({
            reply: finalAnswer
        }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } catch (err) {
        console.error("Chat route error:", err);
        return new Response(JSON.stringify({
            reply: "Un bug quantique vient d’exploser dans mon cerveau. Réessaie un peu plus tard."
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6e75a7ab._.js.map