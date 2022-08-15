import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { RegistrationScreen } from "./screens/RegistrationScreen";

export default function App() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={require("./assets/images/Photo-BG.png")}
        >
          <StatusBar style="auto" />

          <RegistrationScreen
            isShowKeyboard={isShowKeyboard}
            keyboardHide={keyboardHide}
            setIsShowKeyboard={setIsShowKeyboard}
          />
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
});
