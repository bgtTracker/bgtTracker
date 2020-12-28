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
	// const db = await getDb();
	// const tx = this.db.transaction('history', 'readwrite');
	// const store = tx.objectStore('history');

	// const data = event.data.json().data;
	// data.id = parseInt(data.id);
	// store.put(data);

	// tx.oncomplete = async e => {
	// 	const allClients = await clients.matchAll({ includeUncontrolled: true });
	// 	for (const client of allClients) {
	// 		client.postMessage('newData');
	// 	}
	// };
	console.log("push event");
});

async function getDb() {
	if (this.db) {
		return Promise.resolve(this.db);
	}

	return new Promise(resolve => {
		const openRequest = indexedDB.open("Start", 1);

		openRequest.onupgradeneeded = event => {
			const db = event.target.result;
			db.createObjectStore('history', { keyPath: 'id' });
		};

		openRequest.onsuccess = event => {
			this.db = event.target.result;
			resolve(this.db);
		}
	});
}


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
  