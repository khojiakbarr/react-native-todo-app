// rnfes
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { IconButton } from "react-native-paper";
import { useStore } from "zustand";

export const staticData = [
  { id: 1, title: "Wash Car" },
  { id: 2, title: "Feeding Dogs" },
  { id: 3, title: "Feeding Cats" },
  { id: 4, title: "Rigind books" },
];
const TodoScreen = () => {
  const [inputValue, setInputValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const {
    todos,
    addTodo,
    removeTodo,
    editTodo,
    toggleTodo,
    toggleEditing,
    clearCompleted,
    clearAll,
  } = useStore();

  const handleInputvalue = (value) => {
    setInputValue(value);
  };

  const editTask = (id) => {
    console.log("Edit Task", id);
  };

  const handleAddTask = () => {
    if (inputValue.trim() === "") {
      return;
    }
    addTodo(task);
    setInputValue("");
  };

  function renderItem({ item, index }) {
    return (
      <View key={index} style={styles.viewList}>
        <Text style={styles.task}>{item.title}</Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <IconButton
            icon="pencil"
            iconColor="white"
            size={20}
            onPress={() => editTodo(item.id)}
          />
          <IconButton
            icon="trash-can"
            iconColor="white"
            size={20}
            onPress={() => removeTodo(item.id)}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Add a task"
        value={inputValue}
        onChangeText={handleInputvalue}
      />
      <TouchableOpacity onPress={handleAddTask}>
        <Text style={styles.addButton}>Add </Text>
      </TouchableOpacity>

      <FlatList style={styles.list} data={staticData} renderItem={renderItem} />
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  textInput: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  addButton: {
    color: "white",
    backgroundColor: "gray",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 16,
    textAlign: "center",
    fontSize: 20,
  },
  list: {
    marginTop: 16,
  },
  viewList: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#89909F",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 12,
    marginBottom: 12,
  },
  task: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    // padding: 10,
  },
});
