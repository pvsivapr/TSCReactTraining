import React, { useState } from "react"
import { Text, StyleSheet, ScrollView, Image, TouchableWithoutFeedback} from "react-native"
import CustomTextInput from "../CustomComponents/CustomTextInput"
import CustomButton from "../CustomComponents/CustomButton"
import { memoriesImageURL } from "../Assets/CommonImages/MemoriesLogo"

const LoginPage = (props) => {

    const[shallInitInputValidation, setShallInitInputValidation] = useState(false);
    const onLogin = () => {
        setShallInitInputValidation(true);
    }

    const onTextChanged = (target) => 
    {
        console.log(target)
    }

    const mainUIComponent = (
        <ScrollView style={styles.mainContainerStyle}>
            
            <Image style={{height: 100, width: 100, alignSelf: "center"}} source={{uri: memoriesImageURL}}/>

            <CustomTextInput 
            style = {styles.inputStyles}
            validationOptions={ {allowErrorText: true, shallInitValidation: shallInitInputValidation, isValidInput: false}}
            placeholder="Enter your Mobile Number"
            errorHintText="* This is a mandatory field"
            onChangeText={(e) => onTextChanged(e)}/>

            <CustomTextInput 
            style = {styles.inputStyles}
            validationOptions={ {allowErrorText: true, shallInitValidation: shallInitInputValidation, isValidInput: false}}
            placeholder="Enter your Password"
            errorHintText="* This is a mandatory field"
            isPasswordInput = {true}
            secureTextEntry = {true}
            onChangeText={(e) => onTextChanged(e)}/>

            <Text style = {styles.clickableTextSiblingStyle} >Don't have an account,
                <TouchableWithoutFeedback onPress={()=>{props.navigation.navigate("RegistrationPage")}}>
                    <Text style={styles.clickableTextStyle}>Register</Text>
                </TouchableWithoutFeedback>
            </Text>

            <CustomButton style={styles.loginButtonStyle} title="Login" onPress={onLogin}/>
        </ScrollView>
    )
    return mainUIComponent;
}

const styles = StyleSheet.create({
    mainContainerStyle: {
        paddingTop: 20,
    },
    inputStyles: {
        height: 50,
        marginHorizontal: 20,
        marginVertical: 10
    },
    loginButtonStyle: {
        marginHorizontal: 20,
    },
    clickableTextSiblingStyle: {
        alignSelf: "center"
    },
    clickableTextStyle: {
        color: "maroon"
    }
})

export default LoginPage;