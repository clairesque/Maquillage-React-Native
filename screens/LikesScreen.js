import React, {useEffect, useState, useContext} from 'react';
import {FlatList, Text, Image, TouchableHighlight, View} from 'react-native';
import styles from '../styles/LikesStyles';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import colours from '../constants/colours';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';

export default function LikesScreen(props) {
  const [entities, setEntities] = useState([]);
  const {user, logout} = useContext(AuthContext);

  const unlikeProduct = async (id) => {

    firestore()
      .collection('likes')
      .doc(id)
      .update({
        status: "unliked",
      })
      .then(() => {
          console.log("unliked");
        Alert.alert(
          'You have unliked this product!',
        );
      });
  };

  const Card = ({product}) => {
    return (
   //   <TouchableHighlight underlayColor={colours.white} activeOpacity={0.9}>
        <View style={styles.card}>
          <View style={{alignItems: 'center', bottom: 20}}>
            <Image
              source={{uri: product.image_link}}
              style={{height: 120, width: 120}}
            />
          </View>
          <View style={{marginHorizontal: 20}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              {product.name}
            </Text>
            <Text style={{fontSize: 14, color: colours.dark, marginTop: 2}}>
              {product.brand}
            </Text>
          </View>
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={styles.addToCartBtn}>
              <Icon name="heart" size={15} color={colours.white} onPress={() => unlikeProduct(product.id)}/>
            </View>
          </View>
        </View>
    //   </TouchableHighlight>
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
    <View>
      {entities && (
        <View style={styles.listContainer}>
          <FlatList
            data={entities}
            numColumns={2}
            renderItem={({item}) => <Card product={item} />}
            //keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </View>
  );
}
