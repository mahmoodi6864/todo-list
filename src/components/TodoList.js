import React, { useState } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // اضافه کردن تسک
  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  // تغییر وضعیت انجام شده / نشده
  const toggleDone = (id) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? {...task, done: !task.done} : task
      )
    );
  };

  // حذف تسک
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">To-Do List</h2>
      <div className="flex mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border border-gray-300 rounded px-3 py-2"
          placeholder="Add a task"
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button
          onClick={addTask}
          className="ml-2 bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <ul>
        {tasks.length === 0 && <p className="text-gray-500">No tasks yet.</p>}
        {tasks.map(({ id, text, done }) => (
          <li key={id} className="flex items-center justify-between mb-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={done}
                onChange={() => toggleDone(id)}
                className="form-checkbox"
              />
              <span className={done ? "line-through text-gray-400" : ""}>
                {text}
              </span>
            </label>
            <button
              onClick={() => deleteTask(id)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
