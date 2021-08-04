const mix = require('laravel-mix')
const cssImport = require('postcss-import')
const cssNesting = require('postcss-nesting')
const webpack = require('webpack');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .js('resources/js/app.js', 'public/js')
  .vue()
  .alias({ '@': 'resources/js' })
  .postCss('resources/css/app.css', 'public/css', [
    // prettier-ignore
    cssImport(),
    cssNesting(),
    require('tailwindcss'),
  ])
  .version()
  .sourceMaps()
  .webpackConfig ({
    plugins: [
        // vue esm-bundler
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        }),
    ],
  })
