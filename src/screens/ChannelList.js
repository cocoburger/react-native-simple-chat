import React, {useContext, useState, useEffect} from "react";
import {FlatList} from "react-native";
import styled, {ThemeContext} from "styled-components";
import {MaterialIcons} from "@expo/vector-icons";
import { DB } from '../utils/firebase';
import moment from "moment";

const Container = styled.View`
  flex:1;
  background-color: ${({ theme }) => theme.background};
`;

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  padding: 15px 20px;  
`;

const ItemTextContainer = styled.View`
  flex:1;
  flex-direction: column;
`;

const ItemTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

const ItemDescription = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.listTime};
`;

const ItemTime = styled.Text`
   font-size: 16px;
  color: ${({ theme }) => theme.listTime};
`;

const channels = [];
for(let idx = 0; idx < 1000; idx++) {
    channels.push({
        id:idx,
        title:`title ${idx}`,
        createAt: idx,
    });
}

const getDataOrTime = ts => {
    const now = moment().startOf('day');
    const target = moment(ts).startOf('day');
    // 생성날짜가 오늘과 같으면 시간을 렌더링, 하루 이상 차이나면 날짜를 렌더링
    return moment(ts).format(now.diff(target, 'days') > 0 ? 'MM/DD' : 'HH:mm');
};


const Item = React.memo(({ item: {id, title, description, createAt}, onPress}) => {
        const theme = useContext(ThemeContext);
        console.log(`item: ${id}`)
        return (
            <ItemContainer onPress={() => onPress({ id, title })}>
                <ItemTextContainer>
                    <ItemTitle>{title}</ItemTitle>
                    <ItemDescription>{description}</ItemDescription>
                </ItemTextContainer>
                <ItemTime>{getDataOrTime(createAt)}</ItemTime>
                <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color={theme.listIcon}
                />
            </ItemContainer>
        );
    }
);
//ScrollView 컴포넌트는 렌더링해야 하는 모든 데이터를 한번에 렌더링하므로 렌더링하는 데이터 양이 많을 수록 느려지고 메모리 사용량이 증가한다.
//FlatList는 화면에 적절한 양의 데이터만 렌더링하고 스크롤의 이동에 맞춰 필요한 부분을  추가적으로 렌더링하는 특징이 있다.
//데이터의 길이가 가변적이고 데이터 양을 예측할 수 없는 상황에서 사용한다.
//3개의 속성을 지정해야 한다. 렌더링할 항목의 데이터를 배열로 전달, 전달된 배열의 항목을 이용해 항목을 렌더링할 함수를 작성
//마지막으로 각 항목에 키를 추가하기 위해 고유한 값을 반환하는 함수를 전달.
const ChannelList = ({ navigation }) => {
    const _handleItemPress = params => {
        navigation.navigate('Channel', params);
    };
    const [channels, setChannels] = useState([]);

    //creatAt을 내림차순  설정
    useEffect(() => {
        const unsubscribe = DB.collection('channels')
            .orderBy('createAt', 'desc')
            .onSnapshot(snapshot => {
                const list = [];
                snapshot.forEach(doc => {
                    list.push(doc.data());
                });
                setChannels(list);
            });
        return () => unsubscribe();
    }, []);

// 생성한 임의의 데이터를 FlatList 컴포넌트에 항목으로 사용할 데이터로 설정했습니다.
// render item에 작성되는 함수는 파라미터로 항목의 데이터를 가진 item이 포함된 객체가 전달됩니다.
// 파리미터로 전달되는 데이터를 이용해서 각 항목의 내용을 렌더링하고 클릭 시 채널 화면으로 이동.
    return (
        <Container>
            <FlatList
                keyExtractor={item => item['id']}
                data={channels}
                renderItem={({ item }) => (
                <Item item={item} onPress={_handleItemPress} />
                )}
                windowSize={3}
            />
        </Container>
    );
};

export default ChannelList;

