import React from "react";
import { View, AsyncStorage } from "react-native";
import AppInput from "./AppInput";
import ProvinceSelector from "./ProvinceSelector";

export class AddressInput extends React.Component {
  state = {
    streetName: "",
    cityName: ""
  };

  _storeData = async () => {
    try {
      console.log("Trying to store data..");
      await AsyncStorage.setItem("AddressInput", JSON.stringify(this.state));
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  _retrieveData = async () => {
    try {
      console.log("Trying to retrieve data..");
      const AddressInputState = await AsyncStorage.getItem("AddressInput");
      if (AddressInputState !== null) {
        // We have data!!
        console.log(AddressInputState);
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
        <AppInput
          label="StreetName"
          value={streetName}
          onChange={streetName => this.setState({ streetName })}
        />
        <AppInput
          label="City"
          value={cityName}
          onChange={cityName => this.setState({ cityName })}
        />

        <ProvinceSelector />
      </View>
    );
  }
}
export default AddressInput;
