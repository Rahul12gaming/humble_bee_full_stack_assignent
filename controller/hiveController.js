import { Parser } from 'json2csv';
import Hive from '../models/Hive.js';
import Joi from 'joi';

export const addHive = async (req, res, next) => {
  try {
    const schema = Joi.object({
      hiveId: Joi.string().required(),
      datePlaced: Joi.date().required(),
      latitude: Joi.number().min(-90).max(90).required(),
      longitude: Joi.number().min(-180).max(180).required(),
      numColonies: Joi.number().min(1).required()
    });
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const existingHive = await Hive.findOne({ hiveId: value.hiveId });
    if (existingHive) return res.status(400).json({ error: 'Hive ID must be unique' });

    const hive = new Hive(value);
    await hive.save();
    res.status(201).json(hive);
  } catch (err) {
    next(err);
  }
};

export const getHives = async (req, res, next) => {
  try {
    const { startDate, endDate, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (startDate || endDate) {
      filter.datePlaced = {};
      if (startDate) filter.datePlaced.$gte = new Date(startDate);
      if (endDate) filter.datePlaced.$lte = new Date(endDate);
    }

    const hives = await Hive.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(hives);
  } catch (err) {
    next(err);
  }
};


export const exportHivesAsCSV = async (req, res, next) => {
  try {
    const hives = await Hive.find({});
    if (!hives.length) return res.status(404).json({ error: 'No hive logs found' });

    const fields = ['hiveId', 'datePlaced', 'latitude', 'longitude', 'numColonies', '_id', 'createdAt', 'updatedAt'];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(hives);

    res.header('Content-Type', 'text/csv');
    res.attachment('hive_logs.csv');
    return res.send(csv);
  } catch (err) {
    next(err);
  }
};