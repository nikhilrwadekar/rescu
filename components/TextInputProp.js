import React from "react";
import {View} from "react-native";
import AppInput from "./AppInput";

export class TextInputProp extends React.Component{
    state = {
        userName: ''
      };

      render(){
        const { userName} = this.state;
        return(
            <View style={{ flex: 1, paddingRight: 40, paddingLeft: 40 }}>
                <AppInput
                label="Name"
                value={userName}
                onChange={userName => this.setState({ userName })}
                />
        </View>
        );
      }
}
export default TextInputProp;