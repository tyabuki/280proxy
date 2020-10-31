const express = require('express');
const logger = require('morgan');
const moment = require('moment');
const request = require('request');

const app = express();
app.disable('x-powered-by');
app.use(logger('combined'));

const dest = [
  '/files/280blocker_adblock.txt',
  '/files/280blocker_1blocker.1blockpkg',
  '/files/280blocker_domain.txt',
  '/files/280blocker_domain.zip',
  '/files/280blocker_domain_ag.txt',
];

app.use((req, res, next) => {
  if (!dest.includes(req.path)) {
    res.status(404).send('404 Not Found.');
    return;
  }
  const [base, ext] = req.path.split('.');
  const url = `https://280blocker.net/${base}_${moment().format('YYYYMM')}.${ext}`;
  request.get(url).pipe(res);
});

app.use((err, req, res, next) => {
  res.status(500).send('500 Internal Server Error.');
});
app.listen(process.env.PORT || 3000);
