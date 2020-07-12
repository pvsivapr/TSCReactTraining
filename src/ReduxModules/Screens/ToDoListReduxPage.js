import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, TextInput, Alert, SafeAreaView } from "react-native"
import { connect } from "react-redux";
import { onResetAll, onHandleTextChanged, addNewItem, getAllToDoItems, handleTextChanged, resetList } from "./../Actions/ToDoReduxPageActions"

class ToDoListReduxPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getAllToDoItems());
    }

    onChangeTextHandler = (text) => {
        const { dispatch } = this.props;
        dispatch(handleTextChanged(text));
    }

    onAddToDoItemHandler = () => {
        const { dispatch, changedTextValue, toDoListItems } = this.props;
        if (changedTextValue.length > 0) {
            if (toDoListItems.find(item => item.value === changedTextValue)) {
                Alert.alert("Item is already in the list, please add another value");
            }
            else {
                dispatch(addNewItem(changedTextValue));
            }
        }
        else {
            Alert.alert("The text value is empty, please enter a valid input")
        }
    }

    itemCellView = (item) => {
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

    render() {
        const { changedTextValue, toDoListItems } = this.props;
        const mainUIComponent = (
            <SafeAreaView>
                <View style={styles.mainHolderViewStyle}>
                    <TextInput placeholder="Enter an item to rembember" value={changedTextValue} onChangeText={this.onChangeTextHandler} />
                    <View style={styles.buttonHolderStyles}>
                        <Button title="Add New" onPress={this.onAddToDoItemHandler} />
                        <Button title="Reset" onPress={() => { 
                            const {dispatch} = this.props;
                            dispatch(resetList()); 
                            }} />
                    </View>
                    {(toDoListItems.length > 0) ?
                        <FlatList
                            keyExtractor={item => item.id}
                            data={toDoListItems}
                            renderItem={this.itemCellView}>
                        </FlatList> : <></>
                    }
                </View>
            </SafeAreaView>
        )
        return mainUIComponent;
    }
}

function mapStateToProps(state) {
    return {
        changedTextValue: state.ToDoReduxPageReducer.changedTextValue,
        toDoListItems: state.ToDoReduxPageReducer.toDoListItems
    }
}

export default connect(mapStateToProps)(ToDoListReduxPage)

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
        marginVertical: 5,
        paddingLeft: 20
    },
});