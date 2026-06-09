import { useState } from "react";

const SEGUROS = {
  hogar: {
    nombre: "Seguro de Hogar",
    emoji: "🏠",
    beneficios: ["Cobertura daños, robo e incendio", "Asistencia 24h", "Responsabilidad civil", "Electrodomésticos incluidos"],
    precio: "desde 15€/mes"
  },
  coche: {
    nombre: "Seguro de Coche",
    emoji: "🚗",
    beneficios: ["Todo riesgo o terceros ampliado", "Asistencia en carretera 24h", "Vehículo de sustitución", "Descuentos por buen conductor"],
    precio: "desde 29€/mes"
  },
  vida: {
    nombre: "Seguro de Vida",
    emoji: "❤️",
    beneficios: ["Capital asegurado desde 30.000€", "Cobertura fallecimiento e invalidez", "Sin reconocimiento médico hasta 50k", "Desgravación fiscal"],
    precio: "desde 9€/mes"
  },
  accidentes: {
    nombre: "Seguro de Accidentes",
    emoji: "🩺",
    beneficios: ["Indemnización por incapacidad", "Cobertura 24h mundial", "Asistencia en viaje", "Incluye actividades deportivas"],
    precio: "desde 6€/mes"
  },
  salud: {
    nombre: "Seguro de Salud",
    emoji: "💊",
    beneficios: ["Cuadro médico amplio", "Sin copago en urgencias", "Segunda opinión médica", "Dental incluido en algunos planes"],
    precio: "desde 39€/mes"
  },
  mascotas: {
    nombre: "Seguro de Mascotas",
    emoji: "🐾",
    beneficios: ["Veterinario 24h online", "Cirugías cubiertas", "Responsabilidad civil", "Cobertura pérdida y robo"],
    precio: "desde 12€/mes"
  }
};

const PERFILES = [
  { id: "joven", label: "Joven / Estudiante", emoji: "🎓", rango: "18-28 años" },
  { id: "pareja_joven", label: "Pareja Joven", emoji: "💑", rango: "25-35 años" },
  { id: "familia", label: "Familia con Hijos", emoji: "👨‍👩‍👧", rango: "30-50 años" },
  { id: "mayor_activo", label: "Mayor Activo", emoji: "🏌️", rango: "50-65 años" },
  { id: "senior", label: "Jubilado / Senior", emoji: "👴", rango: "+65 años" },
  { id: "autonomo", label: "Autónomo / Profesional", emoji: "💼", rango: "30-55 años" },
];

