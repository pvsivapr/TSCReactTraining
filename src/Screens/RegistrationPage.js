import React, { useState } from "react"
import { Text, StyleSheet, ScrollView, Image, TouchableWithoutFeedback, View, Alert } from "react-native"
import CustomTextInput from "../CustomComponents/CustomTextInput"
import CustomButton from "../CustomComponents/CustomButton"
import { memoriesImageURL } from "../Assets/CommonImages/MemoriesLogo"
import AsyncStorage from "@react-native-community/async-storage"
import { StackActions } from "@react-navigation/native";


const RegistrationPage = (props) => {

    const FIRST_NAME = "firstname";
    const LAST_NAME = "lastName";
    const MOBILE_NUMBER = "MobileNumber";
    const EMAIL_ID = "emailId";
    const PASSWORD = "password";
    const CONFIRM_PASSWORD = "confirmPassword";

    const [validations, setValidations] = useState({
        areValidInputs: {
            isValidFirstName: true,
            isValidLastName: true,
            isValidMobileNo: true,
            isValidEmailId: true,
            isValidPassword: true,
            isValidConfirmPassword: true
        },
        inputValues: {
            firstNameValue: "",
            lastNameValue: "",
            mobileNoValue: 0,
            emailIdValue: "",
            passwordValue: "",
            confirmPasswordValue: ""
        },
        isFormValid: false
    })

    const onRegistration = () => {
        console.log("validating");
        const obtainedInputValues = validations.inputValues;
        const standardMobileRegex = /^((\+){1}91){1}[1-9]{1}[0-9]{9}$/;
        const standardEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        const mediumPasswordRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/
        if (obtainedInputValues.firstNameValue <= 0) {
            const setAreValidInputs = { ...validations.areValidInputs, isValidFirstName: false }
            const newValidaions = { ...validations, areValidInputs: setAreValidInputs }
            setValidations(newValidaions);
        }
        else if (obtainedInputValues.lastNameValue <= 0) {
            const setAreValidInputs = { ...validations.areValidInputs, isValidLastName: false }
            const newValidaions = { ...validations, areValidInputs: setAreValidInputs }
            setValidations(newValidaions);
        }
        else if (obtainedInputValues.mobileNoValue <= 0 || !(standardMobileRegex.test(obtainedInputValues.mobileNoValue))) {
            const setAreValidInputs = { ...validations.areValidInputs, isValidMobileNo: false }
            const newValidaions = { ...validations, areValidInputs: setAreValidInputs }
            setValidations(newValidaions);
        }
        else if (obtainedInputValues.emailIdValue <= 0 || !(standardEmailRegex.test(obtainedInputValues.emailIdValue))) {
            const setAreValidInputs = { ...validations.areValidInputs, isValidEmailId: false }
            const newValidaions = { ...validations, areValidInputs: setAreValidInputs }
            setValidations(newValidaions);
        }
        else if (obtainedInputValues.passwordValue <= 0 || !(mediumPasswordRegex.test(obtainedInputValues.passwordValue))) {
            const setAreValidInputs = { ...validations.areValidInputs, isValidPassword: false }
            const newValidaions = { ...validations, areValidInputs: setAreValidInputs }
            setValidations(newValidaions);
        }
        else if (obtainedInputValues.confirmPasswordValue <= 0 || obtainedInputValues.confirmPasswordValue !== obtainedInputValues.passwordValue) {
            const setAreValidInputs = { ...validations.areValidInputs, isValidConfirmPassword: false }
            const newValidaions = { ...validations, areValidInputs: setAreValidInputs }
            setValidations(newValidaions);
        }
        else {
            AsyncStorage.clear().then(() => {
                var userData = JSON.stringify(validations.inputValues);
                AsyncStorage.setItem("userData", userData).
                    then(() => {
                        Alert.alert("Alert", "User Id Created Successfully", [{
                            text: "OK",
                            onPress: () => {
                                // props.navigation.navigate("HomePage");
                                props.navigation.dispatch(StackActions.replace("HomePage"));
                            }
                        }]);
                    }).catch((error) => {
                        console.log(error);
                    });
            }).catch(error => {
                console.log(error);
            });
        }
    }

    const onInputChangedHandler = (identifier, validaitonOptions, text) => {

        console.log(identifier);
        console.log(text);

        let newValidations = {
            ...validations,
            areValidInputs: {
                isValidFirstName: (identifier === FIRST_NAME) ? true : validations.areValidInputs.isValidFirstName,
                isValidLastName: (identifier === LAST_NAME) ? true : validations.areValidInputs.isValidLastName,
                isValidMobileNo: (identifier === MOBILE_NUMBER) ? true : validations.areValidInputs.isValidMobileNo,
                isValidEmailId: (identifier === EMAIL_ID) ? true : validations.areValidInputs.isValidEmailId,
                isValidPassword: (identifier === PASSWORD) ? true : validations.areValidInputs.isValidPassword,
                isValidConfirmPassword: (identifier === CONFIRM_PASSWORD) ? true : validations.areValidInputs.isValidConfirmPassword
            },
            inputValues: {
                firstNameValue: (identifier === FIRST_NAME) ? text : validations.inputValues.firstNameValue,
                lastNameValue: (identifier === LAST_NAME) ? text : validations.inputValues.lastNameValue,
                mobileNoValue: (identifier === MOBILE_NUMBER) ? text : validations.inputValues.mobileNoValue,
                emailIdValue: (identifier === EMAIL_ID) ? text : validations.inputValues.emailIdValue,
                passwordValue: (identifier === PASSWORD) ? text : validations.inputValues.passwordValue,
                confirmPasswordValue: (identifier === CONFIRM_PASSWORD) ? text : validations.inputValues.confirmPasswordValue
            },
            isFormValid: false
        };
        setValidations(newValidations);
    };

    const mainUIComponent = (
        <ScrollView style={styles.mainContainerStyle}>

            <Image style={{ height: 100, width: 100, alignSelf: "center" }} source={{ uri: memoriesImageURL }} />

            <CustomTextInput
                style={styles.inputStyles}
                validationOptions={{
                    allowErrorText: true,
                    isValidInput: validations.areValidInputs.isValidFirstName
                }}
                placeholder="Enter your First Name "
                errorHintText="* Plese enter first name"
                inputID={FIRST_NAME}
                onInputChanged={onInputChangedHandler.bind(this, FIRST_NAME, { isRequired: true })}
            />

            <CustomTextInput
                style={styles.inputStyles}
                validationOptions={{
                    allowErrorText: true,
                    isValidInput: validations.areValidInputs.isValidLastName
                }}
                placeholder="Enter your Last Name"
                errorHintText="* Plese enter last name"
                inputID={LAST_NAME}
                onInputChanged={onInputChangedHandler.bind(this, LAST_NAME, { isRequired: true })}
            />

            <CustomTextInput
                style={styles.inputStyles}
                validationOptions={{
                    allowErrorText: true,
                    isValidInput: validations.areValidInputs.isValidMobileNo
                }}
                placeholder="Enter your Mobile Number"
                errorHintText="* Plese enter a valid mobile number(+XXXXXXXXXXXX)"
                inputID={MOBILE_NUMBER}
                onInputChanged={onInputChangedHandler.bind(this, MOBILE_NUMBER, { isRequired: true, isMobile: true })}
            />

            <CustomTextInput
                style={styles.inputStyles}
                validationOptions={{
                    allowErrorText: true,
                    isValidInput: validations.areValidInputs.isValidEmailId
                }}
                placeholder="Enter your Email ID"
                errorHintText="* Plese enter a valid email-ID"
                inputID={EMAIL_ID}
                onInputChanged={onInputChangedHandler.bind(this, EMAIL_ID, { isRequired: true, isEmail: true })}
            />

            <CustomTextInput
                style={styles.inputStyles}
                validationOptions={{
                    allowErrorText: true,
                    isValidInput: validations.areValidInputs.isValidPassword
                }}
                placeholder="Enter Password"
                errorHintText="* please enter a valid password"
                inputID={PASSWORD}
                isPasswordInput={true}
                onInputChanged={onInputChangedHandler.bind(this, PASSWORD, { isRequired: true, isPassword: true })}
            />

            <CustomTextInput
                style={styles.inputStyles}
                validationOptions={{
                    allowErrorText: true,
                    isValidInput: validations.areValidInputs.isValidConfirmPassword
                }}
                placeholder="Confirm Password"
                errorHintText="* Confirm password didnot match password"
                inputID={CONFIRM_PASSWORD}
                isPasswordInput={true}
                onInputChanged={onInputChangedHandler.bind(this, CONFIRM_PASSWORD, { isRequired: true, isPassword: true })}
            />

            <Text style={styles.clickableTextSiblingStyle} >I have an account,
                <TouchableWithoutFeedback onPress={() => { props.navigation.navigate("LoginPage") }}>
                    <Text style={styles.clickableTextStyle}>Login</Text>
                </TouchableWithoutFeedback>
            </Text>

            <CustomButton style={styles.registerButtonStyle} title="Register" onPress={onRegistration} />

            <View style={{ height: 50 }} />

        </ScrollView>
    )
    return mainUIComponent;
}

const styles = StyleSheet.create({
    mainContainerStyle: {
        paddingTop: 20
    },
    inputStyles: {
        height: 50,
        marginHorizontal: 20,
        marginVertical: 10
    },
    registerButtonStyle: {
        marginHorizontal: 20,
    },
    clickableTextSiblingStyle: {
        alignSelf: "center"
    },
    clickableTextStyle: {
        color: "maroon"
    }
});

export default RegistrationPage;