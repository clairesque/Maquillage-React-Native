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
import {Icon} from 'react-native-eva-icons';
import {ScrollView} from 'react-native';

function LikesScreen({navigation}) {
  const [entities, setEntities] = useState([]);
  const {user, logout} = useContext(AuthContext);

  const unlikeProduct = async (id) => {
    firestore()
      .collection('likes')
      .doc(id)
      .update({
        status: 'unliked',
      })
      .then(() => {});
  };
  function splitProduct(name, brand) {
    if (name.toLowerCase().includes(brand.toLowerCase())) {
      filteredName = name.toLowerCase().replace(brand + ' ', '');
      return filteredName;
    } else {
      return name;
    }
  }

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
          <View style={{marginHorizontal: 20, marginTop: 20}}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}>
              {product.name && product.brand
                ? splitProduct(product.name, product.brand)
                : product.name}
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
          {product.price==0 ? (
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
          $25.0
          </Text>
          ):(
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            ${product.price}
            </Text>
            )
          }
          <View style={styles.addToCartBtn}>
            {product.status == 'liked' ? (
              <Icon
                name="heart"
                height={25}
                width={25}
                fill={colours.tertiary}
                onPress={() => unlikeProduct(product.id)}
              />
            ) : (
              <Icon
                name="heart-outline"
                height={25}
                width={25}
                fill={colours.tertiary}
                onPress={() => unlikeProduct(product.id)}
              />
            )}
          </View>
        </View>
      </View>
    );
  };
  // const Card = ({product}) => {
  //   return (
  //     <TouchableOpacity
  //       underlayColor={colours.white}
  //       activeOpacity={0.8}
  //       onPress={() => navigation.navigate('ProductScreen', product)}>
  //       <View style={styles.card}>
  //         <View
  //           style={{
  //             height: 80,
  //             alignItems: 'center',
  //           }}>
  //           <Image
  //             source={{uri: product.image_link}}
  //             defaultSource={{
  //               uri: '/Users/apple/Developer/maquillage/assets/logo.png',
  //             }}
  //             style={{height: 100, width: 100, borderRadius: 50, top: 10}}
  //           />
  //         </View>
  //         <View style={{marginHorizontal: 15, marginTop: 40}}>
  //           <Text
  //             style={{
  //               fontSize: 15,
  //               fontWeight: 'bold',
  //               textTransform: 'capitalize',
  //             }}>
  //             {product.name}
  //           </Text>
  //         </View>
  //         <View
  //           style={{
  //             flexDirection: 'row',
  //             justifyContent: 'space-between',
  //             marginTop: 5,
  //           }}>
  //           <Text style={{fontSize: 14, color: colours.dark, marginTop: 2}}>
  //             {product.brand}
  //           </Text>
  //           {product.status == 'liked' ? (
  //             <Icon
  //               name="heart"
  //               height={25}
  //               width={25}
  //               fill={colours.tertiary}
  //               onPress={() => unlikeProduct(product.id)}
  //             />
  //           ) : (
  //             <Icon
  //               name="heart-outline"
  //               height={22}
  //               width={22}
  //               fill={colours.tertiary}
  //               onPress={() => unlikeProduct(product.id)}
  //             />
  //           )}
  //         </View>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

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
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colours.white,
      }}>
      <View style={styles.header}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: colours.primary,
            marginStart: 11,
          }}>
          Likes
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Recommendations')}>
          <View flexDirection="row" style={{marginLeft: 100, marginTop: 10}}>
            <Text style={styles.recText}> Recommendations</Text>
            <Icon name="chevron-right" height={25} width={25} />
          </View>
        </TouchableOpacity>
      </View>
      {entities.length==0 && (
        <Text style={styles.noLikes}> You have no liked products. </Text>
      )
}
      {entities && (
        <View style={styles.listContainer}>
          <FlatList
            data={entities}
            style={{marginTop: 15, marginLeft: 6}}
            numColumns={2}
            renderItem={({item}) => <Card product={item} />}
            //keyExtractor={(item) => item.id}
          />
        </View>
      )}
      {/* </SafeAreaView> </View> */}
    </ScrollView>
  );
}
export default LikesScreen;
