import { useState } from 'react'
import './App.css'

type Todo = {
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
    if (todoName.length > 0) {
      setTodoName("");
      const newTodo: Todo = {
        name: todoName,
        checked: false,
        deleted: false
      }
      setTodos((prev) => [newTodo, ...prev])
    }
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
      {todos.map((todo) =>
        (<p>{todo.name}</p>)
      )}
    </>
  )
}

export default App
