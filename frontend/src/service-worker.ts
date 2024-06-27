export default null
declare const self: ServiceWorkerGlobalScope

console.log('I am a service worker! 7')

self.addEventListener('push', (event) => {
  if (event.data) {
    const message = JSON.parse(event.data.text())
    event.waitUntil(
      self.registration.showNotification(message.title, {
        body: message.body,
      })
    );
  }
});
