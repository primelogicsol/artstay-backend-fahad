import prisma from '~/libs/prisma';
import { logger } from '~/utils/logger';



export const craftService = {
    getAllCrafts: async () => {
        try {
            const crafts = await prisma.craft.findMany()
            return {
                status: 'success',
                message: 'crafts fetched',
                data: crafts
            }
        } catch (error) {
            logger.error(error)
            throw new Error('Failed to fetch crafts')
        }
    },
    createCraft: async (craftName: string) => {
        try {
            const craftSlug = craftName.toLowerCase().replace(/ /g, "-");
            await prisma.craft.create({
                data: {
                    craftName,
                    craftSlug
                }
            })
            return {
                status: 'success',
                message: 'craft added',
                data: null
            };
        } catch (error) {
            logger.error(error)
            throw new Error('Failed to create craft')
        }
    },
    updateCraft: async (craftId: string, craftName: string) => {
        try {
            const craftSlug = craftName.toLowerCase().replace(/ /g, "-");
            await prisma.craft.update({
                where: { craftId },
                data: { craftName, craftSlug }
            })
            return {
                status: 'success',
                message: 'craft updated',
                data: null
            };
        } catch (error) {
            logger.error(error)
            throw new Error('Failed to update craft')
        }
    },
    deleteCraft: async (craftId: string) => {
        try {
            await prisma.craft.delete({
                where: { craftId }
            })
            return {
                status: 'success',
                message: 'craft deleted',
                data: null
            };
        } catch (error) {
            logger.error(error)
            throw new Error('Failed to delete craft')
        }
    },
    getAllSubCraftsByCraftId: async (craftId: string) => {
        try {
            const subCrafts = await prisma.subCraft.findMany({
                where: { craftId }
            })
            return {
                status: 'success',
                message: 'sub crafts fetched',
                data: subCrafts
            };
        } catch (error) {
            logger.error(error)
            throw new Error('Failed to fetch sub crafts')
        }
    },  
    createSubCraft: async (craftId: string, subCraftName: string) => {
        try {
            const subCraftSlug = subCraftName.toLowerCase().replace(/ /g, "-");
            await prisma.subCraft.create({
                data: { craftId, subCraftName, subCraftSlug }
            })
            return {
                status: 'success',
                message: 'sub craft added',
                data: null
            };
        } catch (error) {
            logger.error(error)
            throw new Error('Failed to create sub craft')
        }
    },
    updateSubCraft: async (subCraftId: string, subCraftName: string) => {
        try {
            const subCraftSlug = subCraftName.toLowerCase().replace(/ /g, "-");
            await prisma.subCraft.update({
                where: { subCraftId },
                data: { subCraftName, subCraftSlug }
            })
            return {
                status: 'success',
                message: 'sub craft updated',
                data: null
            };
        } catch (error) {
            logger.error(error)
            throw new Error('Failed to update sub craft')
        }
    }

}


