import { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  type todol = {
    id: string;
    text: string;
  };

  const [todo, setTodo] = useState<todol[]>([]);
  const [text, setText] = useState<string>("");

  const saveToStorage = useCallback(async () => {
    try {
      await AsyncStorage.setItem("todo", JSON.stringify(todo));
    } catch (e) {
      alert(e);
    }
  }, [todo]);

  const loadFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("todo");
      if (value !== null) {
        setTodo(JSON.parse(value));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFromStorage();
  }, []);

  useEffect(() => {
    saveToStorage();
  }, [todo, saveToStorage]);

  const handleAddToDo = (el: string) => {
    const newTodo = {
      id: Date.now().toString(),
      text: el,
    };
    if (el.length === 0) {
      alert("please enter a task");
    } else {
      setTodo([...todo, newTodo]);
      setText("");
    }
  };

  const handleDelete = (index: number) => {
    const newTodo = todo.filter((_, i) => i !== index);
    setTodo(newTodo);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#41393E",
      }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>TODO Application</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholderTextColor={"#ffff"}
            placeholder="Enter your task"
            style={styles.input}
            value={text}
            onChangeText={(e) => setText(e)}
          />
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => handleAddToDo(text)}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View>
          {todo.map((item, index) => (
            <TaskList
              key={item.id}
              handleDelete={handleDelete}
              index={index}
              item={item.text}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

function TaskList({
  item,
  index,
  handleDelete,
}: {
  item: string;
  index: number;
  handleDelete: (index: number) => void;
}) {
  return (
    <View style={styles.taskListContainer}>
      <View style={styles.taskList}>
        <Text>{item}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(index)}
        >
          <Text>delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: 30,
    letterSpacing: 5,
  },
  buttonText: {
    color: "#101D42",
    fontWeight: "bold",
    fontSize: 30,
    letterSpacing: 5,
  },
  button: {
    display: "flex",
    alignItems: "center",
    width: "15%",
    padding: 5.5,
    backgroundColor: "#ffff",
    fontWeight: "bold",
    fontSize: 20,
  },
  input: {
    padding: 15,
    borderColor: "#ccc",
    color: "#ffff",
    borderWidth: 1,
    width: "70%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    width: "100%",
    flex: 1,
    gap: 50,
    alignItems: "center",
    marginTop: 50,
  },
  taskList: {
    padding: 15,
    backgroundColor: "#ffff",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    borderRightColor: "#657855ff",
    borderRightWidth: 10,
  },
  taskListContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButton: {
    display: "flex",
    backgroundColor: "#ffff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
