import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import IntroNavigation from "./IntroNavigation";
import UserAuthenticationPage from "../Screens/UserAuthenticationPage";
import HomePage from "../Screens/HomePage";
import ToDoListGenPage from "../Screens/ToDoListGenPage";
import ToDoListReduxPage from "../ReduxModules/Screens/ToDoListReduxPage";

const stack = createStackNavigator();
const AppNavigation = () => {
    const mainNavigationComponent = (
        <stack.Navigator initialRouteName="UserAuthenticationPage">
            <stack.Screen name="UserAuthenticationPage" component={UserAuthenticationPage}/>
            <stack.Screen name="IntroNavigation" component={IntroNavigation}/>
            <stack.Screen name="HomePage" component={HomePage}/>
            <stack.Screen name="ToDoListGenPage" component={ToDoListGenPage}/>
            <stack.Screen 
            name="ToDoListReduxPage" 
            component={ToDoListReduxPage}
            options={{
                title: "To Do Redux",
                headerStyle: {
                    backgroundColor: "skyblue"
                }
            }}
            />
        </stack.Navigator>
    )
    return mainNavigationComponent;
}

export default AppNavigation;