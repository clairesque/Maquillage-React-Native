import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import colours from '../constants/colours';
import styles from '../styles/Carousel';
import {sliderWidth, itemWidth} from '../styles/SliderEntry';
import Carousel from 'react-native-snap-carousel';
import SliderEntry from '../components/SliderEntry';
import products from '../constants/products';
const SLIDER_1_FIRST_ITEM = 1;

export default class AddPostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
    };
  }

  getByDescription(text) {
    var newData = [];
    if (text) {
      newData = products.filter(function (item) {
        const searchName = item.description
          ? item.description.toLowerCase()
          : ''.toLowerCase();
        const textData = text.toLowerCase();
        return searchName.indexOf(textData) > -1;
      });
    }
    return newData;
  }

  getByTags(text) {
    var newData = [];
    if (text) {
      newData = products.filter(function (item) {
        const tags = item.tag_list.toString();
        const searchName = tags ? tags.toLowerCase() : ''.toLowerCase();
        const textData = text.toLowerCase();
        return searchName.indexOf(textData) > -1;
      });
    }
    return newData;
  }
  _renderItem({item, index}) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }
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
  default(number, skinType, products) {
    return (
      <View style={styles.exampleContainer}>
        <Text style={styles.titleDefault}>{`Recommendation ${number}`}</Text>
        <Text style={styles.subtitle}>Since you have <Text style={{fontWeight: 'bold'}}>{skinType}</Text> skin...</Text>
        <Carousel
          ref={(c) => (this._slider1Ref = c)}
          data={products}
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
          onSnapToItem={(index) => this.setState({slider1ActiveSlide: index})}
        />
      </View>
    );
  }
  layout(number, productType, products) {
    return (
      <View style={[styles.exampleContainer, styles.exampleContainerLight]}>
        <Text
          style={[
            styles.title,
            styles.titleDark,
          ]}>{`Recommendation ${number}`}</Text>
        <Text style={[styles.subtitle]}>Few <Text style={{fontWeight: 'bold'}}>{productType}</Text> products for you...</Text>
        <Carousel
          data={products}
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
  }
  render() {
    const skinType = 'dry';
    const productType = 'natural';
    const skinRecommender = this.default(
      1,
      skinType,
      this.getByDescription(skinType),
    );
    const typeRecommender = this.layout(
      2,
      productType,
      this.getByTags(productType),
    );
    return (
      <View
        style={style.container}
        scrollEventThrottle={200}
        directionalLockEnabled={true}>
        {skinRecommender}
        {typeRecommender}
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.secondary,
  },
});
