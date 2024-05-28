import { Router, Request, Response } from 'express';
import { Webpage } from '../models/Webpage';

const router = Router();

// Route to save a webpage
router.post('/save', async (req: Request, res: Response) => {
  const { elements } = req.body;
  // console.log(elements[5].links)
  if (!elements || !Array.isArray(elements)) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const webpage = new Webpage({ elements });
    await webpage.save();
    res.status(201).json({ message: 'Webpage saved successfully', webpageId: webpage._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// fetch all saved webpages
router.get('/webpages', async (req: Request, res: Response) => {
  try {
    const webpages = await Webpage.find();
    res.status(200).json(webpages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;