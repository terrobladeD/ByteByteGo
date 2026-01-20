import { useMemo, useState, type ChangeEvent } from 'react'
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
const SORT_BY = ["name", "metric", "finished", "deleted"] as const;
type SortBy = typeof SORT_BY[number];
type Order = "asc" | "desc";
type SortRule = { by: SortBy; order: Order }

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoName, setTodoName] = useState("");

  const [sortBys, setSortBys] = useState<SortRule[]>([]);

  const sortedTodos = useMemo(() => {
    const tempTodos = [...todos];
    tempTodos.sort((a, b) => {
      for (const key of sortBys) {
        const av = a[key.by];
        const bv = b[key.by];
        if (av === bv) continue
        let result = 0;
        // boolean
        if (typeof av === 'boolean' && typeof bv === 'boolean') {
          // true 比 false “更大”
          result = (av ? 1 : 0) - (bv ? 1 : 0)

        }
        // number
        if (typeof av === 'number' && typeof bv === 'number') {
          result = av - bv
        }
        // string
        result = String(av).localeCompare(String(bv));
        return key.order === 'asc' ? result : -result;
      }
      return 0;
    });
    return tempTodos;
  }, [todos, sortBys])

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
      deleted: false,
      metric: 0,
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

  const handleTodoCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setTodos(
      (todos) => (todos.map((todo) => (
        todo.id === e.target.id ? { ...todo, checked: !todo.checked } : todo
      )))
    )
  }

  const handleMetricChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodos(
      (todos) => (todos.map((todo) => (
        todo.id === e.target.id ? { ...todo, metric: Number(e.target.value) } : todo
      )))
    )
  }

  const handleSortBy2 = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value !== " ") {
      setSortBys(sortBys => [...sortBys, { by: value as SortBy, order: "asc" }]);
    }
  }

  const handleRemoveSortBy = (by: SortBy) => {
    setSortBys(prev => prev.filter(item => item.by !== by));
  };

  const handleSortByOrder = (by: SortBy) => {
    setSortBys(prev => prev.map(item => item.by === by ? { ...item, order: item.order === 'asc' ? 'desc' : 'asc' } : item));
  };

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
        <span>New Sort By</span>
        {sortBys.map(sort => (
          <span className='border px-2' key={sort.by}>
            <span onClick={() => handleSortByOrder(sort.by)}>{sort.order === 'asc' ? ' ↑ ' : ' ↓ '}</span>
            <span>{sort.by}</span>
            <span onClick={() => handleRemoveSortBy(sort.by)}>&nbsp;X&nbsp;</span>
          </span>
        ))}

        <select name="MultiSort" id="MultiSort" className='border' onChange={(e) => handleSortBy2(e)}>
          <option value=" ">  </option>
          {SORT_BY.filter(key => !(sortBys.map(sort => sort.by)).includes(key)).map(key => (
            <option value={key} key={key}>{key}</option>
          ))}
        </select>
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
          {sortedTodos.map((todo) => (
            <tr key={todo.id}>
              <td>
                <input type="checkbox" checked={todo.checked} id={todo.id} onChange={(e) => handleTodoCheck(e)} />
              </td>
              <td className={`bg-gray-100 font-bold ${todo.finished ? 'text-gray-500' : ''} ${todo.deleted ? 'line-through' : ''}`}>{todo.name}</td>
              <td className='max-w-20'><input type="number" id={todo.id} value={todo.metric} onChange={(e) => handleMetricChange(e)} /></td>
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
