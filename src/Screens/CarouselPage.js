import React, { useState } from "react"
import {View, ScrollView, Image, Text, StyleSheet, Button, Dimensions} from "react-native"

const carouselContent = (data) => {
    const carouselView = (
        <View key={data.key} style={{...styles.carouselContentMainStyle, width:data.width, backgroundColor:data.color}}>
            <Text>One</Text>
            <Button title="hellos"/>
        </View>
    )
    return carouselView;
}

const CarouselPage = (props) => {
    const [screenWidth, setScreenWidth] = useState(Dimensions.get("screen").width)
    const [screenHeight, setScreenHeight] = useState(Dimensions.get("screen").height)
    const carouselData = [
        {
            id: 1,
            color: "yellow",
            width: screenWidth
        },
        {
            id: 2,
            color: "blue",
            width: screenWidth
        },
        {
            id: 3,
            color: "green",
            width: screenWidth
        },
        {
            id: 4,
            color: "maroon",
            width: screenWidth
        }
    ]

    const mainUIComponent = (
        <View>
            <ScrollView 
            style={{...styles.scrollContent, width: screenWidth, height: screenHeight, ...props.style}}
            contentContainerStyle={{/*flex:1,*/ flexGrow:1}}
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            scrollEventThrottle={200}
            decelerationRate='fast'
            pagingEnabled
            >
                {/* <View style={{flexDirection:"row" ,flex:1}}> */}
                { carouselData.map(item=>carouselContent(item)) }
                {/* </View> */}
            </ScrollView>
        </View>
    )
    return mainUIComponent;
}

const styles = StyleSheet.create({
    carouselContentMainStyle : {
        flex: 1,
    },
    scrollContent: {
        backgroundColor: "blue"
    }
});

export default CarouselPage;