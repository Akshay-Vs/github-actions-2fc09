import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
  input: 'index.js',
  output: [
    {
      file: 'dist/bundle.cjs',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/bundle.mjs',
      format: 'es',
      sourcemap: true
    },
    {
      file: 'dist/bundle.umd.js',
      format: 'umd',
      name: 'MyLibrary',
      sourcemap: true,
      globals: {
        jsdom: 'jsdom'
      }
    },
    {
      file: 'dist/bundle.amd.js',
      format: 'amd',
      sourcemap: true
    },
    {
      file: 'dist/bundle.system.js',
      format: 'system',
      sourcemap: true
    }
  ],
  external: ['jsdom'],
  plugins: [
    commonjs(),
    [terser()]

  ],
  treeshake: {
    moduleSideEffects: false
  }
};
