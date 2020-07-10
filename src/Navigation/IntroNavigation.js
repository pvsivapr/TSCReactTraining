import React from "react"
import {createStackNavigator} from "@react-navigation/stack"
import IntroPage from "../Screens/IntroPage";
import LoginPage from "../Screens/LoginPage";
import CarouselPage from "../Screens/CarouselPage";
import RegistrationPage from "../Screens/RegistrationPage";

const stack = createStackNavigator();

const IntroNavigation = (params) => {
    const stackNaviComponent = (
        <stack.Navigator initialRouteName="RegistraionPage">
            <stack.Screen name="RegistrationPage" component={RegistrationPage} />
            <stack.Screen name="LoginPage" component={LoginPage} />
        </stack.Navigator>
    )
    return stackNaviComponent;
}

export default IntroNavigation;