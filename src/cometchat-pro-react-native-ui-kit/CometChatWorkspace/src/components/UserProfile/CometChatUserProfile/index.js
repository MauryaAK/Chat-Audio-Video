import React, { useEffect, useState } from 'react';
import { CometChatManager } from '../../../utils/controller';
import { CometChatAvatar } from '../../Shared';
import styles from './styles';
import { View, Text, SafeAreaView } from 'react-native';
import theme from '../../../resources/theme';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { logger } from '../../../utils/common';
import * as action from '../../../../../../store/action'
import { useDispatch } from 'react-redux';
const notificationIcon = (
  <Icon color={theme.color.helpText} name="notifications" size={28} />
);
const privacyIcon = (
  <Icon color={theme.color.helpText} name="security" size={28} />
);
const chatIcon = <Icon color={theme.color.helpText} name="chat" size={28} />;
const helpIcon = <Icon color={theme.color.helpText} name="help" size={28} />;
const problemIcon = (
  <Icon color={theme.color.helpText} name="report-problem" size={28} />
);

const CometChatUserProfile = (props) => {
  const [user, setUser] = useState({});
  const dispatch=useDispatch()
  const viewTheme = { ...theme, ...props.theme };

  /**
   * Retrieve logged in user details
   * @param
   */
  const getProfile = () => {
    new CometChatManager()
      .getLoggedInUser()
      .then((loggedInUser) => {
        setUser(loggedInUser);
      })
      .catch((error) => {
        logger(
          '[CometChatUserProfile] getProfile getLoggedInUser error',
          error,
        );
      });
  };

  useEffect(() => {
    getProfile();
  }, []);
  let avatar = null;
  if (user) {
    avatar = (
      <View style={styles.avatarStyle}>
        <CometChatAvatar
          cornerRadius={18}
          borderColor={viewTheme.color.secondary}
          borderWidth={1}
          image={{ uri: user.avatar }}
          name={user.name}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.userInfoScreenStyle}>
      <View style={styles.headingContainer}>
        <Text style={styles.headerTitleStyle}>More</Text>
      </View>
      <View style={styles.userContainer}>
        <View style={styles.avatarContainer}>{avatar}</View>
        {user?.name ? (
          <View style={styles.userDetailsContainer}>
            <View style={styles.userNameWrapper}>
              <Text style={styles.userName}>{user?.name}</Text>
            </View>
            <Text style={styles.status}>Online</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.infoItemsWrapper}>
        <View style={styles.infoItemHeadingContainer}>
          <Text style={styles.infoItemHeadingText}>Preferences</Text>
        </View>
        <View style={styles.infoItemsContainer}>
          <View style={styles.infoItem}>
            {notificationIcon}
            <Text style={styles.infoItemText}>Notifications</Text>
          </View>
          <View style={styles.infoItem}>
            {privacyIcon}
            <Text style={styles.infoItemText}>Privacy and Security</Text>
          </View>
          <View style={styles.infoItem}>
            {chatIcon}
            <Text style={styles.infoItemText}>Chats</Text>
          </View>
        </View>
        <View style={styles.infoItemHeadingContainer}>
          <Text style={styles.infoItemHeadingText}>Other</Text>
        </View>
        <View style={styles.infoItemsContainer}>
          <View style={styles.infoItem}>
            {helpIcon}
            <Text style={styles.infoItemText}>Help</Text>
          </View>
          <View style={styles.infoItem}>
            {problemIcon}
            <Text style={styles.infoItemText}>Report a Problem</Text>
          </View>

        </View>
      </View>
      <View style={{ marginTop: 10, width: "90%", alignSelf: "center" }}>
        <Text style={{ fontSize: 17, fontWeight: "700", paddingVertical: 4 }}>Develped by--</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: 'green', fontWeight: "700", fontSize: 15 }}>Neha Patel</Text>
          <Text>{` - MCA 3rd Sem RBMI Bareilly`}</Text>
        </View>
        <View style={{ flexDirection: 'row', width: "100%" }}>
          <Text style={{ color: 'green', fontWeight: "700", fontSize: 15 }}>Ajay Maurya</Text>
          <Text style={{ textAlign: 'center' }}>{` - - MCA 3rd Sem RBMI Bareilly`}</Text>
        </View>
        <Text>ajaypal@elitemindz.co</Text>
        <Text>7251806608</Text>
      </View>
      <View>
        <TouchableOpacity
        style={{backgroundColor:'green',justifyContent:'center',alignItems:'center',paddingVertical:10,marginTop:30,
      width:'90%',alignSelf:'center',borderRadius:20}}
          onPress={() => dispatch(action.logout(),
          props.navigation.navigate('LoginPage'))}>
          <Text style={{ color: "white",fontSize:16,fontWeight:'700' }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default CometChatUserProfile;
