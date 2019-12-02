/**
 * @File   : test.ts
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 11/18/2019, 3:54:07 PM
 * @Description:
 */
import * as fs from 'fs';

const Processor = require('./index');

const processor = new Processor();
const processor2 = new Processor({psize: 10});

const actions = [];

const f1 = './assets/haha.txt';
actions.push(processor.process({data: fs.readFileSync(f1), filePath: f1}));

const f2 = './assets/particles.png';
actions.push(processor.process({data: fs.readFileSync(f2), filePath: f2}));

actions.push(processor2.process({data: fs.readFileSync(f2), filePath: f2}));

const f3 = './assets/loading.png';
actions.push(processor.process({data: fs.readFileSync(f3), filePath: f3}));

Promise.all(actions).then(res => {
  console.log(res);

  res.forEach((r, i) => {
    fs.writeFileSync(`./test${i}.png`, r);
  })
});
