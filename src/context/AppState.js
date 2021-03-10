import React, { useReducer } from 'react';
import axios from 'axios';

import {GET_MESSAGES, SET_TOKEN, GET_USER, CLEAR_USER, SET_ERROR, CLEAR_ERROR, SET_LOADING} from './types';
import appReducer from './AppReducer';
import AppContext from './AppContext';

const AppState = (props) => {
  const INITIAL_STATE = {
    messages: [],
    token: null,
    user: {},
    loading: false,
    error: null,
    operation: '/messages'
  };

  const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);

  const getMessages = async () => {
    console.log("Get messages..");

    setLoading();

    try {
      console.log("Retrieve posts ..");
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1/posts"
      );
      const data = response.data;
      console.log("Data is:", data);

      dispatch({ type: GET_MESSAGES, payload: data });
    } catch (error) {
      console.error(error);
      console.error(error.message);
      // console.error(error.response);
      setError(error.message);
      // setError(error.message ? error.response.data.msg : error.message);
    }
  };

  const setToken = async (newToken, keycloak) => {
    console.log("Set token..");

    const crtToken = state.token;
    // console.log("New token: ", newToken, ", current token: ", crtToken);

    dispatch({ type: SET_TOKEN, payload: newToken });

    if (newToken) {
      if (crtToken !== newToken) {
        await getUser(keycloak);
      } else {
        console.log("Same token... No need to read user info...");
      }
    } else {
      clearUser();
    }
  };

  const getUser = async (keycloak) => {
    console.log("Get user info..");

    setLoading();

    try {
      const profile = await keycloak.loadUserInfo();
      console.log("User profile:", profile);
      // alert(JSON.stringify(profile, null, "  "));

      dispatch({ type: GET_USER, payload: profile });
    } catch (error) {
      console.error(error);
      console.error(error.message);
      // console.error(error.response);
      setError(error.message);
      // setError(error.message ? error.response.data.msg : error.message);
    }
  };

  const clearUser = () => {
    console.log("Clear user info..");
    dispatch({type: CLEAR_USER});
  }

  const setError = (error) => {
    dispatch({ type: SET_ERROR, payload: error});

    setTimeout( () => clearError(), 5000);
  }

  const clearError = () => {
      dispatch({type: CLEAR_ERROR});
  }

  const setLoading = () => {
      dispatch({type: SET_LOADING});
  }


  return (
    <AppContext.Provider
      value={{
        messages: state.messages,
        token: state.token,
        user: state.user,
        loading: state.loading,
        error: state.error,
        getMessages,
        setToken,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
