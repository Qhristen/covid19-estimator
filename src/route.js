import express from 'express';
import fs from 'fs';
import support from './support';
import covid19ImpactEstimator from './estimator';
import EstimatorModel from './estimatoModel';

const router = express.Router();
const { getLogDate } = support;
const handlerJson = (req, res) => {
  const output = new EstimatorModel(covid19ImpactEstimator, req.body).toJSON();
  res.json(output);
};

router.post('/', handlerJson);
router.post('/json', handlerJson);

router.post('/xml', (req, res) => {
  const output = new EstimatorModel(covid19ImpactEstimator, req.body).toXML();
  res.header('Content-Type', 'application/xml; charset=UTF-8');
  res.json(output);
});

router.get('/logs', (req, res) => {
  fs.readFile(`./logs/request-response/${getLogDate()}.txt`, (err, data) => {
    if (err && err.code !== 'ENOENT') throw err;
    res.send(data);
  });
});


export default router;
