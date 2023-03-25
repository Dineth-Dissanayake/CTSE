import React, { useContext, useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { db } from "../firebase-config/firebase-config";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc } from "firebase/firestore";

const Login = () => {

    const [getData, setGetData] = useState("");
    const [data, setData] = useState("");
    const navigation = useNavigation();
    const DatCollectinRef = collection(db, "User"); //firebase databse reference
    const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0); //the method for refresh functions

    useEffect(() => {
        //fetch the all data from firebase and set it to usestate, this firebase method
        const getAllData = async () => {
            const users = await getDocs(DatCollectinRef);
            setGetData(users.docs.map((doc) => ({ ...doc.data()})));
            forceUpdate();
        };
        getAllData();
    }, [ignored]);

    const handleChangeText = (name, value) => {
        setData((prevState) => ({ ...prevState, [name]: value }));
    };

    //create user function,include firebase methods
    const add_data = () => {
        if(!data.type || !data.username || !data.password) {
            alert("Please enter all required fields!");
            return;
        }

        if(data.username === data.password) {
            alert("Loggin Successed!");
            navigation.navigate("Notice List")
            return;
        } else {
            alert("Loggin Failed!")
        }
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{padding:10,backgroundColor:'#fff'}}>
                    <View style={styles.formInput}>
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <Image source={require('../assets/login.jpeg')}
                                resizeMode={'contain'}
                                style={{width:'100%',height:150,borderRadius:100}}
                            />
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.myTitle}>Login As</Text>
                    </View>

                    <Text style={styles.input}>Student or Teacher</Text>
                    <View style={styles.formInput}>
                        <TextInput 
                            name={'type'}
                            placeholder="Enter Your Login Type"
                            style={styles.textInput}
                            onChangeText={(val) => 
                                handleChangeText("type", val)
                            }
                        />
                    </View>

                    <View style={styles.formInput}>
                        <TextInput 
                            name={'username'}
                            placeholder="Username"
                            style={styles.textInput}
                            onChangeText={(val) => 
                                handleChangeText("username", val)
                            }
                        />
                    </View>
                    <View style={styles.formInput}>
                        <TextInput 
                            name={'password'}
                            placeholder="Password"
                            secureTextEntry
                            style={styles.textInput} 
                            onChangeText={(val) => 
                                handleChangeText("password", val)
                            }
                        />
                    </View>
                    <View style={styles.formInput}>
                        <TouchableOpacity >
                            <Text style={{color:'black', textAlign:'right', fontSize:16, fontWeight:'bold'}} >Forget Password?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formInput}>
                        <TouchableOpacity style={styles.defaultButton} onPress={() => add_data()}>
                            <Text style={{textAlign:'center', fontSize:16, color:'#fff', fontWeight:'bold'}} >Login</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.formInput}>
                        <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                            <Text style={{color:'black', textAlign:'center', fontSize:16, fontWeight:'bold'}} >Don't have Account? </Text>
                            <TouchableOpacity onPress={()=>{navigation.navigate("Register")}}>
                                <Text style={{color:'lightblue', textAlign:'center', fontSize:16, fontWeight:'bold'}} >Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    myTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color:'black'
    },
    input: {
        marginTop: 40,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color:'black',
        marginLeft:10
    },
    container: {
        flex: 1
    },
    defaultBg: {
        width: '100%',
        height:120
    },
    formInput: {
        marginTop: 10,
        padding: 10
    },
    textInput: {
        padding: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'lightblue',
        borderRadius: 10
    },
    defaultButton: {
        padding: 15,
        backgroundColor: 'blue',
        borderRadius: 10,
        width:200,
        marginLeft:75
    }
 });

export default Login;