import {ThemeProvider} from "styled-components";
import {StatusBar} from "react-native";


const App = () => {
    return (
        <ThemeProvider theme={theme} >
            <StatusBar barStyle='dark-content' />
        </ThemeProvider>
    );
};

export default App;
