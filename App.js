import { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { RegistrationScreen } from "./screens/RegistrationScreen";
import { LoginScreen } from "./screens/LoginScreen";

export default function App() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback
      onLayout={onLayoutRootView}
      onPress={keyboardHide}
    >
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
          {/* <LoginScreen
            isShowKeyboard={isShowKeyboard}
            keyboardHide={keyboardHide}
            setIsShowKeyboard={setIsShowKeyboard}
          /> */}
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
