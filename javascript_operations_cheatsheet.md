
### 🧠 JS/TS

---

#### 🧩 1. Array 数组

```ts
const arr = [1, 2, 3];
const copy = [...arr];
// 遍历
const filled = Array(5).fill(0);
arr.forEach((v, i) => {});
for (const v of arr) {}
for (const [i, v] of arr.entries()) {}
// 查找
arr.includes(2);
arr.indexOf(2);
arr.find(x => x.id === 10);
arr.findIndex(x => x.id === 10);
// 筛选 / 映射 / 汇总
arr.filter(x => x > 2);
arr.map(x => x * 2);
arr.reduce((sum, cur) => sum + cur, 0);
// 增删改
arr.push(4);
arr.pop();
arr.unshift(0);
arr.shift();
// arr.splice(start, deleteCount, item1?, item2?, ...)
arr.splice(1, 0, 99);  // 插入
arr.splice(2, 1);      // 删除
// 排序 / 去重
arr.sort((a, b) => a - b);
[...new Set(arr)];
// 拆分 / 合并
arr.slice(1, 3);
arr.concat([4, 5]);
// 数组 ↔ 字典
const grouped = arr.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {} as Record<number, YourType>);
// eg:
const arr: User[] = [
  { id: 101, name: 'Alice' },
  { id: 205, name: 'Bob' },
];
const byId = arr.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {} as Record<number, User>);
/*
byId = {
  101: { id: 101, name: 'Alice' },
  205: { id: 205, name: 'Bob' }
}
*/
byId[205].name; // 'Bob'
```

---

#### 🧱 2. Object 对象

```ts
const obj = { a: 1, b: 2 };
const copy = { ...obj };
const merged = { ...obj, c: 3 };
// 安全读取
const city = user?.address?.city ?? 'unknown';
// 遍历
Object.keys(obj);
Object.values(obj);
Object.entries(obj);
// 删除属性
delete obj.b;
// 对象 ↔ 数组
Object.entries(obj); // [['a',1], ['b',2]]
Object.fromEntries([["a", 1]]); // {a:1}
```

---

#### 🧮 3. Map / Set 哈希

```ts
// Map
const map = new Map<string, number>();
map.set('a', 1);
map.get('a');
map.has('a');
map.delete('a');
for (const [k, v] of map) {}
// Set
const set = new Set([1, 2, 3]);
set.add(4);
set.has(2);
set.delete(3);

const inter = new Set([...set1].filter(x => set2.has(x)));
```

---

#### 🕒 4. Date 日期

```ts
const now = new Date();
now.toISOString(); // '2025-11-12T06:16:19.101Z'
now.getTime(); // timestamp
const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
const yyyy = now.getFullYear();
const mm = String(now.getMonth() + 1).padStart(2, '0');
const dd = String(now.getDate()).padStart(2, '0');
`${yyyy}-${mm}-${dd}`;
```

---

#### 🔤 5. String 字符串

```ts
const str = 'hello world';
str.includes('hello');
str.startsWith('he');
str.endsWith('ld');
str.split(' ');
' hi '.trim();
['a', 'b'].join(',');
// 模板字符串：
const name = 'Blade';
`Hi ${name}, welcome`;
```
#### 📦 6. JSON

```ts
JSON.parse('{"a":1}');
JSON.stringify({ a: 1 });
JSON.stringify(obj, null, 2); // 带缩进
```

---

#### ⚙️ 7. Promise / async

```ts
// 基本写法
async function fetchData() {
  const res = await fetch('/api');
  const data = await res.json();
  return data;
}
// 并行请求
const [user, posts] = await Promise.all([getUser(), getPosts()]);
```

---

#### 🧾 8. TypeScript 工具类型

```ts
interface User {
  id: number;
  name: string;
  email?: string;
}
```

### Partial
```ts
type UserUpdate = Partial<User>;
```

### Pick / Omit
```ts
type UserBrief = Pick<User, 'id' | 'name'>;
type NoEmail = Omit<User, 'email'>;
```

### Record
```ts
const userMap: Record<string, User> = {};
```

### Readonly
```ts
type ReadonlyUser = Readonly<User>;
```

### 联合类型 / 可空
```ts
type MaybeUser = User | null;
```

### 元组
```ts
const pos: [number, number] = [10, 20];
```

---

## 🧬 9. 深/浅拷贝

```ts
const shallow = { ...obj };
const deep = structuredClone(obj); // ✅ 推荐
// 或 JSON.parse(JSON.stringify(obj))
```

---

## 🔁 10. 常见转换套路

### 数组转字典
```ts
const dict = arr.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {} as Record<string, YourType>);
```

### 字典转数组
```ts
Object.values(dict);
```

### 拆分两组
```ts
const [active, inactive] = arr.reduce<[User[], User[]]>(
  (acc, u) => {
    u.active ? acc[0].push(u) : acc[1].push(u);
    return acc;
  },
  [[], []]
);
```

