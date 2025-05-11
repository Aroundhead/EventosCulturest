const asistentes = [];

function registrarAsistente() {
  const expInput = document.getElementById("expediente");
  const expediente = expInput.value.trim();

  if (!/^\d{9}$/.test(expediente)) {
    alert("El expediente debe contener exactamente 9 dígitos numéricos.");
    return;
  }

  const correo = `a${expediente}@unison.mx`;
  asistentes.push({ expediente, correo });

  const li = document.createElement("li");
  li.textContent = `Expediente: ${expediente}, Correo: ${correo}`;
  document.getElementById("lista-asistentes").appendChild(li);

  expInput.value = "";
}

function exportar(tipo) {
  if (asistentes.length === 0) {
    alert("No hay asistentes registrados.");
    return;
  }

  let contenido = "";
  let filename = "";

  switch (tipo) {
    case "txt":
      contenido = asistentes.map(a => `Expediente: ${a.expediente}, Correo: ${a.correo}`).join("\n");
      filename = "registro_asistentes.txt";
      break;
    case "csv":
      contenido = asistentes.map(a => `${a.expediente},${a.correo}`).join("\n");
      filename = "participantes.csv";
      break;
    case "json":
      contenido = JSON.stringify(asistentes, null, 2);
      filename = "participantes.json";
      break;
    case "sql":
      contenido = "CREATE DATABASE IF NOT EXISTS evento;\nUSE evento;\nCREATE TABLE IF NOT EXISTS asistentes (expediente VARCHAR(100), correo VARCHAR(255));\n";
      contenido += asistentes.map(a => `INSERT INTO asistentes (expediente, correo) VALUES ('${a.expediente}', '${a.correo}');`).join("\n");
      filename = "participantes.sql";
      break;
    case "xml":
      contenido = `<?xml version="1.0" encoding="UTF-8"?>\n<asistentes>\n`;
      contenido += asistentes.map(a => `  <asistente>\n    <expediente>${a.expediente}</expediente>\n    <correo>${a.correo}</correo>\n  </asistente>`).join("\n");
      contenido += `\n</asistentes>`;
      filename = "participantes.xml";
      break;
  }

  const blob = new Blob([contenido], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
}
