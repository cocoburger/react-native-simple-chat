import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';

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


const Image = ({ url, imageStyle, rounded }) => {
    return (
        <Container>
            <StyledImage source={{uri: url }} style={imageStyle} rounded={rounded}/>
        </Container>
    );
};

Image.defaultProps = {
    rounded: false,
}

Image.prototype = {
    uri: PropTypes.string,
    imageStyle: PropTypes.object,
    rounded: PropTypes.bool,
}

export default Image;
