import express from 'express';
import { addHive, exportHivesAsCSV, getHives } from '../controller/hiveController.js';

const router = express.Router();




/**
 * @swagger
 * /hives:
 *   post:
 *     summary: Add a new hive log
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hiveId:
 *                 type: string
 *               datePlaced:
 *                 type: string
 *                 format: date
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               numColonies:
 *                 type: number
 *     responses:
 *       200:
 *         description: Hive log added successfully
 */
router.post('/', addHive);

/**
 * @swagger
 * /hives:
 *   get:
 *     summary: Get all hive logs
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/',getHives);


/**
 * @swagger
 * /hives/export:
 *   get:
 *     summary: Export hive logs as CSV
 *     responses:
 *       200:
 *         description: CSV file of hive logs
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 */
router.get('/export', exportHivesAsCSV);
export default router;
