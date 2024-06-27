export async function registerServiceWorker(scriptURL: string) {
  const registration = await navigator.serviceWorker.register(scriptURL, {})
  console.log('Service worker has been registered');
  console.info(registration)
}

export async function unregisterServiceWorker() {
  const registrations = await navigator.serviceWorker.getRegistrations()
  for (const registration of registrations) {
    await registration.unregister();
    console.log('Service worker has been unregistered')
  }
}

export async function getPushPermission() {
  const permission = await Notification.requestPermission()
  if (permission === 'granted') {
    console.log('Notification permission granted.');
  } else {
    console.log('Unable to get permission to notify.');
  }
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')
  ;
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

const NOTIFICATION_KEY = '{{ NOTIFICATION_KEY }}';

export async function subscribeNotifications() {
  const registration = await navigator.serviceWorker.ready
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(NOTIFICATION_KEY)
  })
  console.log('Subscribed for push:', subscription.endpoint);
}
