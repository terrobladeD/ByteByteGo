import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(__dirname, '../data/todos.json');

export const loadTodos = async () => {
  try {
    const content = await fs.readFile(DATA_PATH, 'utf-8');
    return JSON.parse(content);
  } catch {
    return [];
  }
};

export const saveTodos = async (todos: any[]) => {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(todos, null, 2));
};
