import AsyncStorage from '@react-native-async-storage/async-storage';

const storeStringData = async (storageKey, value) => {
  try {
    await AsyncStorage.setItem(storageKey, value);
  } catch (e) {
    console.error(e);
  }
};

const storeObjectData = async (storageKey, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storageKey, jsonValue);
  } catch (e) {
    console.error(e);
  }
};

const getStringData = async storageKey => {
  try {
    const value = await AsyncStorage.getItem(storageKey);
    return value !== null ? value : null;
  } catch (e) {
    console.error(e);
  }
};

const getObjectData = async storageKey => {
  try {
    const jsonValue = await AsyncStorage.getItem(storageKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
  }
};

export default {
  storeStringData,
  storeObjectData,
  getStringData,
  getObjectData,
};
