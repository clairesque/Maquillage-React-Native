import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import colours from '../constants/colours';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = ({navigation, route}) => {
  const {user, logout} = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(route.params ? route.params.userId : user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
    navigation.addListener('focus', () => setLoading(!loading));
  }, [navigation, loading]);

  const handleDelete = () => {};

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <Image
          style={styles.userImg}
          source={{
            uri: userData
              ? userData.userImg ||
                '/Users/apple/Developer/maquillage/assets/user_icon.png'
              : '/Users/apple/Developer/maquillage/assets/user_icon.png',
          }}
        />
        <Text style={styles.userName}>
          {userData ? userData.name.toUpperCase() || '' : ''}
        </Text>
        <View style={styles.default}>
          <Text>
            <Icon name="email" size={20} />
            {'   '}
            <Text style={styles.defaultText}>Email</Text>
          </Text>
          <Text style={styles.defaultEmail}>
            {userData ? userData.email || 'test@gmail.com' : 'test@gmail.com'}
          </Text>
        </View>
        <View style={styles.default}>
          <Text>
            <Icon name="phone" size={21} color={colours.primary} />
            {'   '}
            <Text style={styles.defaultText}>Phone</Text>
          </Text>
          <Text style={styles.defaultEmail}>
            {userData
              ? userData.phone || 'No phone number added'
              : 'No phone number added'}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: 228,
            marginTop: 20,
          }}>
          <Icon name="account" size={26} />
          <Text style={styles.defaultAgeRange}> Age Range </Text>
        </View>
        <Text style={styles.defaultAge}>
          {userData ? userData.phone || '18-24 years old' : '18-24 years old'}
        </Text>
        <TouchableOpacity style={styles.logout} onPress={() => navigation.navigate('EditPreferences')}>
          <View style={{marginLeft: 26, flexDirection: 'row'}}>
            <Icon
              name="heart"
              size={23}
              style={{color: colours.primary, marginTop: 4}}
            />
            <Text style={styles.defaultAgeRange}> Preferences </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logout} onPress={() => logout()}>
          <Text>
            <Icon name="logout" size={23} />{' '}
            <Text style={styles.defaultText}>Logout</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  userImg: {
    height: 220,
    width: 220,
    borderRadius: 120,
  },
  userName: {
    fontSize: 25,
    fontWeight: '800',
    marginTop: 20,
    marginBottom: 10,
    color: colours.tertiary,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  default: {
    marginRight: 210,
    marginTop: 20,
  },
  logout: {
    marginTop: 20,
    marginRight: 270,
  },
  defaultText: {
    fontSize: 24,
  },
  defaultAgeRange: {
    fontSize: 24,
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  defaultAge: {
    fontSize: 15,
    width: 200,
    marginLeft: 15,
    color: '#738198',
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  defaultEmail: {
    fontSize: 15,
    color: '#738198',
  },
});
