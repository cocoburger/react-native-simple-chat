import {ThemeProvider} from "styled-components";
import {StatusBar, Image} from "react-native";
import {useState} from "react";
import {Asset} from 'expo-asset';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import {theme } from './theme';

/**
 * images을 매개변수로 받는다. map 함수를 사용하여 image가 string type이면 prefetch로 반환
 * @param images
 * @returns {*}
 */
const cacheImages = images => {
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        };
    });
}

const cacheFonts = fonts => {
    return fonts.map(font => Font.loadAsync(font));
};

    const App = () => {
        const [isReady, setIsReady] = useState(false);

        const _loadAssets = async () => {
            const imageAssets = cacheImages([require('../assets/splash.png')]);
            const fontAssets = cacheFonts([]);

            await Promise.all([...imageAssets, ...fontAssets]);
        };
        return isReady ? (
            <ThemeProvider theme={theme}>
                <StatusBar barStyle='dark-content'/>
            </ThemeProvider>
        ) : (
            <AppLoading
                startAsync={_loadAssets}
                onFinish={() => setIsReady(true)}
                onError={console.warn}
            />
        );
    };
export default App;
