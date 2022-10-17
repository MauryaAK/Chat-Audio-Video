import React from 'react';
import {connect} from 'react-redux';
import {CometChatAvatar} from '../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/index';
import {COMETCHAT_CONSTANTS} from '../../../src/CONSTS';
import style from './style';
import * as actions from '../../store/action';
import {SafeAreaView} from 'react-native-safe-area-context';
import Background from '../../components/Background';
import Btn from '../../components/Btn';
import { darkGreen } from '../../components/Constants';
import Field from '../../components/Field';
import Loader from '../../components/Loader';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import {ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownAlert from '../../cometchat-pro-react-native-ui-kit/CometChatWorkspace/src/components/Shared/DropDownAlert';
class LoginPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      pass:'',
      loading:false,
      showError: false,
      setUserName:""
    };
  }

  login = async(createUser = false) => {
    this.setState({loading:true})
    let id=await AsyncStorage.getItem('Pass')
    console.log('my input userid', this.state.uid,this.state.pass);
    if (!this.state.uid) {
      alert("Invalid user Id")
      this.setState({loading:false})
    }
    if (this.state.pass !=id) {
      alert("Invalid Password")
      this.setState({loading:false})
    }
    if(this.state.uid && this.state.pass == id){
      this.setState({showError: true});
    this.props.dispatch(
      actions.auth(this.state.uid, COMETCHAT_CONSTANTS.AUTH_KEY),
    ); 
    }
  };

  componentDidUpdate() {
    if (this.props.isLoggedIn) {
      this.props.navigation.navigate('CometChatUI');
      this.setState({loading:false})
    }
  }

  render() {
    let loader = null;

    if (this.props.loading) {
      loader = (
        <View style={style.loaderContainer}>
          <ActivityIndicator size="large" color="white"></ActivityIndicator>
        </View>
      );
    }

    let errorMessage = null;
    if (this.props.error && this.state.showError) {
      this.dropDownAlertRef?.showMessage('error', this.props.error.message);
    }
console.log('my loading value',this.state.loading);
    return (
      <Background>
        <Loader visible={this.state.loading}/>
      <View style={{ alignItems: 'center', width: '100%',flex:1 }}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginVertical: 20,
          }}>
          Login
        </Text>
        <ScrollView style={{width:"105%"}}>
          <View
            style={{
              backgroundColor: 'white',
              width: "100%",
              borderTopLeftRadius: 130,
              paddingTop: 70,
              alignItems: 'center',
              paddingBottom:40
              // justifyContent:"center"
            }}>
              <Text style={{ fontSize: 9, color: darkGreen, fontWeight: 'bold' }}>
              I have Devloped this App only study Purpose on my personal server "Ajay Pal"
            </Text>
            <Text style={{ fontSize: 30, color: darkGreen, fontWeight: 'bold' }}>
              Welcome Back Maurya
            </Text>
            <Text
              style={{
                color: 'grey',
                fontSize: 19,
                fontWeight: 'bold',
                marginBottom: 20,
              }}>
              Login to your account
            </Text>
            <Field
              onChangeText={(value) => this.setState({uid: value})}
              placeholder="Username"
              keyboardType={'email-address'}
            />
            <Field 
            onChangeText={(value) => this.setState({pass: value})}
            placeholder="Password" 
            secureTextEntry={true} />
            <View
              style={{ alignItems: 'flex-end', width: '78%', paddingRight: 16, marginBottom: 100 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Forgot")}>
                <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>
                Forgot Password ?
              </Text>
              </TouchableOpacity>
              
            </View>
            <Btn textColor='white' bgColor={darkGreen} btnLabel="Login" Press={() => this.login()} />
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "center" }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>Don't have an account ? </Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("Signup")}>
                <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Background>




      // <KeyboardAvoidingView style={{flex: 1}}>
      //   {loader}

      //   <ScrollView>
      //     <View style={style.wrapperStyle}>
      //       {errorMessage}
      //       <Text style={style.titleStyle}>CometChat App</Text>
      //       <Text style={style.subtitleStyle}>
      //         Login with one of our sample users
      //       </Text>
      //       <View style={style.userContainerStyle}>
      //         <TouchableOpacity
      //           style={style.userWrapperStyle}
      //           onPress={() => this.login('superhero1')}>
      //           <View style={style.thumbnailWrapperStyle}>
      //             <CometChatAvatar
      //               image={{
      //                 uri:
      //                   'https://data-us.cometchat.io/assets/images/avatars/ironman.png',
      //               }}
      //             />
      //           </View>
      //           <Text style={style.btnText}>superhero1</Text>
      //         </TouchableOpacity>
      //         <TouchableOpacity
      //           style={style.userWrapperStyle}
      //           onPress={() => this.login('superhero2')}>
      //           <View style={style.thumbnailWrapperStyle}>
      //             <CometChatAvatar
      //               image={{
      //                 uri:
      //                   'https://data-us.cometchat.io/assets/images/avatars/captainamerica.png',
      //               }}
      //             />
      //           </View>
      //           <Text style={style.btnText}>superhero2</Text>
      //         </TouchableOpacity>
      //         <TouchableOpacity
      //           style={style.userWrapperStyle}
      //           onPress={() => this.login('superhero3')}>
      //           <View style={style.thumbnailWrapperStyle}>
      //             <CometChatAvatar
      //               image={{
      //                 uri:
      //                   'https://data-us.cometchat.io/assets/images/avatars/spiderman.png',
      //               }}
      //             />
      //           </View>
      //           <Text style={style.btnText}>superhero3</Text>
      //         </TouchableOpacity>
      //         <TouchableOpacity
      //           style={style.userWrapperStyle}
      //           onPress={() => this.login('superhero4')}>
      //           <View style={style.thumbnailWrapperStyle}>
      //             <CometChatAvatar
      //               image={{
      //                 uri:
      //                   'https://data-us.cometchat.io/assets/images/avatars/wolverine.png',
      //               }}
      //             />
      //           </View>
      //           <Text style={style.btnText}>superhero4</Text>
      //         </TouchableOpacity>
      //         <TouchableOpacity
      //           style={style.userWrapperStyle}
      //           onPress={() => this.login('superhero5')}>
      //           <View style={style.thumbnailWrapperStyle}>
      //             <CometChatAvatar
      //               image={{
      //                 uri:
      //                   'https://data-us.cometchat.io/assets/images/avatars/cyclops.png',
      //               }}
      //             />
      //           </View>
      //           <Text style={style.btnText}>superhero5</Text>
      //         </TouchableOpacity>
      //       </View>
      //       <View style={style.uidWrapperStyle}>
      //         <View>
      //           <Text style={style.subtitleStyle}> Login with UID</Text>
      //         </View>
      //         <View style={style.inputWrapperStyle}>
      //           <TextInput
      //             style={style.textInput}
      //             onSubmitEditing={() => this.login('', true)}
      //             onChangeText={(value) => {
      //               this.setState({uid: value});
      //             }}
      //             placeholder="Enter your UID here"
      //           />
      //         </View>
      //         <TouchableOpacity
      //           style={style.loginBtn}
      //           onPress={() => this.login('', true)}>
      //           <Text style={style.btnText}>Login</Text>
      //         </TouchableOpacity>
      //       </View>
      //     </View>
      //     <DropDownAlert
      //       onClose={() => this.setState({showError: false})}
      //       ref={(ref) => (this.dropDownAlertRef = ref)}
      //     />
      //   </ScrollView>
      // </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = ({reducer}) => {
  return {
    loading: reducer.loading,
    error: reducer.error,
    isLoggedIn: reducer.isLoggedIn,
  };
};

export default connect(mapStateToProps)(LoginPage);
