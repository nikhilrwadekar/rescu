import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import EncourageLogin from "../../../components/EncourageLogin";

export class EncourageLoginScreen extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          encouragingText: "Whitout volunteers, we'd be a nation without a soul",
          buttonText: "Login",
        };
      }
      
    
      render() {
        const {encouragingText, buttonText, onPressLogin} = this.state;
        return (
          <View style={styles.container}>
            <EncourageLogin
              encouragingText={encouragingText}
              buttonText={buttonText}
              onPressLogin={onPressLogin}
            />
          </View>
        );
      }
    }
    
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 10,
        textAlign: "center"
      }
    });
export default EncourageLoginScreen;


