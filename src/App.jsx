import { useState } from "react"

export default function App() {
  const [meta, setMeta] = useState("")

  return (
    <div style={{
      backgroundColor: "#000",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "sans-serif",
      color: "#fff",
      padding: "24px"
    }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "8px" }}>MindStep</h1>
      <p style={{ color: "#888", marginBottom: "32px" }}>Tu meta, un paso a la vez.</p>

      <p style={{ marginBottom: "12px" }}>¿Qué quieres lograr?</p>

      <input
        type="text"
        value={meta}
        onChange={(e) => setMeta(e.target.value)}
        placeholder="Ej: Lanzar mi negocio"
        style={{
          backgroundColor: "#111",
          border: "1px solid #333",
          color: "#fff",
          padding: "12px 16px",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "400px",
          fontSize: "1rem",
          marginBottom: "24px"
        }}
      />

      <button
        style={{
          backgroundColor: "#fff",
          color: "#000",
          border: "none",
          padding: "14px 32px",
          borderRadius: "8px",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor: "pointer",
          letterSpacing: "1px"
        }}
      >
        CREAR MI PLAN
      </button>
    </div>
  )
}