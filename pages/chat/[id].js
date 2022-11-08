import React from 'react';
import styled from 'styled-components';
import ChatScreen from '../../components/ChatScreen';
import Sidebar from '../../components/Sidebar';
import { useRouter } from 'next/router';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { useCollection, useDocumentData } from 'react-firebase-hooks/firestore';
import { getAllUsers } from '../../helpers/firebaseOps';

function Chat({ users, user }) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Container>
      <Sidebar allUsers={users} />
      <ChatContainer>
        <ChatScreen id={id} user={user} />
      </ChatContainer>
    </Container>
  );
}

// export async function getStaticProps(context) {
//   const users = await getAllUsers();
//   return {
//     props: {
//       users,
//     },
//   };
// }

export async function getServerSideProps(context) {
  const docRef = doc(db, 'chats', `${context.query.id}`);
  const docSnap = await getDoc(docRef);
  const users = await getAllUsers();

  const user = docSnap.exists() ? docSnap.data().users : {};
  // if (docSnap.exists()) {
  //   console.log('Document data:', docSnap.data());
  // } else {
  //   // doc.data() will be undefined in this case
  //   console.log('No such document!');
  // }
  // const q = query(
  //   collection(db, `chats/${context.query.id}/messages`),
  //   orderBy('timestamp')
  // );
  // const querySnapshot = await getDocs(q);
  // const messageList = querySnapshot.docs
  //   .map((doc) => ({
  //     id: doc.id,
  //     ...doc.data(),
  //   }))
  //   .map((msgs) => ({
  //     ...msgs,
  //     timestamp: msgs.timestamp.toDate().getTime(),
  //   }));
  // console.log('Mess on server: ', messages);

  return {
    props: {
      user,
      users,
    },
  };
}

export default Chat;

const Container = styled.div`
  display: flex;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ChatContainer = styled.div`
  flex: 1;
  height: 100vh;
  background-color: whitesmoke;
  padding: none;
`;
