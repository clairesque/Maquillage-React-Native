import React, {useState, useContext, useEffect} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Alert,
  FlatList,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import {SearchBar} from 'react-native-elements';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colours from '../constants/colours';
import {filtersAll} from '../constants/filters';
import products from '../constants/products';
import {ActivityIndicator} from 'react-native-paper';

const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const HomeScreen = ({navigation}) => {
  const {user, logout} = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [like, setLike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [selectedFilterIndex, setSelectedFilterIndex] = React.useState(0);

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
          <View style={{alignItems: 'center', top: -40}}>
            <Image
              source={{uri: product.image_link}}
              style={{height: 120, width: 120}}
              defaultSource={{
                uri: '/Users/apple/Developer/maquillage/assets/logo.png',
              }}
            />
          </View>
          <View style={{marginHorizontal: 20}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}>
              {product.name && product.brand ? splitProduct(product.name, product.brand) : product.name}
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
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            ${product.price}
          </Text>
          <View style={styles.addToCartBtn}>
            <Icon
              name="favorite"
              size={15}
              color={colours.white}
              onPress={() => likeProduct(product)}
            />
          </View>
        </View>
      </View>
    );
  };

  const likeProduct = async (item) => {
    firestore()
      .collection('likes')
      .add({
        userId: user.uid,
        brand: item.brand,
        name: item.name,
        tag_list: item.tag_list,
        description: item.description,
        image_link: item.image_link,
        status: 'liked',
      })
      .then(() => {
        Alert.alert('You have liked this product.');
        setLike(null);
      })
      .catch((error) => {
        console.log('Something went wrong with this.', error);
      });
  };

  useEffect(() => {
    fetch('http://makeup-api.herokuapp.com/api/v1/products.json')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
        if (loading) {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const searchName = item.name
          ? item.name.toLowerCase()
          : ''.toLowerCase();
        const searchBrand = item.brand
          ? item.brand.toLowerCase()
          : ''.toLowerCase();
        const textData = text.toLowerCase();
        return (searchName + searchBrand).indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const filterFunction = (text, index) => {
    setSelectedFilterIndex(index);
    const newData = masterDataSource.filter(function (item) {
      const tags = item.tag_list.toString();
      const searchName = tags ? tags.toLowerCase() : ''.toLowerCase();
      const textData = text.toLowerCase();
      return searchName.indexOf(textData) > -1;
    });
    setFilteredDataSource(newData);
  };
  
  const ListFilters = () => {
    return !loading ? (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterListContainer}>
        {filtersAll.map((filter, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => filterFunction(filter.name, index)}>
            <View
              style={{
                backgroundColor:
                  selectedFilterIndex == index
                    ? colours.secondary
                    : colours.grey,
                ...styles.filterBtn,
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginLeft: 10,
                  color:
                    selectedFilterIndex == index ? colours.white : colours.dark,
                }}>
                {filter.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    ) : (
      <View style={styles.containerActivity}>
        <ActivityIndicator
          color={colours.tertiary}
          size="large"
          style={styles.activityIndicator}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <SearchBar
          round
          inputStyle={{backgroundColor: colours.grey}}
          containerStyle={{backgroundColor: colours.grey}}
          inputContainerStyle={{backgroundColor: colours.grey}}
          containerStyle={{
            backgroundColor: 'white',
            borderWidth: 1,
            borderRadius: 5,
            width: '85%',
            marginLeft: '8%',
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
            borderWidth: 0,
          }}
          searchIcon={{size: 24}}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Search for products..."
          value={search}
        />
        <View>
          <ListFilters />
        </View>
        <FlatList
          data={filteredDataSource}
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
  },
  itemStyle: {
    padding: 10,
  },
  filterListContainer: {
    paddingVertical: 10,
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
    height: 220,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: colours.white,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 10,
    backgroundColor: colours.secondary,
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
    height: 80,
  },
});

export default HomeScreen;
