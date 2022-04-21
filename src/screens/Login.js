import React, {useState} from 'react';
import styled from 'styled-components';
import {Input, Image} from '../components/Index';
import { images } from "../utils/Image";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
`;

const Login = ({ navigation }) => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState('');
    return (
        <Container>
            <Image url={images.logo} imageStyle={{ borderRadius: 8}}/>
            <Input label="Email" onChangeText={text => setEmail(text)} value={email} onSubmitEditing={() => {}}
                   placeholder="이메일" returnKeyType="next"
            />
            <Input label="Password" onChangeText={text => setPassword(text)} value={password} onSubmitEditing={() => {}}
                   placeholder="패스워드입력" returnKeyType="done" isPassword
            />
        </Container>
    );
};

export default Login;
