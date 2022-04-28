import React, {useState, createContext } from "react";

const ProgressContext = createContext({
    inProgress: false,
    spinner: () => {},
});
/**
 *
 * @param children
 * @returns {JSX.Element}
 * @constructor
 * ProgressProvider의 하위 컴포넌트가 children이며, 자동으로 전달되는 props로 컴포넌트의 자식 컴포넌트가 전달된다.
 * ProgressProvider이 children을 받아서 사용을 하지 않으면,   <StatusBar barStyle='dark-content'/> <Navigation /> 이 두개의 하위 컴포넌트
 * 화면에 나타나지 않는다. 그래서 하위 컴포넌트를 받으거면 children을 파라미터로 받고 사용해줘야한다.
 */
const ProgressProvider = ({ children }) => {
    console.log("children : ", children);
    const [inProgress, setInProgress] = useState(false);
    const spinner =
        {
            start: () => setInProgress(true),
            stop: () => setInProgress(false),
        };
    console.log("children : ", children);
    const value = { inProgress, spinner };
    return (
        <ProgressContext.Provider value = {value} >
            {children}
        </ProgressContext.Provider>
    );
};

export {ProgressContext, ProgressProvider};
