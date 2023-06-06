//import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
//import { getMessaging, onBackgroundMessage } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-sw.js";

importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');


const firebaseConfig = {
    apiKey: "AIzaSyAvr06K6PBVb1sNTbUjVtQaKmatx62nrxo",
    authDomain: "testing-pwa-notifications.firebaseapp.com",
    projectId: "testing-pwa-notifications",
    storageBucket: "testing-pwa-notifications.appspot.com",
    messagingSenderId: "89315464248",
    appId: "1:89315464248:web:2cff8a5dc05198265942cd"
};

//const app = initializeApp(firebaseConfig);
//const messaging = getMessaging(app);

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.onBackgroundMessage(messaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon,
    }
    self.registration.showNotification(payload.notification.title, notificationOptions);
});