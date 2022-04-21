import React, {useState, useRef} from 'react';
import styled from 'styled-components';
import {Input, Image} from '../components/Index';
import { images } from "../utils/Image";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {validateEmail, removeWhitespace } from "../utils/Common";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({theme}) => theme.errorText};
`;

const Login = ({ navigation }) => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState('');
        const  passwordRef = useRef(); // 이메일에서 next 버튼 클릭 시(onSubmitEditing에 걸어둔 이벤트가 실행)에 password로 포커스 이동 시키기 위해 만든 ref

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1}}
            extraScrollHeight={20}
        >
            <Container>
                <Image url={images.logo} imageStyle={{ borderRadius: 8}}/>
                <Input label="Email" onChangeText={text => setEmail(text)} value={email} onSubmitEditing={() => passwordRef.current.focus()}
                       placeholder="이메일" returnKeyType="next"
                />
                {/* ref를 password input으로 지정.*/}
                <Input ref={passwordRef}
                       label="Password" onChangeText={text => setPassword(text)} value={password} onSubmitEditing={() =>{} }
                       placeholder="패스워드입력" returnKeyType="done" isPassword
                />
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default Login;
