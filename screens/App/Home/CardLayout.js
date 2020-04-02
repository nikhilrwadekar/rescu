import React, { Component } from "react";
import { Text, StyleSheet, View, AsyncStorage } from "react-native";
import CardList from "react-native-card-animated-modal";
import { Button } from "react-native-elements";
import RequestVolunteerButton from "../../../components/RequestVolunteerButton";

// Initializing the socket variables on a global Level
import { clientSocket, adminSocket } from "../../../web-sockets";

// Connections!
import axios from "axios";
import { API_URL } from "../../../API";

// Moment!
import moment from "moment";

// Top Header for Home
const Header = ({ name }) => {
  return (
    <View style={{ padding: 16, paddingBottom: 0 }}>
      <Text
        style={{
          fontSize: 14,
          color: "rgba(0, 0, 0, 0.5)",
          fontFamily: "Quicksand-Medium"
        }}
      >
        Hello, {name}
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          fontFamily: "Quicksand-Bold"
        }}
      >
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
          color: "rgba(0, 0, 0, 0.75)",
          fontFamily: "Quicksand-Medium"
        }}
      >
        {opportunity.opportunity_type}
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: "rgba(0, 0, 0, 0.75)",
          fontFamily: "OpenSans-Light"
        }}
      >
        from {moment(opportunity.opportunity_time.start).format("hh:MM A")} to{" "}
        {moment(opportunity.opportunity_time.end).format("hh:MM A")}
      </Text>
      <Text
        style={{
          fontSize: 12,
          fontFamily: "OpenSans-Light",
          color: "rgba(0, 0, 0, 0.5)"
        }}
      >
        {opportunity.name}
      </Text>
      <Text
        style={{
          color: "rgba(0, 0, 0, 0.6)",
          fontSize: 16,
          fontFamily: "OpenSans-Light"
        }}
      >
        needs {opportunity.opportunity_required} volunteers on{" "}
        {moment(opportunity.opportunity_date).format("DD/MM/YYYY")}
      </Text>
    </View>
  );
};

// OpportunityTaskCard's Single View - When you click on a card
const OpportunitySingleView = ({
  opportunity,
  onRequestPressed,
  userEmail
}) => {
  const getButtonTitle = () => {
    if (
      !opportunity.opportunity_requested.includes(userEmail) &&
      !opportunity.opportunity_assigned.includes(userEmail)
    )
      return "Request to Volunteer";
    else if (opportunity.opportunity_assigned.includes(userEmail))
      return "Assigned";
    else return "Requested";
  };

  const isDisabled = () =>
    opportunity.opportunity_requested.includes(userEmail) ||
    opportunity.opportunity_assigned.includes(userEmail);

  return (
    <View style={{ paddingVertical: 0, paddingHorizontal: 25 }}>
      <View style={{ position: "", bottom: 0, marginBottom: 20 }}>
        <RequestVolunteerButton
          buttonText={getButtonTitle()}
          disabled={isDisabled()}
          // raised
          // color="white"
          onPressUpdate={onRequestPressed}
        />
      </View>

      <Text
        style={{
          color: "rgba(0, 0, 0, 0.7)",
          fontSize: 16,
          flex: 1,
          fontFamily: "Quicksand-Medium"
        }}
      >
        Opportunity Description
      </Text>
      <Text
        style={{
          color: "rgba(0, 0, 0, 0.7)",
          fontSize: 18,
          flex: 1,
          fontFamily: "OpenSans-LightItalic"
        }}
      >
        {opportunity.opportunity_description}
      </Text>

      <Text
        style={{
          color: "rgba(0, 0, 0, 0.7)",
          fontSize: 16,
          flex: 1,
          marginTop: 20,
          fontFamily: "Quicksand-Medium"
        }}
      >
        Relief Center Description
      </Text>
      <Text
        style={{
          color: "rgba(0, 0, 0, 0.7)",
          fontSize: 18,
          flex: 1,
          fontFamily: "OpenSans-LightItalic"
        }}
      >
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
              userEmail={this.state.userDetails.email}
              opportunity={item.reliefCenter}
              onRequestPressed={() =>
                this.props.onRequestPressed(item.reliefCenter)
              }
            />
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({});
