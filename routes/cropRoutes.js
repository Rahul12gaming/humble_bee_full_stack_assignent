import express from 'express';
import { addCrop, exportCropsAsCSV, getNearbyCrops } from '../controller/cropController.js';

const router = express.Router();



/**
 * @swagger
 * /crops:
 *   post:
 *     summary: Add a new crop calendar entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               floweringStart:
 *                 type: string
 *                 format: date
 *               floweringEnd:
 *                 type: string
 *                 format: date
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               recommendedHiveDensity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Crop calendar entry added successfully
 *       400:
 *         description: Bad Request
 */
router.post('/', addCrop);

/**
 * @swagger
 * /crops/nearby:
 *   get:
 *     summary: Get nearby crop opportunities

 *     parameters:
 *       - in: query
 *         name: latitude
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: longitude
 *         required: true
 *         schema:
 *           type: number
 *       - in: query
 *         name: radius
 *         required: false
 *         schema:
 *           type: number
 *           default: 100
 *       - in: query
 *         name: date
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: List of nearby crops
 *       400:
 *         description: Bad Request
 */
router.get('/nearby', getNearbyCrops);


/**
 * @swagger
 * /crops/export:
 *   get:
 *     summary: Export crop logs as CSV

 *     responses:
 *       200:
 *         description: CSV file of hive logs
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 */
router.get('/export', exportCropsAsCSV);
export default router;
