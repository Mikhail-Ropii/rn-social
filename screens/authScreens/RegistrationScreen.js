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
  Image,
} from "react-native";
import { authSignUp } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import { storage } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as DocumentPicker from "expo-document-picker";
import uuid from "react-native-uuid";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export const RegistrationScreen = ({ navigation }) => {
  const [inputState, setInputState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [avatar, setAvatar] = useState();

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const uploadAvatarToServer = async () => {
    const response = await fetch(avatar);
    const file = await response.blob();
    const avatarId = uuid.v4();
    const storageRef = ref(storage, `avatarImage/${avatarId}`);
    await uploadBytes(storageRef, file);
    const avatarUrl = await getDownloadURL(
      ref(storage, `avatarImage/${avatarId}`)
    );
    return avatarUrl;
  };

  const handleSubmit = async () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    const avatar = await uploadAvatarToServer();
    dispatch(authSignUp({ inputState, avatar }));
    setInputState(initialState);
  };

  const uploadAvatar = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: "image/*" });
    setAvatar(result.uri);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground
        style={styles.background}
        source={require("../../assets/images/Photo-BG.png")}
      >
        <View
          style={{
            ...styles.container,
            paddingBottom: isShowKeyboard ? 0 : 66,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.avatarPicker}
            onPress={uploadAvatar}
          >
            {avatar && <Image style={styles.avatar} source={{ uri: avatar }} />}
          </TouchableOpacity>
          <View style={styles.form}>
            <Text style={styles.regTitle}>Регистрация</Text>
            <TextInput
              style={styles.input}
              placeholder={"Логин"}
              value={inputState.login}
              onFocus={() => setIsShowKeyboard(true)}
              onChangeText={(value) =>
                setInputState((prev) => ({ ...prev, login: value }))
              }
            />
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
              onPress={handleSubmit}
            >
              <Text style={styles.regBtnText}>Зарегистрироваться</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={styles.bottomText}
            onPress={() => navigation.navigate("Login")}
          >
            Уже есть аккаунт? Войти
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
    position: "relative",
    paddingTop: 92,
    width: "100%",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatarPicker: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -60 }],
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
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
