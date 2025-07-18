const notas = JSON.parse(localStorage.getItem("notas") || "{}");

const colores = {
  "FUNDAMENTOS DE CONTABILIDAD": "#d81b60", // 💸 Adm. Financiera
  "TALLER DE FINANZAS APLICADAS": "#d81b60",
  "COSTOS Y PRESUPUESTOS I": "#d81b60",
  "FORMULACIÓN, PREPARACIÓN Y EVALUACIÓN DE PROYECTOS": "#d81b60",

  "NORMAS Y PROCEDIMIENTOS": "#c2185b", // 📈 Gestión Estratégica
  "FUNDAMENTOS DE ECONOMÍA": "#c2185b",
  "MARKETING": "#c2185b",
  "VENTAS": "#c2185b",
  "ADMINISTRACIÓN ESTRATÉGICA": "#c2185b",
  "CONTROL DE GESTIÓN": "#c2185b",
  "SOSTENIBILIDAD": "#c2185b",

  "TALLER DE ADMINISTRACIÓN DE PERSONAL": "#f8bbd0", // 👥 Procesos de Personas
  "GESTIÓN DE PERSONAS": "#f8bbd0",
  "RELACIÓN LABORAL INDIVIDUAL": "#f8bbd0",
  "NEGOCIACIÓN Y LIDERAZGO": "#f8bbd0",

  "DESCRIPCIÓN DE CARGOS": "#ce93d8", // 🧲 Atracción y Desarrollo
  "RECLUTAMIENTO Y SELECCIÓN": "#ce93d8",
  "COMPENSACIÓN INTEGRAL": "#ce93d8",
  "GESTIÓN DEL DESEMPEÑO": "#ce93d8",
  "CAPACITACIÓN Y DESARROLLO DE PERSONAS": "#ce93d8",

  "INTRODUCCIÓN AL EMPRENDIMIENTO": "#ec407a", // 💡 Emprendimiento
  "PROYECTOS DE INNOVACIÓN": "#ec407a",

  "GESTIÓN DEL CAMBIO": "#ba68c8", // 🌱 Cultura organizacional
  "GESTIÓN DE LA CULTURA Y CLIMA": "#ba68c8",
  "DIVERSIDAD E INCLUSIÓN": "#ba68c8",

  "HERRAMIENTAS TECNOLÓGICAS I": "#e1bee7", // 💻 Tecnología
  "HERRAMIENTAS TECNOLÓGICAS II": "#e1bee7",
  "HERRAMIENTAS TECNOLÓGICAS III": "#e1bee7",
  "BIG DATA E INTELIGENCIA DE NEGOCIOS": "#e1bee7",
  "GESTIÓN EN SISTEMAS ERP": "#e1bee7",

  "TALLER INTEGRADO DE NEGOCIOS": "#ad1457", // 🧪 Taller Aplicado
  "TALLER APLICADO: TALLER ESTRATÉGICO DE GESTIÓN DE PERSONAS": "#ad1457",

  // 📘 Formación general
  "HABILIDADES DE COMUNICACIÓN": "#fce4ec",
  "HABILIDADES DE COMUNICACIÓN PARA EL TRABAJO": "#fce4ec",
  "NIVELACIÓN MATEMÁTICA": "#fce4ec",
  "HERRAMIENTAS DE ANÁLISIS PARA LA GESTIÓN": "#fce4ec",

  // ✝️ Formación sello
  "FUNDAMENTOS DE ANTROPOLOGÍA": "#f3e5f5",
  "ÉTICA PARA EL TRABAJO": "#f3e5f5",
  "ÉTICA PROFESIONAL": "#f3e5f5"
};

