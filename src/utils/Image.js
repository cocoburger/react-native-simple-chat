const prefix =
    'https://firebasestorage.googleapis.com/v0/b/simplechat-53cd4.appspot.com/o';

// token 부분을 제외해야한다.
// 쿼리 스트링에 있는 token은 현재 로그인된 사용자에게 발급된 값이다.
// 로그인 전 화면 이므로 token이 없는 상태로 접근이 가능해야 한다.

export const images = {
    logo: `${prefix}/icon.png?alt=media`,
    photo: `${prefix}/photo.jpg?alt=media`,
};
