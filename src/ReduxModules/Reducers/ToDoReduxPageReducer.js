import { RESET, ADD_NEW, GET_ALL, HANDLE_TEXT_CHANGED } from "./../Actions/ToDoReduxPageActions"

const initialState = {
    changedTextValue:"",
    toDoListItems: []
}

const ToDoReduxPageReducer = (state = initialState, action) => {
    console.log("Action type and payload: ", action);
    const{type, payload} = action;
    if (type === RESET) {
        state = {...state, toDoListItems:[]};
    }
    else if (type === ADD_NEW) {
        let toDoItems = state.toDoListItems;
        toDoItems.push(payload);
        state = {...state, changedTextValue:"", toDoListItems:toDoItems };
    }
    else if (type === GET_ALL) {
        state = {...state, toDoListItems: payload}
    }
    else if (type === HANDLE_TEXT_CHANGED) {
        state = {...state, changedTextValue: payload}
    }
    else {
    }
    return state;
}

export default ToDoReduxPageReducer;