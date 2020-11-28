import * as gulp from "gulp";
import * as ts from "gulp-typescript";
import * as sass from "gulp-sass";
import * as sourcemaps from "gulp-sourcemaps";
import * as zip from 'gulp-zip';
import * as Bump from 'conventional-recommended-bump';
import * as del from 'del';

const tsConfig = ts.createProject("tsconfig.json");



/**
 * Build Sass
 */
const compileTS = function () {
    let tsResult = tsConfig.src().pipe(sourcemaps.init()).pipe(tsConfig()).pipe(sourcemaps.write()).pipe(gulp.dest('module'));
    return tsResult;
}

const compileSass = function () {
    console.log("Rebuilding sass files");
    return gulp.src("styles/**/*.sass").pipe(sass()).pipe(gulp.dest("css"));
}

const watchFiles = function () {
    gulp.watch('styles/**/*.sass', compileSass);
    gulp.watch('ts/**/*.ts', compileTS);
}

const packageRepo = async function () {
    await del('build');
    return del('build');
}

const copyBuild = function () {
    return gulp.src(['**/*', '!node_modules/**', '!ts/**', '!styles/**', '!deploy/**', '!package.json', '!package-lock.json', '!gulpfile.ts', '!foured.code-workspace', '!tsconfig.json']).pipe(gulp.dest('build/foured'));
}

const deleteBuild = function () {
    return del('build');
}

const zipBuild = function () {
    return gulp.src('build/**/*').pipe(zip('foured.zip')).pipe(gulp.dest('deploy'));
}


gulp.task("watch", gulp.series(compileTS, compileSass, watchFiles));

gulp.task("sass", compileSass);

gulp.task("typescript", compileTS);

gulp.task("package", gulp.series(compileTS, compileSass, deleteBuild, copyBuild, zipBuild, deleteBuild))