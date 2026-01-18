### 📌 字符串 (String)

```js
const str = "Hello World";
//基础操作
str.length; // 获取长度 => 11
str.toLowerCase(); // 全部小写 => "hello world"
str.toUpperCase(); // 全部大写 => "HELLO WORLD"
str.trim(); // 去除首尾空格 => "Hello World"
//截取与分割
str.slice(0, 5); // => "Hello"
str.substring(6); // => "World"
"apple,banana".split(","); // => ["apple", "banana"]
//查找与判断
str.includes("World"); // => true
str.startsWith("He"); // => true
str.endsWith("ld"); // => true
//替换与拼接
str.replace("World", "JS"); // => "Hello JS"
"abc".repeat(3); // => "abcabcabc"
"Hello".concat(" ", "Blade"); // => "Hello Blade"
//模板字符串
const name = "Blade";
const msg = `Hello, ${name}!`; // => "Hello, Blade!"
```
---

### 📌 数组 (Array)

```js
const arr = [1, 2, 3, 4, 5];
//添加与删除
arr.push(6); // 末尾添加 => [1,2,3,4,5,6]
arr.pop(); // 删除末尾 => [1,2,3,4,5]
arr.unshift(0); // 头部添加 => [0,1,2,3,4,5]
arr.shift(); // 删除头部 => [1,2,3,4,5]
//遍历与转换
arr.forEach(n => console.log(n)); // 遍历输出
const doubled = arr.map(n => n * 2); // => [2,4,6,8,10]
const even = arr.filter(n => n % 2 === 0); // => [2,4]
//查找与判断
arr.find(n => n === 3); // => 3
arr.findIndex(n => n === 3); // => 2
arr.some(n => n > 4); // => true
arr.every(n => n > 0); // => true
//累加与合并
const sum = arr.reduce((acc, cur) => acc + cur, 0); // => 15
const newArr = arr.concat([6, 7]); // => [1,2,3,4,5,6,7]
const merged = [...arr, 6, 7]; // 扩展运算符合并
//排序与反转
const sorted = [...arr].sort((a, b) => a - b); // 升序
arr.reverse(); // 反转数组
//去重与扁平化
const unique = [...new Set([1,2,2,3,3])]; // => [1,2,3]
const nested = [1, [2, [3, 4]]];
nested.flat(2); // => [1,2,3,4]
//多维数组
// 使用 Array.from({ length: n }, (_, i) => i + 1)
// (value, index) => newValue
const matrix = Array.from({ length: m }, () =>
  Array.from({ length: n }, () => 0)
);
```

---

### 📌 对象 (Object)

```js
const user = { name: "Blade", age: 25, city: "Melbourne" };
//读取与修改
user.name; // => "Blade"
user["city"]; // => "Melbourne"
user.age = 26; // 修改
delete user.city; // 删除属性
//解构与扩展
const { name, age } = user; // 解构
const newUser = { ...user, country: "Australia" }; // 扩展（复制 + 新增）
//遍历对象
Object.keys(user); // => ["name", "age", "city"]
Object.values(user); // => ["Blade", 25, "Melbourne"]
Object.entries(user); // => [["name","Blade"],["age",25],["city","Melbourne"]]
for (const [key, value] of Object.entries(user)) {
  console.log(key, value);
}
//合并与克隆
const extra = { gender: "male" };
const merged = Object.assign({}, user, extra);
// => { name: "Blade", age: 25, city: "Melbourne", gender: "male" }
//可选链与默认值
const city = user.address?.city || "Unknown"; // 避免报错
//判断属性存在
"name" in user; // => true
user.hasOwnProperty("age"); // => true
```

---

### 📎 常用综合示例

```js
const users = [
  { id: 1, name: "Alice", age: 20 },
  { id: 2, name: "Bob", age: 25 },
  { id: 3, name: "Charlie", age: 30 }
];

// 筛选年龄大于 21 的人名
const names = users.filter(u => u.age > 21).map(u => u.name);
// => ["Bob", "Charlie"]

// 根据 id 查找用户
const target = users.find(u => u.id === 2);

// 年龄总和
const totalAge = users.reduce((sum, u) => sum + u.age, 0); // => 75
```
