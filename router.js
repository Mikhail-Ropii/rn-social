import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RegistrationScreen } from "./screens/RegistrationScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { PostsScreen } from "./screens/mainScreens/PostsScreen";
import { CreatePostsScreen } from "./screens/mainScreens/CreatePostsScreen";
import { ProfileScreen } from "./screens/mainScreens/ProfileScreen";
import { StyleSheet, View } from "react-native";
//icons
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const AuthNavigations = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const UseRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthNavigations.Navigator initialRouteName="Login">
        <AuthNavigations.Screen
          options={{
            headerShown: false,
          }}
          name="Registration"
          component={RegistrationScreen}
        />
        <AuthNavigations.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
        >
          {LoginScreen}
        </AuthNavigations.Screen>
      </AuthNavigations.Navigator>
    );
  }

  const headerTitleStyle = {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,

    textAlign: "center",
    letterSpacing: -0.408,

    color: "#212121",
  };

  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { height: 71, paddingHorizontal: 62 },
      }}
    >
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: (focused, color, size) => (
            <Ionicons name="grid-outline" size={24} color={color} />
          ),
        }}
        name="Posts"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          unmountOnBlur: true,
          headerTitleAlign: "center",
          headerTitleStyle: headerTitleStyle,
          headerTitle: "Создать публикацию",
          tabBarIcon: (focused, color, size) => (
            <View style={styles.addIcon}>
              <Ionicons name="add" size={24} color={"#ffffff"} />
            </View>
          ),
        }}
        name="Create"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: (focused, color, size) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  addIcon: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    width: 70,
    height: 40,
  },
});
