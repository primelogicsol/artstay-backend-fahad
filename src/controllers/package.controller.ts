import { logger } from "~/utils/logger";
import { Request, Response } from 'express';
import prisma from "~/libs/prisma";

export const createArtisanPackage = async (req: Request, res: Response) => {
    try {
        const packageReq: ArtisanPackageRequestProps = req.body

        const artisan = await prisma.artisan.findFirst({
            where: {
                accountId: packageReq.accountId
            },
            select: {
                artisanId: true
            }
        })
        if (!artisan) throw new Error("Artisan not found.")
        await prisma.artisanPackage.create({
            data: {
                artisanId: artisan.artisanId,
                title: packageReq.title,
                price: packageReq.price,
                duration: packageReq.duration,
                experience: packageReq.experience,
                features: packageReq.features
            }
        })
        res.status(201).json({ status: 'success', message: 'package created successfully', data: null });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to create package',
            data: null
        });
    }
};

export const updateArtisanPackage = async (req: Request, res: Response) => {
    try {
        const packageReq: ArtisanPackageUpdateProps = req.body

        await prisma.artisanPackage.update({
            where: { packageId: packageReq.packageId },
            data: {
                title: packageReq.title,
                price: packageReq.price,
                duration: packageReq.duration,
                experience: packageReq.experience,
                features: packageReq.features
            }
        })
        res.status(201).json({ status: 'success', message: 'package updated successfully', data: null });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to update package',
            data: null
        });
    }
};

export const getArtisanPackages = async (req: Request, res: Response) => {
    try {
        const { accountId } = req.params

        const packages: ArtisanPackageProps[] = await prisma.artisanPackage.findMany({
            where: {
                artisan: {
                    accountId: accountId
                }
            }
        })
        res.status(201).json({ status: 'success', message: 'packages fetched successfully', data: packages });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch packages',
            data: null
        });
    }
};

export const getPackageById = async (req: Request, res: Response) => {
    try {
        const { packageId } = req.params

        const artisanPackage: ArtisanPackageProps = await prisma.artisanPackage.findUniqueOrThrow({
            where: {
                packageId: packageId
            }
        })
        res.status(201).json({ status: 'success', message: 'packages fetched successfully', data: artisanPackage });
    } catch (error) {
        logger.error(error)
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to fetch packages',
            data: null
        });
    }
};