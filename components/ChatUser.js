import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Avatar } from '@material-ui/core';
import { getUser } from '../helpers/firebaseOps';

function ChatItem({ email, id, rescepient }) {
  const router = useRouter();
  // const [rescepient, setRes] = useState('');

  // export async function getUser(email) {
  //   const q = query(collection(db, 'users'), where('email', '==', email));
  //   const querySnapshot = await getDocs(q);
  //   // console.log('data user>', querySnapshot.docs[0].data());
  //   return querySnapshot?.docs[0]?.data();
  // }

  const gotoChat = () => {
    console.log('USER FROM PROPS>', rescepient);
    console.log('User email >', email);
    // console.log('User recsip>', rescepient);
    console.log('Redirecting to:', id);
    router.push(`/chat/${id}`);
  };

  return (
    <Container onClick={gotoChat}>
      {/* {rescepient ? ( */}
      {/* <> */}
      <Avatar src={rescepient.photoUrl} />
      <h3>{rescepient.email}</h3>
      {/* </>
      ) : (
        <>
          <Avatar />
          <h3>{user}</h3>
        </>
      )} */}
    </Container>
  );
}

export default ChatItem;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  padding: 10px;
  > h3 {
    margin-left: 10px;
    word-break: normal;
  }
  :hover {
    background-color: whitesmoke;
  }
`;
