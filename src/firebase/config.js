import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC79dcMgppqvK4CrUvvWdLK53qR0esXC-g',
  authDomain: 'noreply@maquillage-228c5.firebaseapp.com',
  databaseURL: 'https://maquillage-228c5-default-rtdb.firebaseio.com/',
  projectId: 'maquillage-228c5',
  storageBucket: 'maquillage-228c5.appspot.com',
  messagingSenderId: '277560016973',
  appId: '1:277560016973:ios:2edf5f30db88934ea4dc04',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };