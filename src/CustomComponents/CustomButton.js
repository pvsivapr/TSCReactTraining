import React from "react"
import {View, Text, TouchableOpacity, TouchableNativeFeedback, StyleSheet, Platform} from "react-native"

const CustomButton = (props) => {

    let TouchableComponent = TouchableOpacity;
    if(Platform.OS==="android" && Platform.Version>"21")
    {
        TouchableComponent = TouchableNativeFeedback
    }

    const onTouchPress = () => {
        props.onPress();
    }

    const onTouchLongPress = () => {
        props.onLongPress();
    }

    const mainUIMainComponent = (
        <TouchableComponent onPress={onTouchPress} onLongPress={onTouchLongPress}>
            <View style={{...styles.containerStyle, ...props.styles}}>
                <Text style={styles.textStyle}>{props.title}</Text>
            </View>
        </TouchableComponent>
    )
    return mainUIMainComponent;
}

const styles = StyleSheet.create({
    containerStyle: {
        height: 40,
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "blue",
        margin:10,
    },
    textHolderStyle: {
        alignItems: "center",
        justifyContent: "center"
    },
    textStyle: {
        textAlign: "center"
    }
})

export default CustomButton;