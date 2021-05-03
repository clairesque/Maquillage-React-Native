import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import colours from '../constants/colours';
import products from '../constants/products';

const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const ProductColoursScreen = ({navigation, route}) => {
  var targetColour = route.params;
  var results = products.filter(function (item) {
    return item.product_colors.find((c) => c.hex_value === targetColour);
  });

  const Card = ({product}) => {
    return (
      <View style={styles.card}>
        <TouchableOpacity
          underlayColor={colours.white}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('ProductScreen', product)}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={{uri: product.image_link}}
              style={{height: 100, width: 100, borderRadius: 50, top: 10}}
              defaultSource={{
                uri: '/Users/apple/Developer/maquillage/assets/logo.png',
              }}
            />
          </View>
          <View style={{marginHorizontal: 20, marginTop: 22}}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}>
              {product.name}
            </Text>
            <Text style={{fontSize: 14, color: colours.dark, marginTop: 2}}>
              {product.brand}
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <>
            {product.price == 0 ? (
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>$25.0</Text>
            ) : (
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                ${product.price}
              </Text>
            )}
          </>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
      <Text style={styles.titleDefault}>
        <Text>Products with the shade {'\n'} <Text style={{fontWeight: 'bold'}}> {targetColour}  </Text>
         <View
                  style={{
                    backgroundColor: targetColour,
                    ...styles.colourBtn,
                  }}></View>
                   </Text>
        </Text>
       
        <FlatList
          style={{marginTop: 30, marginLeft: 6}}
          data={results}
          numColumns={2}
          initialNumToRender={6}
          renderItem={({item}) => <Card product={item} />}
        />
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
    },
    itemStyle: {
      padding: 10,
    },
    filterListContainer: {
      paddingVertical: 10,
      marginTop: 10,
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    filterBtn: {
      height: 40,
      width: 110,
      borderRadius: 30,
      marginStart: 15,
      paddingRight: 5,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    card: {
      width: cardWidth,
      marginHorizontal: 7,
      marginBottom: 12,
      borderRadius: 15,
      elevation: 13,
      borderWidth: 1,
      backgroundColor: colours.white,
    },
    addToCartBtn: {
      height: 30,
      width: 30,
      bottom: 5,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerActivity: {
      height: 660,
    },
    activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
    },
    colourBtn: {
        marginTop: 5,
        height: 20,
        width: 20,
        marginRight: 5,
        borderRadius: 60,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
      },
    titleDefault: {
        marginTop: 20,
        backgroundColor: 'transparent',
        fontStyle: 'italic',
        color: colours.black,
        fontSize: 20,
        textAlign: 'center',
      },
  });
  
export default ProductColoursScreen;
