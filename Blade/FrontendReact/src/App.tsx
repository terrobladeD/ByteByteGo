import { useState, type ChangeEvent } from 'react'
import './App.css'

type Todo = {
  id: string
  name: string;
  checked: boolean;
  finished?: boolean;
  deleted?: boolean;
  attributes?: Todo[];
  metric?: number;
  progress?: number;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoName, setTodoName] = useState("");

  const handleTodoSubmit = () => {
    if (!todoName.trim()) return;
    const nameDuplicate = todos.find(todo => todo.name === todoName.trim());
    if (nameDuplicate) {
      alert("Todo name must be unique");
      setTodoName("");
      return;
    }
    setTodoName("");
    const newTodo: Todo = {
      id: Date.now().toString(),
      name: todoName,
      checked: false,
      finished: false,
      deleted: false
    }
    setTodos((prev) => [newTodo, ...prev])
  }

  const handleAllChecked = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setTodos(todos => todos.map(todo => ({ ...todo, checked: checked })));
  }

  const handleStateChange = (type: string) => {
    if (type === "finish") {
      setTodos(todos =>
        todos.map(todo =>
          todo.checked ? { ...todo, finished: true, checked: false } : todo
        )
      );
    } else if (type === "undoFinish") {
      setTodos(todos =>
        todos.map(todo =>
          todo.checked ? { ...todo, finished: false, checked: false } : todo
        )
      );
    } else if (type === "delete") {
      setTodos(todos =>
        todos.map(todo =>
          todo.checked ? { ...todo, deleted: true, checked: false } : todo
        )
      );
    } else if (type === "undoDelete") {
      setTodos(todos =>
        todos.map(todo =>
          todo.checked ? { ...todo, deleted: false, checked: false } : todo
        )
      );
    }

  };

  const handleSortBy = (type: string) => {
    if (type === "name") {
      setTodos(todos => [...todos].sort((a, b) => a.name.localeCompare(b.name)));
    } else if (type === "finished") {
      setTodos(todos => [...todos].sort((a, b) => (a.finished ? 1 : 0) - (b.finished ? 1 : 0)));
    } else if (type === "deleted") {
      setTodos(todos => [...todos].sort((a, b) => (a.deleted ? 1 : 0) - (b.deleted ? 1 : 0)));
    }
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
          className='border'
          onChange={(e) => setTodoName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter")
              handleTodoSubmit();
          }}
        />
        <input className='border' type="submit" value="submit" />
      </form>
      <p>
        <span>Sort By</span>
        <button className='border px-2' onClick={() => handleSortBy('name')}>Name</button>
        <button className='border px-2' onClick={() => handleSortBy('finished')}>Finished</button>
        <button className='border px-2' onClick={() => handleSortBy('deleted')}>Deleted</button>
      </p>
      <p>
        <span>Action</span>
        <button className='border px-2' onClick={() => handleStateChange('finish')}>Finish</button>
        <button className='border px-2' onClick={() => handleStateChange('undoFinish')}>Undo Finish</button>
        <button className='border px-2' onClick={() => handleStateChange('delete')}>Delete</button>
        <button className='border px-2' onClick={() => handleStateChange('undoDelete')}>Undo Delete</button>
      </p>

      <table className='w-full border-collapse'>
        <thead>
          <tr className='text-left'>
            <th>
              <input type="checkbox" checked={todos.length > 0 && todos.every(todo => todo.checked)} id="AllChecked" onChange={(e) => handleAllChecked(e)} />
            </th>
            <th>Name</th>
            <th>Metric</th>
            <th>Finished?</th>
            <th>Deleted?</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>
                <input type="checkbox" checked={todo.checked} id={todo.id} onChange={(e) => handleTodoCheck(e)} />
              </td>
              <td className={`bg-gray-100 font-bold ${todo.finished ? 'text-gray-500' : ''} ${todo.deleted ? 'line-through' : ''}`}>{todo.name}</td>
              <td>{todo.metric}</td>
              <td>{todo.finished ? "1" : "0"}</td>
              <td>{todo.deleted ? "1" : "0"}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </>
  )
}

export default App
