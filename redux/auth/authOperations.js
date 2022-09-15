import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";
import { Alert } from "react-native";

export const authSignIn =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          userName: user.displayName,
        })
      );
      dispatch(authSlice.actions.stateChange({ stateChange: true }));
    } catch (error) {
      Alert.alert(error.message);
      console.log(error);
    }
  };

export const authSignUp =
  ({ inputState, avatar }) =>
  async (dispatch, getState) => {
    const { email, password } = inputState;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: inputState.login,
        photoURL: avatar,
      });
      const user = auth.currentUser;
      const { uid, displayName, photoURL } = user;
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: uid,
          userName: displayName,
          avatar: photoURL,
        })
      );
      dispatch(authSlice.actions.stateChange({ stateChange: true }));
    } catch (error) {
      Alert.alert(error.message);
      console.log(error);
    }
  };

export const authChangeUser = () => async (dispatch, getState) => {
  try {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        dispatch(
          authSlice.actions.updateUserProfile({
            userId: user.uid,
            userName: user.displayName,
            avatar: user.photoURL,
          })
        );

        dispatch(authSlice.actions.stateChange({ stateChange: true }));
      }
    });
  } catch (error) {
    Alert.alert(error.message);
    console.log(error);
  }
};

export const authSignOut = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSlice.actions.authSignOut());
  } catch (error) {
    Alert.alert(error.message);
    console.log(error);
  }
};
