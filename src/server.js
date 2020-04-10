import express from 'express';
import cores from 'cores';
import fs from 'fs';
import support from './support';

const app = express();
app.use(cores);
app.use(express.json());
const port = process.env.PORT || 3550;
const { getLogDate } = support;

app.get('/clearLogs', (req, res) => {
  fs.unlink(`./logs/request-response/${getLogDate()}.txt`, (err) => {
    if (err) throw err;
    res.send('success');
  });
});

app.listen(port);
