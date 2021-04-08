import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colours from '../constants/colours';

const ProductScreen = ({navigation, route}) => {
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
    if (desc.includes(',') && !desc.includes('.')) {
      const parts = desc.split(',');
      const firstThree = parts.slice(0, 1);
      filteredDescription = firstThree.join(',');
    } else {
      description = desc.split('.');
      filteredDescription = description
        .slice(0, 1)
        .join('.')
        .replace(/([^.])$/, '$1.');
    }
    return filteredDescription;
  }

  function toggleText(item) {
    if (item.length === 0) {
      tagText = null;
    } else {
      tagText = <Text style={style.tags}>{'Tags:'}</Text>;
    }
    return tagText;
  }

  return (
    <SafeAreaView style={{backgroundColor: colours.white}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 280,
        }}>
        <Image
          source={{uri: item.image_link}}
          defaultSource={{
            uri: '/Users/apple/Developer/maquillage/assets/logo.png',
          }}
          style={{
            width: '50%',
            height: '70%',
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
          <View style={{marginHorizontal: 10}}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: colours.tertiary,
                textTransform: 'capitalize',
              }}>
              {splitProduct(item.name, item.brand)}
            </Text>
            <Text style={{fontSize: 20, marginTop: 2, color: colours.tertiary}}>
              {item.brand}
            </Text>
          </View>
          <View style={style.iconContainer}>
            <Icon name="favorite-border" color={colours.primary} size={25} />
          </View>
        </View>
        <Text style={style.detailsText}>
          {splitDescription(item.description)}
        </Text>
        <Text style={style.tags}>Colours:</Text>
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
        {toggleText(item.tag_list)}
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
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: colours.tertiary,
                }}>
                {filter}
              </Text>
            </View>
          ))}
        </ScrollView>
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
    marginTop: 50,
    lineHeight: 22,
    fontSize: 15,
    color: colours.white,
  },
  tags: {
    marginTop: 20,
    lineHeight: 22,
    fontSize: 15,
    fontWeight: 'bold',
    color: colours.white,
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
  colours: {},
  colourBtn: {
    marginTop: 10,
    height: 20,
    width: 20,
    marginRight: 9,
    borderRadius: 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default ProductScreen;
