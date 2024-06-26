export function registerServiceWorker(scriptURL: string) {
  navigator.serviceWorker.register(scriptURL, {}).then((registration) => {
    console.log('Service worker has been registered');
    console.info(registration)
  }).catch((error) => {
    console.log('Service worker registration failed:', error);
  })
}

export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister().then(() => {
        console.log('Service worker has been unregistered')
      });
    }).catch((error) => {
      console.log('Unregistering failed')
    });
  }
}