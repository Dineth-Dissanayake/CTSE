import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config/firebase-config";

const Register = () => {

    const [data, setData] = useState("");
    const navigation = useNavigation();
    const DatCollectinRef = collection(db, "User"); //database collection reference

    //inputs handle function
    const handleChangeText = (name, value) => {
        setData((prevState) => ({ ...prevState, [name]: value }));
    };

    //create user function,include firebase methods
    const add_data = async () => {
        if(!data.type || !data.username || !data.email || !data.password || !data.confirmPassword) {
            alert("Please enter all required fields!");
            return;
        }
        if(data.password !== data.confirmPassword) {
            alert("Password do not match!");
            return;
        }

        try {
            await addDoc(DatCollectinRef, {
                type: data.type,
                username: data.type,
                email: data.type,
                password: data.type,
                confirmPassword: data.confirmPassword,
            });
        if (addDoc) {
            //ToastAndroid.show("successfully submited!", ToastAndroid.SHORT); //application toast message
            alert("successfully submited!")
        }
        } catch (e) {
            //error handling
            console.error("Error adding document: ", e);
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, errorMessage);
        }
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{padding:10,backgroundColor:'#fff'}}>
                    <View style={styles.formInput}>
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <Image source={require('../assets/register.jpeg')}
                                resizeMode={'contain'}
                                style={{width:'100%',height:200,borderRadius:100,marginTop:-20}}
                            />
                        </View>
                    </View>

                    <Text style={styles.input}>Register AS,</Text>
                    <Text style={{
                        color:"#0D0140",
                        fontWeight: "bold",
                        fontSize: 15,
                        marginTop: 20,
                        textAlign: "center"
                    }}>Student or Teacher</Text>
                    <View style={styles.formInput}>
                        <TextInput 
                            //name={'type'}
                            style={styles.textInput} 
                            placeholder="Type your option"
                            onChangeText={(text) => {
                                handleChangeText('type', text)
                            }}
                        />
                    </View>
                    <View style={styles.formInput}>
                        <TextInput 
                            style={styles.textInput} 
                            //name={'username'}
                            placeholder="Username"
                            onChangeText={(text) => {
                                handleChangeText('username', text)
                            }}
                        />
                    </View>
                    <View style={styles.formInput}>
                        <TextInput 
                            //name={'email'}
                            style={styles.textInput} 
                            placeholder="Email address" 
                            onChangeText={(text) => {
                                handleChangeText('email', text)
                            }}
                        />
                    </View>
                    <View style={styles.formInput}>
                        <TextInput 
                            //name={'password'}
                            style={styles.textInput} 
                            placeholder="Password" 
                            secureTextEntry={true} 
                            onChangeText={(text) => {
                                handleChangeText('password', text)
                            }}
                        />
                    </View>
                    <View style={styles.formInput}>
                        <TextInput 
                            //name={'confirmPassword'}
                            style={styles.textInput} 
                            placeholder="Confirm Password" 
                            secureTextEntry={true} 
                            onChangeText={(text) => {
                                handleChangeText('confirmPassword', text)
                            }}
                        />
                    </View>
                    <View style={styles.formInput}>
                        <TouchableOpacity style={styles.defaultButton} 
                            onPress={() => add_data()}
                        >
                            <Text style={{textAlign:'center', fontSize:16, color:'#fff', fontWeight:'bold'}} >Register</Text>
                        </TouchableOpacity>
                    </View>
                
                    <View style={styles.formInput}>
                        <TouchableOpacity onPress={()=>{navigation.navigate("Login")}}>
                            <Text style={{color:'black', textAlign:'center', fontSize:16, fontWeight:'bold'}} >
                                Already have an Account? Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        marginTop: 5,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color:'black',
        marginLeft:10
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
        borderColor: '#a7a7a7',
        borderRadius: 10
    },
    defaultButton: {
        padding: 15,
        backgroundColor: 'blue',
        borderRadius: 10
    }
 });

export default Register;