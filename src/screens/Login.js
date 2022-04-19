import React from 'react';
import styled from 'styled-components';
import {Button} from 'react-native';
import Image from '../components/Image';
import { images } from "../utils/Image";ㄱ

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const Login = ({ navigation }) => {
    return (
        <Container>
            <Image url={images.logo}/>
            <Button title="Signup" onPress={() => navigation.navigate('Signup')} />
        </Container>
    );
};

export default Login;
