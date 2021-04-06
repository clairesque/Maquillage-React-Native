import {Dimensions, StyleSheet} from 'react-native';
import colours from '../constants/colours';

export default StyleSheet.create({
  listContainer: {
    marginTop: 20,
  },
  card: {
    height: 210,
    backgroundColor: colours.white,
    width: 180,
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
  recText: {
    fontSize: 15,
    color: colours.tertiary,
    fontWeight: 'bold',
    paddingTop: 2
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: colours.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 55,
  },
});
