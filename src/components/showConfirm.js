import { Alert } from "react-native";

export const showConfirm = (title, message) => {
  return new Promise((resolve) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: "cancel",
          style: "cancel",
          onPress: () => resolve(false), // Foydalanuvchi bekor qilsa false qaytadi
        },
        {
          text: "yes",
          onPress: () => resolve(true), // Foydalanuvchi tasdiqlasa true qaytadi
        },
      ],
      { cancelable: false } // Orqaga tugmasini bloklash
    );
  });
};
