import React, { useEffect, useState } from "react"
import { View, StyleSheet, Button } from "react-native"
import CustomActivityIndicator from "../CustomComponents/CustomActivityIndicator";
import AsyncStorage from "@react-native-community/async-storage"
import { StackActions } from "@react-navigation/native";

const UserAuthenticationPage = (props) => {

    const [loaderVisibility, setLoaderVisibility] = useState(true);

    const NavigateTo = (pageID) => {
        props.navigation.dispatch(StackActions.replace(pageID));
    }

    useEffect(() => {
        AsyncStorage.getItem("userData").
            then((value) => {
                try {
                    console.log(value);
                    if (value === null) {
                        console.log("Got is nullable value");
                        setLoaderVisibility(false);
                        // props.navigation.navigate("IntroNavigation");
                        NavigateTo("IntroNavigation");
                    }
                    else {
                        //@react-native-community/async-storage
                        if (value.length > 0) {
                            var userData = JSON.parse(value);
                            if ((userData.mobileNoValue.length > 0 || userData.emailIdValue.length > 0) && (userData.passwordValue.length > 0)) {
                                setLoaderVisibility(false);
                                
                                //props.navigation.clear("HomePage");
                        NavigateTo("HomePage");
                                return;
                            }
                        }
                        setLoaderVisibility(false);
                        // props.navigation.navigate("IntroNavigation");
                        NavigateTo("IntroNavigation");
                    }
                }
                catch (error) {
                    console.log(error);
                    setLoaderVisibility(false);
                    // props.navigation.navigate("IntroNavigation");
                        NavigateTo("IntroNavigation");
                }
            }).
            catch((err) => {
                setLoaderVisibility(false);
                // props.navigation.navigate("IntroNavigation");
                        NavigateTo("IntroNavigation");
            });
    }, [])

    const mainUIComponent = (
        <View>
            <CustomActivityIndicator visibility={loaderVisibility} />
            <View style={styles.dataViewHolderStyle}>
                <Button title="Show Modal" onPress={() => { setLoaderVisibility(true) }} />
            </View>
        </View>
    )
    return mainUIComponent;
}

const styles = StyleSheet.create({
    mainContainerStyle: {
        backgroundColor: "blue"
    },
    dataViewHolderStyle: {
        //flex: 1
    }
})

export default UserAuthenticationPage;