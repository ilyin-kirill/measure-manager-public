import React from "react";

import { get_salt, refreshToken, logout } from "../api/AuthAPI";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
    if (!!localStorage.getItem("id_token")){
        if (Date.now() - localStorage.getItem("refresh_time") > 600000)
            refreshToken()
    }
    var [state, dispatch] = React.useReducer(userReducer, {
        isAuthenticated: !!localStorage.getItem("id_token"),
    });
    return (
        <UserStateContext.Provider value={state}>
        <UserDispatchContext.Provider value={dispatch}>
            {children}
        </UserDispatchContext.Provider>
        </UserStateContext.Provider>
    );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch, email, password, navigate) {
    if (!!email && !!password) {
        get_salt(email, password, navigate, dispatch);
    } else {
        dispatch({ type: "LOGIN_FAILURE" });
    }
}

function signOut(dispatch, navigate) {
  logout();
  localStorage.removeItem("id_token");
  localStorage.removeItem("name");
  localStorage.removeItem("role");
  localStorage.removeItem("refresh_time");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  navigate("/login");
}