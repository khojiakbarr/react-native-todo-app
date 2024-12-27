import { uid } from "uid";
import { create } from "zustand";
import { showConfirm } from "../src/components/showConfirm";
import { getData, saveData } from "../utils/memory";

const useTodoStore = create((set, get) => ({
  todos: [
    // {
    //   id: 1,
    //   task: "Wash Car",
    //   createdAt: "December 27 at 4:47:08 PM",
    //   isCompleted: false,
    //   isEditing: false,
    // },
    // {
    //   id: 2,
    //   task: "Feeding Dogs",
    //   createdAt: "December 27 at 4:47:08 PM",
    //   isCompleted: true,
    //   isEditing: true,
    // },
    // {
    //   id: 3,
    //   task: "Feeding Cats",
    //   createdAt: "December 27 at 4:47:08 PM",
    //   isCompleted: false,
    //   isEditing: false,
    // },
    // {
    //   id: 4,
    //   task: "Rigind books",
    //   createdAt: "December 27 at 4:47:08 PM",
    //   isCompleted: false,
    //   isEditing: false,
    // },
  ],
  id: "",
  getTodos: async () => {
    const data = await getData("todos");
    console.log(data);

    if (data) {
      set((state) => ({ todos: JSON.parse(data) }));
    } else {
      set([]);
    }
  },

  addTodo: (todo) => {
    set((state) => ({
      todos: [
        ...state.todos,
        {
          task: todo,
          id: uid(),
          isCompleted: false,
          isEditing: false,
          createdAt: new Date().toLocaleString("en", {
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          }),
        },
      ],
    }));
    console.log(get().todos);

    saveData("todos", JSON.stringify(get().todos));
  },

  removeTodo: async (id) => {
    const isConfirmed = await showConfirm("Are you deleting this item?");
    if (isConfirmed) {
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    }
  },

  editTodo: (id, newTask) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, task: newTask } : todo
      ),
    }));
  },

  toggleTodo: (id) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id == id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      ),
    }));
  },

  toggleEditing: (id) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: true } : todo
      ),
    }));
  },

  clearCompleted: () => {
    set((state) => ({
      todos: state.todos.filter((todo) => !todo.isCompleted),
    }));
  },

  clearAll: () => {
    set({ todos: [] });
  },

  saveId: (id) => {
    set({ id });
  },
}));

export default useTodoStore;
