import React, {useContext} from "react";
import {Signup} from "../screens";
import {Channel, ChannelCreation} from "../screens";
import {createStackNavigator} from "@react-navigation/stack";
import {ThemeContext} from "styled-components";

const Stack = createStackNavigator();

const MainStack = () => {
    const theme = useContext(ThemeContext);

    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerTintColor: theme.headerTintColor,
                cardStyle: {backgroundColor: theme.backgroundColor},
                headerBackTitleVisible: false,
            }}
            >
            <Stack.Screen name="Channel Creation" component={ChannelCreation} />
            <Stack.Screen name="Channel" component={Channel} />
        </Stack.Navigator>
    )
}

export default MainStack;