const ESTRATEGIAS = {
  joven: {
    apertura: "¡Qué bien que te hayan regalado este seguro! Ya estás protegido/a en algo importante. Aprovecho para preguntarte: ¿tienes coche o moto?",
    seguros_prioritarios: ["coche", "accidentes", "mascotas"],
    argumentos: {
      coche: "A tu edad los seguros de coche suelen ser caros con otras compañías. El Corte Inglés tiene tarifas especiales para jóvenes con buen historial y además si no tienes siniestros, el precio baja cada año.",
      accidentes: "Para alguien activo como tú — deporte, viajes, salidas — un seguro de accidentes por apenas 6€ al mes es de lo más inteligente. Te cubre si te pasa algo practicando deporte o de viaje, en cualquier país.",
      mascotas: "Si tienes mascota, ya sabes lo caro que puede salir una urgencia veterinaria. Por 12€ al mes tienes veterinario online 24h y cirugías cubiertas."
    },
    objeciones: {
      "Soy joven y sano": "Exacto, por eso es el momento ideal: cuanto antes contratas, más barato te sale y sin exclusiones por edad ni salud previa.",
      "No tengo dinero": "El de accidentes son 6€ al mes — menos que un café al día. Y el de coche puede salirte más barato que con tu compañía actual.",
      "Ya tengo seguros": "¿De qué compañía? El Corte Inglés tiene la ventaja de que puedes gestionar todo desde una app y tienes un solo interlocutor para todo."
    }
  },
  pareja_joven: {
    apertura: "Enhorabuena si estáis en una etapa de vida nueva juntos. ¿Tenéis piso en propiedad o alquilado? ¿Coche?",
    seguros_prioritarios: ["hogar", "coche", "vida"],
    argumentos: {
      hogar: "Si tenéis piso — propio o alquilado — el seguro de hogar es imprescindible. Cubre daños, robos, y lo más importante: responsabilidad civil. Si se os inunda y daña al vecino de abajo, sin seguro ese gasto es vuestro.",
      coche: "Podéis asegurar ambos coches con El Corte Inglés y conseguir descuento por multiproducto. Además, el vehículo de sustitución es un tranquilizador enorme.",
      vida: "Con una hipoteca o un alquiler compartido, si le pasara algo a uno de los dos, el otro quedaría en una situación muy difícil. El seguro de vida desde 9€/mes es la red de seguridad de vuestra relación."
    },
    objeciones: {
      "Tenemos seguro de hogar del banco": "El del banco suele ser el mínimo obligatorio para la hipoteca. Os recomiendo comparar coberturas — el nuestro incluye electrodomésticos y asistencia 24h que el bancario no suele tener.",
      "Ya tenemos seguro de vida": "¿Está actualizado al valor de vuestra hipoteca actual? Muchas parejas lo contratan y nunca lo revisan. Os hago un análisis gratuito.",
      "Lo consultamos": "Perfecto. Os dejo esta información por escrito y si queréis puedo reservaros una cita para cuando lo hayáis hablado."
    }
  },
  familia: {
    apertura: "¿Tenéis hijos en casa? ¿Cuántos? Con familia, la tranquilidad lo es todo. ¿Están cubiertos si les pasa algo en el cole o practicando deporte?",
    seguros_prioritarios: ["vida", "accidentes", "salud", "hogar"],
    argumentos: {
      vida: "Con hijos, el seguro de vida deja de ser una opción y se convierte en responsabilidad. Si al sustentador principal de la familia le pasara algo, ¿podrías mantener el nivel de vida de tus hijos?",
      accidentes: "Los niños se caen, se rompen algo... el seguro de accidentes familiar cubre a todos los miembros. Es de los productos más utilizados con diferencia.",
      salud: "Con el seguro de salud, si un niño se pone malo a las 2 de la madrugada no vas a urgencias del hospital público a esperar 4 horas. Tienes clínica privada inmediata.",
      hogar: "Con niños en casa, los imprevistos son el día a día. El seguro de hogar con asistencia 24h es esencial."
    },
    objeciones: {
      "Tenemos la seguridad social": "La sanidad pública es buena, pero las listas de espera para especialistas son largas. Con seguro privado, el pediatra o el traumatólogo en 24-48h.",
      "Es muy caro para toda la familia": "El seguro de accidentes familiar cubre a todos desde 18€/mes. Dividido entre 4 personas, son 4,50€ por persona. Y el seguro de vida, siendo joven y sano, es sorprendentemente barato.",
      "Lo pienso": "Entiendo, es una decisión importante. Pero te digo una cosa: el riesgo de no tenerlo es mayor que el coste de tenerlo. ¿Te hago un presupuesto personalizado para llevarte a casa?"
    }
  },
  mayor_activo: {
    apertura: "¿Sigue activo/a, verdad? ¿Viaja? ¿Tiene nietos? A esta etapa de la vida hay que proteger bien lo que se ha construido durante años.",
    seguros_prioritarios: ["salud", "vida", "hogar", "accidentes"],
    argumentos: {
      salud: "A partir de cierta edad, el acceso rápido a especialistas marca la diferencia. Con el seguro de salud tiene segunda opinión médica, sin listas de espera, y si quiere operarse, elige el médico y la clínica.",
      vida: "Si tiene hijos o nietos que dependen de usted, o una hipoteca pendiente, el seguro de vida con cobertura de invalidez también es muy valioso.",
      hogar: "¿Tiene la vivienda con el seguro actualizado? Muchas personas llevan 10 o 15 años con el mismo seguro y la cobertura ya no refleja el valor real del piso.",
      accidentes: "Viajando o practicando deporte, el seguro de accidentes le da cobertura mundial. Una caída o un accidente en el extranjero sin seguro puede costar miles de euros."
    },
    objeciones: {
      "Soy muy mayor para contratar": "Para el seguro de accidentes y de hogar no hay límite de edad. Para el de salud, cuanto antes mejor porque a partir de ciertos años algunas preexistencias se excluyen.",
      "Mi médico de cabecera me conoce bien": "Eso es una ventaja, y la mantiene. El seguro privado es complementario — para especialistas, pruebas rápidas, y cirugías sin esperar.",
      "No necesito más gastos": "Le entiendo. Pero compare: una semana en una clínica privada puede costar 3.000€. El seguro de salud son 39€/mes. Es matemática pura."
    }
  },
  senior: {
    apertura: "Ya con todo trabajado y disfrutando, ¿verdad? ¿Tiene todos sus bienes bien protegidos? ¿Sus hijos saben que usted tiene todo en orden?",
    seguros_prioritarios: ["salud", "hogar", "vida"],
    argumentos: {
      salud: "A su etapa de vida, lo más valioso es la salud y la rapidez de atención. Con el seguro de salud tiene acceso inmediato a médicos especialistas, sin esperas, y con la tranquilidad de estar bien cuidado/a.",
      hogar: "Su hogar es su gran patrimonio. Tenerlo bien asegurado — ante robos, incendios, daños de agua — es proteger lo que ha construido toda una vida.",
      vida: "El seguro de vida puede usarse también como herramienta de herencia: asegura que sus hijos o nietos reciban un capital sin pasar por trámites complicados."
    },
    objeciones: {
      "A mi edad para qué": "Precisamente a su edad es cuando más sentido tiene proteger lo construido. El seguro de hogar, por ejemplo, no tiene límite de edad y cuesta lo mismo que hace 20 años.",
      "Mis hijos ya se encargan": "Qué suerte tenerlos. Y precisamente para no ser una carga para ellos, tener el seguro de salud es la mayor muestra de independencia.",
      "Ya tengo todo": "¿Cuándo fue la última vez que revisó sus coberturas? Los precios del mercado cambian y puede que esté pagando más por menos. Le hago una revisión gratuita."
    }
  },
  autonomo: {
    apertura: "¿Trabaja por cuenta propia? Entonces usted sabe mejor que nadie que si para, para todo. ¿Tiene cubierto ese riesgo?",
    seguros_prioritarios: ["accidentes", "salud", "vida", "hogar"],
    argumentos: {
      accidentes: "Si tiene un accidente y no puede trabajar durante semanas, ¿quién paga sus facturas? El seguro de accidentes con cobertura de incapacidad temporal es, para un autónomo, lo más inteligente que puede contratar.",
      salud: "Como autónomo, no puede permitirse esperar 3 meses para ver a un especialista. El seguro de salud le garantiza atención en 24-48h para volver al trabajo cuanto antes.",
      vida: "Si tiene empleados o clientes que dependen de su actividad, o si tiene familia, el seguro de vida también cubre invalidez permanente — que para un autónomo es el mayor riesgo.",
      hogar: "Si trabaja desde casa, el seguro de hogar puede incluir también el material profesional. ¿Tiene ordenador, equipos? Están cubiertos ante robo o daños."
    },
    objeciones: {
      "Lo paga la mutua de autónomos": "La mutua cubre accidentes laborales en horario de trabajo. El seguro de accidentes personal le cubre 24h, incluido tiempo libre, viajes y fines de semana.",
      "Ya tengo mucho gasto": "Entiendo. Pero es una deducción fiscal — como autónomo puede desgravar parte del seguro de salud y de accidentes. Le sale más barato de lo que parece.",
      "No me pasa nada": "Nadie piensa que le va a pasar. Pero los autónomos son el colectivo con menor red de seguridad cuando algo ocurre. La pregunta no es si puede permitirse el seguro, sino si puede permitirse no tenerlo."
    }
  }
};

