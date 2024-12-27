import { uid } from "uid";
import { create } from "zustand";

const useTodoStore = create((set, get) => ({
  todos: [
    { id: 1, title: "Wash Car" },
    { id: 2, title: "Feeding Dogs" },
    { id: 3, title: "Feeding Cats" },
    { id: 4, title: "Rigind books" },
  ],
  getTodos: async () => {
    const data = await getData("todos");
    if (data) {
      set([JSON.parse(data)]);
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
          createdAt: new Date().getFullYear().toString(),
        },
      ],
    }));
    // saveData("todos", JSON.stringify(get().todos));
  },

  removeTodo: (id) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
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
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      ),
    }));
  },

  toggleEditing: (id) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
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
}));

export default useTodoStore;
