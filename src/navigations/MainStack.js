import React, {useContext} from "react";
import {Channel, ChannelCreation} from "../screens";
import {createStackNavigator} from "@react-navigation/stack";
import {ThemeContext} from "styled-components";
import MainTab from "./MainTab";

const Stack = createStackNavigator();

const MainStack = () => {
    const theme = useContext(ThemeContext);
    return (
        <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{
                headerTintColor: theme.headerTintColor,
                cardStyle: {backgroundColor: theme.backgroundColor},
                headerBackTitleVisible: false,
            }}
            >
            <Stack.Screen name="Main" component={MainTab} />
            <Stack.Screen name="Channel Creation" component={ChannelCreation} />
            <Stack.Screen name="Channel" component={Channel} />
        </Stack.Navigator>
    )
}

export default MainStack;
