import {
  collection,
  getDoc,
  getDocs,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { userAgent } from 'next/server';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';

export function getCollectionRef(collectionName) {
  let ref = collection(db, collectionName);
  return ref;
}

export async function getUser(email) {
  const q = query(collection(db, 'users'), where('email', '==', email));
  const querySnapshot = await getDocs(q);
  const user = querySnapshot.docs.filter(
    (doc) => doc.data().email === email
  )[0];
  // console.log('GETUSER>', user.data());
  if (user) return user.data(); // const user = querySnapshot.docs.filter(
  //   (doc) => doc.data().email === email
  // )[0];
  // if (!user) return user.data();
}

export async function getAllUsers() {
  const q = query(collection(db, 'users'));
  const querySnapshot = await getDocs(q);
  const docs = querySnapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((data) => ({
      ...data,
      lastSeen: data.lastSeen.toDate().getTime(),
    }));
  // console.log('Dcocs', docs);
  return docs;
}

export function signOutUser() {
  auth.signOut();
}
