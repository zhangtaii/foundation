import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Modal,
  Dimensions,
  Button
} from "react-native";
import { WebBrowser } from "expo";

import { MonoText } from "../components/StyledText";
import { ListItem, Slider } from "react-native-elements";

import { FontAwesome } from "@expo/vector-icons";

SW = Dimensions.get('window').width;
SH = Dimensions.get('window').height;

const list = [
  {
    title: "Ceilling Lamp",
    icon: "lightbulb-o",
    switched: true,
    deviceID: 1
  },
  {
    title: "Decorative Light",
    icon: "lightbulb-o",
    switched: false,
    deviceID: 2
  }
];

export default class DeviceScreen extends React.Component {
  static navigationOptions = {
    title: "Device"
  };
  currentSliderDiviceID = 1;
  state = {
    isGroupExpanded: true,
    modalVisible: false,
    brightnessLevel: 0
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <TouchableOpacity
            onPress={() => {
              this.setState({ isGroupExpanded: !this.state.isGroupExpanded });
            }}
            activeOpacity={0.6}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 5
            }}
          >
            <Text style={{ fontSize: 15, marginRight: 5 }}>Bedroom</Text>
            {this.state.isGroupExpanded ? (
              <FontAwesome name="angle-up" size={18} />
            ) : (
              <FontAwesome name="angle-down" size={18} />
            )}
            />
          </TouchableOpacity>

          {this.state.isGroupExpanded &&
            list.map((item, i) => (
              <ListItem
                onPress={item => {
                  // console.warn('item' + item.deviceID);
                  // this.currentSliderItem = item;
                  this.setModalVisible(true);
                }}
                key={i}
                title={item.title}
                leftIcon={{ name: item.icon, type: "font-awesome" }}
                switchButton
                hideChevron
                switched={item.switched}
                onSwitch={status => {
                  list[i].switched = status;
                  this.forceUpdate();
                  const level = status ? 255 : 0;
                  fetch(
                    `https://agent.electricimp.com/Sz15XCQ9JCxM?vals=${
                      item.deviceID
                    },${level}`
                  );
                }}
              />
            ))}
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            //alert('Modal has been closed.');
            this.setModalVisible(false);
          }}
        >
        <TouchableWithoutFeedback onPress={()=>{
          this.setModalVisible(false);
        }}>
          <View
            style={[
              StyleSheet.absoluteFill,
              {backgroundColor: 'rgba(0,0,0,0.4)'},
            ]}>
            <View
              style={{
                top: SH / 2,
                position: 'absolute',
                backgroundColor: 'rgba(255,255,255,1)',
                width: '100%',
                padding:5,
                borderRadius: 2,
                // alignItems:'center'
              }}>
              <Text style={{alignSelf:'center'}}>Brightness</Text>

              <Slider
                maximumValue={255}
                value={this.state.brightnessLevel}
                step={1}
                onValueChange={value => {
                  this.setState({ brightnessLevel: value });
                  const requestURL = `https://agent.electricimp.com/Sz15XCQ9JCxM?vals=${
                    this.currentSliderDiviceID
                  },${value}`;
                  // console.warn(requestURL);
                  fetch(requestURL);
                }}
              />              
            </View>
          </View>
        </TouchableWithoutFeedback>        
          {/* <View style={{ marginTop: 22 }}>
            <View>
              <Slider
                maximumValue={255}
                value={this.state.brightnessLevel}
                step={1}
                onValueChange={value => {
                  this.setState({ brightnessLevel: value });
                  const requestURL = `https://agent.electricimp.com/Sz15XCQ9JCxM?vals=${
                    this.currentSliderDiviceID
                  },${value}`;
                  console.warn(requestURL);
                  fetch(requestURL);
                }}
              />
            </View>
          </View> */}
        </Modal>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/development-mode"
    );
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes"
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 10
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
