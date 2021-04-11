import {Dimensions, StyleSheet} from 'react-native';
import colours from '../constants/colours';
const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;
export default StyleSheet.create({
  listContainer: {
    marginTop: 20,
    flex: 1,
  },
  card: {
    width: cardWidth,
    marginHorizontal: 7,
    marginBottom: 12,
    borderRadius: 15,
    elevation: 13,
    borderWidth: 1.5,
    backgroundColor: colours.white,
  },
  header: {
    marginTop: 30,
    marginStart: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recText: {
    fontSize: 15,
    color: colours.tertiary,
    fontWeight: 'bold',
    paddingTop: 2,
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    bottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
