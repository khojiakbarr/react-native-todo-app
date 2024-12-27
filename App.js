import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import TodoScreen from "./src/screen/TodoScreen";

export default function App() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TodoScreen />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
});
