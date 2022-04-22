import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TRANSPARENT = 'transparent';

const Container = styled.TouchableOpacity`
  background-color: ${({ theme, isFilled }) =>
  isFilled ? theme.buttonBackground : TRANSPARENT};
  align-items: center;
  border-radius: 4px;
  width: 100%;
  padding: 10px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const Title = styled.Text`
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: ${({ theme, isFilled}) => 
  isFilled ? theme.buttonTitle : theme.buttonUnfilledTitle};
`;

const Button = ({ containerStyle, title, onPress, isFilled, disabled }) => {
    return (
        <Container
            style={containerStyle}
            onPress={onPress}
            isFilled={isFilled}
            disabled={disabled}
        >
            <Title isFilled={isFilled}>{title}</Title>
        </Container>
    );
};

Button.defaultProps = {
    isFilled : true,
};

Button.propTypes = {
    containerStyle: PropTypes.object,
    title: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    isFilled: PropTypes.bool,
    disabled: PropTypes.bool,
};

export default Button;


/**
 * props로 전달된 isFilled의 값에 따라 버튼 내부를 채우거나 투명하게 처리하는 Button 컴포넌트를 만들었다. isFilled의 기본값을 true로 지정해서 색이 채워진 상태가 기본 상태로 되도록하고,
 * 버튼 내부가 채워지지 않았을 경우 props로 전달된 title의 색이 변경되도록 작성했습니다. 사용되는 곳에 따라 버튼의 스타일을 수정하기 위해 containerStyle을 props로전달받아 적용하도록 작성함.
 *
 */
