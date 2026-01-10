import { useState, type ChangeEvent } from 'react'
import './App.css'

type Todo = {
  id: string
  name: string;
  checked: boolean;
  deleted: boolean;
  attributes?: Todo[];
  metric?: number;
  progress?: number;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoName, setTodoName] = useState("");

  const handleTodoSubmit = () => {
    if (!todoName.trim()) return;
    setTodoName("");
    const newTodo: Todo = {
      id: Date.now().toString(),
      name: todoName,
      checked: false,
      deleted: false
    }
    setTodos((prev) => [newTodo, ...prev])
  }

  const handleTodoCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setTodos(
      (todos) => (todos.map((todo) => (
        todo.id === e.target.id ? { ...todo, checked: !todo.checked } : todo
      )))
    )

  }
  return (
    <>
      <form action={handleTodoSubmit}>
        <input type="text" name="todoName" id="todoName"
          onChange={(e) => setTodoName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter")
              handleTodoSubmit();
          }}
        />
        <input type="submit" value="submit" />
      </form>
      <ul>
        {todos.map((todo) =>
        (
          <li style={{ display: 'flex' }} key={todo.id}>
            <input type="checkbox" checked={todo.checked} id={todo.id} onChange={(e) => handleTodoCheck(e)} />
            <p>{todo.name}</p>
          </li>
        ))}
      </ul>

    </>
  )
}

export default App
