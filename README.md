# API Posicionamiento Sonda

## Configuración inicial

### Instalar dependencias

Ejecutar `npm install`

### Correr proyecto

Ejecutar `npm run dev`

# API Posicionamiento Sonda

## Configuración inicial

### Instalar dependencias

Ejecutar:

```sh
npm install
```

### Correr proyecto

Ejecutar:

```sh
npm run dev
```

La aplicación debe estar en la ruta:

```sh
C:\Servicios\api_posicionamiento_sonda\
```

## Instalación como servicio en Windows

El archivo `service.js` crea el servicio de Windows.

## Desinstalar servicio en Windows

Para eliminar el servicio, comente la línea final en `service.js`:

```js
// svc.install();
```

Luego, ejecuta:

```sh
npm run dev
```

Si el servicio ya estaba instalado, este comando lo desinstalará antes de reinstalarlo.

## Ver el servicio en Windows

1. Presiona `Win + R` y escribe `services.msc`, luego presiona `Enter`.
2. Busca el servicio con el nombre **"API Sonda - Pos version 1.4.1 (Español)"**.
3. Desde ahí, puedes **iniciarlo, detenerlo o configurarlo** manualmente.
