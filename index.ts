/**
 * @File   : index.ts
 * @Author : dtysky (dtysky@outlook.com)
 * @Date   : 11/18/2019, 3:54:07 PM
 * @Description:
 */
import * as PNG from 'upng-js';

function debug(msg: string) {
  if (process.env.SEINJS_LOADER_DEBUG) {
    console.log('seinjs-png-compress-processor', msg);
  }
}

export = class SeinJSPNGCompressProcessor {
  public test: RegExp | ((filePath: string) => boolean) = /\.png/g;

  private _psize: number = 256;
  private _custom: (filePath: string) => {
    psize?: number;
  } = null;

  constructor(options: {
    /**
     * Which files will be processed.
     * 
     * @default /\.png/g
     */
    test: RegExp | ((filePath: string) => boolean);
    /**
     * Palette size(how many colors you want to have) if `quantized` is true.
     * 
     * @default 256
     */
    psize?: number;
    /**
     * You can overwrite settings for each file.
     */
    custom?(filePath: string): {
      psize?: number;
    }
  }) {
    if (options) {
      this.test = options.test;
      this._psize = options.psize || this._psize;
      this._custom = options.custom || this._custom;
    }
  }

  process(options: {data: Buffer, filePath: string}): Promise<Buffer> {
    return new Promise((resolve) => {
      let {data, filePath} = options;

      if (!(data instanceof Buffer)) {
        data = new Buffer(data);
      }

      const cpOptions = {psize: this._psize};
      if (this._custom) {
        Object.assign(cpOptions, this._custom(filePath) || {});
      }

      debug(`${filePath}, ${JSON.stringify(cpOptions)}`);

      try {
        const png = PNG.decode(data);
        const res = PNG.encode([png.data], png.width, png.height, cpOptions.psize);
        data = Buffer.from(res);
        console.error(`PNG Compress success: ${filePath}`);
      } catch(error) {
        console.error(`PNG Compress error: file ${filePath}, ${error.message}`);
      }

      resolve(data);
    });
  }
}
