import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
//icons
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
//
import { db } from "../../firebase/config";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { async } from "@firebase/util";

export const UpdatePostScreen = ({ route, navigation }) => {
  const { title, locationDescr, postId, photo } = route.params;
  const [inputState, setInputState] = useState({ title, locationDescr });
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const hideKeyboard = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const handleSendData = async () => {
    const postRef = doc(db, "posts", postId);
    try {
      await updateDoc(postRef, {
        capital: true,
        title: inputState.title,
        locationDescr: inputState.locationDescr,
      });
    } catch (e) {
      Alert.alert("Error updating document: ", e.message);
      console.error("Error updating document: ", e);
    }
    navigation.navigate("Profile");
  };

  const handleDeletePost = async () => {
    try {
      await deleteDoc(doc(db, "posts", postId));
    } catch (e) {
      Alert.alert("Error deleting document: ", e.message);
      console.error("Error deleting document: ", e);
    }
    navigation.navigate("Profile");
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: photo }} />
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder={"Название..."}
            value={inputState.title}
            onFocus={() => setIsShowKeyboard(true)}
            onChangeText={(value) =>
              setInputState((prev) => ({ ...prev, title: value }))
            }
          />
          <View style={styles.locationInputContainer}>
            <SimpleLineIcons
              style={styles.locationIcon}
              name="location-pin"
              size={24}
              color="#BDBDBD"
            />
            <TextInput
              style={styles.locationInput}
              placeholder={"Местность..."}
              value={inputState.locationDescr}
              onFocus={() => setIsShowKeyboard(true)}
              onChangeText={(value) =>
                setInputState((prev) => ({ ...prev, locationDescr: value }))
              }
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={handleSendData}
          activeOpacity={0.8}
          style={styles.sendButton}
        >
          <Text style={styles.buttonText}>Сохранить</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDeletePost}
          activeOpacity={0.8}
          style={styles.deleteBtn}
        >
          <Feather name="trash-2" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    flex: 1,
  },
  photoContainer: {
    position: "absolute",
    flexDirection: "row",
    top: 0,
    left: 0,
  },
  photo: {
    minWidth: 343,
    minHeight: 240,
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 32,
  },
  sendButton: {
    justifyContent: "center",
    marginTop: 32,
    height: 51,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  form: {
    marginTop: 48,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  locationInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  locationIcon: {
    marginRight: 8,
  },
  locationInput: {
    flex: 1,
    height: 50,
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFFFFF",
  },
  deleteBtn: {
    marginTop: 40,
    marginRight: "auto",
    marginLeft: "auto",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    width: 70,
    height: 40,
  },
});
