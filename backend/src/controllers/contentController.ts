import { Request, Response } from 'express';
import Content from '../models/content';

export const createContent = async (req: Request, res: Response) => {
    try {
        const { heading,caraousel, paragraph, links } = req.body;
        const newContent = new Content({ heading,caraousel, paragraph, links });
        await newContent.save();
        res.status(201).json(newContent);
    } catch (error) {
        res.status(500).json({ message: 'Error creating content', error });
    }
};

export const getContent = async (req: Request, res: Response) => {
    try {
        const content = await Content.find();
        res.status(200).json(content);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching content', error });
    }
};
