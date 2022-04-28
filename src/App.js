import {ThemeProvider} from "styled-components";
import {StatusBar, Image} from "react-native";
import {useState} from "react";
import {Asset} from 'expo-asset';
import { images } from "./utils/Image";
import Navigation from './navigations'
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import {theme } from './theme';
import { ProgressProvider } from "./contexts/Progress";

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

            /**
             *  불러올 images를 import 한 후에 아래에 넣어준다.
             */
            const imageAssets = cacheImages([
                require('../assets/splash.png'), ...Object.values(images),
            ]);
            const fontAssets = cacheFonts([]);

            await Promise.all([...imageAssets, ...fontAssets]);
        };
        return isReady ? (
            <ThemeProvider theme={theme}>
                <ProgressProvider>
                    <StatusBar barStyle='dark-content'/>
                    <Navigation />
                </ProgressProvider>
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
