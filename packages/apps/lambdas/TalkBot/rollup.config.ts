import { defineConfig } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import copy from 'rollup-plugin-copy'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import analyze from 'rollup-plugin-analyzer'

export default defineConfig({
  input: './index.ts',
  output: {
    dir: './out/dist/TalkBot/',
    format: 'cjs',
    preserveModules: true,
    exports: 'auto',
  },
  external: ['aws-sdk'],
  plugins: [
    typescript(),
    nodeResolve({
      preferBuiltins: true,
      mainFields: ['main'],
    }),
    commonjs(),
    json(),
    copy({
      targets: [
        {
          src: 'node_modules/winston/package.json',
          dest: 'out/dist/TalkBot/node_modules/winston',
        },
        {
          src: 'package.json',
          dest: 'out/dist/TalkBot',
        },
      ],
    }),
    analyze({ summaryOnly: true, limit: 5 }),
  ],
})
