import React, {useEffect} from 'react';
import { Platform, Alert} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import styled from "styled-components/native";
import PropTypes from 'prop-types';
import {MaterialIcons} from '@expo/vector-icons';
/**
 *  props로 전달되는 url을 렌더링하고 imageStyle을 전달받아 컴포넌트의 스타일을 수정할 수 있는 Image 컴포넌트 생성.
 *  styled, proptypes을 사용하여 컴포넌트를 커스텀 및 타입을 지정해줌.
 */

const Container = styled.View`
  align-items: center;
  margin-bottom: 30px;
  
`;

const StyledImage = styled.Image`
  background-color: ${({ theme }) => theme.imageBackground};
  width: 100px;
  height: 100px;
  border-radius: ${({ rounded }) => (rounded ? 50 : 0)}px;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.imageButtonBackgroud};
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

const ButtonIcon = styled(MaterialIcons).attrs({
    name: 'photo-camera',
    size: 22,
})`
    color: ${({ theme }) => theme.imageButtonIcon};
`;

const PhotoButton = ({ onPress }) => {
    return (
        <ButtonContainer onPress={onPress}>
            <ButtonIcon />
        </ButtonContainer>
        )
}

const Image = ({ url, imageStyle, rounded, showButton, onChangeImage }) => {
    useEffect(() => {
        (async () => {
            try {
                if(Platform.OS === 'ios') {
                    const {status} =  await MediaLibrary.requestPermissionsAsync();

                    if(status !== 'granted') {
                        Alert.alert(
                            '사진 허가',
                            '사진첩 접근 허가를 해주세요~'
                        )
                    }
                }
            } catch (e){
                Alert.alert('사진 허가 요청 에러', e.message());
            }
        })();
    }, []);

    /**
     *
     * @returns {Promise<void>}
     * @private
     * mediaTypes : 조회하는 자료의 타입
     * allowsEditing: 이미지 선택 후 편집 단계 진행 여부
     * aspect: 안드로이드 전용 옵션으로 이미지 편집 시 사각형의 비율
     * quality 0 ~ 1 사이의 값을 받으며 압축 품질을 의미 (1: 최대 품질)
     *
     */
    const _handleEditButton = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes : ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            console.log(result.uri);
            if(!result.cancelled) {
                onChangeImage(result.uri);
            }
        }catch (e) {
            Alert.alert("사진 에러" , e.message());
        }
    };
    return (
        <Container>
            <StyledImage source={{uri: url }} style={imageStyle} rounded={rounded}/>
            {showButton && <PhotoButton onPress={_handleEditButton}/>}
        </Container>
    );
};

Image.defaultProps = {
    rounded: false,
    showButton: false,
    onChangeImage: () => {},
};

Image.prototype = {
    uri: PropTypes.string,
    imageStyle: PropTypes.object,
    rounded: PropTypes.bool,
    showButton: PropTypes.bool,
    onChangeImage: PropTypes.func,
}

export default Image;
