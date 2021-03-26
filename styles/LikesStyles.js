import {Dimensions, StyleSheet} from 'react-native';
import colours from '../constants/colours';

const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

export default StyleSheet.create({
  listContainer: {
    marginTop: 20,
    padding: 20,
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
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: colours.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 55
  },
});
