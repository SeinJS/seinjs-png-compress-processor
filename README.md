# seinjs-png-compress-processor

Compress png files with webpack loaders for Sein.js.

## Install

```bash
npm i seinjs-png-compress-processor --save-dev
```

## Usage

in `webpack.config.js`:

```js
{
  module: {
    rules: [
      {
          test: /\.(gltf|glb)$/,
          use: [
            {
              loader: 'seinjs-gltf-loader',
              options: {
                ......
                process: {
                  enabled: true,
                  processors: [
                    new SeinJSPNGCompressProcessor({
                      /**
                       * Which files will be processed.
                       * 
                       * @default /\.png/g
                       */
                      test: /\.png/g,
                      /**
                       * Palette size(how many colors you want to have) if `quantized` is true.
                       * 
                       * @default 256
                       */
                      psize: 200,
                      /**
                       * You can overwrite settings for each file.
                       */
                      custom: (filePath: string, data: Buffer) => {
                        if (/haha/.test(filePath)) {
                          return {psize: 100, skip: false};
                        }
                      }
                    })
                  ]
                }
              }
            }
          ]
      }
    ]
  }
}
```
