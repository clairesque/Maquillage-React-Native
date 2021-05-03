import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import ReviewsModal from '../components/ReviewsModal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colours from '../constants/colours';
import firestore from '@react-native-firebase/firestore';

class ReviewsScreen extends React.Component {
  state = {
    isModalVisible: false,
    review: '',
    item: this.props.route.params,
    reviews: [],
    username: '',
  };

  toggleModal() {
    this.setState({isModalVisible: !this.state.isModalVisible});
  }

  reviewsDb = firestore().collection('reviews');
  getReviews() {
    this.reviewsDb
      .get()
      .then((snapshot) => {
        const allReviews = [];
        snapshot.forEach((doc) => {
          const review = doc.data();
          review.id = doc.id;
          allReviews.push(review);
        }),
          this.setState({
            reviews: allReviews,
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidMount() {
    // toggle modal
    if (this.state.item) {
      this.setState({
        isModalVisible: true,
      });
    } else {
      this.setState({
        isModalVisible: false,
      });
    }

    // get values from collection
    this.getReviews();

    // get user's name using their email
    if (this.state.item) {
      firestore()
        .collection('users')
        .where('email', '==', this.props.route.params.user.email)
        .onSnapshot((querySnapshot) => {
          var name = '';
          querySnapshot.forEach((doc) => {
            name = doc._data['name'];
          });
          this.setState({
            username: name,
          });
        });
    }
  }

  checkReviews(productName) {
    firestore()
      .collection('reviews')
      .where('name', '==', productName)
      .onSnapshot(
        (querySnapshot) => {
          if (querySnapshot['_docs'].length == 0) {
            this.addReview();
          } else {
            querySnapshot.forEach((doc) => {
              this.updateReview(doc.id);
            });
          }
        },
        (error) => {
          console.log(error);
        },
      );
  }

  addReview() {
    username = this.state.username;
    firestore()
      .collection('reviews')
      .add({
        brand: this.state.item.brand,
        name: this.state.item.name,
        tag_list: this.state.item.tag_list,
        product_colors: this.state.item.product_colors,
        description: this.state.item.description,
        image_link: this.state.item.image_link,
        review: [{name: username, review: this.state.review}],
      })
      .then(() => {
        this.setState({
          isModalVisible: false,
        });
        this.getReviews();
        setTimeout(function () {
          alert(`Your review has been successfully added.`);
        }, 2000);
      })
      .catch((error) => {
        console.log('Something went wrong with this.');
      });
  }

  updateReview(id) {
    newReview = {name: this.state.username, review: this.state.review};
    firestore()
      .collection('reviews')
      .doc(id)
      .update({
        review: firestore.FieldValue.arrayUnion(newReview),
      })
      .then(() => {
        this.setState({
          isModalVisible: false,
        });
        this.getReviews();
        setTimeout(function () {
          alert(`Your review has been successfully added.`);
        }, 100);
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
                    placeholderTextColor={colours.grey}
                  />
                </View>

                <TouchableOpacity
                  style={styles.add}
                  onPress={() =>
                    this.checkReviews(this.props.route.params.name)
                  }>
                  <Text style={{color: colours.white, fontWeight: '600'}}>
                    Add
                  </Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </View>
          </View>
        </Modal>
        <View style={styles.mainContainer}>
          {this.state.reviews && (
            <FlatList
              data={this.state.reviews}
              renderItem={({item}) => <ReviewsModal product={item} />}
            />
          )}
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
    backgroundColor: colours.white,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colours.white,
  },
  title: {
    fontSize: 23,
    fontWeight: '800',
    color: colours.tertiary,
    alignSelf: 'center',
    marginTop: 20,
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
