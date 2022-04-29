import React, {useContext, useState} from 'react';
import styled from 'styled-components/native';
import { Button, Image, Input } from '../components/Index';
import {logout, getCurrentUser, updateUserPhoto} from "../utils/firebase";
import {ProgressContext, UserContext} from "../contexts";
import {Alert} from 'react-native';
import {ThemeContext} from "styled-components";


const Container = styled.View`
  flex:1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const Profile = () => {
    const {dispatch} = useContext(UserContext);
    const {spinner} = useContext(ProgressContext);
    const theme = useContext(ThemeContext);
    const user = getCurrentUser();
    const [photoUrl, setPhotoUrl] = useState(user.photoURL);

    // 로그아웃 버튼을 누르면 firebase에 만든 logout 함수를 호출한다.
    // 에러가 발생해도 user의 값을 빈값으로 변경한다. user의 값이 빈값이므로 AuthStack으로 변경한다.
    const _handleLogoutButtonPress = async () => {
        try {
            spinner.start();
            await logout();
        } catch (e) {
            console.log("[프로필] 로그아웃 : " , e.message);
        }finally {
            dispatch({});
            spinner.stop();
        }
    }

    const _handlePhotoChange = async url => {
        try {
            spinner.start();
            const updateUser = await updateUserPhoto(url);
            setPhotoUrl(updateUser.photoUrl)
        } catch (e) {
            Alert.alert("PHOTO Error" , e.message);
        }finally {
            spinner.stop();
        }
    };

    return (
        <Container>
            <Image
                url={photoUrl}
                onChangeImage={_handlePhotoChange}
                showButton
                rounded
            />
            <Input label="Name" value={user.name} disabled />
            <Input label="Email" value={user.email} disabled />
            <Button
                title="logout"
                onPress={_handleLogoutButtonPress}
                containerStyle={{ marginTop:30, backgroundColor:theme.buttonLogout}}
            />
        </Container>
    );
};

export default Profile;
