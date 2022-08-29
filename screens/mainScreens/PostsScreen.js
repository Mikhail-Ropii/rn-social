import { createStackNavigator } from "@react-navigation/stack";
import { DefaultPostsScreen } from "../nestedScreens/DefaultPostsScreen";
import { CommentsScreen } from "../nestedScreens/CommentsScreen";
import { MapScreen } from "../nestedScreens/MapScreen";
import { Feather } from "@expo/vector-icons";

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
          headerRight: () => <Feather name="log-out" size={24} color="black" />,
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
