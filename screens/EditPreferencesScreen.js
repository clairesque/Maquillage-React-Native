import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import FormButton from '../components/FormButton';
import colours from '../constants/colours';
import {Switch} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import filters, {filtersNext} from '../constants/filters';
import {ScrollView} from 'react-native-gesture-handler';
import {AuthContext} from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const EditPreferencesScreen = ({navigation, route}) => {
    const {user, logout} = useContext(AuthContext);
  const {register} = useContext(AuthContext);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const [selectedAge, setSelectedAge] = useState('18-24 years');
  const [selectedType, setSelectedType] = useState('Dry');
  const [selectedFilterIndex, setSelectedFilterIndex] = React.useState("Vegan");
  const [types, setTypes] = useState([
    {ageRange: '', allergy: true, category: '', email: '', skinType: ''},
  ]);
  const details = route.params;
  
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

  const continueRegister = () => {
    firestore()
      .collection('preferences')
      .add({
        email: details[0].email,
        ageRange: selectedAge,
        allergy: isSwitchOn,
        skinType: selectedType,
        category: selectedFilterIndex
      })
      .then(() => {
        Alert.alert(
          'You have successfully registered!',
        );
        register(details[0].name, details[0].email, details[0].password)
      })
      .catch((error) => {
        console.log(
          'Something went wrong with this.',
          error,
        );
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Preferences</Text>
      <View style={styles.card}>
        <Text style={styles.question}>Age Range</Text>
        <Picker
          itemStyle={{height: 130}}
          selectedValue={types[0].ageRange}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedAge(itemValue)
          }>
          <Picker.Item
            label="Under 18 years"
            color={colours.tertiary}
            value="Under 18 years"
          />
          <Picker.Item
            label="18-24 years"
            color={colours.tertiary}
            value="18-24 years"
          />
          <Picker.Item
            label="Above 24 years"
            color={colours.tertiary}
            value="Above 24 years"
          />
        </Picker>
        <View
          style={{
            borderBottomColor: colours.secondary,
            borderBottomWidth: 6,
          }}
        />
        <View flexDirection="row">
          <Text style={styles.questionNext}>
            Do you have any {'\n'}
            skin allergies?
          </Text>
          <Switch
            value={types[0].allergy}
            onValueChange={onToggleSwitch}
            color={colours.primary}
            style={styles.toggle}
          />
        </View>
        <View
          style={{
            borderBottomColor: colours.secondary,
            borderBottomWidth: 6,
          }}
        />
        <Text style={styles.questionThree}>Skin Type</Text>
        <Picker
          itemStyle={{height: 130}}
          selectedValue={types[0].skinType}
          onValueChange={(itemValue, itemIndex) => setSelectedType(itemValue)}>
          <Picker.Item label="Normal" color={colours.tertiary} value="Normal" />
          <Picker.Item label="Dry" color={colours.tertiary} value="Dry" />
          <Picker.Item label="Oily" color={colours.tertiary} value="Oily" />
          <Picker.Item
            label="Combination"
            color={colours.tertiary}
            value="Combination"
          />
        </Picker>
        <View
          style={{
            borderBottomColor: colours.secondary,
            borderBottomWidth: 6,
          }}
        />
        <Text style={styles.questionThree}>Most Preferred Category</Text>
        <View flexDirection="column">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterListContainer}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.name}
                activeOpacity={0.8}
                onPress={() => setSelectedFilterIndex(types[0].category)}>
                <View
                  style={{
                    backgroundColor:
                      selectedFilterIndex == filter.name
                        ? colours.primary
                        : colours.white,
                    ...styles.filterBtn,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      marginLeft: 10,
                      color:
                        selectedFilterIndex == filter.name
                          ? colours.white
                          : colours.tertiary,
                    }}>
                    {filter.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterListContainer2}>
            {filtersNext.map((filter) => (
              <TouchableOpacity
                key={filter.name}
                activeOpacity={0.8}
                onPress={() => setSelectedFilterIndex(filter.name)}>
                <View
                  style={{
                    backgroundColor:
                      selectedFilterIndex == filter.name
                        ? colours.primary
                        : colours.white,
                    ...styles.filterBtn,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      marginLeft: 10,
                      color:
                        selectedFilterIndex == filter.name
                          ? colours.white
                          : colours.tertiary,
                    }}>
                    {filter.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
      <FormButton
        buttonTitle="Continue"
        style={styles.mainButton}
        // onPress={() => register(details[0].name, details[0].email, details[0].password)}
        onPress={() => continueRegister()}

      />
    </View>
  );
};

export default EditPreferencesScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    height: 850,
    backgroundColor: colours.secondary,
  },
  card: {
    height: 635,
    width: 350,
    backgroundColor: colours.white,
    borderRadius: 20,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 10,
    color: colours.tertiary,
  },
  toggle: {
    transform: [{scaleX: 1.3}, {scaleY: 1.3}],
    color: colours.tertiary,
    marginTop: 35,
    marginLeft: 90,
  },
  question: {
    fontSize: 20,
    marginTop: 20,
    marginLeft: 25,
    color: colours.tertiary,
  },
  questionNext: {
    fontSize: 20,
    marginLeft: 25,
    marginTop: 20,
    marginBottom: 20,
    color: colours.tertiary,
  },
  questionThree: {
    fontSize: 20,
    marginLeft: 25,
    marginTop: 20,
    color: colours.tertiary,
  },
  mainButton: {
    marginTop: 15,
    backgroundColor: colours.primary,
    padding: 15,
    width: 300,
    borderRadius: 10,
    alignItems: 'center',
  },
  filterListContainer: {
    paddingVertical: 5,
    alignItems: 'center',
    paddingHorizontal: 5,
    marginTop: 7,
  },
  filterListContainer2: {
    paddingVertical: 5,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  filterBtn: {
    height: 40,
    width: 105,
    borderRadius: 30,
    marginStart: 6,
    borderColor: colours.dark,
    borderWidth: 1,
    paddingRight: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
