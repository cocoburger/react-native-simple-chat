import React, {useState, useRef, useEffect, useContext} from 'react';
import styled from 'styled-components';
import {Input, Image, Button} from '../components/Index';
import { images } from "../utils/Image";
import { Alert} from 'react-native';
import {login} from "../utils/firebase";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {validateEmail, removeWhitespace } from "../utils/Common";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import { ProgressContext} from "../contexts";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  padding-top: ${({ insets: { top }}) => top}px;
  padding-bottom: ${({insets : { bottom } }) => bottom}px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  line-height: 20px;
  color: ${({theme}) => theme.errorText};
`;

const Login = ({ navigation }) => {
    const { spinner } = useContext(ProgressContext);

    const insets = useSafeAreaInsets();
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState('');
        const passwordRef = useRef(); // 이메일에서 next 버튼 클릭 시(onSubmitEditing에 걸어둔 이벤트가 실행)에 password로 포커스 이동 시키기 위해 만든 ref

        const [errorMessage, setErrorMessage] = useState('');
        const [disabled, setDisabled] = useState(true);
        //email, password, errorMessage 이메일과 패스워드가 입력되었이야하고, 에러메세지가 없을 때 활성화되어야한다.
        // 자바스크립트는 공백일 경우 false 값이기때문이다.
        useEffect(() => {
            setDisabled(!(email && password && !errorMessage));
        }, [email, password, errorMessage]);

        const _handleEmailChange = email => {
            const changedEmail = removeWhitespace(email);
            setEmail(changedEmail);
            if(email === '') {
                setErrorMessage('');
            }else {
                setErrorMessage(
                    validateEmail(changedEmail) ? '' : '이메일 확인 해보세요~'
                );
            }

        };
        const _handlePasswordChange = password => {
            setPassword(removeWhitespace(password));
        };

        const _handleLoginButtonPress = async () => {
            try {
                spinner.start();
                const user = await login({email, password});
                Alert.alert('Login 성공', user.email);
            } catch (e) {
                Alert.alert('LOGIN Error', e.message());
            }finally {
                spinner.stop();
            }
        };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flex: 1}}
            extraScrollHeight={20}
        >
            <Container insets={insets}>
                <Image url={images.logo} imageStyle={{ borderRadius: 8}}/>
                <Input label="Email" onChangeText={_handleEmailChange} value={email} onSubmitEditing={() => passwordRef.current.focus()}
                       placeholder="이메일" returnKeyType="next"
                />
                <ErrorText>{errorMessage}</ErrorText>

                {/* ref를 password input으로 지정.*/}
                <Input ref={passwordRef}
                       label="Password" onChangeText={_handlePasswordChange} value={password} onSubmitEditing={_handleLoginButtonPress }
                       placeholder="패스워드입력" returnKeyType="done" isPassword
                />
                <Button title="로그인" onPress={_handleLoginButtonPress} disabled={disabled} />
                <Button title="이메일로 가입하기" onPress={() => navigation.navigate('Signup')}
                        isFilled={false}/>
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default Login;
