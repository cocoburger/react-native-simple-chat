import React, {useState, createContext} from "react";

const UserContext = createContext({
    user: { email: null, uid:null},
    dispatch: () => {},
});

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    /**
     *
     * @param email
     * @param uid
     * 로그인 성공 시에 성공한 user를 파라미터 넘기면 자동으로 email, uid의 값을 찾아 수정한다.     */
    const dispatch = ({ email, uid}) => {
        setUser({email, uid});
    };
    const value = {user, dispatch};
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

export { UserContext, UserProvider};
