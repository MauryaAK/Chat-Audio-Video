import React ,{useState}from 'react';
import { Alert } from 'react-native';
import { View, Text, Touchable, TouchableOpacity, ScrollView } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen } from './Constants';
import Field from './Field';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Forgot = (props) => {
    const [pass, setpass] = useState('')
    const [pass2, setpass2] = useState('')

    const reset=()=>{
        if(!pass){
            Alert.alert('Enter Password')
        }if(!pass2){
            Alert.alert('Enter Conform Password')
        }if(pass != pass2){
            Alert.alert('Password not Match')
        }
        if(pass && pass2){
            AsyncStorage.setItem('Pass',pass2)
            props.navigation.navigate("LoginPage")
        }
    }
    return (
        <Background>
            <View style={{ alignItems: 'center', width: '100%', flex: 1 }}>
                <Text
                    style={{
                        color: 'white',
                        fontSize: 64,
                        fontWeight: 'bold',
                        marginVertical: 20,
                    }}>
                    Reset
                </Text>
                <ScrollView style={{ width: "105%" }}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            width: "100%",
                            borderTopLeftRadius: 130,
                            paddingTop: 70,
                            alignItems: 'center',
                            paddingBottom: 40
                            // justifyContent:"center"
                        }}>

                        <Text
                            style={{
                                color: 'grey',
                                fontSize: 19,
                                fontWeight: 'bold',
                                marginBottom: 20,
                            }}>
                            Reset Your Password
                        </Text>
                        <Field
                            onChangeText={(txt) => { setpass(txt) }}
                            secureTextEntry={true}
                            placeholder="Password"
                        />
                        <Field
                            onChangeText={(txt) => { setpass2(txt) }}
                            placeholder="Conform Password"
                            secureTextEntry={true} />
                        <View
                            style={{ alignItems: 'flex-end', width: '78%', paddingRight: 16, marginBottom: 100 }}>
                        </View>
                        <Btn textColor='white' bgColor={darkGreen} btnLabel="Reset" Press={() => reset()} />
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Don't have an account ? </Text>
                            <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
                                <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Background>
    );
};

export default Forgot;
