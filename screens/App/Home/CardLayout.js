import React, { Component } from "react";
import { Text, StyleSheet, View, AsyncStorage } from "react-native";
import CardList from "react-native-card-animated-modal";
import { Button } from "react-native-elements";

// Initializing the socket variables on a global Level
import { clientSocket, adminSocket } from "../../../web-sockets";

// Connections!
import axios from "axios";
import { API_URL } from "../../../API";

// Top Header for Home
const Header = ({ name }) => {
  return (
    <View style={{ padding: 16, paddingBottom: 0 }}>
      <Text
        style={{
          fontSize: 14,
          color: "rgba(0, 0, 0, 0.5)"
        }}
      >
        Hello, {name}
      </Text>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Volunteering Opportunities For You
      </Text>
    </View>
  );
};

// OpportunityTaskCard Component
const OpportunityTaskCard = ({ opportunity }) => {
  return (
    <View
      style={{
        padding: 20,
        borderBottomLeftRadius: 10,
        bottomBottomRightRadius: 10
      }}
    >
      <Text
        style={{
          fontSize: 25,
          color: "rgba(0, 0, 0, 0.75)"
        }}
      >
        {opportunity.opportunity_type}
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: "rgba(0, 0, 0, 0.75)"
        }}
      >
        from {opportunity.opportunity_time.start} to{" "}
        {opportunity.opportunity_time.end}
      </Text>
      <Text
        style={{
          fontSize: 12,

          color: "rgba(0, 0, 0, 0.5)"
        }}
      >
        {opportunity.name}
      </Text>
      <Text
        style={{
          color: "rgba(0, 0, 0, 0.6)",
          fontSize: 16
        }}
      >
        needs {opportunity.opportunity_required} volunteers on{" "}
        {new Date(opportunity.opportunity_date).getDate()}/
        {new Date(opportunity.opportunity_date).getMonth()}/
        {new Date(opportunity.opportunity_date).getFullYear()}
      </Text>
    </View>
  );
};

// OpportunityTaskCard's Single View - When you click on a card
const OpportunitySingleView = ({ opportunity, onRequestPressed }) => {
  return (
    <View style={{ paddingVertical: 25, paddingHorizontal: 25 }}>
      <View style={{ position: "", bottom: 0, marginBottom: 20 }}>
        <Button
          title={
            !opportunity.opportunity_requested.includes(
              "nikhilrwadekar@gmail.com"
            ) &&
            !opportunity.opportunity_assigned.includes(
              "nikhilrwadekar@gmail.com"
            )
              ? "Request to Volunteer"
              : opportunity.opportunity_assigned.includes(
                  "nikhilrwadekar@gmail.com"
                )
              ? "Assigned"
              : "Requested"
          }
          disabled={
            opportunity.opportunity_requested.includes(
              "nikhilrwadekar@gmail.com"
            ) ||
            opportunity.opportunity_assigned.includes(
              "nikhilrwadekar@gmail.com"
            )
          }
          raised
          color="white"
          onPress={onRequestPressed}
        />
      </View>
      <Text style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: 18, flex: 1 }}>
        {opportunity.description}
      </Text>
    </View>
  );
};

// Main Component
export default class CardLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      googleDetails: null,
      userDetails: null
    };
  }

  async componentDidMount() {
    // Email Sign In
    const email = await AsyncStorage.getItem("userDetails");
    let userDetails = JSON.parse(email);
    this.setState({ userDetails });

    // Google Sign In
    const google = await AsyncStorage.getItem("googleSignInDetails");
    let googleDetails = JSON.parse(google);
    this.setState({ googleDetails });

    // Connecting to Sockets
    adminSocket.connect();
    clientSocket.connect();

    // Logging when connected to Sockets
    clientSocket.on("connect", () => {
      console.log("Mobile Connected to Client Socket");
    });

    adminSocket.on("connect", () => {
      console.log("Mobile Connected to Admin Socket");
    });
  }

  handleRequestPressed = async opportunity => {
    // Asking admin to get requests! via Web Sockets
    adminSocket.emit("getRequests", opportunity);

    // Do the usual updates
    await axios
      .put(
        `${API_URL}/user/id/nikhilrwadekar@gmail.com/volunteer/${opportunity.opportunity_id}`
      )
      .then(response => {
        opportunity.opportunity_requested.push("nikhilrwadekar@gmail.com");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { reliefCenters } = this.props;
    return (
      <CardList
        // Indivual OpportunityTaskCard Styles
        cardContainerStyle={{
          backgroundColor: "#fff"
        }}
        // Single View OpportunityTaskCard Styles
        detailsContainerStyle={{}}
        listContainerStyle={{}}
        safeAreaStyle={{ backgroundColor: "rgb(250,250,250)" }}
        // Header Is Rendered Here
        listProps={{
          ListHeaderComponent: () => (
            <Header
              name={
                this.state.userDetails
                  ? this.state.userDetails.name
                  : "Unknown User"
              }
            />
          )
        }}
        data={reliefCenters}
        renderItem={({ item, index }) => {
          /* Default card when not specified */
          return <OpportunityTaskCard opportunity={item.reliefCenter} />;
        }}
        renderDetails={({ item, index }) => {
          /* You can also provide custom content per item */
          return (
            <OpportunitySingleView
              opportunity={item.reliefCenter}
              onRequestPressed={() =>
                this.handleRequestPressed(item.reliefCenter)
              }
            />
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({});
