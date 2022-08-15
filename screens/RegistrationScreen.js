import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export const RegistrationScreen = ({
  isShowKeyboard,
  keyboardHide,
  setIsShowKeyboard,
}) => {
  const [inputValue, setInputValue] = useState(initialState);

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    // >

    <View
      style={{ ...styles.container, paddingBottom: isShowKeyboard ? 0 : 66 }}
    >
      <View style={styles.form}>
        <Text style={styles.regTitle}>Регистрация</Text>
        <TextInput
          style={styles.input}
          placeholder={"Логин"}
          onFocus={() => setIsShowKeyboard(true)}
          onChangeText={(value) =>
            setInputValue((prev) => ({ ...prev, value }))
          }
        />
        <TextInput
          style={styles.input}
          placeholder={"Адрес электронной почты"}
          onFocus={() => setIsShowKeyboard(true)}
        />
        <TextInput
          style={styles.input}
          placeholder={"Пароль"}
          secureTextEntry={true}
          onFocus={() => setIsShowKeyboard(true)}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btn}
          onPress={keyboardHide}
        >
          <Text style={styles.regBtnText}>Зарегистрироваться</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.bottomText}>Уже есть аккаунт? Войти</Text>
    </View>
    // </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
    fontFamily: "Roboto",
    fontWeight: "500",
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
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 19,

    color: "#FFFFFF",
  },
  bottomText: {
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 19,

    color: "#1B4371",
  },
});
