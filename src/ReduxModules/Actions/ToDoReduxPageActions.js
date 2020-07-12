export const RESET = "RESET";
export const ADD_NEW = "ADD_NEW";
export const GET_ALL = "GET_ALL";
export const HANDLE_TEXT_CHANGED = "HANDLE_TEXT_CHANGED";


export const onResetAll = () => ({ type: RESET })

export const onAddNew = (item) => ({ type: ADD_NEW, payload: item})

export const onGetAllItems = (listItems) => ({type: GET_ALL, payload: listItems})

export const onHandleTextChanged = (textValue) => ({type: HANDLE_TEXT_CHANGED, payload: textValue})


export function getAllToDoItems()
{
    return async (dispatch) => {
        dispatch(onGetAllItems([]));
    }
}

export function addNewItem(toDoItemText)
{
    return async (dispatch) => {

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
        dispatch(onAddNew(toDoItem));
    }
}

export function resetList()
{
    return async (dispatch) => {
        dispatch(onResetAll([]));
    }
}

export function handleTextChanged(textValue)
{
    return async (dispatch) => {
        dispatch(onHandleTextChanged(textValue));
    }
}