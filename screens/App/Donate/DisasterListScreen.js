import React, { Component } from "react";
import {
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  FlatList,
  AsyncStorage,
} from "react-native";
import DisasterListItem from "../../../components/DisasterListItem";
import { TouchableOpacity } from "react-native-gesture-handler";

// API URL, API CALL
import { apiCall } from "../../../API";

export class DisasterListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disasters: [],
    };
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem("accessToken");

    apiCall(token, "/disaster", "GET")
      .then((res) => res.data)
      .then((disasters) => this.setState({ disasters }));
  }

  render() {
    const { disasters } = this.state;
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Text
          style={{
            textAlign: "center",
            marginTop: 25,
            fontSize: 25,
            fontFamily: "Quicksand-Medium",
            color: "#383940",
          }}
        >
          Donate to a cause
        </Text>

        <FlatList
          style={{ flex: 1 }}
          keyExtractor={(item) => item._id}
          data={disasters}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.DisasterItem}
              onPress={() => {
                const { params } = this.props.navigation.state;
                const { type } = params;
                if (type == "withID")
                  navigation.navigate("DonateSingleViewWithID", {
                    type: "withID",
                    disaster_id: item._id,
                    disaster_title: item.name,
                    disaster_description: item.description,
                    disaster_image: item.image_url,
                  });
                else if (type == "withoutID")
                  navigation.navigate("DonateSingleViewWithoutID", {
                    type: "withoutID",
                    disaster_id: item._id,
                    disaster_title: item.name,
                    disaster_description: item.description,
                    disaster_image: item.image_url,
                  });
              }}
            >
              <DisasterListItem
                name={item.name}
                itemExcerpt={item.description.substring(0, 90).concat("...")}
                imgDLIUrl={{ uri: item.image_url[0] }}
                location={`${item.city}, ${item.country}`}
              />
            </TouchableOpacity>
          )}
        />
        {this.props.navigation.state.params.type === "withoutID" && (
          <Button
            title="Cancel"
            onPress={() => {
              this.props.navigation.navigate("SignIn");
            }}
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: "#f7f7f7",
    // textAlign: "center"
  },
  DisasterItem: {
    marginVertical: 15,
    borderRadius: 10,
    borderColor: "black",
  },
});

DisasterListScreen.navigationOptions = {
  title: "Donate",
  header: undefined,
};

export default DisasterListScreen;
