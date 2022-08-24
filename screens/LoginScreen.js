import { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export const LoginScreen = ({ navigation }) => {
  const [inputState, setInputState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onSubmitForm = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground
        style={styles.background}
        source={require("../assets/images/Photo-BG.png")}
      >
        <View
          style={{
            ...styles.container,
            paddingBottom: isShowKeyboard ? 0 : 132,
          }}
        >
          <View style={styles.form}>
            <Text style={styles.regTitle}>Войти</Text>
            <TextInput
              style={styles.input}
              placeholder={"Адрес электронной почты"}
              value={inputState.email}
              onFocus={() => setIsShowKeyboard(true)}
              onChangeText={(value) =>
                setInputState((prev) => ({ ...prev, email: value }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder={"Пароль"}
              secureTextEntry={true}
              value={inputState.password}
              onFocus={() => setIsShowKeyboard(true)}
              onChangeText={(value) =>
                setInputState((prev) => ({ ...prev, password: value }))
              }
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btn}
              onPress={onSubmitForm}
            >
              <Text style={styles.regBtnText}>Войти</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={styles.bottomText}
            onPress={() => navigation.navigate("Registration")}
          >
            Нет аккаунта? Зарегистрироваться
          </Text>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  container: {
    paddingTop: 92,
    width: "100%",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  form: { marginHorizontal: 16 },
  regTitle: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    marginBottom: 32,
  },
  input: {
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  btn: {
    marginTop: 27,
    justifyContent: "center",
    alignItems: "center",
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginBottom: 16,
  },
  regBtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,

    color: "#FFFFFF",
  },
  bottomText: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,

    color: "#1B4371",
  },
});
