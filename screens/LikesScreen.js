import React, {useEffect, useState, useContext} from 'react';
import {
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import styles from '../styles/LikesStyles';
import colours from '../constants/colours';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import Icon from 'react-native-vector-icons/MaterialIcons';

function LikesScreen(props, navigation) {
  const [entities, setEntities] = useState([]);
  const {user, logout} = useContext(AuthContext);

  const unlikeProduct = async (id) => {
    firestore()
      .collection('likes')
      .doc(id)
      .update({
        status: 'unliked',
      })
      .then(() => {
        console.log('unliked');
        Alert.alert('You have unliked this product!');
      });
  };
  const Card = ({product}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('ProductScreen', product)}>
        <View style={styles.card}>
          <View
            style={{
              height: 80,
              alignItems: 'center',
            }}>
            <Image
              source={{uri: product.image_link}}
              defaultSource={{uri: '/Users/apple/Developer/maquillage/assets/logo.png'}}
              style={{width: 130, height: 105}}
            />
          </View>

          <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: 40}}>
            {product.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}>
            <Text style={{fontSize: 19}}>{product.brand}</Text>
            <View
              style={{
                height: 30,
                width: 30,
                backgroundColor: product.like
                  ? 'rgba(0,0,0,0.2)'
                  : colours.primary, //'rgba(245, 42, 42,0.2)'
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="favorite"
                size={18}
                color={product.like ? colours.black : colours.white}
                onPress={() => unlikeProduct(product.id)}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    firestore()
      .collection('likes')
      .where('status', '==', 'liked')
      .onSnapshot(
        (querySnapshot) => {
          const newEntities = [];
          querySnapshot.forEach((doc) => {
            const like = doc.data();
            like.id = doc.id;
            newEntities.push(like);
          });
          setEntities(newEntities);
        },
        (error) => {
          console.log(error);
        },
      );
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: colours.secondary,
      }}>
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            color: colours.tertiary,
            marginStart: 11,
          }}>
          Likes
        </Text>
      </View>
      {entities && (
        <View style={styles.listContainer}>
          <FlatList
            columnWrapperStyle={{justifyContent: 'space-between'}}
            data={entities}
            numColumns={2}
            renderItem={({item}) => <Card product={item} />}
            //keyExtractor={(item) => item.id}
          />
        </View>
      )}
      {/* </SafeAreaView> </View> */}
    </SafeAreaView>
  );
}
export default LikesScreen