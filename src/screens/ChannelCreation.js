import React from "react";
import styled from "styled-components";
import {Text, Button } from 'react-native';


const Container = styled.View`
  flex:1;
  background-color: ${({ theme }) => theme.background};
`;

const ChannelCreation = ({ navigation }) => {
    return (
      <Container>
          <Text style={{ fontSize: 24}}>채널 생성</Text>
          <Button title="채널" onPress={() => navigation.navigate('Channel')} />
      </Container>
    );
};

export default ChannelCreation;
