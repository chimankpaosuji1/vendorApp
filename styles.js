import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: "#85B8B9",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    letterSpacing: 0.5,
  },
  button1: {
    backgroundColor: "white",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "white",
    shadowColor: 'black',
  },
  buttonText1: {
    fontSize: 20,
    fontWeight: "600",
    color: "#85B8B9",
    letterSpacing: 0.5,
  },
  bottomContainer: {
    justifyContent: "center",
    height: height / 1.4,
    zIndex: 9999999,
  },
  img: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  svg: {
    position: "relative",
  },
  bottom: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  bottomtext: {
    fontSize: 20,
    fontWeight: "600",
    color: "#85B8B9",
    letterSpacing: 0.5,
    bottomtextShadowColor: "black",
    bottomtextShadowRadius: 5,
  },
});

export default styles