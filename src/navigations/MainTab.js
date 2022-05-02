import React, {useContext, useEffect} from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {MaterialIcons} from "@expo/vector-icons";
import {ThemeContext} from "styled-components";
import {Profile, ChannelList} from '../screens';
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";

const Tab = createBottomTabNavigator();


const TabBarIcon = ({ focused, name }) => {
    const theme = useContext(ThemeContext);

    return (
        <MaterialIcons
            name={name}
            size={26}
            color={focused ? theme.tabActiveColor : theme.tabInactiveColor}
        />
    );
};

const MainTab = ({navigation, route}) => {
    const theme = useContext(ThemeContext);
    {/*name의 색상을 focused 여부에 따라서 변경해준다.*/}
    useEffect(() => {
        const title = getFocusedRouteNameFromRoute(route) ?? 'Channels';
        navigation.setOptions({
            headerTitle: title,
            headerRight: () =>
                title === 'Channels' && (
                    <MaterialIcons
                        name="add"
                        size={26}
                        style={{margin: 10}}
                        onPress={() => navigation.navigate("Channel Creation")}
                    />
                )
        });
    }, [route]);
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                activeTintColor: theme.tabActiveColor,
                inActiveTintColor: theme.tabInactiveColor,
            }}
        >
            <Tab.Screen
                name='Channels'
                component={ChannelList}
                options={{
                    tabBarIcon: ({ focused}) =>
                        TabBarIcon({
                            name: focused ? 'chat-bubble' : 'chat-bubble-outline',
                        }),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused}) =>
                        TabBarIcon({
                            name: focused ? 'person' : 'person-outline',
                        }),
                }}
            />
        </Tab.Navigator>
    );
};

export default MainTab;
