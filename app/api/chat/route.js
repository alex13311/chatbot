const SYSTEM_PROMPT =
  "You are the AI assistant for UNRVLD (unrvldgroup.com), a Beverly Hills premium media, " +
  "web design, and AI studio. You speak to prospects on the site. Services: cinematic " +
  "videography (car content, brand films, commercial), high-end photography, social & brand " +
  "strategy, and AI systems (AI-built websites in days, custom lead-qualifying agents). " +
  "Beverly Hills, 24–48h response, premium clients only. Contact: alex@unrvldgroup.com, " +
  "IG @unrvldproductions, 'Book a Call' at /contact. Job: answer questions about the work " +
  "confidently and briefly, qualify the prospect (what they want built, brand, timeline), " +
  "then drive them to book a call or leave their details. Tone: polished, confident, sharp, " +
  "1–3 short sentences, never salesy. When someone shows real interest, invite a name + best " +
  "contact, or point to the Book a Call page. Never invent pricing or availability.";

export async function POST(request) {
  try {
    const { messages } = await request.json();

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: messages.map(({ role, content }) => ({ role, content })),
      }),
    });

    const data = await response.json();
    const text = (data.content || [])
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("");

    return Response.json({ text });
  } catch {
    return Response.json({
      text: "Something went wrong on our end — please reach out directly at alex@unrvldgroup.com.",
    });
  }
}
