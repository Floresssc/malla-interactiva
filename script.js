const notas = {};

function aprobarRamo(id) {
  const ramo = document.querySelector(`[data-id="${id}"]`);
  if (ramo.classList.contains('aprobado')) return;

  const nota = prompt(`Ingrese la nota para "${ramo.innerText}":`, "5.0");
  if (nota && !isNaN(nota)) {
    ramo.classList.add('aprobado');
    notas[id] = parseFloat(nota);

    // Desbloquear dependientes
    document.querySelectorAll(`[data-prereq="${id}"]`).forEach(dep => {
      dep.classList.remove('bloqueado');
      dep.style.opacity = 1;
      dep.style.pointerEvents = 'auto';
    });

    actualizarPromedio();
  }
}

function actualizarPromedio() {
  const valores = Object.values(notas);
  const suma = valores.reduce((acc, val) => acc + val, 0);
  const promedio = valores.length ? (suma / valores.length).toFixed(2) : "0.00";
  document.getElementById('promedio').innerText = `Promedio General: ${promedio}`;
}
