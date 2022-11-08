import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  collection,
  getDocs,
  Timestamp,
  setDoc,
  addDoc,
  doc,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import LoginPage from './LoginPage';
import Loading from '../components/Loading';

function MyApp({ Component, pageProps }) {
  // console.log(auth);
  const [user, loading] = useAuthState(auth);

  async function getData() {
    const snaps = await getDocs(collection(db, 'users/123/new'));
    console.log('data=>', snaps.docs.length);
  }

  async function setUser() {
    await setDoc(
      doc(db, 'users', user.uid),
      {
        displayName: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        lastSeen: Timestamp.now(),
      },
      { merge: true }
    );
  }

  useEffect(() => {
    if (user) {
      setUser();
      console.log('user updated!');
    }
  }, [user]);

  if (loading) return <Loading />;

  if (!user) return <LoginPage />;

  return <Component {...pageProps} />;
}

export default MyApp;

//https://freepngimg.com/thumb/whatsapp/4-2-whatsapp-transparent-thumb.png
