console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: "Notified by WeCare!",
    icon: "http://localhost:8080/Asset.svg",
    badge: "http://localhost:8080/Asset.svg",
  });
});
