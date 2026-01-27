import { Request, Response } from 'express';
import * as todoService from '../services/todo.service';

export const getTodos = async (_req: Request, res: Response) => {
  const todos = await todoService.loadTodos();
  res.json(todos);
};

export const saveTodos = async (req: Request, res: Response) => {
  await todoService.saveTodos(req.body);
  res.status(200).json({ ok: true });
};
