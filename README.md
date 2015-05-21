# gulp-pa11y

## Accessibility Audit of your site using pa11y

gulp-pa11y is a [gulp.js](https://github.com/gulpjs/gulp) task to do accessibility audit of your site for standards: Section508, WCAG2A, WCAG2AA (default), WCAG2AAA using [pa11y](https://github.com/nature/pa11y)

It runs [HTML CodeSniffer][http://squizlabs.github.com/HTML_CodeSniffer/] from the command line for programmatic accessibility reporting.

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

With these configuration properties set, you can add sitespeedio to your default tasks list. That'll look something like this:

```javascript
gulp.task('default', ['jshint', 'pa11y']);
```

With this in place, gulp-pa11y will now audit the performance of your pages.


### Available Options

#### url
*(string)* The URL to sniff. Required.

#### reporter
*(string)* The reporter to use. (see [custom reporters](#custom-reporters)). Default `console`.

#### standard
*(string)* The standard to use. One of `Section508`, `WCAG2A`, `WCAG2AA`, `WCAG2AAA`. Default `WCAG2AA`.

### failOnError
*(boolean)* Fail your build if there is any accessibility *error*. Default: `true`

### showFailedOnly
*(boolean)* Only display the errors in report, Set to `false` to display errros, warnings and notice. Default: `true`

#### htmlcs
*(string)* The URL to source HTML_CodeSniffer from. Default `http://squizlabs.github.io/HTML_CodeSniffer/build/HTMLCS.js`.

#### config
*(string,object)* The path to a JSON config file or a config object (see [configuration](#configuration)). Default `null`.

#### timeout
*(number)* The number of milliseconds before a timeout error occurs. Default `30000`.

#### useragent
*(string)* The user-agent to send with the request. Default `pa11y/<version>`.

#### port
*(number)* The port the PhantomJS server should run on. Default `12300`.

#### viewport.width
*(number)* The viewport width to load the page at.

#### viewport.height
*(number)* The viewport height to load the page at.

#### debug
*(boolean)* Whether to report debug-level messages. Default: `false`.

### Callback
The callback function should accept two arguments. The first is an error object or `null`, the second is an object containing the results of the sniff.

### Examples
```js

// Sniff a URL, specifying some options
{
    url: 'nature.com',
    standard: 'WCAG2AAA',
    timeout: 20000
}
```


Configuration
-------------

gulp-pa11y can be configured via a JSON file or JavaScript object.

```js
{
    config: __dirname + '/config/pa11y.json'
}
```

The config file or object should be formatted like the example below, where

- The `cookies` key is an array of maps containing only the required keys for [PhantomJS cookie objects][https://github.com/ariya/phantomjs/wiki/API-Reference#cookie-object].
- The `ignore` key holds an array of rule names you'd like to ignore. You can find the codes for each rule in the console output, so you can simply copy/paste these into your config. We also maintain a [list of all available rules][https://github.com/nature/pa11y/wiki/HTML-CodeSniffer-Rules].

```json
{
	"cookies": [
		{
			"name": "cookie-name",
			"value": "cookie-value",
			"domain": "localhost"
		}
	],
	"ignore": [
		"WCAG2AA.Principle2.Guideline2_4.2_4_2.H25.2",
		"WCAG2AA.Principle3.Guideline3_1.3_1_1.H57.2"
	]
}
```

All configuration options are optional.


Caveats
-------

gulp-pa11y can't catch *all* accessibility errors. It'll catch many of them, but you should do manual checking as well.


