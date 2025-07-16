import { Request, Response } from 'express';
import { logger } from '~/utils/logger';
import { craftService } from '~/services/craft.service';


export const createCraft = async (req: Request, res: Response) => {
    try {
        const result = await craftService.createCraft(req.body.craftName)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to create account',
            data: null
        });
    }
};

export const updateCraft = async (req: Request, res: Response) => {
    try {
        const result = await craftService.updateCraft(req.body.craftId, req.body.craftName)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to update craft',
            data: null
        });
    }
};

export const createSubCraft = async (req: Request, res: Response) => {
    try {
        const result = await craftService.createSubCraft(req.body.craftId, req.body.subCraftName)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to create account',
            data: null
        });
    }
};

export const getAllCrafts = async (req: Request, res: Response) => {
    try {
        const result = await craftService.getAllCrafts()
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch crafts',
            data: null
        });
    }
};


export const getAllSubCraftsByCraftId = async (req: Request, res: Response) => {
    try {
        const result = await craftService.getAllSubCraftsByCraftId(req.params.craftId)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch sub crafts',
            data: null
        });
    }
};

export const updateSubCraft = async (req: Request, res: Response) => {
    try {
        const result = await craftService.updateSubCraft(req.body.subCraftId, req.body.subCraftName)
        res.status(201).json(result);
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to update sub craft',
            data: null
        });
    }
}
