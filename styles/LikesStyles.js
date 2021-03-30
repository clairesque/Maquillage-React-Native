import {Dimensions, StyleSheet} from 'react-native';
import colours from '../constants/colours';

const width = Dimensions.get('window').width / 2 - 30;

export default StyleSheet.create({
  listContainer: {
    marginTop: 20,
  },
  card: {
    height: 225,
    backgroundColor: colours.white,
    width,
    marginHorizontal: 5,
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
