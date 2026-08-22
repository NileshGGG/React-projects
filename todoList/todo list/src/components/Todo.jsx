import { useState, useEffect } from "react";

import TodoHeader from "./TodoHeader";
import AddTask from "./AddTask";
import TaskList from "./TodoList";

const Todo = () => {
  const sampleTask = () => ({
    task: "sample-task",
    id: crypto.randomUUID(),
    completed: false,
  });

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      return JSON.parse(savedTodos);
    }

    return [sampleTask()];
  });

  useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);

  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // add new task
  const addNewTask = () => {
    if (newTodo.trim() === "") return;

    const newTask = {
      task: newTodo.trim(),
      id: crypto.randomUUID(),
      completed: false,
    };

    if (
      todos.length === 1 &&
      todos[0].task === "sample-task"
    ) {
      setTodos([newTask]);
    } else {
      setTodos([...todos, newTask]);
    }

    setNewTodo("");
  };

  // delete task
  const deleteTask = (id) => {
    const updatedTodos = todos.filter(
      (todo) => todo.id !== id
    );

    if (updatedTodos.length === 0) {
      setTodos([sampleTask()]);
    } else {
      setTodos(updatedTodos);
    }
  };

  // mark done or undone
  const toggleDone = (id) => {
    if (editingId === id) return;

    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
            ...todo,
            completed: !todo.completed,
          }
          : todo
      )
    );
  };

  // start editing
  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditValue(todo.task);
  };

  // save edit
  const saveEdit = (id) => {
    if (editValue.trim() === "") return;

    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
            ...todo,
            task: editValue.trim(),
          }
          : todo
      )
    );

    setEditingId(null);
    setEditValue("");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-orange-100 py-5">

      <div className="flex flex-col items-center w-[95%] max-w-[500px] min-h-[90vh] bg-gray-100 rounded-2xl py-5">

        <TodoHeader />

        <hr className="w-[90%] border-0 border-t border-black my-6" />

        <AddTask
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          addNewTask={addNewTask}
        />

        <TaskList
          todos={todos}
          editingId={editingId}
          editValue={editValue}
          setEditValue={setEditValue}
          toggleDone={toggleDone}
          startEditing={startEditing}
          saveEdit={saveEdit}
          deleteTask={deleteTask}
        />

      </div>
    </div>
  );
};

export default Todo;