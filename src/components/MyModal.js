import React, { useEffect, useState } from "react";
import {
  Modal,
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Icon, TextInput } from "react-native-paper";
import useTodoStore from "../../store/useTodoStore";

export default function MyModal({ modalVisible, setModalVisible }) {
  const [inputValue, setInputValue] = useState("");
  const { todos, id, editTodo, toggleEditing } = useTodoStore();

  useEffect(() => {
    if (id) {
      setInputValue(todos.find((todo) => todo.id === id).task);
    }
  }, [id]);

  const saveTask = () => {
    editTodo(id, inputValue);
    toggleEditing(id);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade" // yoki 'fade', 'none'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.title}>Edit task</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon source="close" size={30} color="black" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="edit"
              value={inputValue}
              onChangeText={setInputValue}
            />
            <Button title="Save" onPress={() => saveTask()} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 6,
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
