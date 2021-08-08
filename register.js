if ("serviceWorker" in navigator) {
  console.log("Existe");
  navigator.serviceWorker.register("./sw.js");
}
