import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import colours from '../constants/colours';
import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View 
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor,
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:15}}
        {...props}
    >
        <Text style={{fontSize:16, fontWeight: 'bold'}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:15}}
        {...props}
    >
        <Text style={{fontSize:16, fontWeight: 'bold'}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16, fontWeight: 'bold'}}>Done</Text>
    </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.replace("Login")}
        onDone={() => navigation.navigate("Login")}
        titleStyles={{fontFamily:'Lato-Bold', fontSize:34, color:colours.tertiary}}
        pages={[
          {
            backgroundColor: colours.light,
            image: <Image source={require('../assets/Onboarding1.png')} resizeMode="contain" style={{ width: 300, height: 400 }} />,
            title: 'Find clean makeup',
          },
          {
            backgroundColor: colours.primary,
            image: <Image source={require('../assets/Onboarding3.png')} resizeMode="contain" style={{ width: 400, height: 400 }} />,
            title: 'Hassle-free process',
          },
          {
            backgroundColor: colours.light,
            image: <Image source={require('../assets/Onboarding2.png')} resizeMode="contain" style={{ width: 400, height: 400 }} />,
            title: 'Based on your skin type',
          },
        ]}
      />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
