console.log("registrado");
const CACHE_ELEMENTS = [
  "./",
  "https://unpkg.com/react@17/umd/react.production.min.js",
  "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
  "https://unpkg.com/@babel/standalone/babel.min.js",
  "/css/styles.css",
  "/components/Contador.js",
];

const CACHE_NAME = "v3_cache_contador_react";

self.addEventListener("install", (e) => {
  //waitUntil espera a que se ejecute el evento
  e.waitUntil(
    //el objeto caches permite utilizar la memoria cache de los dispositivos
    //open es para enviar un nombre, retorna una promesa
    caches.open(CACHE_NAME).then((cache) => {
      //el metodo addAll añade todas las rutas que quieras
      cache
        .addAll(CACHE_ELEMENTS)
        .then(() => {
          //Se ejecutara si todo sale bien, saltara la espera
          self.skipWaiting();
        })
        .catch(console.log);
    })
  );
});

self.addEventListener("activate", (e) => {
  const cacheWhiteList = [CACHE_NAME];

  //waitUntil espera a que se ejecute el evento
  e.waitUntil(
    //da todas las claves si hay mas de un cache instalado
    caches
      .keys()
      .then((cacheNames) => {
        console.log(cacheNames);
        return Promise.all(
          cacheNames.map((cacheName) => {
            return (
              cacheWhiteList.indexOf(cacheName) === -1 &&
              caches.delete(cacheName)
            );
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        return res;
      }

      return fetch(e.request);
    })
  );
});
