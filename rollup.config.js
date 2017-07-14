import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import nodeResolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import postcss from 'rollup-plugin-postcss'
import postcssModules from 'postcss-modules'
import cssnano from 'cssnano'
import cssnext from 'postcss-cssnext'
import autoprefixer from 'autoprefixer'

const cssExportMap = {}

export default {
  entry: 'lib/index.js',
  moduleName: 'dialogs',
  format: 'umd',
  dest: 'dist/vanilla-dialogs.umd.min.js',
  plugins: [
    postcss({
      plugins: [
        autoprefixer({
          warnForDuplicates: false
        }),
        cssnext(),
        postcssModules({
          getJSON (id, exportTokens) {
            cssExportMap[id] = exportTokens;
          }
        }),
        cssnano()
      ],
      getExport (id) {
        return cssExportMap[id];
      }
    }),
    nodeResolve(),
    commonjs(),
    babel({
      babelrc: false,
      presets: [
        [
          'env',
          {
            modules: false
          }
        ]
      ],
      plugins: ['external-helpers']
    }),
    uglify(),
    filesize()
  ]
}
