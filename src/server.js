import express from 'express';
import cores from 'cores';

const app = express();
app.use(cores);
app.use(express.json());

const port = process.env.PORT || 3550;

app.listen(port);