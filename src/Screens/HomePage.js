import React from "react"
import { View, StyleSheet } from "react-native"
import CustomButton from "../CustomComponents/CustomButton";

export default class Homepage extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            title: "Home",
            headerTitleStyle: {
                alignSelf: 'center'
            },
            headerStyle: {
                backgroundColor: "skyblue"
            }
        });
    }

    render() {
        const mainUIComponent = (
            <View style={styles.mainHolderViewStyle}>
                <CustomButton style={styles.buttonStyles} title="Todo List General" onPress={() => { this.props.navigation.navigate("ToDoListGenPage") }} />
                <CustomButton style={styles.buttonStyles} title="Todo List Redux" onPress={() => { this.props.navigation.navigate("ToDoListReduxPage") }} />
            </View>
        )
        return mainUIComponent;
    }
}

const styles = StyleSheet.create({
    mainHolderViewStyle: {
        marginVertical: 20,
        marginHorizontal: 20,
        flex: 1,
        justifyContent: "center"
    },
    buttonStyles: {
        backgroundColor: "maroon"
    }
});