import { Avatar, Button, IconButton } from '@material-ui/core';
import {
  Chat,
  FilterList,
  Logout,
  MoreVert,
  Search,
} from '@mui/icons-material';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import * as EmailValidator from 'email-validator';
import ChatItem from './ChatUser';
import { getUser, signOutUser } from '../helpers/firebaseOps';
import { getUserEmail } from '../helpers/utils';

function Sidebar({ allUsers }) {
  const [user] = useAuthState(auth);
  // const [chats, setChats] = useState([]);

  async function startNewChat(resEmail) {
    await addDoc(collection(db, 'chats'), {
      users: [user.email, resEmail],
    });
  }

  const promptUser = () => {
    const resEmail = prompt('Enter email adress of recepient to start chat');
    console.log(resEmail);
    if (!resEmail) return null;
    if (EmailValidator.validate(resEmail) && resEmail !== user.email) {
      startNewChat(resEmail);
      // getUser(resEmail);
    }
  };

  // const q = query(
  //   collection(db, 'chats'),
  //   where('users', 'array-contains', user.email)
  // );

  const [snapshots, loading, error] = useCollection(collection(db, 'chats'));

  const chats = snapshots?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  const getUserFromList = (email) => {
    // console.log('get user from list>', allUsers[0].email);
    const rescepient = allUsers.filter((user) => user.email === email)[0];
    console.log(`user: ${email}`, rescepient);
    if (rescepient) return rescepient;
    else return { email: email };
    return rescepient;
  };

  return (
    <Container>
      <HeaderContainer>
        <Header>
          <UserDiv>
            <Avatar src={user.photoURL} />
            <h3 style={{ paddingLeft: '10px' }}>{user.displayName}</h3>
          </UserDiv>
          <ActionIcons>
            <IconButton>
              <Chat />
            </IconButton>
            <IconButton onClick={signOutUser}>
              <Logout titleAccess="Logout" />
            </IconButton>
          </ActionIcons>
        </Header>
        <NewChatButton onClick={promptUser}>Start a new chat</NewChatButton>
        <SearchDiv>
          <SearchContainer>
            <Search style={{ color: 'gray' }} />
            <SearchInput placeholder="Search chat"></SearchInput>
          </SearchContainer>
          <IconButton>
            <FilterList />
          </IconButton>
        </SearchDiv>
      </HeaderContainer>
      {/* Chat list */}
      <ChatContainer>
        {chats
          ?.filter((chat) => chat.users.includes(user.email))
          .map((chat) => {
            console.log('chat data', chat);
            return (
              <ChatItem
                key={chat.id}
                id={chat.id}
                email={getUserEmail(chat.users, user.email)}
                rescepient={getUserFromList(
                  getUserEmail(chat.users, user.email)
                )}
              />
            );
          })}
      </ChatContainer>
    </Container>
  );
}

export default Sidebar;

const UserDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Container = styled.div`
  flex-direction: column;
  height: 100vh;
  border-right: 1px solid whitesmoke;
  max-width: 400px;
  min-width: 280px;
  display: flex;
  flex: 0.45;
`;

const HeaderContainer = styled.div`
  position: sticky;
  /* background-color: red; */
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: scroll;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  border-bottom: 1px solid whitesmoke;
  flex-direction: row;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
  padding: 5px;
  height: 50px;
  /* height: 50px; */
`;

const NewChatButton = styled(Button)`
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background-color: whitesmoke;
  padding-left: 20px;
`;

const SearchDiv = styled.div`
  padding: 5px;
  flex-direction: row;
  display: flex;
  background-color: white;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const SearchContainer = styled.div`
  padding: 8px;
  flex-direction: row;
  display: flex;
  background-color: whitesmoke;
  flex: 1;
  border-radius: 6px;
`;

const ActionIcons = styled.div`
  flex-direction: row;
`;
