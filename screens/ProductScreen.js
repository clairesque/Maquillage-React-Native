import React, {useContext} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colours from '../constants/colours';
import {AuthContext} from '../navigation/AuthProvider';

const ProductScreen = ({navigation, route}) => {
  const {user, logout} = useContext(AuthContext);

  const item = route.params;

  function splitProduct(name, brand) {
    if (name.toLowerCase().includes(brand.toLowerCase())) {
      filteredName = name.toLowerCase().replace(brand + ' ', '');
      return filteredName;
    } else {
      return name;
    }
  }
  function splitDescription(desc) {
    item.modal = true;
    item.user = user;
    if (desc.length <= 250) {
      filteredDescription = desc.repeat(2);
    } else {
      if (desc.includes(',') && !desc.includes('.')) {
        const parts = desc.split(',');
        const firstThree = parts.slice(0, 3);
        filteredDescription = firstThree.join(',');
      } else if (desc.includes(',')) {
        const parts = desc.split('.');
        const firstThree = parts.slice(0, 5);
        filteredDescription = firstThree.join(',');
      } else {
        description = desc.split('.');
        filteredDescription = description
          .slice(0, 3)
          .join('.')
          .replace(/([^.])$/, '$1.');
      }
    }
    return filteredDescription;
  }

  function toggleText(item, text) {
    if (item.length === 0) {
      tagText = null;
    } else {
      tagText = <Text style={style.tags}>{text}</Text>;
    }
    return tagText;
  }

  return (
    <SafeAreaView style={{backgroundColor: colours.white, height: 750}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 200,
        }}>
        <Image
          source={{uri: item.image_link}}
          defaultSource={{
            uri: '/Users/apple/Developer/maquillage/assets/logo.png',
          }}
          style={{
            width: '45%',
            height: '90%',
            bottom: 10,
            borderRadius: 100,
          }}
        />
      </View>
      <View style={style.details}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{marginHorizontal: 3}}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: colours.tertiary,
                textTransform: 'capitalize',
              }}>
              {splitProduct(item.name, item.brand)}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{fontSize: 20, marginTop: 2, color: colours.tertiary}}>
                {item.brand}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  left: 7,
                  top: 7,
                  color: '#0000FF',
                  fontStyle: 'italic',
                }}>
                Follow ||
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Reviews', item)}>
                <Text
                  style={{
                    fontSize: 15,
                    left: 7,
                    top: 7,
                    color: '#0000FF',
                    fontStyle: 'italic',
                  }}>
                  {' '}
                  Add a Review
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.iconContainer}>
            <Icon name="favorite-border" color={colours.white} size={25} />
          </View>
        </View>
        <Text style={style.detailsText}>
          {splitDescription(item.description)}
        </Text>
        <View
          style={{
            position: 'absolute',
            top: 340,
            left: 20,
          }}>
          {toggleText(item.product_colors, 'Colours:')}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'row',
                ...style.colours,
              }}>
              {item.product_colors.map((colour, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: colour.hex_value,
                    ...style.colourBtn,
                  }}></View>
              ))}
            </View>
          </ScrollView>
          <Text style={style.tags}>Tags:</Text>
          {item.tag_list.length ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {item.tag_list.map((filter, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: colours.secondary,
                    ...style.filterBtn,
                  }}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: 'bold',
                      color: colours.tertiary,
                    }}>
                    {filter}
                  </Text>
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text
              style={{color: colours.tertiary, fontSize: 15, right: 3, top: 5}}>
              {' '}
              No tags available for this product.{' '}
            </Text>
          )}
        </View>
      </View>
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
    paddingBottom: 200,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  iconContainer: {
    backgroundColor: colours.primary,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  detailsText: {
    lineHeight: 20,
    fontSize: 15,
    marginTop: 45,
    color: colours.tertiary,
    width: 370,
  },
  tags: {
    marginTop: 20,
    lineHeight: 22,
    fontSize: 15,
    fontWeight: 'bold',
    color: colours.tertiary,
  },
  filterBtn: {
    marginTop: 10,
    height: 30,
    width: 90,
    marginRight: 9,
    borderRadius: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  colourBtn: {
    marginTop: 10,
    height: 30,
    width: 30,
    marginRight: 5,
    borderRadius: 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default ProductScreen;
