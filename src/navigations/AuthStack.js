import {createStackNavigator} from "@react-navigation/stack";
import {useContext} from "react";
import {ThemeContext} from "styled-components";
import {Login, Signup} from "../screens";


const Stack = createStackNavigator();

const AuthStack = () => {
    const theme = useContext(ThemeContext);
    return (
        // 첫 화면 설정 initialRouteName
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerTitleAlign: 'center',
                cardStyle: {backgroundColor: theme.backgroundColor},
                headerTintColor: theme.headerTintColor,
            }}
        >
            <Stack.Screen name="Login" component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Signup" component={Signup}
                options={{ headerBackTitleVisible: false }}
            />
        </Stack.Navigator>
    );
};

export default AuthStack;
