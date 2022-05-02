import React from "react";
import styled from "styled-components";
import {Text, Button} from "react-native";

const Container = styled.View`
  flex:1;
  background-color: ${({ theme }) => theme.background};
`;
//ScrollView 컴포넌트는 렌더링해야 하는 모든 데이터를 한번에 렌더링하므로 렌더링하는 데이터 양이 많을 수록 느려지고 메모리 사용량이 증가한다.
//FlatList는 화면에 적절한 양의 데이터만 렌더링하고 스크롤의 이동에 맞춰 필요한 부분을  추가적으로 렌더링하는 특징이 있다.
//데이터의 길이가 가변적이고 데이터 양을 예측할 수 없는 상황에서 사용한다.
//3개의 속성을 지정해야 한다. 렌더링할 항목의 데이터를 배열로 전달, 전달된 배열의 항목을 이용해 항목을 렌더링할 함수를 작성
//마지막으로 각 항목에 키를 추가하기 위해 고유한 값을 반환하는 함수를 전달.
const ChannelList = ({ navigation }) => {
    return (
        <Container>
            <Text style={{ fontSize: 30}} > Channel List </Text>
            <Button
                title="Channel Creation"
                onPress={() => navigation.navigate('Channel Creation')}
            />
        </Container>
    );
};

export default ChannelList;

