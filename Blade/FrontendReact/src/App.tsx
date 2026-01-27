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
const API_BASE = 'http://localhost:8080';

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

  const saveTodos = async (todos: Todo[]) => {
    const res = await fetch(`${API_BASE}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todos)
    })

    console.log(res)
  }

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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 flex">
          <div className='flex-1'>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Todo Console</h1>
            <p className="mt-2 text-sm text-slate-600">Multi-sort, bulk actions, and metrics in a clean operational layout.</p>
          </div>


          <button
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            onClick={() => saveTodos(todos)}
          >
            Save
          </button>
        </header>

        <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <form action={handleTodoSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1">
              <label htmlFor="todoName" className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">New Todo</label>
              <input
                type="text"
                name="todoName"
                id="todoName"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                placeholder="Add a unique task name"
                onChange={(e) => setTodoName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    handleTodoSubmit();
                }}
              />
            </div>
            <input
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              type="submit"
              value="Create"
            />
          </form>
        </section>

        <section className="mb-6 grid gap-4 lg:grid-cols-[2fr,3fr]">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Sort Rules</span>
              <span className="text-xs text-slate-400">Click order icon to toggle</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {sortBys.map(sort => (
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700" key={sort.by}>
                  <button
                    type="button"
                    className="text-slate-500 transition hover:text-slate-800"
                    onClick={() => handleSortByOrder(sort.by)}
                  >
                    {sort.order === 'asc' ? 'Asc' : 'Desc'}
                  </button>
                  <span className="uppercase tracking-wide text-slate-600">{sort.by}</span>
                  <button
                    type="button"
                    className="text-slate-400 transition hover:text-rose-500"
                    onClick={() => handleRemoveSortBy(sort.by)}
                  >
                    X
                  </button>
                </span>
              ))}
            </div>
            <div className="mt-4">
              <label htmlFor="MultiSort" className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Add Sort</label>
              <select
                name="MultiSort"
                id="MultiSort"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                onChange={(e) => handleSortBy2(e)}
              >
                <option value=" ">Select</option>
                {SORT_BY.filter(key => !(sortBys.map(sort => sort.by)).includes(key)).map(key => (
                  <option value={key} key={key}>{key}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Actions</div>
            <div className="flex flex-wrap gap-3">
              <button className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white" onClick={() => handleStateChange('finish')}>Finish</button>
              <button className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white" onClick={() => handleStateChange('undoFinish')}>Undo Finish</button>
              <button className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-100" onClick={() => handleStateChange('delete')}>Delete</button>
              <button className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700 transition hover:border-amber-300 hover:bg-amber-100" onClick={() => handleStateChange('undoDelete')}>Undo Delete</button>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Todos</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-300"
                      checked={todos.length > 0 && todos.every(todo => todo.checked)}
                      id="AllChecked"
                      onChange={(e) => handleAllChecked(e)}
                    />
                  </th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Metric</th>
                  <th className="px-4 py-3">Finished</th>
                  <th className="px-4 py-3">Deleted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {sortedTodos.map((todo) => (
                  <tr key={todo.id} className="transition hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-300"
                        checked={todo.checked}
                        id={todo.id}
                        onChange={(e) => handleTodoCheck(e)}
                      />
                    </td>
                    <td className={`px-4 py-3 font-semibold ${todo.finished ? 'text-slate-500' : 'text-slate-900'} ${todo.deleted ? 'line-through' : ''}`}>{todo.name}</td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        id={todo.id}
                        value={todo.metric}
                        className="w-24 rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                        onChange={(e) => handleMetricChange(e)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${todo.finished ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        {todo.finished ? "1" : "0"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${todo.deleted ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-500'}`}>
                        {todo.deleted ? "1" : "0"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
