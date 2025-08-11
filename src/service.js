import Service from "node-windows";

const svc = new Service.Service({
  name: `API Sonda - Pos version 1.6.0 (Español)`,
  description: "API Sonda se ejecuta cada 31 segundos - 13/09/2023 13:01",
  script: "C:\\Servicios\\api_posicionamiento_sonda\\src\\index.js",
});

// Al instalarse el servicio se inicia
svc.on("install", () => {
  svc.start();
});

// Se muestra mensaje al desinstalar el servicio
svc.on("uninstall", function () {
  console.log("Servicio desinstalado");
});

console.log(svc.exists);

// Si el servicio ya existe se desinstala
if (svc.exists) {
  svc.uninstall();
}

// Instala el servicio
svc.install();
