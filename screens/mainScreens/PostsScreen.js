import { createStackNavigator } from "@react-navigation/stack";
import { DefaultPostsScreen } from "../nestedScreens/DefaultPostsScreen";
import { CommentsScreen } from "../nestedScreens/CommentsScreen";
import { MapScreen } from "../nestedScreens/MapScreen";
import { Feather } from "@expo/vector-icons";

import { authSignOut } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";

const NestedScreen = createStackNavigator();

const headerTitleStyle = {
  fontFamily: "Roboto-Medium",
  fontSize: 17,
  lineHeight: 22,

  textAlign: "center",
  letterSpacing: -0.408,

  color: "#212121",
};

export const PostsScreen = () => {
  dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOut());
  };

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultPostsScreen}
        options={{
          headerRightContainerStyle: { paddingRight: 16 },
          headerTitleAlign: "center",
          headerTitleStyle: headerTitleStyle,
          headerTitle: "Публикации",
          headerRight: () => (
            <Feather
              onPress={signOut}
              name="log-out"
              size={24}
              color="#BDBDBD"
            />
          ),
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerTitleAlign: "center",
          headerTitleStyle: headerTitleStyle,
          headerTitle: "Комментарии",
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerTitleAlign: "center",
          headerTitleStyle: headerTitleStyle,
          headerTitle: "Локация",
        }}
      />
    </NestedScreen.Navigator>
  );
};
