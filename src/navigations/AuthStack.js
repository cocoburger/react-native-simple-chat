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
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
    );A
};

export default AuthStack;
