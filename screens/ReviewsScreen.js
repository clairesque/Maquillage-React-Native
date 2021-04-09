import React, {Component} from 'react';
import {Modal} from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {View, Text, StyleSheet, TextInput, Alert} from 'react-native';
import ReviewsModal from '../components/ReviewsModal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colours from '../constants/colours';
import {Dimensions} from 'react-native';
import firestore from '@react-native-firebase/firestore';

class ReviewsScreen extends React.Component {
  state = {
    isModalVisible: false,
    review: '',
    item: this.props.route.params,
  };

  toggleModal() {
    this.setState({isModalVisible: !this.state.isModalVisible});
  }

  componentDidMount() {
    if (this.state.item) {
      this.setState({
        isModalVisible: true,
      });
    } else {
      this.setState({
        isModalVisible: false,
      });
    }
  }

  addReview() {
    firestore()
      .collection('reviews')
      .add({
        userEmail: this.state.item.user.email,
        brand: this.state.item.brand,
        name: this.state.item.name,
        tag_list: this.state.item.tag_list,
        product_colors: this.state.item.product_colors,
        description: this.state.item.description,
        image_link: this.state.item.image_link,
        review: this.state.review,
      })
      .then(() => {
        this.setState({
          isModalVisible: false,
        });
      })
      .catch((error) => {
        console.log('Something went wrong with this.');
      });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Modal
          transparent={true}
          animationType="fade"
          visible={this.state.isModalVisible}
          onRequestClose={() => this.toggleModal()}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#00000080',
            }}>
            <View
              style={{
                width: 350,
                height: 350,
                justifyContent: 'center',
                alignSelf: 'center',
                backgroundColor: colours.white,
                borderRadius: 30,
                backgroundColor: '#fff',
              }}>
              {/* <ReviewsModal closeModal={() => this.toggleModal()} /> */}
              <TouchableOpacity
                style={{position: 'absolute', top: 40, right: 32}}
                onPress={() => this.toggleModal()}>
                <Icon name="close" size={24} color={colours.dark} />
              </TouchableOpacity>
              <KeyboardAvoidingView
                styles={styles.container}
                behaviour="padding">
                <View style={{alignSelf: 'stretch', marginHorizontal: 32}}>
                  <Text style={styles.title}> What's your review? </Text>
                  <TextInput
                    value={this.state.review}
                    onChangeText={(text) => this.setState({review: text})}
                    style={styles.input}
                    autoCapitalize="none"
                    labelValue={this.state.review}
                    placeholder="Your review..."
                  />
                </View>

                <TouchableOpacity
                  style={styles.add}
                  onPress={() => this.addReview()}>
                  <Text style={{color: colours.white, fontWeight: '600'}}>
                    Add
                  </Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </View>
          </View>
        </Modal>
        <View>
          <TouchableOpacity onPress={() => this.toggleModal()}>
            <Text> click me </Text>
          </TouchableOpacity>
        </View>
      </View>
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
  title: {
    fontSize: 23,
    fontWeight: '800',
    color: colours.tertiary,
    alignSelf: 'center',
    marginTop: 20,
    // marginBottom: 10,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    width: 300,
    borderColor: colours.tertiary,
    borderRadius: 6,
    height: 50,
    marginTop: 10,
    paddingHorizontal: 18,
    right: 10,
    fontSize: 18,
  },
  add: {
    marginTop: 10,
    marginStart: 22,
    height: 50,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colours.primary,
    width: 300,
  },
});

export default ReviewsScreen;
