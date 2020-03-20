import React from "react";
import { View, AsyncStorage, StyleSheet } from "react-native";
import AppInput from "./AppInput";
import ProvinceSelector from "./ProvinceSelector";

export class AddressInput extends React.Component {
  state = {
    streetName: "",
    cityName: ""
  };

  _storeData = async () => {
    try {
      await AsyncStorage.setItem("AddressInput", JSON.stringify(this.state));
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  _retrieveData = async () => {
    try {
      const AddressInputState = await AsyncStorage.getItem("AddressInput");
      if (AddressInputState !== null) {
        // We have data!!
        this.setState(JSON.parse(AddressInputState));
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  async componentDidMount() {
    this._retrieveData();
  }

  async componentDidUpdate() {
    this._storeData();
  }

  render() {
    const { streetName, cityName } = this.state;
    return (
      <View style={{ paddingRight: 40, paddingLeft: 40 }}>
        <View style={styles.addressLabel}>
          <AppInput
            label="Address Line"
            placeholderValue="66 63rd Avenue"
            value={streetName}
            onChange={streetName => this.setState({ streetName })}
          />
        </View>

        <View style={styles.addressLabel}>
          <AppInput
            label="City"
            placeholderValue="Vancouver"
            value={cityName}
            onChange={cityName => this.setState({ cityName })}
          />
        </View>

        <ProvinceSelector />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addressLabel: {
    marginTop: 22,
    fontFamily: "OpenSans-Light"
  }
});

export default AddressInput;
