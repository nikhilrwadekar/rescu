import React from "react";
import { View, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  ListItem,
  Text,
  Radio,
  Right,
  Left
} from "native-base";

const styles = StyleSheet.create({
  inputStyle: {
    height: 140,
    paddingLeft: 40
  },
  cont: {
    backgroundColor: "black"
  }
});

const TimeAvailability = ({ setPreference, preference }) => (
  <View style={styles.inputStyle}>
    <Text
      style={{
        fontFamily: "OpenSans-Regular",
        fontSize: 17,
        fontWeight: "100"
      }}
    >
      Choose your availability
    </Text>
    <Container style={{ marginRight: 40, borderRadius: 10, marginTop: 2 }}>
      {/* <Header /> */}
      <Content>
        <ListItem
          onPress={() => {
            setPreference("anytime");
          }}
        >
          <Left>
            <Text
              style={{
                fontFamily: "OpenSans-Regular",
                fontSize: 16,
                fontWeight: "100"
              }}
            >
              Anytime
            </Text>
          </Left>
          <Right>
            <Radio
              color={"#f0ad4e"}
              selectedColor={"#f27821"}
              selected={preference == "anytime"}
            />
          </Right>
        </ListItem>
        <ListItem
          onPress={() => {
            setPreference("preferred");
          }}
        >
          <Left>
            <Text
              style={{
                fontFamily: "OpenSans-Regular",
                fontSize: 16,
                fontWeight: "100"
              }}
            >
              Preferred
            </Text>
          </Left>
          <Right>
            <Radio
              color={"#f0ad4e"}
              selectedColor={"#f27821"}
              selected={preference == "preferred"}
            />
          </Right>
        </ListItem>
      </Content>
    </Container>
  </View>
  //     );
  //   }
  // }
);

export default TimeAvailability;
