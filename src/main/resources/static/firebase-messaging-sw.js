importScripts('https://www.gstatic.com/firebasejs/7.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.10.0/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCoy2KVfE3CotDEwJk5X5xbkA0HMa0O5L0",
    authDomain: "bgttracket.firebaseapp.com",
    projectId: "bgttracket",
    storageBucket: "bgttracket.appspot.com",
    messagingSenderId: "487395361382",
    appId: "1:487395361382:web:9b492dcbfa3b77339923a7"
});

const messaging = firebase.messaging();

self.addEventListener('push', async event => {
	console.log("push event");
	console.log(event);
	// const allClients = await clients.matchAll({ includeUncontrolled: true });
	// for (const client of allClients) {
	// 	client.postMessage({
	// 		msg: "almost no money to sepend",
	// 		level: 'warning',
	// 		title: 'Be carefull',
	// 		action: 'showNotification'
	// 	});
	// }
	
});

messaging.setBackgroundMessageHandler(function(payload) {
  const notificationTitle = 'Background Title (client)';
  const notificationOptions = {
    body: 'Background Body (client)',
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});

self.addEventListener('notificationclick', event => {
	console.log(event)
	return event;
  });
  