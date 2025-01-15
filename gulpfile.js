//--------------------------------------------------
// Requirements

    const { src, dest, series, parallel, watch } = require('gulp'),
            sync = require('browser-sync'),
            less = require('gulp-less'),
            cleanCSS = require('gulp-clean-css'),
            lessAutoprefix = require('less-plugin-autoprefix'),
            autoprefix = new lessAutoprefix({browsers: ['last 2 version']}),
            terser = require('gulp-terser'),
            concat = require('gulp-concat'),
            svgmin = require('gulp-svgmin'),
            svgSprite = require('gulp-svg-sprite'),
            run = require('gulp-run-command').default;

//--------------------------------------------------
// Locations

    const source = 'src/assets/';
    const web = 'dist/_assets/';

    const srcPaths = {
        less: source + 'less/**/*.less',
        js: source + 'js/**/*.js',
        img: source + 'img/**/*',
        svg: source + 'svg/**/*.svg',
        sprite: source + 'svg/sprites/*.svg',
        font: source + 'font/**/*.+(woff|woff2|eot|svg|ttf)',
        video: source + 'video/**/*',
        html: 'src/**/*.+(njk|twig|html|php|md)'
    }

    const pubPaths = {
        css: web + 'css/',
        js: web + 'js/',
        img: web + 'img/',
        svg: web + 'svg/',
        sprite: web + 'svg/_global',
        font: web + 'font',
        video: web + 'video',
    }

//--------------------------------------------------
// CSS 

    function css() {
        return src(srcPaths.less)
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(cleanCSS())
        .pipe(dest(pubPaths.css));
    }

//--------------------------------------------------
// JavaScript

    function js() {
        return src(srcPaths.js)
        .pipe(terser()) //disable for local debugging
        .pipe(dest(pubPaths.js))
    }

    // JS Bundle
    function jsGlobal() {
        return src([
            source + 'js/_vendor/lenis.min.js',
            source + 'js/_global/global.js'
        ])
        .pipe(terser()) //disable for local debugging
        .pipe(concat('bundle.js'))
        .pipe(dest(web + 'js/_global/'))
    }

//--------------------------------------------------
// SVGs

    function svg() {
        return src(srcPaths.svg)
        .pipe(svgmin({
            plugins: [
                { cleanupIDs: false },
                { removeUselessDefs: false },
                { convertPathData: false }
            ]
        }))
        .pipe(dest(pubPaths.svg))
    }

    // SVG Sprite
    function sprite() {
        return src(srcPaths.sprite)
        .pipe(svgSprite({
            shape: {
                transform: [{
                    svgo: {
                        plugins: [{
                            name: 'preset-default',
                            xmlDeclaration: false
                        }]
                    }
                }]
            },
            mode: {
                symbol: {
                    dest: '',
                    sprite: 'sprite.svg',
                    // example: true, //for debugging
                }
            }
        }))
        .pipe(dest(pubPaths.sprite))
    }

//--------------------------------------------------
// Images

    function img(){
        return src(srcPaths.img, { encoding: false })
        .pipe(dest(pubPaths.img))
    }

//--------------------------------------------------
// Fonts

    function font(){
        return src(srcPaths.font, { encoding: false })
        .pipe(dest(pubPaths.font))
    }

//--------------------------------------------------
// Video

    function video(){
        return src(srcPaths.video, { encoding: false })
        .pipe(dest(pubPaths.video))
    }

//--------------------------------------------------
// Eleventy

    const eleventyWatch = () => {
        run('npx @11ty/eleventy --watch')()
    }

//--------------------------------------------------
// Browser sync

    function serve() {
        sync.init({
            server: {
                baseDir: 'dist/'
            },
            notify: false,
        });
    }

//--------------------------------------------------
// Tasks

    const reload = sync.reload;

    exports.watch = function() {
        serve();
        watch(srcPaths.less, css).on('change', reload);
        watch(srcPaths.js, js).on('change', reload);
        watch(srcPaths.img, img).on('change', reload);
        watch(srcPaths.svg, svg).on('change', reload);
        watch(srcPaths.sprite, svgSprite).on('change', reload);
        watch(srcPaths.html).on('change', reload);
        eleventyWatch();
    }

    exports.default = parallel(css, js, jsGlobal, img, svg, sprite, font, video);