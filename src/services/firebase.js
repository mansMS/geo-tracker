import firebase from 'firebase/app';
import 'firebase/database';
export const firebaseConfig = {
  apiKey: 'AIzaSyBpGis32dVvmO5pq3UtBwgKmodyMqC0a4o',
  authDomain: 'geo-tracker-e262b.firebaseapp.com',
  databaseURL:
    'https://geo-tracker-e262b-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'geo-tracker-e262b',
  storageBucket: 'geo-tracker-e262b.appspot.com',
  messagingSenderId: '450893685848',
  appId: '1:450893685848:web:131a1051e4ba377f23162d',
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
