import React, {useState, useContext, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import colours from '../constants/colours';
import styles from '../styles/Carousel';
import {sliderWidth, itemWidth} from '../styles/SliderEntry';
import Carousel from 'react-native-snap-carousel';
import SliderEntry from '../components/SliderEntry';
import products from '../constants/products';
import {AuthContext} from '../navigation/AuthProvider';

const RecommendationsScreen = ({navigation}) => {
  const SLIDER_1_FIRST_ITEM = 1;

  const {user, logout} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [slider1ActiveSlide, setSlider] = useState(SLIDER_1_FIRST_ITEM);
  const [types, setTypes] = useState([
    {ageRange: '', allergy: true, category: '', email: '', skinType: ''},
  ]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    fetch('http://makeup-api.herokuapp.com/api/v1/products.json')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    firestore()
      .collection('preferences')
      .where('email', '==', user.email)
      .onSnapshot(
        (querySnapshot) => {
          const newTypes = [];
          querySnapshot.forEach((doc) => {
            const type = doc.data();
            newTypes.push(type);
          });
          setTypes(newTypes);
        },
        (error) => {
          console.log(error);
        },
      );
  }, []);

  // useEffect(() => {
  //   getTypes();
  //   navigation.addListener('focus', () => setLoading(!loading));
  // }, [navigation, loading]);

  getByDescription = (text) => {
    var newData = [];
    if (text) {
      newData = filteredDataSource.filter(function (item) {
        const searchName = item.description
          ? item.description.toLowerCase()
          : ''.toLowerCase();
        const textData = text.toLowerCase();
        return searchName.indexOf(textData) > -1;
      });
    }
    return newData;
  };

  getByTags = (text) => {
    var newData = [];
    if (text) {
      newData = filteredDataSource.filter(function (item) {
        const tags = item.tag_list.toString();
        const searchName = tags ? tags.toLowerCase() : ''.toLowerCase();
        const textData = text.toLowerCase();
        return searchName.indexOf(textData) > -1;
      });
    }
    return newData;
  };
  _renderItem = ({item, index}) => {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  };
  _renderItemWithParallax = ({item, index}, parallaxProps) => {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  };
  defaultSlider = (number, skinType, filteredDataSource) => {
    return (
      <View style={styles.exampleContainer}>
        <Text style={styles.titleDefault}>{`Recommendation ${number}`}</Text>
        <Text style={styles.subtitle}>
          Since you have <Text style={{fontWeight: 'bold'}}>{skinType}</Text>{' '}
          skin...
        </Text>
        <Carousel
          ref={(c) => (this._slider1Ref = c)}
          data={filteredDataSource}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={2}
          autoplay={true}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={(index) => setSlider({index})}
        />
      </View>
    );
  };
  layout = (number, productType, filteredDataSource) => {
    return (
      <View style={[styles.exampleContainer, styles.exampleContainerLight]}>
        <Text
          style={[
            styles.title,
            styles.titleDark,
          ]}>{`Recommendation ${number}`}</Text>
        <Text style={[styles.subtitle]}>
          Few <Text style={{fontWeight: 'bold'}}>{productType}</Text> products
          for you...
        </Text>
        <Carousel
          data={filteredDataSource}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          layout={'stack'}
          loop={true}
        />
      </View>
    );
  };

  const skinType = types[0].skinType.toLowerCase();
  const productType = types[0].category.toLowerCase();

  var skinRecommender = defaultSlider(1, skinType, getByDescription(skinType));
  var typeRecommender = layout(2, productType, getByTags(productType));

  return (
    <View
      style={style.container}
      scrollEventThrottle={200}
      directionalLockEnabled={true}>
      {skinRecommender}
      {typeRecommender}
    </View>
  );
};

export default RecommendationsScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.secondary,
  },
});
