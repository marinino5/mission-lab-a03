const simulateBtn = document.getElementById("simulateBtn");
const defenseBtn = document.getElementById("defenseBtn");
const resetBtn = document.getElementById("resetBtn");

const dependencyNode = document.getElementById("dependencyNode");
const buildNode = document.getElementById("buildNode");
const productionNode = document.getElementById("productionNode");

const vulnerableAlert = document.getElementById("vulnerableAlert");
const successAlert = document.getElementById("successAlert");
const logOutput = document.getElementById("logOutput");
const decisionResult = document.getElementById("decisionResult");

const controls = document.querySelectorAll(".control");
const decisionButtons = document.querySelectorAll(".decision-buttons button");

let logLines = ["[00:00] Sistema listo. Inicia la simulación A03:2025."];

function addLog(message) {
  const time = new Date().toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  logLines.push(`[${time}] ${message}`);
  logOutput.textContent = logLines.join("\n");
}

function simulateAttack() {
  dependencyNode.classList.add("compromised");
  buildNode.classList.add("compromised");
  productionNode.classList.add("compromised");
  vulnerableAlert.classList.remove("hidden");

  addLog("Actualización recibida desde dependencia externa.");
  addLog("Alerta: paquete sin verificación de integridad.");
  addLog("Riesgo: el build confió en una dependencia alterada.");
  addLog("Impacto simulado: la amenaza llegó a producción.");

  decisionResult.textContent =
    "Resultado: la cadena vulnerable permitió que la dependencia comprometida llegara hasta producción.";
  decisionResult.style.borderColor = "rgba(255, 59, 79, 0.7)";
}

function runDefense() {
  controls.forEach((control, index) => {
    setTimeout(() => {
      control.classList.add("active");
    }, index * 140);
  });

  successAlert.classList.remove("hidden");

  addLog("SBOM actualizado y dependencias inventariadas.");
  addLog("Escaneo SCA ejecutado: dependencia sospechosa detectada.");
  addLog("Verificación de firma fallida: paquete bloqueado.");
  addLog("Build detenido antes del despliegue a producción.");

  decisionResult.textContent =
    "Resultado: los controles detectaron y bloquearon la amenaza antes de producción.";
  decisionResult.style.borderColor = "rgba(52, 245, 167, 0.7)";
}

function handleDecision(choice) {
  const responses = {
    sbom: "Buena decisión: el SBOM permite saber qué componentes usa la app y detectar cambios sospechosos.",
    scan: "Excelente: el escaneo SCA ayuda a identificar dependencias vulnerables o alteradas.",
    verify: "Correcto: verificar firmas reduce el riesgo de instalar paquetes modificados.",
    block: "Acción crítica: bloquear el build evita que el riesgo avance a producción.",
    deploy: "Riesgo alto: desplegar directo sin controles permite que una dependencia comprometida llegue a usuarios."
  };

  decisionResult.textContent = responses[choice];

  if (choice === "deploy") {
    decisionResult.style.borderColor = "rgba(255, 59, 79, 0.7)";
    addLog("Decisión riesgosa: despliegue directo sin validación.");
  } else {
    decisionResult.style.borderColor = "rgba(52, 245, 167, 0.7)";
    addLog(`Decisión segura aplicada: ${responses[choice]}`);
  }
}

function resetMission() {
  [dependencyNode, buildNode, productionNode].forEach((node) =>
    node.classList.remove("compromised")
  );

  controls.forEach((control) => control.classList.remove("active"));
  vulnerableAlert.classList.add("hidden");
  successAlert.classList.add("hidden");

  logLines = ["[00:00] Sistema listo. Inicia la simulación A03:2025."];
  logOutput.textContent = logLines.join("\n");

  decisionResult.textContent = "Esperando decisión del equipo de agentes...";
  decisionResult.style.borderColor = "rgba(140, 77, 255, 0.42)";
}

simulateBtn.addEventListener("click", simulateAttack);
defenseBtn.addEventListener("click", runDefense);
resetBtn.addEventListener("click", resetMission);

decisionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    handleDecision(button.dataset.choice);
  });

  if (button.dataset.choice === "deploy") {
    button.classList.add("bad");
  }
});
