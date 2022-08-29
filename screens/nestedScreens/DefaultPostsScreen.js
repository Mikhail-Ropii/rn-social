import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

export const DefaultPostsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Comments")}>
        <FontAwesome5
          style={styles.commentIcon}
          name="comment"
          size={24}
          color="#BDBDBD"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Map")}>
        <SimpleLineIcons name="location-pin" size={24} color="#BDBDBD" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  // commentIcon: {
  //   transform: [{ rotate: "270deg" }],
  // },
});
