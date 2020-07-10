import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native'

const CustomTextInput = (props) => {
    const { allowErrorText, isValidInput } = props.validationOptions;
    
    //Start For password eye icon show or hide, password text show or masked
    const { isPasswordInput } = props;
    const [isSecureTextEntry, setIsSecureTextEntry] = useState(isPasswordInput);//useState(secureTextEntry);
    const onAlterShowPasswordPressed = () => {
        setIsSecureTextEntry(!isSecureTextEntry);
    }
    //End For password eye icon show or hide, password text show or masked

    const mainUIComponent = (
        <View style={{ ...styles.viewStyle, ...props.style }}>
            <View style={styles.textHolderViewStyle}>
                {((allowErrorText) && (!isValidInput)) ? <Text style={{ ...styles.textStyle, ...props.errorTextStyle }}>{props.errorHintText}</Text> : <></>}
                <TextInput
                    style={{ ...styles.textInputStyle, ...props.inputTextStyle }}
                    placeholder={props.placeholder}
                    placeholderTextColor={props.placeholderTextColor}
                    text={props.text}
                    secureTextEntry={isSecureTextEntry}
                    onChangeText={props.onInputChanged}
                />
            </View>
            
            {isPasswordInput ?
                <View style={styles.passwordImageViewStyle}>
                    <TouchableOpacity onPress={onAlterShowPasswordPressed}>
                        {isSecureTextEntry ?
                            <Image
                                style={styles.passwordImageStyle}
                                source={require("./../Assets/CommonImages/HidePassword.png")} /> :
                            <Image
                                style={styles.passwordImageStyle}
                                source={require("./../Assets/CommonImages/ShowPassword.png")} />
                        }
                    </TouchableOpacity>
                </View> : <></>
            }

        </View>
    )
    return mainUIComponent;
}

const styles = StyleSheet.create({
    viewStyle: {
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: "maroon",
        borderRadius: 10,
        overflow: 'hidden',
        flexDirection: "row",
        marginVertical: 5,
        paddingVertical: 2,
        paddingHorizontal: 10
    },
    textHolderViewStyle: {
        flexDirection: "column",
        flex: 1,
        justifyContent: "center"
    },
    textStyle: {
        backgroundColor: "white",
        color: "maroon",
        margin: 0,
        padding: 0
    },
    textInputStyle: {
        backgroundColor: "white",
        color: "blue",
        margin: 0,
        padding: 0
    },
    passwordImageViewStyle: {
        justifyContent: "center",
        alignSelf: "stretch"
    },
    passwordImageStyle: {
        justifyContent: "center",
        height: 30,
        width: 30
    }
});

export default CustomTextInput;