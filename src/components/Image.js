import React, {useEffect} from 'react';
import { Platform, Alert} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

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
    return (
        <Container>
            <StyledImage source={{uri: url }} style={imageStyle} rounded={rounded}/>
            {showButton && <PhotoButton />}
        </Container>
    );
};

Image.defaultProps = {
    rounded: false,
    showButton: false,
}

Image.prototype = {
    uri: PropTypes.string,
    imageStyle: PropTypes.object,
    rounded: PropTypes.bool,
    showButton: PropTypes.bool,
}

export default Image;
