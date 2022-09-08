import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { UseRoute } from "../routes/router";
import { StyleSheet } from "react-native";

import { authChangeUser } from "../redux/auth/authOperations";

export const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authChangeUser());
  }, []);

  const routing = UseRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
