import React from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {ScrollView} from 'react-native';
import {View, Text, StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colours from '../constants/colours';

export default class ReviewsModal extends React.Component {
  render() {
    var product = this.props.product;
    return (
      <ScrollView style={styles.mainContainer}>
        <TouchableOpacity>
          {/* onPress={() => navigation.navigate('ProductScreen', product)}> */}
          <View style={styles.container}>
            <Image
              source={{uri: product.image_link}}
              defaultSource={{
                uri: '/Users/apple/Developer/maquillage/assets/logo.png',
              }}
              style={styles.productImage}
            />
          </View>
          <Text
            style={{
              textAlign: 'center',
              bottom: 30,
              fontWeight: 'bold',
              fontSize: 21,
            }}>
            {product.name}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            bottom: 30,
            fontSize: 16,
            fontWeight: 'bold',
            fontStyle: 'italic',
          }}>
          {product.brand}
        </Text>
        <Text
          style={{
            textAlign: 'right',
            right: 30,
            bottom: 30,
            color: '#AAA7A7',
            fontWeight: 'bold',
          }}>
          ({product.review && product.review.length}{' '}
          {product.review.length <= 1 ? 'review' : 'reviews'})
        </Text>
        {product.review &&
          product.review.map((reviews) => (
            <View flexDirection="row" style={{paddingBottom: 5}}>
              <Image
                defaultSource={{
                  uri: '/Users/apple/Developer/maquillage/assets/user_icon.png',
                }}
                // source={{uri: product.image_link}}
                style={styles.profile}
              />
              <View>
                <View>
                  <Text
                    style={{
                      left: 50,
                      bottom: 15,
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: colours.tertiary,
                    }}>
                    {reviews.name}
                  </Text>
                  <Text
                    style={{
                      left: 50,
                      bottom: 15,
                      fontSize: 15,
                      maxWidth: 300,
                    }}>
                    {reviews.review}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        <View
          style={{
            borderBottomColor: colours.grey,
            borderBottomWidth: 1,
          }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  container: {
    backgroundColor: colours.white,
    left: 30,
    top: 10,
    marginBottom: 60,
  },
  productImage: {
    width: 120,
    height: 120,
    left: 115,
    top: 10,
    borderRadius: 80,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 40,
    bottom: 20,
    left: 30,
  },
});
