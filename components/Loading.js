import React from 'react';
import styled from 'styled-components';

function Loading() {
  return <Container>Loading...</Container>;
}

export default Loading;

const Container = styled.div`
  display: grid;
  place-items: center;
`;
