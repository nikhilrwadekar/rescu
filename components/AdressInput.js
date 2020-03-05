import React from "react";
import {View} from "react-native";
import AppInput from "./AppInput";
import ProvinceSelector from "./ProvinceSelector";

export class AddressInput extends React.Component{
    state = {
        streetName: '',
        cityName:''
      };

      render(){
        const { streetName, cityName} = this.state;
        return(
            <View style={{ flex: 1, paddingRight: 40, paddingLeft: 40 }}>
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