const mallaData = {
  "1º SEMESTRE": ["FUNDAMENTOS DE CONTABILIDAD", "NORMAS Y PROCEDIMIENTOS", "FUNDAMENTOS DE ECONOMÍA", "HERRAMIENTAS TECNOLÓGICAS I", "HABILIDADES DE COMUNICACIÓN", "NIVELACIÓN MATEMÁTICA"],
  "2º SEMESTRE": ["MARKETING", "TALLER DE ADMINISTRACIÓN DE PERSONAL", "HERRAMIENTAS TECNOLÓGICAS II", "FUNDAMENTOS DE ANTROPOLOGÍA", "HABILIDADES DE COMUNICACIÓN PARA EL TRABAJO", "HERRAMIENTAS DE ANÁLISIS PARA LA GESTIÓN"],
  "3º SEMESTRE": ["TALLER DE FINANZAS APLICADAS", "GESTIÓN DE PERSONAS", "INTRODUCCIÓN AL EMPRENDIMIENTO", "HERRAMIENTAS TECNOLÓGICAS III", "DOCTRINA SOCIAL DE LA IGLESIA", "RESOLVIENDO PROBLEMAS CON PROACTIVIDAD"],
  "4º SEMESTRE": ["COSTOS Y PRESUPUESTOS I", "VENTAS", "TALLER INTEGRADO DE NEGOCIOS", "ÉTICA PARA EL TRABAJO", "PRÁCTICA LABORAL"],
  "5º SEMESTRE": ["ADMINISTRACIÓN ESTRATÉGICA", "RELACIÓN LABORAL INDIVIDUAL", "DESCRIPCIÓN DE CARGOS", "GESTIÓN DEL CAMBIO", "APLICACIONES DE LA ESTADÍSTICA"],
  "6º SEMESTRE": ["CONTROL DE GESTIÓN", "NEGOCIACIÓN Y LIDERAZGO", "RECLUTAMIENTO Y SELECCIÓN", "PROYECTOS DE INNOVACIÓN", "DIVERSIDAD E INCLUSIÓN", "BIG DATA E INTELIGENCIA DE NEGOCIOS", "ÉTICA PROFESIONAL"],
  "7º SEMESTRE": ["FORMULACIÓN, PREPARACIÓN Y EVALUACIÓN DE PROYECTOS", "COMPENSACIÓN INTEGRAL", "GESTIÓN DEL DESEMPEÑO", "CAPACITACIÓN Y DESARROLLO DE PERSONAS", "GESTIÓN DE LA CULTURA Y CLIMA", "GESTIÓN EN SISTEMAS ERP"],
  "8º SEMESTRE": ["SOSTENIBILIDAD", "TALLER APLICADO: TALLER ESTRATÉGICO DE GESTIÓN DE PERSONAS", "PRÁCTICA PROFESIONAL"]
};

window.onload = () => {
  const contenedor = document.getElementById("malla");
  let totalNotas = 0, sumaNotas = 0;
  Object.keys(mallaData).forEach((sem, idx) => {
    const div = document.createElement("div");
    div.className = "semestre";
    div.innerHTML = `<h2>${sem}</h2><div class='promedio-semestre' id='prom_${idx}'>PROMEDIO SEMESTRE: 0.00</div>`;
    let subtotal = 0, cuenta = 0;
    mallaData[sem].forEach((ramo, rIdx) => {
      const id = `ramo_${idx}_${rIdx}`;
      const nota = notas[id] || "-";
      const color = colores[ramo] || "gray";
      div.innerHTML += `<div class='ramo' style='background:${color}' id='${id}' onclick='agregarNota("${id}", "${ramo}")'>${ramo}<span class='nota' id='${id}_nota'>${nota}</span></div>`;
      if (nota !== "-") {
        subtotal += parseFloat(nota);
        cuenta++;
      }
    });
    contenedor.appendChild(div);
    const prom = cuenta ? (subtotal / cuenta).toFixed(2) : "0.00";
    document.getElementById(`prom_${idx}`).innerText = `PROMEDIO SEMESTRE: ${prom}`;
    totalNotas += subtotal;
    sumaNotas += cuenta;
  });
  document.getElementById("promedioBox").innerText = `PROMEDIO GENERAL: ${sumaNotas ? (totalNotas / sumaNotas).toFixed(2) : "0.00"}`;
};

function agregarNota(id, ramo) {
  const valor = prompt(`Ingresa la nota para "${ramo}" (1.0 a 7.0):`);
  if (!valor || isNaN(valor)) return;
  const num = parseFloat(valor);
  if (num < 1 || num > 7) return alert("Nota fuera de rango");
  document.getElementById(id + "_nota").innerText = num.toFixed(1);
  notas[id] = num;
  localStorage.setItem("notas", JSON.stringify(notas));
  location.reload();
}
