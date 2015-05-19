# gulp-pa11y

## Audit accessibility of your site using pa11y

gulp-pa11y is a [gulp.js](https://github.com/gulpjs/gulp) task to do accessibility audit of your site for standards: Section508, WCAG2A, WCAG2AA (default), WCAG2AAA using [pa11y](https://github.com/nature/pa11y)

Check out the [documentation](https://github.com/nature/pa11y) to get a full overview of what you can do and test using [pally.org](http://pa11y.org/).

## Getting Started

If you haven't used [gulp](http://gulpjs.com/) before, be sure to check out the [Getting Started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) guide, as it explains how to create a gulpfile.js as well as install and use gulp plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install gulp-pa11y --save-dev
```

Once the plugin has been installed, it may be enabled inside your gulpfile with this line of JavaScript:

```js
var pa11y = require('gulp-pa11y');
```

## The pa11y task

### Required configuration properties

To start auditing pages, you must configure a start URL:

Crawl the site with deepth 1.
```javascript
{
	url: 'http://localhost/'
}
```

## -- WIP --
