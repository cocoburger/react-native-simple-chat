import React, {useContext} from "react";
import {NavigationContainer} from "@react-navigation/native";
import AuthStack from "./AuthStack";
import Spinner from '../components/Spinner';
import {ProgressContext, UserContext} from "../contexts";
import MainStack from '../navigations/MainStack';

const Navigation = () => {

    const {inProgress} = useContext(ProgressContext);
    const {user} = useContext(UserContext);

    // MainStack과 AuthStack는 각각 navigation 객체를 만들어 사용하고 있다.
    // 렌더링되는 네비게이션 전체를 변경하면, 스와이프 뒤로가기 버튼을 클랙해도 이전 내비게이션으로 돌아가지 않거나
    // 뒤로가기 버튼이 없다.
    return (
        <NavigationContainer>
            {user?.uid && user?.email ? <MainStack /> : <AuthStack />}
            {inProgress && <Spinner />}
        </NavigationContainer>
    )
}

export default Navigation;

