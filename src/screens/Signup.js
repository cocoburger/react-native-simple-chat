import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import { Text } from 'react-native';
import {Image, Input, Button} from '../components/Index';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import  { validateEmail, removeWhitespace } from "../utils/Common";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme}) => theme.background};
  padding: 0 20px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;


const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    useEffect(() => {
        let _errorMessage = '';
        if (!name) {
            _errorMessage = '이름을 입력해주세요.';
        } else if (!validateEmail(email)) {
            _errorMessage = '이메일을 확인해보세요.'
        } else if (password.length < 6) {
            _errorMessage = '패스워드는 최소 6글자 이상 작성해야합니다.'
        } else if (password !== passwordConfirm ) {
            _errorMessage = '패스워드와 일치하지 않습니다.'
        }
        if( name === '' || email === '' || password === '') {
            setErrorMessage('');
        }else {
            setErrorMessage(_errorMessage);
        }
    }, [name, email, password, passwordConfirm])

    useEffect(() => {
        setDisabled(
            !(name && email && password && passwordConfirm && !errorMessage)
        );
    }, [name, email, password, passwordConfirm, errorMessage]);

    const _handleSignupButtonPress = () => {};
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flex : 1}}
            extraScrollHeight={20}
        >
            <Container>
                <Image rounded />
                <Input label="이름" onChangeText={text => setName(text)} value={name} onSubmitEditing={() => {
                    setName(name.trim());
                    emailRef.current.focus()
                }}
                       onBlur={() => setName(name.trim())}
                       placeholder='이름'
                       returnKeyType='next'
                />
                <Input label='이메일' onChangeText={text => setEmail(removeWhitespace(text))} value={email} onSubmitEditing={() =>
                    passwordRef.current.focus()}
                       placeholder="이메일"
                       returnKeyType='next'
                />
                <Input label='비밀번호' onChangeText={text => setPassword(removeWhitespace(text))} value={password} onSubmitEditing={ () =>
                passwordConfirm.current.focus()}
                       placeholder='비밀번호'
                       returnKeyType='next'
                       isPassword
                />
                <Input label='비밀번호 검증' onChangeText={text => setPasswordConfirm(removeWhitespace(text))} value={passwordConfirm} onSubmitEditing={_handleSignupButtonPress}
                       placeholder='비밀번호 확인'
                       returnKeyType='done'
                       isPassword
                />
                <ErrorText>{errorMessage}</ErrorText>
                <Button
                    title='Signup'
                    onPress={_handleSignupButtonPress}
                    disabled={disabled}
                />
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default Signup;
