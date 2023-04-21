import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authenticationUtils from './utils/authenticationUtils.js';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState();
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   //Every time the App is opened, this provider is rendered
  //   //and call the loadStorageData function
  //   loadStorageData();
  // }, []);

  const loadStorageData = async () => {
    try {
      //Try to get the data from Async Storage
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');

      if (authDataSerialized) {
        //If there is data, it's converted to an object and the state is updated
        const _authData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async user => {
    const _authData = await authenticationUtils.login(user);

    //Set the data in the context, so the App can be notified
    //and send the user to the AuthStack
    setAuthData(_authData);

    //Persist the data in the Async Storage
    //to be recovered in the next user session
    AsyncStorage.setItem('@AuthData', JSON.stringify(_authData));
  };

  const signOut = async () => {
    //Remove data from context, so the App can be notified
    //and send the user to the AuthStack
    setAuthData(undefined);

    //Remove the data from Async Storage
    //to NOT be recovered in next session.
    await AsyncStorage.removeItem('@AuthData');
  };

  return (
    //This component will be used to encapsulate the whole App,
    //so all components will have access to the Context
    <AuthContext.Provider value={{ loadStorageData, authData, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
