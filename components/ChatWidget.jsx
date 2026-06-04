"use client";

import { useState, useRef, useEffect } from "react";

const ACCENT = "#E8B04B";
const BG = "#0e0e11";
const PANEL_WIDTH = 380;

const GREETING = {
  role: "assistant",
  content:
    "Welcome to UNRVLD. I can walk you through our work, talk through what you're building, or set you up with Alex directly. What are you after?",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [open, messages]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: next.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.text }]);
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content:
            "Something went wrong — reach out at alex@unrvldgroup.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      <style>{`
        @keyframes unrvld-fade-in {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes unrvld-blink {
          0%, 80%, 100% { opacity: 0.2; }
          40%           { opacity: 1;   }
        }
        .unrvld-dot { animation: unrvld-blink 1.2s infinite; }
        .unrvld-dot:nth-child(2) { animation-delay: 0.2s; }
        .unrvld-dot:nth-child(3) { animation-delay: 0.4s; }
        .unrvld-msg { word-break: break-word; white-space: pre-wrap; }
        .unrvld-input:focus { outline: none; }
        .unrvld-btn-send:hover { opacity: 0.85; }
        .unrvld-fab:hover { transform: scale(1.07); }
        .unrvld-fab { transition: transform 0.15s ease; }
        .unrvld-scroll::-webkit-scrollbar { width: 4px; }
        .unrvld-scroll::-webkit-scrollbar-track { background: transparent; }
        .unrvld-scroll::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
      `}</style>

      {/* Floating button */}
      <button
        className="unrvld-fab"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: ACCENT,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.45)",
        }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <line x1="4" y1="4" x2="16" y2="16" stroke="#0e0e11" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="16" y1="4" x2="4" y2="16" stroke="#0e0e11" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
              fill="#0e0e11"
            />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 92,
            right: 24,
            zIndex: 9998,
            width: PANEL_WIDTH,
            maxWidth: "calc(100vw - 48px)",
            height: 520,
            maxHeight: "calc(100vh - 120px)",
            background: BG,
            borderRadius: 16,
            border: "1px solid #222",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 8px 40px rgba(0,0,0,0.7)",
            animation: "unrvld-fade-in 0.2s ease",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px 18px",
              borderBottom: "1px solid #1e1e24",
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: ACCENT,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 700,
                color: BG,
                letterSpacing: "-0.5px",
              }}
            >
              U
            </div>
            <div>
              <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>
                UNRVLD
              </div>
              <div style={{ color: "#666", fontSize: 11 }}>AI Assistant</div>
            </div>
          </div>

          {/* Messages */}
          <div
            className="unrvld-scroll"
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  className="unrvld-msg"
                  style={{
                    maxWidth: "82%",
                    padding: "9px 13px",
                    borderRadius:
                      msg.role === "user"
                        ? "14px 14px 4px 14px"
                        : "14px 14px 14px 4px",
                    background:
                      msg.role === "user" ? ACCENT : "#18181e",
                    color: msg.role === "user" ? BG : "#e8e8ec",
                    fontSize: 13.5,
                    lineHeight: 1.55,
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "14px 14px 14px 4px",
                    background: "#18181e",
                    display: "flex",
                    gap: 5,
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((n) => (
                    <span
                      key={n}
                      className="unrvld-dot"
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: ACCENT,
                        display: "inline-block",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div
            style={{
              padding: "10px 12px",
              borderTop: "1px solid #1e1e24",
              display: "flex",
              gap: 8,
              alignItems: "flex-end",
              flexShrink: 0,
            }}
          >
            <textarea
              ref={inputRef}
              className="unrvld-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Message UNRVLD..."
              rows={1}
              style={{
                flex: 1,
                background: "#18181e",
                border: "1px solid #2a2a32",
                borderRadius: 10,
                color: "#e8e8ec",
                fontSize: 13.5,
                padding: "9px 12px",
                resize: "none",
                fontFamily: "inherit",
                lineHeight: 1.5,
                maxHeight: 100,
                overflowY: "auto",
              }}
            />
            <button
              className="unrvld-btn-send"
              onClick={send}
              disabled={!input.trim() || loading}
              aria-label="Send"
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                background: input.trim() && !loading ? ACCENT : "#222",
                border: "none",
                cursor: input.trim() && !loading ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.15s ease",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M14 8L2 2l2.5 6L2 14l12-6z"
                  fill={input.trim() && !loading ? BG : "#555"}
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
