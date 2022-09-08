import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
} from "react-native";
import { Camera } from "expo-camera";
import { Fontisto } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { storage } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "react-native-uuid";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

const initialState = {
  title: "",
  locationDescr: "",
};

export const CreatePostsScreen = ({ navigation }) => {
  const [inputState, setInputState] = useState(initialState);
  const [camera, setCamera] = useState();
  const [photo, setPhoto] = useState();
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const { userId, userName } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const [permission, requestPermission] = Camera.useCameraPermissions();
  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    requestPermission();
  }

  const takePhoto = async () => {
    // if (photo) {
    //   setPhoto(null);
    //   console.log(photo);
    //   return;
    // }
    const shot = await camera.takePictureAsync();
    setPhoto(shot.uri);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const photoId = uuid.v4();
    const storageRef = ref(storage, `postImage/${photoId}`);
    await uploadBytes(storageRef, file);
    const photoUrl = await getDownloadURL(ref(storage, `postImage/${photoId}`));
    return photoUrl;
  };

  const sendData = async () => {
    const photo = await uploadPhotoToServer();
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    const location = await Location.getCurrentPositionAsync();
    try {
      await addDoc(collection(db, "posts"), {
        photo,
        title: inputState.title,
        locationDescr: inputState.locationDescr,
        location: location.coords,
        userId,
        userName,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    navigation.navigate("Posts");
    setInputState(initialState);
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera} ratio="1:1">
        {photo && (
          <View style={styles.photoContainer}>
            <Image source={{ uri: photo }} style={styles.photo}></Image>
          </View>
        )}
        <View style={styles.snapContainer}>
          <TouchableOpacity onPress={takePhoto}>
            <Fontisto name="camera" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </Camera>
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
        onPress={sendData}
        activeOpacity={0.8}
        style={styles.sendButton}
      >
        <Text style={styles.buttonText}>Опубликовать</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    position: "relative",
    marginHorizontal: 16,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
    height: 240,
  },
  photoContainer: {
    position: "absolute",
    flexDirection: "row",
    top: 0,
    left: 0,
  },
  photo: {
    flex: 1,
    height: 240,
  },
  snapContainer: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  sendButton: {
    justifyContent: "center",
    marginTop: 32,
    marginHorizontal: 16,
    height: 51,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  form: {
    marginHorizontal: 16,
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
});