export default function SalesAssistant() {
  const [step, setStep] = useState("perfil"); // perfil | estrategia | producto
  const [perfilSeleccionado, setPerfilSeleccionado] = useState(null);
  const [seguroActivo, setSeguroActivo] = useState(null);
  const [objecionActiva, setObjecionActiva] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [customSituation, setCustomSituation] = useState("");

  const estrategia = perfilSeleccionado ? ESTRATEGIAS[perfilSeleccionado] : null;

  const askAI = async (prompt) => {
    setAiLoading(true);
    setAiResponse("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `Eres un coach experto en ventas de seguros para El Corte Inglés en España. 
Tu función es ayudar a Alejandra, una vendedora joven, a cerrar ventas de seguros (hogar, coche, vida, accidentes, salud, mascotas).
Los clientes vienen a recoger un seguro que les han regalado por otra compra y hay que aprovechar para venderles más seguros.
Da argumentos de venta concretos, breves y directos. Usa lenguaje cercano y profesional. 
Responde siempre en español. Máximo 4 frases. Sin asteriscos ni formato markdown.`,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await res.json();
      const text = data.content?.find(b => b.type === "text")?.text || "No se pudo obtener respuesta.";
      setAiResponse(text);
    } catch (e) {
      setAiResponse("Error al conectar con el asistente. Inténtalo de nuevo.");
    }
    setAiLoading(false);
  };

  const handleSituacionCustom = () => {
    if (!customSituation.trim()) return;
    const perfil = PERFILES.find(p => p.id === perfilSeleccionado);
    askAI(`El cliente es: ${perfil?.label}. Situación específica: "${customSituation}". ¿Qué seguro del Corte Inglés le ofrezco primero y con qué argumento exacto?`);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a1628 0%, #1a2d4a 60%, #0d2035 100%)",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#f0e6c8",
      padding: "16px"
    }}>
      {/* HEADER */}
      <div style={{
        textAlign: "center",
        marginBottom: "24px",
        paddingBottom: "20px",
        borderBottom: "1px solid rgba(200,168,75,0.3)"
      }}>
        <div style={{ fontSize: "12px", letterSpacing: "3px", color: "#C8A84B", textTransform: "uppercase", marginBottom: "6px" }}>
          El Corte Inglés · Seguros
        </div>
        <h1 style={{ margin: "0 0 4px", fontSize: "22px", fontWeight: "700", color: "#fff" }}>
          Asistente de Ventas ✦
        </h1>
        <p style={{ margin: 0, fontSize: "13px", color: "rgba(240,230,200,0.6)" }}>
          Para Alejandra · Identifica el perfil y cierra la venta
        </p>
      </div>

      {/* PASO 1: SELECCIÓN DE PERFIL */}
      {step === "perfil" && (
        <div>
          <h2 style={{ fontSize: "15px", color: "#C8A84B", marginBottom: "16px", textAlign: "center" }}>
            ¿Qué perfil tiene el cliente?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {PERFILES.map(p => (
              <button
                key={p.id}
                onClick={() => { setPerfilSeleccionado(p.id); setStep("estrategia"); setAiResponse(""); setObjecionActiva(null); setSeguroActivo(null); }}
                style={{
                  background: "rgba(200,168,75,0.08)",
                  border: "1px solid rgba(200,168,75,0.25)",
                  borderRadius: "12px",
                  padding: "14px 10px",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.2s",
                  color: "#f0e6c8"
                }}
                onMouseEnter={e => e.target.style.background = "rgba(200,168,75,0.18)"}
                onMouseLeave={e => e.target.style.background = "rgba(200,168,75,0.08)"}
              >
                <div style={{ fontSize: "26px", marginBottom: "4px" }}>{p.emoji}</div>
                <div style={{ fontSize: "13px", fontWeight: "600" }}>{p.label}</div>
                <div style={{ fontSize: "11px", color: "rgba(240,230,200,0.5)", marginTop: "2px" }}>{p.rango}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PASO 2: ESTRATEGIA */}
      {step === "estrategia" && estrategia && (
        <div>
          {/* Cabecera perfil */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
            <button onClick={() => { setStep("perfil"); setAiResponse(""); }}
              style={{ background: "rgba(200,168,75,0.15)", border: "1px solid rgba(200,168,75,0.3)", borderRadius: "8px", padding: "6px 12px", color: "#C8A84B", cursor: "pointer", fontSize: "12px" }}>
              ← Volver
            </button>
            <div>
              <div style={{ fontSize: "14px", fontWeight: "700" }}>
                {PERFILES.find(p => p.id === perfilSeleccionado)?.emoji} {PERFILES.find(p => p.id === perfilSeleccionado)?.label}
              </div>
            </div>
          </div>

          {/* APERTURA */}
          <div style={{
            background: "rgba(200,168,75,0.12)",
            border: "1px solid rgba(200,168,75,0.4)",
            borderRadius: "12px",
            padding: "14px",
            marginBottom: "16px"
          }}>
            <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#C8A84B", marginBottom: "6px" }}>💬 FRASE DE APERTURA</div>
            <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.5", fontStyle: "italic" }}>"{estrategia.apertura}"</p>
          </div>

          {/* SEGUROS PRIORITARIOS */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#C8A84B", marginBottom: "10px" }}>🎯 SEGUROS PRIORITARIOS PARA ESTE PERFIL</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {estrategia.seguros_prioritarios.map((segId, i) => {
                const seg = SEGUROS[segId];
                const arg = estrategia.argumentos[segId];
                return (
                  <div key={segId}
                    style={{
                      background: seguroActivo === segId ? "rgba(200,168,75,0.2)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${seguroActivo === segId ? "rgba(200,168,75,0.6)" : "rgba(255,255,255,0.1)"}`,
                      borderRadius: "10px",
                      overflow: "hidden"
                    }}>
                    <button
                      onClick={() => setSeguroActivo(seguroActivo === segId ? null : segId)}
                      style={{
                        width: "100%", display: "flex", alignItems: "center", gap: "10px",
                        background: "transparent", border: "none", padding: "12px 14px",
                        cursor: "pointer", color: "#f0e6c8", textAlign: "left"
                      }}>
                      <span style={{
                        background: "rgba(200,168,75,0.2)",
                        borderRadius: "50%",
                        width: "22px", height: "22px",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "10px", color: "#C8A84B", fontWeight: "700", flexShrink: 0
                      }}>{i + 1}</span>
                      <span style={{ fontSize: "18px" }}>{seg.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "14px", fontWeight: "600" }}>{seg.nombre}</div>
                        <div style={{ fontSize: "11px", color: "#C8A84B" }}>{seg.precio}</div>
                      </div>
                      <span style={{ fontSize: "12px", color: "rgba(240,230,200,0.4)" }}>{seguroActivo === segId ? "▲" : "▼"}</span>
                    </button>

                    {seguroActivo === segId && (
                      <div style={{ padding: "0 14px 14px", borderTop: "1px solid rgba(200,168,75,0.2)" }}>
                        {/* Argumento de venta */}
                        <div style={{ marginTop: "12px", marginBottom: "12px" }}>
                          <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#C8A84B", marginBottom: "6px" }}>🗣️ ARGUMENTO DE VENTA</div>
                          <p style={{ margin: 0, fontSize: "13px", lineHeight: "1.6", background: "rgba(200,168,75,0.08)", padding: "10px", borderRadius: "8px" }}>
                            "{arg}"
                          </p>
                        </div>
                        {/* Beneficios */}
                        <div>
                          <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#C8A84B", marginBottom: "6px" }}>✅ PUNTOS CLAVE</div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                            {seg.beneficios.map((b, bi) => (
                              <div key={bi} style={{ fontSize: "12px", display: "flex", gap: "6px" }}>
                                <span style={{ color: "#C8A84B" }}>·</span> {b}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* MANEJO DE OBJECIONES */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#C8A84B", marginBottom: "10px" }}>🛡️ MANEJO DE OBJECIONES</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {Object.entries(estrategia.objeciones).map(([obj, resp]) => (
                <div key={obj} style={{
                  background: objecionActiva === obj ? "rgba(200,168,75,0.15)" : "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px", overflow: "hidden"
                }}>
                  <button
                    onClick={() => setObjecionActiva(objecionActiva === obj ? null : obj)}
                    style={{
                      width: "100%", background: "transparent", border: "none",
                      padding: "11px 14px", cursor: "pointer", color: "#f0e6c8",
                      textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center"
                    }}>
                    <span style={{ fontSize: "13px" }}>❝ {obj}</span>
                    <span style={{ fontSize: "11px", color: "rgba(240,230,200,0.4)" }}>{objecionActiva === obj ? "▲" : "▼"}</span>
                  </button>
                  {objecionActiva === obj && (
                    <div style={{ padding: "0 14px 12px", borderTop: "1px solid rgba(200,168,75,0.15)" }}>
                      <p style={{ margin: "10px 0 0", fontSize: "13px", lineHeight: "1.6", color: "rgba(240,230,200,0.9)" }}>
                        👉 {resp}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ASISTENTE IA */}
          <div style={{
            background: "rgba(27,42,74,0.6)",
            border: "1px solid rgba(200,168,75,0.3)",
            borderRadius: "12px",
            padding: "14px",
            marginBottom: "8px"
          }}>
            <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#C8A84B", marginBottom: "10px" }}>
              🤖 SITUACIÓN ESPECÍFICA · IA
            </div>
            <p style={{ fontSize: "12px", color: "rgba(240,230,200,0.6)", margin: "0 0 10px" }}>
              Describe la situación real del cliente y la IA te da el argumento exacto:
            </p>
            <textarea
              value={customSituation}
              onChange={e => setCustomSituation(e.target.value)}
              placeholder='Ej: "Tiene 2 hijos, acaba de comprar piso y su coche tiene 8 años"'
              style={{
                width: "100%", minHeight: "70px", background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(200,168,75,0.25)", borderRadius: "8px",
                color: "#f0e6c8", padding: "10px", fontSize: "13px", resize: "vertical",
                boxSizing: "border-box", fontFamily: "inherit"
              }}
            />
            <button
              onClick={handleSituacionCustom}
              disabled={aiLoading || !customSituation.trim()}
              style={{
                marginTop: "10px", width: "100%",
                background: aiLoading ? "rgba(200,168,75,0.2)" : "rgba(200,168,75,0.9)",
                border: "none", borderRadius: "8px", padding: "11px",
                color: "#0a1628", fontWeight: "700", fontSize: "14px",
                cursor: aiLoading ? "default" : "pointer"
              }}>
              {aiLoading ? "Consultando IA..." : "✦ Obtener Argumento Personalizado"}
            </button>

            {aiResponse && (
              <div style={{
                marginTop: "12px",
                background: "rgba(200,168,75,0.1)",
                border: "1px solid rgba(200,168,75,0.3)",
                borderRadius: "8px", padding: "12px"
              }}>
                <div style={{ fontSize: "10px", color: "#C8A84B", marginBottom: "6px", letterSpacing: "1px" }}>RESPUESTA IA</div>
                <p style={{ margin: 0, fontSize: "13px", lineHeight: "1.6" }}>{aiResponse}</p>
              </div>
            )}
          </div>

          {/* CIERRE */}
          <div style={{
            background: "rgba(200,168,75,0.08)",
            border: "1px solid rgba(200,168,75,0.2)",
            borderRadius: "10px",
            padding: "12px",
            marginTop: "6px"
          }}>
            <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#C8A84B", marginBottom: "8px" }}>🔒 FRASE DE CIERRE UNIVERSAL</div>
            <p style={{ margin: 0, fontSize: "13px", lineHeight: "1.5", fontStyle: "italic" }}>
              "¿Quiere que le prepare el presupuesto ahora mismo? Son 5 minutos y así se lleva algo concreto para pensarlo."
            </p>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div style={{ textAlign: "center", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid rgba(200,168,75,0.15)" }}>
        <p style={{ margin: 0, fontSize: "11px", color: "rgba(240,230,200,0.3)" }}>
          Creado para Alejandra · El Corte Inglés Seguros 2026
        </p>
      </div>
    </div>
  );
}
