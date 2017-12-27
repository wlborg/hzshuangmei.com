var gulp = require('gulp');

var RevAll = require('gulp-rev-all');
  //compress html
  var  htmlmin = require('gulp-htmlmin');
 //compress images
  var  imagemin = require('gulp-imagemin');
  var  imageminGuetzli = require('imagemin-guetzli');
   var imageminGifsicle = require('imagemin-gifsicle');
   var imageminOptipng = require('imagemin-optipng');
 var   imageminSvgo = require('imagemin-svgo')
  var pngquant = require('imagemin-pngquant');
  var  cache = require('gulp-cache');
  // var jshint = require('gulp-jshint');
 var uglify = require('gulp-uglify');
 var cleanCSS = require('gulp-clean-css');
   var filter = require('gulp-filter');
    var RevAll = require('gulp-rev-all');
   var  del = require('del');

  /*  optimer html files*/
gulp.task('htmlmin', function () {
    var options = {
        html5:true,
        useShortDoctype:true,
        ignoreCustomComments:true,
        caseSensitive:true,
        keepClosingSlash:true,
        quoteCharacter:true,
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        sortAttributes:true,
        sortClassName:true,
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/html/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/html'));
});
  /*  optimer css*/
gulp.task('cleancss', function () {
    gulp.src('src/css/*.css')
        .pipe(cleanCSS({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie8',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*' //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(gulp.dest('dist/css'));
});

  /*  optimer images*/
//orginal version
// gulp.task('optimage', function () {
//     gulp.src('src/img/**/*.{png,jpg,gif,ico}')
//         .pipe(imagemin({
//             optimizationLevel: 4, //类型：Number  默认：3  取值范围：0-7（优化等级）
//             progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
//             interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
//             multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
//             svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
//             use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件

//         }))
//         .pipe(gulp.dest('dist/img/'));
// });

// gulp.task('optimizeImages', function () {
//   return gulp.src('src/img/**/*.{jpg,png,svg,gif}')
//     .pipe(imagemin({
//       plugins: [
//         imageminGifsicle({
//           interlaced: true,
//           optimizationLevel: 3
//         }),
//         imageminGuetzli({
//           quality: 95
//         }),
//         imageminOptipng({
//           optimizationLevel: 7,
//           bitDepthReduction: true,
//           colorTypeReduction: true,
//           paletteReduction: true
//         }),
//         imageminSvgo({
//           plugins: [
//             { cleanupAttrs: true },
//             { cleanupAttrs: true },
//             { removeComments: true },
//             { removeMetadata: true },
//             { removeDesc: true },
//             { removeUselessDefs: true },
//             { removeEditorsNSData: true },
//             { removeEmptyAttrs: true },
//             { removeEmptyText: true },
//             { removeEmptyContainers: true },
//             { removeViewBox: false },
//             { minifyStyles: true },
//             { convertColors: true },
//             { convertTransform: true },
//             { removeUnknownsAndDefaults: true },
//             { removeUnusedNS: true },
//             { collapseGroups: true },
//             { removeRasterImages: true },
//             { removeUnusedNS: true }
//           ]
//         })
//       ]
//     }))
//     .pipe(gulp.dest('dist/img/'))
// });
// the best compressed
// gulp.task('optimage', function () {
//     gulp.src('src/img/**/*.{png,jpg,gif,ico}')
//         .pipe(cache(imagemin([imageminGuetzli()])))
//         .pipe(gulp.dest('dist/img/'));
// });
//
// var  destDir="src/tmp_img/";
// gulp.task('copy',  function() {
//   return gulp.src('src/**/*')
//     .pipe(gulp.dest(destDir))
// });

gulp.task('optimage', function () {
    gulp.src('src/img/**/*.{png,jpg,gif,ico}')
        .pipe(cache(imagemin([imageminGuetzli()])))
        .pipe(gulp.dest('dist/img/'));
});



// gulp.task('jslint', function() {
//   return gulp.src('./lib/*.js')
//     .pipe(jshint())
//     .pipe(jshint.reporter('YOUR_REPORTER_HERE'));
// });




  /*  optimer js*/
gulp.task('jsmin', function () {
    gulp.src('src/js/*.js') //
        .pipe(uglify({
                 mangle: true,//类型：Boolean 默认：true 是否修改变量名
                    compress: true,//类型：Boolean 默认：true 是否完全压缩
                         preserveComments: 'all' //保留所有注释
        }))
        .pipe(gulp.dest('dist/js'));
});
gulp.task('default',['htmlmin','cssmin','optimage','jsmin'], function() {
   //nothing to do
});



// gulp.task('version', function () {
//   gulp
//     .src('dist/**')
//     .pipe(RevAll.revision())
//     .pipe(gulp.dest('cdn'));

// });
