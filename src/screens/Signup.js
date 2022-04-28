import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {Image, Input, Button} from '../components/Index';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import  { validateEmail, removeWhitespace } from "../utils/Common";
import {images} from "../utils/Image";
import {Alert} from 'react-native';
import { signup } from "../utils/firebase";

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
    const [photoUrl, setPhotoUrl] = useState(images.photo);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const didMountRef = useRef();
    // 처음 마운트 시에 오류메시지가 뜨는 버그를 해결하기 위해 useRef를 사용하여 해결한다.
    // 처음 Signup 컴포넌트가 렌더링 되면 useEffect에 함수 (에러메세지 출력)이 로드되면서 해당 버그가 발생하는데.
    // useRef로 만든 didMoundRef에 어떤 값도 대입하지 않으므로(null값이므로 if문을 통과하지 못하고 else로 빠진다.), else인 didMountRef.current = true로 준다.
    // 회원가입에 필요로 하는 값들이 변경되면 useEffect가 작동하면서
    // 에러메세지 출력을 해주는데 이전에 didMountRef.current = true로 주었기에 if문을 만족하므로 에러메세지가 출력된다.
    useEffect(() => {
        if (didMountRef.current) {
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
        }else {
            didMountRef.current = true;
        }
    }, [name, email, password, passwordConfirm])

    useEffect(() => {
        setDisabled(
            !(name && email && password && passwordConfirm && !errorMessage)
        );
    }, [name, email, password, passwordConfirm, errorMessage]);

    const _handleSignupButtonPress = async () => {
        try{
            const user = await signup({email,password, name, photoUrl});
            console.log(user);
            Alert.alert('회원가입 성공', user.email);
        } catch (e) {
            Alert.alert('회원가입 실패', e.message());
        }
    };
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flex : 1}}
            extraScrollHeight={20}
        >
            <Container>
                <Image
                    rounded
                    url={photoUrl}
                    showButton
                    onChangeImage={url => setPhotoUrl(url)}
                />
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
