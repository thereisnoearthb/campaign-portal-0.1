import { Router } from 'express';
import { createContent, getContent } from '../controllers/contentController';

const router = Router();

router.post('/', createContent);
router.get('/', getContent);

export default router;
