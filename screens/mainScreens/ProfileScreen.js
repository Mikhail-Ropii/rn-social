import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
import { authSignOut } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";
// icons
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

export const ProfileScreen = ({ navigation }) => {
  const { userId, userName, avatar } = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState([]);

  console.log(avatar);

  dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOut());
  };

  const getUserPosts = async () => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    await onSnapshot(q, (data) => {
      setUserPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <ImageBackground
      style={styles.background}
      source={require("../../assets/images/Photo-BG.png")}
    >
      <View style={styles.container}>
        <Image
          source={
            avatar
              ? { uri: avatar }
              : require("../../assets/images/placeholder.png")
          }
          style={styles.avatar}
        />
        <Feather
          style={styles.signOutIcon}
          onPress={signOut}
          name="log-out"
          size={24}
          color="#BDBDBD"
        />
        <Text style={styles.userName}>{userName}</Text>
        {userPosts && (
          <FlatList
            data={userPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.postCard}>
                <Image style={styles.photo} source={{ uri: item.photo }} />
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.linkContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Comments", {
                        postId: item.id,
                        photo: item.photo,
                      })
                    }
                  >
                    <FontAwesome
                      style={styles.commentIcon}
                      name="comment"
                      size={24}
                      color="#FF6C00"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.locationLink}
                    onPress={() =>
                      navigation.navigate("Map", { location: item.location })
                    }
                  >
                    <SimpleLineIcons
                      name="location-pin"
                      size={24}
                      color="#BDBDBD"
                    />
                    <Text style={styles.locationDescr}>
                      {item.locationDescr}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          ></FlatList>
        )}
      </View>
    </ImageBackground>
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
    justifyContent: "center",
    alignItems: "center",
    paddingnHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 147,
  },
  avatar: {
    borderWidth: 5,
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -60 }],
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  signOutIcon: {
    top: 22,
    right: 16,
    position: "absolute",
  },
  userName: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    marginTop: 92,
    marginBottom: 33,
    color: "#212121",
  },
  postCard: {
    marginBottom: 35,
  },
  photo: {
    minWidth: 343,
    minHeight: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginBottom: 11,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  locationLink: {
    flexDirection: "row",
  },
  locationDescr: {
    marginLeft: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
    color: "#212121",
  },
});
