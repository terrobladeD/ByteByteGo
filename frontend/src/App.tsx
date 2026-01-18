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

  const handleAllChecked = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setTodos(todos => todos.map(todo => ({ ...todo, checked: checked })));
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
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" checked={todos.length > 0 && todos.every(todo => todo.checked)} id="AllChecked" onChange={(e) => handleAllChecked(e)} />
              Checked</th>
            <th>Name</th>
            <th>Metric</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>
                <input type="checkbox" checked={todo.checked} id={todo.id} onChange={(e) => handleTodoCheck(e)} />
              </td>
              <td>{todo.name}</td>
              <td>{todo.metric}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </>
  )
}

export default App
