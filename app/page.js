export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        color: "#e8e8ec",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        padding: "40px 20px",
        textAlign: "center",
        gap: 16,
      }}
    >
      <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, color: "#E8B04B" }}>
        UNRVLD Chat Widget
      </h1>
      <p style={{ color: "#888", margin: 0, maxWidth: 480 }}>
        Service is live. Add the script below to any website to embed the chat widget.
      </p>
      <pre
        style={{
          background: "#111",
          border: "1px solid #222",
          borderRadius: 10,
          padding: "16px 20px",
          fontSize: 13,
          color: "#E8B04B",
          maxWidth: 600,
          width: "100%",
          textAlign: "left",
          overflowX: "auto",
        }}
      >
        {`<script src="https://YOUR_DOMAIN/widget.js" data-widget-id="unrvld"></script>`}
      </pre>
    </main>
  );
}
