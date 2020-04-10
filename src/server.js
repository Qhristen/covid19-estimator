import express from 'express';
import cores from 'cores';
import fs from 'fs';
import support from './support';
import covid19ImpactEstimator from './estimator';
import EstimatorModel from './estimatoModel';

const app = express();
const router = express.router();
app.use(cores);
app.use(express.json());
const port = process.env.PORT || 3550;
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

app.get('/clearLogs', (req, res) => {
  fs.unlink(`./logs/request-response/${getLogDate()}.txt`, (err) => {
    if (err) throw err;
    res.send('success');
  });
});

router.get('/logs', (req, res) => {
  fs.readFile(`./logs/request-response/${getLogDate()}.txt`, (err, data) => {
    if (err && err.code !== 'ENOENT') throw err;
    res.send(data);
  });
});


app.use('/', express.static('public'));

app.use('/api/v1/on-covid-19', router);
app.listen(port);
