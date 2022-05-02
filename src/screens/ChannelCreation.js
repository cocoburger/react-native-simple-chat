import React, {useRef, useState, useEffect, useContext} from "react";
import {Alert} from 'react-native';
import {ProgressContext} from "../contexts";
import { createChannel } from "../utils/firebase";
import styled from "styled-components";
import {Input, Button } from '../components/Index';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Container = styled.View`
  flex:1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
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


const ChannelCreation = ({ navigation }) => {
    const {spinner} = useContext(ProgressContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const descriptionRef = useRef();
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        //title : 없고, errorMessage : 있고
        setDisabled(!(title && !errorMessage));
    }, [title, description, errorMessage]);


    const _handleTitleChange = title => {
        setTitle(title);
        setErrorMessage(title.trim() ? '' : 'Please enter the title');

    }

    const _handleCreateButtonPress = async () => {
        try
        {
            spinner.start();
            const id = await createChannel({title, description});
            //현재 화면을 스택에 유지하지 않고 새로운 화면과 교체하면서 화면을 이동한다는 특징이 있다.
            navigation.replace('Channel', { id, title });
        } catch (e) {
            Alert.alert('Creation Error', e.message);
        } finally {
            spinner.stop();
        }
    };
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{ flex:1}}
            extraScrollHeight={20}
        >
            <Container>
                <Input
                    label='Title'
                    value={title}
                    onChangeText={_handleTitleChange}
                    onSubmitEditing={() => {
                        setTitle(title.trim())
                        descriptionRef.current.focus();
                    }}
                    onBlur={() => setTitle(title.trim())}
                    placeholder='방 제목'
                    returnKeyType='next'
                    maxlength={20}
                />
                <Input ref={descriptionRef}
                       label="Description"
                       value={description}
                       onChangeText={text => setDescription(text)}
                       onSubmitEditing={() => {
                           setDescription(description.trim());
                           _handleCreateButtonPress();
                       }}
                       onBlur={() => setDescription(description.trim())}
                       placeholder="Description"
                       returnKeyType="done"
                       maxlength={40}
                />
                <ErrorText>{errorMessage}</ErrorText>
                <Button
                    title="Create"
                    onPress={_handleCreateButtonPress}
                    disabled={disabled}
                />
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default ChannelCreation;
