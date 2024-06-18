self.addEventListener('install', (event) => {
  console.log('Installed');
});

self.addEventListener('activate', (event) => {
  console.log('Activated');
});

self.addEventListener('fetch', (event) => {
  // console.log("Fetch request");
});

self.addEventListener('notificationclick', async (event) => {
  const { notification } = event;
  notification.close();
  const type = notification.data?.type;
  const { data } = notification;
  console.log('event', { event, type, data });
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clientsArr) => {
      if (clientsArr[0]) {
        clientsArr[0].focus();
        clientsArr[0].postMessage({
          ...data,
          type,
        });
      }
    })
  );
});
