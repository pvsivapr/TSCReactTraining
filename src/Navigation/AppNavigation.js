import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import IntroNavigation from "./IntroNavigation";
import UserAuthenticationPage from "../Screens/UserAuthenticationPage";
import HomePage from "../Screens/HomePage";

const stack = createStackNavigator();
const AppNavigation = () => {
    const mainNavigationComponent = (
        <stack.Navigator initialRouteName="UserAuthenticationPage">
            <stack.Screen name="UserAuthenticationPage" component={UserAuthenticationPage}/>
            <stack.Screen name="IntroNavigation" component={IntroNavigation}/>
            <stack.Screen name="HomePage" component={HomePage}/>
        </stack.Navigator>
    )
    return mainNavigationComponent;
}

export default AppNavigation;