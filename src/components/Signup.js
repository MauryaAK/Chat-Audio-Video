import React from 'react';
import { useState } from 'react';
import { View, Text, Touchable, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen } from './Constants';
import Field from './Field';
import { COMETCHAT_CONSTANTS } from '../CONSTS'
import Loader from './Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = props => {

  const [userId, setuserid] = useState("")
  const [userfirstName, setfirstName] = useState("")
  const [userlastName, setuserLastName] = useState("");
  const [email,setemails]=useState('')
  const [loading,setloading]=useState(false)
  const [pass,setpass]=useState('')
  const [pass2,setpass2]=useState('')
  const [userDetails,setUserDetails]=useState({})

  const createNewUser = async () => {

    if (!userfirstName) {
      Alert.alert("Please Enter User First Name")
    } if (!userlastName) {
      Alert.alert("Please Enter User Last Name")
    }
    if (!userId) {
      Alert.alert("Please Enter valid Contact Number")
    }
    if (!email) {
      Alert.alert("Please Enter Email ID")
    }if(!pass){
      Alert.alert("Please Enter Password")
    }if(!pass2){
      Alert.alert("Please Enter Confirm Password")
    }
    if(pass!=pass2){
      Alert.alert("Please Enter Confirm Password Doesnot match")
    }

    if (userId && userfirstName && userlastName && email && pass2 && pass) {
      setloading(true)
      AsyncStorage.setItem("Pass",pass)
      try {
        let Body = {
          uid: userId,
          name: `${userfirstName} ${userlastName}`
        }
        console.log(Body);
        const res = await fetch(`https://${COMETCHAT_CONSTANTS.APP_ID}.api-${COMETCHAT_CONSTANTS.REGION}.cometchat.io/v3/users`, {
          method: "POST",
          body: JSON.stringify(Body),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'ApiKey': COMETCHAT_CONSTANTS.AUTH_KEY
          },
        }).then(res => {
          return res.json()
        }).catch(err => {
          Alert.alert("Please Contact to Ajay")
          console.log('user not created', err);
          setloading(false)
        })
        if(res.data){
          setUserDetails(res)
          props.navigation.navigate('LoginPage')
          setloading(false)
        }
      }
      catch (error) {
        Alert.alert("Please Contact to Ajay")
        console.log('error', error);
        setloading(false)
      }
    }

  }






  return (
    <Background>
      <ScrollView style={{ flex: 1 }}>
        <Loader visible={loading}/>
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              color: 'white',
              fontSize: 64,
              fontWeight: 'bold',
            }}>
            Register
          </Text>
          <Text
            style={{
              color: 'white',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            Create a new account
          </Text>
        </View>
        <View
          style={{
            paddingBottom: 20,
            backgroundColor: 'white',
            height: 790,
            width: '100%',
            borderTopLeftRadius: 130,
            paddingTop: 30,
            alignItems: 'center',
          }}>
          <Field
            onChangeText={(txt) => { setfirstName(txt) }}
            placeholder="First Name" />
          <Field
            onChangeText={(txt) => { setuserLastName(txt) }}
            placeholder="Last Name" />
          <Field
          onChangeText={(txt) => { setemails(txt) }}
            placeholder="Email / Username"
            keyboardType={'email-address'}
          />
          <Field
            onChangeText={(txt) => { setuserid(txt) }}
            placeholder="Contact Number" 
            maxLength={10}
            keyboardType={'number-pad'} />
          <Field
          onChangeText={(txt) => { setpass(txt) }}
          placeholder="Password" secureTextEntry={true} />
          <Field 
          onChangeText={(txt) => { setpass2(txt) }}
          placeholder="Confirm Password" secureTextEntry={true} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '78%',
              paddingRight: 16
            }}>
            <Text style={{ color: 'grey', fontSize: 16 }}>
              By signing in, you agree to our{' '}
            </Text>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
              Terms & Conditions
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: "center",
              width: '78%',
              paddingRight: 16,
              marginBottom: 10
            }}>
            <Text style={{ color: 'grey', fontSize: 16 }}>
              and {" "}
            </Text>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
              Privacy Policy
            </Text>
          </View>
          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Signup"
            Press={() => { createNewUser() }}
          />
          <View
            style={{
              // display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              Already have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('LoginPage')}>
              <Text
                style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Background>
  );
};

export default Signup;
