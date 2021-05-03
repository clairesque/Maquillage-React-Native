import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from '../screens/HomeScreen';
import LikesScreen from '../screens/LikesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RecommendationsScreen from '../screens/RecommendationsScreen';
import EditPreferencesScreen from '../screens/EditPreferencesScreen';
import ProductScreen from '../screens/ProductScreen';
import ReviewsScreen from '../screens/ReviewsScreen';
import colours from '../constants/colours';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="maquillage"
      component={HomeScreen}
      options={{
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: colours.primary,
          fontWeight: 'bold',
          fontSize: 23,
        },
        headerStyle: {
          shadowColor: '#fff',
          elevation: 0,
        },
        // headerRight: () => (
        //   <View style={{marginRight: 10}}>
        //     <FontAwesome5.Button
        //       name="plus"
        //       size={22}
        //       backgroundColor="#fff"
        //       color="#162F54"
        //       onPress={() => navigation.navigate('Recommendations')}
        //     />
        //   </View>
        // ),
      }}
    />
    <Stack.Screen
      name="Recommendations"
      component={RecommendationsScreen}
      options={{
        title: 'Recommendations',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#ffffff',
          shadowColor: '#162F5415',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#162F54" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="HomeProfile"
      component={ProfileScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#162F54" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="EditPreferences"
      component={EditPreferencesScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ProductScreen"
      component={ProductScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#162F54" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="Reviews"
      component={ReviewsScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#162F54" />
          </View>
        ),
      }}
    />
  </Stack.Navigator>
);

const LikesStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="For You"
      component={LikesScreen}
      options={{
        headerShown: true,
      }}
    />
  </Stack.Navigator>
);

const ReviewsStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Reviews"
      component={ReviewsScreen}
      options={{
        headerShown: true,
      }}
    />
  </Stack.Navigator>
);

const ProfileStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: 'My Profile',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: colours.white,
        },
      }}
    />
    {/* <Stack.Screen
      name="EditPreferences"
      component={EditPreferencesScreen}
      options={{
        headerShown: false
      }}
    /> */}
  </Stack.Navigator>
);

const AppStack = () => {
  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'Chat') {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#162F54',
      }}>
      <Tab.Screen
        name="Home"
        component={FeedStack}
        options={({route}) => ({
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="For You"
        component={LikesStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({color, size}) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Reviews"
        component={ReviewsStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          tabBarIcon: ({color, size}) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStack;
