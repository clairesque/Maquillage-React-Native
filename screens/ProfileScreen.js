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
import {Icon} from 'react-native-eva-icons';

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
                'https://i.pinimg.com/564x/04/d2/a8/04d2a8473962fb2bcfe82e068cb8b9ba.jpg'
              : 'https://i.pinimg.com/564x/04/d2/a8/04d2a8473962fb2bcfe82e068cb8b9ba.jpg',
          }}
        />
        <Text style={styles.userName}>
          {userData ? userData.name.toUpperCase() || '' : ''}
        </Text>
        <View flexDirection="row" style={styles.defaultEmaill}>
          <Text>
            <Icon
              style={{marginLeft: 2, bottom: 3}}
              name="email"
              height={22}
              width={22}
            />
            {'   '}
            <Text style={styles.defaultText}>Email</Text>
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            right: 100,
            alignItems: 'flex-start',
          }}>
          <Text style={styles.defaultEmail}>
            {userData ? userData.email || '' : ''}
          </Text>
        </View>
        <View style={styles.default}>
          <Text>
            <Icon
              name="phone-outline"
              height={22}
              width={22}
              color={colours.primary}
            />
            {'   '}
            <Text style={styles.defaultText}>Phone</Text>
          </Text>
          <Text style={styles.defaultPhone}>
            {userData
              ? userData.phone || 'No phone number added'
              : 'No phone number added'}
          </Text>
        </View>
        <View style={styles.default}>
          <Text>
            <Icon name="clock" height={22} width={22} color={colours.primary} />
            {'   '}
            <Text style={styles.defaultText}>Age Range</Text>
          </Text>
          <Text style={styles.defaultAge}>
            {userData
              ? userData.phone || '18 to 24 years old approx'
              : '18-24 years old'}
          </Text>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: 228,
            marginTop: 20,
          }}>
          <Text>
            <Icon style={{marginTop: 1}} name="clock" height={22} width={22} />{' '}
            <Text style={styles.defaultAgeRange}> Age </Text>
          </Text>
        </View>
        <Text style={styles.defaultAge}>
          {userData ? userData.phone || '18-24 years old' : '18-24 years old'}
        </Text> */}
        <TouchableOpacity
          style={{top: 20, ...styles.prefs}}
          onPress={() => navigation.navigate('EditPreferences')}>
          <View style={{flexDirection: 'row', marginRight: 190}}>
            <Icon
              name="heart-outline"
              height={22}
              width={22}
              style={{color: colours.primary, marginTop: 4, right: 2}}
            />
            <Text style={styles.prefs}> Preferences </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{left: 80, bottom: 23, ...styles.recs}}
          onPress={() => navigation.navigate('Recommendations')}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              name="bulb"
              height={22}
              width={22}
              style={{color: colours.primary, marginTop: 4, right: 4}}
            />
            <Text style={{fontSize: 24, width: 300}}> Recommendations </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logout} onPress={() => logout()}>
          <Text>
            <Icon
              style={{right: 5, bottom: 2}}
              name="log-out-outline"
              height={22}
              width={22}
            />{' '}
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
    height: 200,
    width: 200,
    borderRadius: 120,
  },
  userName: {
    fontSize: 25,
    fontWeight: '800',
    marginTop: 20,
    marginBottom: 10,
    color: colours.primary,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  default: {
    marginRight: 180,
    marginTop: 10,
  },
  defaultEmaill: {
    marginRight: 265,
  },
  prefs: {
    fontSize: 24,
    marginBottom: 30,
  },
  logout: {
    marginRight: 245,
    bottom: 7,
  },
  recs: {
    marginRight: 190,
  },
  defaultText: {
    fontSize: 24,
  },
  defaultAgeRange: {
    fontSize: 24,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    right: 25,
  },
  defaultAge: {
    fontSize: 15,
    color: '#738198',
  },
  defaultEmail: {
    fontSize: 15,
    color: '#738198',
    marginRight: 20,
  },
  defaultPhone: {
    fontSize: 15,
    color: '#738198',
  },
});
