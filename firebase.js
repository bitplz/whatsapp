// import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: 'AIzaSyBFTVmfJ_0ddsz9GfvM5k5-SI9HlAyfJxs',
//   authDomain: 'whatsapp-8ca01.firebaseapp.com',
//   projectId: 'whatsapp-8ca01',
//   storageBucket: 'whatsapp-8ca01.appspot.com',
//   messagingSenderId: '824018440035',
//   appId: '1:824018440035:web:de8b32fdcf2978c8910d56',
//   measurementId: 'G-5SPWTTVPLH',
// };

const firebaseConfig = {
  apiKey: 'AIzaSyCZ4kUMhijnI3iywLokdGefDqjJ1BELIvk',

  authDomain: 'whatsapp-2-ee3d4.firebaseapp.com',

  projectId: 'whatsapp-2-ee3d4',

  storageBucket: 'whatsapp-2-ee3d4.appspot.com',

  messagingSenderId: '256433869611',

  appId: '1:256433869611:web:f2957d3f0d61d46a632b6e',

  measurementId: 'G-GBG5ZD3Q68',
};

const app = initializeApp(firebaseConfig);
// : firebase.app();
const db = getFirestore();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
