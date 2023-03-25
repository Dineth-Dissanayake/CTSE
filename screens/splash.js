import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";

const Splash = () => {

    const [isGo, setIsGo] = useState(true);
    const Navigation = useNavigation();
    

    useEffect(() => {
        if(isGo == true) {
            setTimeout(() => {
                Navigation.navigate("Register");
                setIsGo(false);
            },3000);
        }
    });

    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}>
            <Image source={require("../assets/welcome.jpeg")}
                style={{width:'100%',height:120}}
            />
        </View>
    )
}

export default Splash;