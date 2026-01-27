import { Router } from 'express';
import { getTodos, saveTodos } from '../controllers/todo.controller';

const router = Router();

router.get('/', getTodos);
router.post('/', saveTodos);

export default router;
