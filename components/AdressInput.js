import React from "react";
import { View, AsyncStorage, StyleSheet } from "react-native";
import AppInput from "./AppInput";
import ProvinceSelector from "./ProvinceSelector";

export class AddressInput extends React.Component {
  render() {
    // Values
    const { addressLine, city, province, postalCode, country } = this.props;

    // Handlers
    const {
      onAddressLineChange,
      onCityChange,
      onProvinceChange,
      onPostalCodeChange,
      onCountryChange
    } = this.props;
    // const { streetName, cityName } = this.state;
    return (
      <View style={{ paddingRight: 40, paddingLeft: 40 }}>
        <View style={styles.addressLabel}>
          <AppInput
            label="Address Line"
            placeholderValue="66 63rd Avenue"
            value={addressLine}
            onChange={onAddressLineChange}
          />
        </View>

        <View style={styles.addressLabel}>
          <AppInput
            label="City"
            placeholderValue="Vancouver"
            value={city}
            onChange={onCityChange}
          />
        </View>

        <ProvinceSelector onProvinceChange={onProvinceChange} />
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
