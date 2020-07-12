import React, { useState } from "react"
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, TextInput, Alert, SafeAreaView } from "react-native"

const ToDoListGenPage = (props) => {

    props.navigation.setOptions({
        title: "TO-DO GEN",
        headerStyle:{
            backgroundColor: "skyblue"
        }
    })

    const [toDoItemText, setToDoItemText] = useState("");
    const [toDoList, setToDoList] = useState([]);

    const onChangeTextHandler = (text) => {
        setToDoItemText(text);
    }

    const onAddToDoItemHandler = () => {
        if (toDoItemText.length > 0) {
            var yourDate = new Date();  // for example
            // the number of .net ticks at the unix epoch
            const epochTicks = 621355968000000000;
            // there are 10000 .net ticks per millisecond
            const ticksPerMillisecond = 10000;
            // calculate the total number of .net ticks for your date
            var yourTicks = epochTicks + (yourDate.getTime() * ticksPerMillisecond);

            const toDoItem = {
                id: yourTicks.toString(),
                value: toDoItemText,
                showAccessibleButtons: false
            }
            if (toDoList.length > 0) {
                if (toDoList.find(item => item.value === toDoItemText)) {
                    Alert.alert("Item is already in the list, please add another value");
                }
                else {
                    setToDoList([...toDoList, toDoItem]);
                    setToDoItemText("");
                }
            }
            else {
                const testItem = [];
                testItem.push(toDoItem);
                setToDoList(testItem);
                setToDoItemText("");
            }
        }
        else {
            Alert.alert("The text value is empty, please enter a valid input")
        }
    }

    const itemCellView = (item) => {
        console.log(item);
        const viewCellComponent = (
            <TouchableOpacity activeOpacity="0.4" onPress={() => {
                toDoList.map((listItem) => {
                    if (listItem.id === item.item.id) {
                        listItem.showAccessibleButtons = !(listItem.showAccessibleButtons)
                    }
                    else {
                        listItem.showAccessibleButtons = false;
                    }
                })
                setToDoList(toDoList);
            }}>
                <View style={styles.listCellViewHolder}>
                    <View style={{ flex: 1 }}>
                        <Text>{item.item.value}</Text>
                    </View>
                    {(item.item.showAccessibleButtons) ? <Button title="Delete" /> : <></>}
                </View>
            </TouchableOpacity>
        )
        return viewCellComponent;
    }

    const mainUIComponent = (
        <SafeAreaView>
            <View style={styles.mainHolderViewStyle}>
                <TextInput placeholder="Enter an item to rembember" value={toDoItemText} onChangeText={onChangeTextHandler} />
                <View style={styles.buttonHolderStyles}>
                    <Button title="Add New" onPress={onAddToDoItemHandler} />
                    <Button title="Reset" onPress={() => { setToDoList([]); }} />
                </View>
                <FlatList
                    keyExtractor={item => item.id}
                    data={toDoList}
                    renderItem={itemCellView}>
                </FlatList>
            </View>
        </SafeAreaView>
    )
    return mainUIComponent;
}

const styles = StyleSheet.create({
    mainHolderViewStyle: {
        marginVertical: 20,
        marginHorizontal: 20,
    },
    buttonHolderStyles: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    listCellViewHolder: {
        backgroundColor: "gray",
        minHeight: 35,
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "center",
        marginVertical: 5,
        paddingLeft: 20
    },
});

ToDoListGenPage.navigationOptions = {
    title: "ToDo List",
    headerStyle: {
        alignItems: "center",
        justifyContent: "center"
    }
}

export default ToDoListGenPage;