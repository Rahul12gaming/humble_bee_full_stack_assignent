import { Parser } from 'json2csv';
import Crop from '../models/Crop.js';
import Joi from 'joi';

export const addCrop = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      floweringStart: Joi.date().required(),
      floweringEnd: Joi.date().required(),
      latitude: Joi.number().min(-90).max(90).required(),
      longitude: Joi.number().min(-180).max(180).required(),
      recommendedHiveDensity: Joi.number().min(1).required()
    });
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const crop = new Crop(value);
    await crop.save();
    res.status(201).json(crop);
  } catch (err) {
    next(err);
  }
};

export const getNearbyCrops = async (req, res, next) => {
  try {
    const { latitude, longitude, radius = 100, date } = req.query;
    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const targetDate = date ? new Date(date) : new Date();
    const crops = await Crop.find({
      latitude: { $gte: latitude - 1, $lte: latitude + 1 },
      longitude: { $gte: longitude - 1, $lte: longitude + 1 },
      floweringStart: { $lte: targetDate },
      floweringEnd: { $gte: targetDate }
    });

    res.json(crops);
  } catch (err) {
    next(err);
  }
};

export const exportCropsAsCSV = async (req, res, next) => {
  try {
    const hives = await Crop.find({});
    if (!hives.length) return res.status(404).json({ error: 'No crops logs found' });

    const fields = ['name', 'floweringStart', 'floweringEnd', 'latitude', 'longitude', 'recommendedHiveDensity', '_id', 'createdAt'];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(hives);

    res.header('Content-Type', 'text/csv');
    res.attachment('crop_logs.csv');
    return res.send(csv);
  } catch (err) {
    next(err);
  }
};