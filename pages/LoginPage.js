import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

function LoginPage() {
  const signinUser = () => {
    console.log('Signing in');
    signInWithPopup(auth, provider);
  };

  return (
    <center>
      <Container>
        <Head>
          <title>Login</title>
        </Head>
        <LoginContainer>
          <Logo src="https://freepngimg.com/thumb/whatsapp/4-2-whatsapp-transparent-thumb.png"></Logo>
          <Button onClick={signinUser} variant="outlined">
            Login with Google
          </Button>
        </LoginContainer>
      </Container>
    </center>
  );
}

export default LoginPage;

const Container = styled.div`
  display: grid;
  place-items: center;
  background-color: whitesmoke;
  height: 100vh;
`;

const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 20px;
`;

const LoginContainer = styled.div`
  padding: 100px;
  flex-direction: column;
  display: flex;
  background-color: white;
  box-shadow: 0px 4px 14px -3px;
  border-radius: 6px;
`;
