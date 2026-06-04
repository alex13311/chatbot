/**
 * Client config store.
 * To add a new client: copy an existing entry, give it a unique widgetId,
 * fill in their details, and redeploy. That's it.
 */

const clients = {
  unrvld: {
    widgetId: "unrvld",
    name: "UNRVLD",
    accentColor: "#E8B04B",
    bgColor: "#0e0e11",
    greeting:
      "Welcome to UNRVLD. I can walk you through our work, talk through what you're building, or set you up with Alex directly. What are you after?",
    systemPrompt:
      "You are the AI assistant for UNRVLD (unrvldgroup.com), a Beverly Hills premium media, " +
      "web design, and AI studio. You speak to prospects on the site. Services: cinematic " +
      "videography (car content, brand films, commercial), high-end photography, social & brand " +
      "strategy, and AI systems (AI-built websites in days, custom lead-qualifying agents). " +
      "Beverly Hills, 24–48h response, premium clients only. Contact: alex@unrvldgroup.com, " +
      "IG @unrvldproductions, 'Book a Call' at /contact. Job: answer questions about the work " +
      "confidently and briefly, qualify the prospect (what they want built, brand, timeline), " +
      "then drive them to book a call or leave their details. Tone: polished, confident, sharp, " +
      "1–3 short sentences, never salesy. When someone shows real interest, invite a name + best " +
      "contact, or point to the Book a Call page. Never invent pricing or availability.",
    // Optional: restrict to specific domains (leave empty to allow all)
    allowedDomains: [],
  },

  // ─── ADD NEW CLIENTS BELOW ───────────────────────────────────────────────
  //
  // example_client: {
  //   widgetId: "example_client",
  //   name: "Acme Co",
  //   accentColor: "#FF5733",
  //   bgColor: "#111111",
  //   greeting: "Hi! How can we help you today?",
  //   systemPrompt: "You are the assistant for Acme Co...",
  //   allowedDomains: ["acme.com", "www.acme.com"],
  // },
};

export function getClient(widgetId) {
  return clients[widgetId] || null;
}

export function getPublicConfig(widgetId) {
  const client = getClient(widgetId);
  if (!client) return null;
  // Only expose what the browser needs — never the systemPrompt
  return {
    name: client.name,
    accentColor: client.accentColor,
    bgColor: client.bgColor,
    greeting: client.greeting,
  };
}
