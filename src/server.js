import express from 'express';
import cores from 'cores';
import fs from 'fs';
import support from './support';
import router from './route';

const app = express();
const port = process.env.PORT || 3550;
const { getLogDate } = support;
app.use(cores);
app.use(express.json());

app.get('/clearLogs', (req, res) => {
  fs.unlink(`./logs/request-response/${getLogDate()}.txt`, (err) => {
    if (err) throw err;
    res.send('success');
  });
});

const { toServerLog, getDuration } = support;

const responseTime = (req, res, next) => {
  const startTime = process.hrtime();

  res.on('finish', () => {
    toServerLog(`${req.method}    ${req.baseUrl ? req.baseUrl : ''}${req.path}   ${res.statusCode}   ${getDuration(startTime)}ms`);
  });

  next();
};

app.use(responseTime);
app.use('/', express.static('public'));
app.use('/api/v1/on-covid-19', router);
app.listen(port);
