import React, {useState, useEffect, useLayoutEffect, useContext} from "react";
import styled, {ThemeContext} from "styled-components";
import {Text, FlatList } from 'react-native';
import {DB, createMessage, getCurrentUser} from "../utils/firebase";
import  Input  from '../components/Input';
import {Alert} from "react-native";
import {GiftedChat, Send} from 'react-native-gifted-chat';
import { MaterialIcons} from "@expo/vector-icons";

const Container = styled.View`
  flex:1;
  background-color: ${({ theme }) => theme.background};
`;


const SendButton = props => {
    const theme = useContext(ThemeContext);

    return (
        <Send
            {...props}
            disabled={!props.text}
            containerStyle={{
                width:44,
                height:44,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 4,
            }}
        >
            <MaterialIcons name='send'
                           size={24}
                           color={
                               props.text ? theme.sendButtonActive : theme.sendButtonInActive
                           }
            />
        </Send>
    );
};

const Channel = ({navigation, route }) => {
    const theme = useContext(ThemeContext);
    const {uid, name, photoURL} = getCurrentUser();
    console.log(photoURL);
    console.log(getCurrentUser());
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const unsubscribe = DB.collection('channels')
            .doc(route.params.id)
            .collection('messages')
            .orderBy('createAt', 'desc')
            .onSnapshot(snapshot => {
                const list = [];
                snapshot.forEach(doc => {
                    list.push(doc.data());
                });
                setMessages(list);
            });
        return () => unsubscribe();
    }, []);

    const _handleMessageSend = async messageList => {
        const newMessage = messageList[0];
        try{
            await createMessage({ channelID: route.params.id, message:newMessage});
        } catch (e) {
            Alert.alert('Send Message Error', e.message);
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({headerTitle: route.params.title || 'Channel'});
    }, []);

    return (
        <Container>
            <GiftedChat
                listViewProps={{
                    style: {backgroundColor: theme.background},
                }}
                placeholder="Enter a message..."
                messages={messages}
                user={{ _id : uid, name, avatar: photoURL}}
                onSend={_handleMessageSend}
                alwaysShowSend={true}
                textInputProps={{
                    autoCapitalize: 'none',
                    autoCorrect: false,
                    textContentType: 'none',
                    underlineColorAndorid: 'transparent',
                }}
                multiline={false}
                renderUsernameOnMessage={true}
                scrollToBottom={true}
                renderSend={props => <SendButton {...props} /> }
            />
        </Container>
    );
};

export default Channel;
