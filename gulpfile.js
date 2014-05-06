
var c = require('./config');
process.env.LIVERELOAD = true;

var htmld = c.clientd,
    stylesd = c.clientd + '/styles',
    scriptsd = c.clientd + '/scripts',
    imagesd = c.clientd + '/images',
    assetsd = c.clientd + '/assets',
    viewsd = c.serverd + '/views',
    gulp = require("gulp"),
    glob = require("glob"),
    p = require("gulp-load-plugins")();

var paths = {
  stylus: [
    stylesd + '/**'
  ],
  clean: [
    c.clientd + '/*.html', 
    c.clientd + '/*.ico',
    c.clientd + '/images',
    c.clientd + '/scripts',
    c.clientd + '/styles',
    c.clientd + '/assets',
    c.serverd + '/views'
  ]
};

gulp.task('clean',function(){
  return gulp.src(paths.clean, {read: false})
    .pipe(p.clean());
});

//------------------------------- scripts ---------------------------------

gulp.task('scripts-pkgs', function(){
  var pkgDirs = glob.sync(c.srcClient + '/scripts/pkgs/*/');
  pkgDirs.forEach(function(d){
    var pkgName = d.match('/.+\/(.+)\/$')[1];
    gulp.src(d + '*.js')
      .pipe(p.jshint({"esnext": true}))
      .pipe(p.traceur())
      .pipe(p.uglify())
      .pipe(p.concat(pkgName + '.pkg.min.js'))
      .pipe(gulp.dest(scriptsd))
  });
});

gulp.task('scripts-asis', function(){
  return gulp.src(c.srcClient + '/scripts/*.min.js')
    .pipe(p.traceur())
    .pipe(gulp.dest(scriptsd));
});

gulp.task('scripts-plain', function(){
  return gulp.src([c.srcClient + '/scripts/*.js',
      '!' + c.srcClient + '/scripts/*.min.js'])
    .pipe(p.traceur())
    .pipe(p.jshint())
    .pipe(p.uglify())
    .pipe(gulp.dest(scriptsd));
});

gulp.task('scripts-before', function(){
  return gulp.src([c.srcClient + '/scripts/before/*.js'])
    .pipe(p.jshint())
    .pipe(p.traceur())
    .pipe(p.uglify())
    .pipe(p.concat('before.min.js'))
    .pipe(gulp.dest(scriptsd));
});

gulp.task('scripts-after', function(){
  return gulp.src([c.srcClient + '/scripts/after/*.js'])
    .pipe(p.jshint())
    .pipe(p.traceur())
    .pipe(p.uglify())
    .pipe(p.concat('after.min.js'))
    .pipe(gulp.dest(scriptsd));
});

gulp.task('scripts',['scripts-plain','scripts-asis','scripts-pkgs',
  'scripts-before', 'scripts-after']);

//------------------------------- styles ---------------------------------

gulp.task('styles-stylus', function(){
  return gulp.src(c.srcClient + '/styles/**/*.styl')
    .pipe(p.stylus({path: paths.stylus, errors: true}))
    //.pipe(p.autoprefixer('last 2 versions'))
    .pipe(gulp.dest(stylesd))
    .pipe(p.minifyCss({keepSpecialComments: 0}))
    .pipe(p.rename({extname: ".min.css"}))
    .pipe(gulp.dest(stylesd));
});

gulp.task('styles-asis', function(){
  return gulp.src(c.srcClient + '/styles/**/*!(.styl)')
    .pipe(gulp.dest(stylesd));
});

gulp.task('styles',['styles-stylus','styles-asis']);

//------------------------------- images ---------------------------------

gulp.task('favicon',function(){
  return gulp.src(c.srcClient + '/images/favicon.ico')
    .pipe(gulp.dest(htmld));
});

gulp.task('raster',function(){
  return gulp.src(c.srcClient + '/images/**/*.{jpg,jpeg,png,gif}')
    .pipe(p.imagemin())
    .pipe(gulp.dest(imagesd));
});

gulp.task('svg',function(){
  return gulp.src(c.srcClient + '/images/**/*.{svg}')
    .pipe(p.svgmin())
    .pipe(gulp.dest(imagesd));
});

gulp.task('images', ['favicon', 'raster', 'svg']);

//------------------------------- html -----------------------------------

gulp.task('html-plain', function(){
  return gulp.src(c.srcClient + '/html/**/*.html')           
    .pipe(p.minifyHtml())
    .pipe(gulp.dest(htmld));
});

gulp.task('html-jade', function(){
  var locals = require(__dirname + '/locals');
  return gulp.src(c.srcClient + '/html/**/*.jade')           
    .pipe(p.jade({locals: locals()}))
    .pipe(p.minifyHtml())
    .pipe(gulp.dest(htmld));
});

gulp.task('html', ['html-plain', 'html-jade']);

//------------------------------- assets ---------------------------------

gulp.task('assets', function(){
  return gulp.src(c.srcClient + '/assets/**/*')           
    .pipe(gulp.dest(assetsd));
});

//------------------------------- views  ---------------------------------

gulp.task('views', function(){
  return gulp.src(c.srcServer + '/views/**/*')           
    .pipe(gulp.dest(viewsd));
});

//------------------------------- watch ----------------------------------

gulp.task('watch', function(){
  p.nodemon({script: 'server.js', execMap: {js: "node --harmony"}});
  var lr = p.livereload();
  var u = function(file) {lr.changed(file.path);};
  gulp.watch(c.srcClient + '/styles/**/*', ['styles']).on('change',u);
  gulp.watch(c.srcClient + '/scripts/**/*', ['scripts']).on('change',u);
  gulp.watch(c.srcClient + '/images/**/*', ['images']).on('change',u);
  gulp.watch(c.srcClient + '/html/**/*', ['html']).on('change',u);
  gulp.watch(c.srcClient + '/assets/**/*', ['assets']).on('change',u);
  gulp.watch(c.srcClient + '/views/**/*', ['views']).on('change',u);
});

//------------------------------- default --------------------------------

gulp.task('once',['scripts','styles','images','html','assets','views']);
gulp.task('default',['once','watch']);
