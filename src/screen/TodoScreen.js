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
import { Checkbox, IconButton } from "react-native-paper";
import useTodoStore from "../../store/useTodoStore";
import MyModal from "../components/MyModal";

const TodoScreen = () => {
  const [inputValue, setInputValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const {
    todos,
    addTodo,
    removeTodo,
    toggleTodo,
    clearCompleted,
    clearAll,
    saveId,
    getTodos,
  } = useTodoStore();

  useEffect(() => {
    getTodos();
  }, []);

  const handleInputvalue = (value) => {
    setInputValue(value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() === "") {
      return;
    }
    addTodo(inputValue);
    setInputValue("");
  };

  const openModal = (id) => {
    saveId(id);
    setModalVisible(true);
  };

  function renderItem({ item, index }) {
    return (
      <View
        key={index}
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: item.isCompleted ? "#39A25E" : "#89909F",
          borderRadius: 6,
          paddingHorizontal: 6,
          paddingVertical: 12,
          marginBottom: 12,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Checkbox
            status={item.isCompleted ? "checked" : "unchecked"}
            onPress={() => toggleTodo(item.id)}
            color="white"
          />
          <Text style={styles.task}>{item.task}</Text>
        </View>
        <Text style={styles.date}>{item.createdAt}</Text>
        <Text style={styles.edit}>{item.isEditing && "edited"}</Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <IconButton
            icon="pencil"
            iconColor="white"
            size={20}
            onPress={() => openModal(item.id)}
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
      <Text style={styles.title}>My To-Do List</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Add a task"
        value={inputValue}
        onChangeText={handleInputvalue}
      />
      <TouchableOpacity onPress={handleAddTask}>
        <Text style={styles.addButton}>Add </Text>
      </TouchableOpacity>

      <MyModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <FlatList style={styles.list} data={todos} renderItem={renderItem} />
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
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

  date: {
    position: "absolute",
    bottom: 5,
    left: 10,
    color: "white",
    fontSize: 10,
  },

  edit: {
    position: "absolute",
    bottom: 5,
    right: 68,
    color: "white",
    fontSize: 10,
  },
});
