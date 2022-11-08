import { Avatar, IconButton } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useCollection, useDocumentData } from 'react-firebase-hooks/firestore';
import {
  addDoc,
  collection,
  doc,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AttachFile, Chat, Mic, Send } from '@mui/icons-material';
import { getUserEmail } from '../helpers/utils';
import { getUser } from '../helpers/firebaseOps';

function ChatScreen({ id, user, users }) {
  // console.log('Messages from serverside:', J);
  // const messages = JSON.stringify(mes);
  const chatBottom = useRef();
  const [currentUser] = useAuthState(auth);
  // const [user] = useDocumentData(doc(db, 'chats', `${id}`));

  const q = query(collection(db, `chats/${id}/messages`), orderBy('timestamp'));
  const [messageList] = useCollection(q);
  const [textInput, setTextInput] = useState('');
  // console.log('user', id);

  function prettyDate2(time) {
    var date = new Date(parseInt(time));
    var localeSpecificTime = date.toLocaleTimeString();
    return localeSpecificTime;
    // return localeSpecificTime.replace(/:\d+ /, ' ').toString();
  }

  const createMessage = (msg) => {
    const MessageType = msg.sender === currentUser.email ? Receiver : Sender;
    return (
      <MessageType id={msg.timestamp} key={msg.timestamp}>
        <MessageDiv>
          <Text>{msg.text}</Text>
          <MessageTime>
            {prettyDate2(msg.timestamp.toDate().getTime())}
          </MessageTime>
        </MessageDiv>
      </MessageType>
    );
  };

  const sendText = async () => {
    await addDoc(collection(db, `chats/${id}/messages`), {
      text: textInput.trim(),
      sender: currentUser.email,
      timestamp: Timestamp.now(),
    });
    setTextInput('');
  };

  useEffect(() => {
    setTimeout(
      chatBottom.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      }),
      1000
    );
  }, [messageList]);

  return (
    <Container>
      <Header>
        <Avatar src={getUser(getUserEmail(user, currentUser.email))} />
        <h3>{getUserEmail(user, currentUser.email)}</h3>
        {/* <ActionIcons> */}
        {/* <IconButton>
            <MoreVert />
          </IconButton> */}
        {/* </ActionIcons> */}
      </Header>

      {messageList?.docs.length == 0 ? (
        <MessageContainer>
          <NoMessage>
            <Chat style={{ color: 'green', marginRight: '5px' }} />
            <Text>Start Conversation</Text>
          </NoMessage>
        </MessageContainer>
      ) : (
        <MessageContainer>
          {messageList?.docs.map((msg) => {
            return createMessage(msg.data());
          })}
          <div ref={chatBottom}></div>
        </MessageContainer>
      )}

      <SendMessageDiv>
        <IconButton>
          <AttachFile />
        </IconButton>
        <TextContainer>
          <TextInput
            placeholder="Type a message"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        </TextContainer>
        <IconButton
          hidden
          disabled={!textInput}
          onClick={sendText}
          type="submit"
        >
          <Send />
        </IconButton>
        <IconButton>
          <Mic />
        </IconButton>
      </SendMessageDiv>
    </Container>
  );
}

export default ChatScreen;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MessageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const NoMessage = styled.div`
  flex: 1;
  display: flex;
  place-items: center;
  align-self: center;
  align-items: center;
`;

const TextContainer = styled.div`
  padding: 12px;
  flex-direction: row;
  display: flex;
  background-color: white;
  flex: 1;
  border-radius: 6px;
`;

const SendMessageDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  position: sticky;
  height: 40px;
  padding: 10px;
  background-color: whitesmoke;
  justify-content: space-between;
`;

const TextInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background-color: white;
  padding-left: 5px;
`;

const Text = styled.text`
  font-size: 15px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const MessageTime = styled.text`
  font-size: 10px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const MessageContainer = styled.div`
  flex: 1;
  background-color: #ece5dd;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  padding-left: 6%;
  padding-right: 6%;

  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
  /* align-self: flex-end; */
`;

const Header = styled.div`
  display: flex;
  border-bottom: 1px solid whitesmoke;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  height: 50px;
  background-color: white;
  position: sticky;
  > h3 {
    padding-left: 10px;
  }
`;

const Sender = styled.div`
  width: fit-content;
  padding: 10px;
  margin: 5px;
  align-self: flex-start;
  background-color: #77d7c8;
  margin-right: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 8px 8px 8px 0px;
`;

const Receiver = styled.div`
  width: fit-content;
  padding: 10px;
  margin: 5px;
  align-self: flex-end;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: #dcf8c6;
  margin-left: 20px;
  border-radius: 8px 8px 0px 8px;
`;

const ChatContainer = styled.div`
  background-color: blue;
`;

const ActionIcons = styled.div``;
