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

Promise.all(actions).then(res => {
  console.log(res);

  fs.writeFileSync('./test.png', res[1]);
  fs.writeFileSync('./test2.png', res[2]);
});
