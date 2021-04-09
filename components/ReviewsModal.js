import React from 'react';
import {KeyboardAvoidingView} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colours from '../constants/colours';

export default class ReviewsModal extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView styles={styles.container} behaviour="padding">
        <TouchableOpacity
          style={{position: 'absolute', top: 64, right: 32}}
          onPress={() => this.props.closeModal()}>
          <Icon name="close" size={24} color={colours.dark} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});
