import { useState } from "react"

export default function App() {
  const [meta, setMeta] = useState("")
  const [plan, setPlan] = useState(null)
  const [cargando, setCargando] = useState(false)

  async function crearPlan() {
    console.log("KEY:", import.meta.env.VITE_GROQ_KEY)
    if (!meta.trim()) return
    setCargando(true)
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{
            role: "user",
            content: `Eres MindStep, un coach minimalista. El usuario quiere: "${meta}". 
            Responde SOLO con JSON así, sin ningún texto extra ni backticks:
            {"meta":"la meta resumida","dias":30,"hoy":"una sola tarea concreta para hoy","manana":"una sola tarea para mañana","pasado":"una sola tarea para pasado mañana"}`
          }]
        })
      })
      const data = await res.json()
      const texto = data.choices[0].message.content
      const limpio = texto.replace(/```json|```/g, "").trim()
      setPlan(JSON.parse(limpio))
    } catch (e) {
      console.error(e)
      alert("Error: " + e.message)
    }
    setCargando(false)
  }

  function marcarHecho() {
    setPlan(null)
    setMeta("")
    alert("¡Bien hecho! Mañana continuamos. 💪")
  }

  if (plan) return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center p-6 text-white font-sans">
      <p className="text-gray-500 text-sm mb-2">Meta</p>
      <h2 className="text-xl font-bold mb-1">{plan.meta}</h2>
      <p className="text-gray-500 text-sm mb-8">Duración estimada: {plan.dias} días</p>

      <div className="w-full max-w-sm bg-zinc-900 rounded-xl p-5 mb-4">
        <p className="text-xs text-gray-500 mb-1">HOY</p>
        <p className="text-green-400 text-lg font-semibold">🟢 {plan.hoy}</p>
      </div>

      <div className="w-full max-w-sm flex gap-3 mb-8">
        <div className="flex-1 bg-zinc-900 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Mañana</p>
          <p className="text-gray-400 text-sm">{plan.manana}</p>
        </div>
        <div className="flex-1 bg-zinc-900 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Pasado</p>
          <p className="text-gray-400 text-sm">{plan.pasado}</p>
        </div>
      </div>

      <button
        onClick={marcarHecho}
        className="bg-white text-black font-bold py-4 px-10 rounded-xl text-sm tracking-widest hover:bg-gray-200 transition"
      >
        MARCAR COMO HECHO
      </button>
    </div>
  )

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center p-6 text-white font-sans">
      <h1 className="text-3xl font-bold mb-2">MindStep</h1>
      <p className="text-gray-500 mb-8">Tu meta, un paso a la vez.</p>

      <p className="mb-3">¿Qué quieres lograr?</p>

      <input
        type="text"
        value={meta}
        onChange={(e) => setMeta(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && crearPlan()}
        placeholder="Ej: Lanzar mi negocio"
        className="bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 px-4 py-3 rounded-xl w-full max-w-sm text-base mb-6 outline-none focus:border-zinc-400"
      />

      <button
        onClick={crearPlan}
        disabled={cargando}
        className="bg-white text-black font-bold py-4 px-10 rounded-xl text-sm tracking-widest hover:bg-gray-200 transition disabled:opacity-50"
      >
        {cargando ? "CREANDO..." : "CREAR MI PLAN"}
      </button>
    </div>
  )
}