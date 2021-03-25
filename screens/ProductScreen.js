import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colours from '../constants/colours';
// import {SecondaryButton} from '../components/Button';

const ProductScreen = ({navigation, route}) => {
  const item = route.params;

  return (
    <SafeAreaView style={{backgroundColor: colours.white}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 280,
          }}>
          <Image source={{uri:item.image_link}} style={{height: 220, width: 220}} />
        </View>
        <View style={style.details}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{marginHorizontal: 20}}>
            <Text
              style={{fontSize: 25, fontWeight: 'bold', color: colours.white}}>
              {item.name}
            </Text>
            <Text
              style={{fontSize: 20, marginTop: 2, color: colours.white}}>
              {item.brand}
            </Text>
            </View>
            <View style={style.iconContainer}>
              <Icon name="favorite-border" color={colours.primary} size={25} />
            </View>
          </View>
          <Text style={style.detailsText}>
            {item.description}
          </Text>
          <View style={{marginTop: 40, marginBottom: 40}}>
            {/* <SecondaryButton title="Add To Cart" /> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  details: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 60,
    backgroundColor: colours.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer: {
    backgroundColor: colours.white,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  detailsText: {
    marginTop: 40,
    lineHeight: 22,
    fontSize: 15,
    color: colours.white,
  },
});

export default ProductScreen;