
// create a simple server to serve all files for the browser

var fs = require('fs');

var app = require('http').createServer(function(req, res){

	var url = req.url;
	if (url == '/') url = '/index.html';
	var file = __dirname + '/..' + url;
	fs.readFile(file, function (err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error loading index.html');
		}
		res.writeHead(200);
		res.end(data);
	});


});

app.listen(8080);

// Open the selenium-server.jar
var spawn = require('child_process').spawn,
	jar = spawn('java', ['-jar', 'selenium-server.jar']);

jar.stdout.on('data', function (data) {
	console.log('stdout: ' + data);
	if (String(data).indexOf('Started org.openqa') != -1){
		runSoda();
	}
});

jar.stderr.on('data', function (data) {
	console.log('stderr: ' + data);
});

jar.on('exit', function (code) {
  console.log('child process exited with code ' + code);
});

var runSoda = function(){

	var soda = require('soda'),
		assert = require('assert');

	var browser = soda.createClient({
		host: 'localhost',
		port: 4444,
		url: 'http://localhost:8080',
		browser: 'firefox'
	});

	browser.on('command', function(cmd, args){
		console.log(' \x1b[33m%s\x1b[0m: %s', cmd, args.join(', '));
	});

	browser
		.chain
		.session()
		.open('/Specs/SpecRunner.html')
		.waitForTextPresent('Finished')
		.getTitle(function(title){
			assert.ok(~title.indexOf('LISP'), 'Title did not include the query: ' + title);
		})
		.getText('css=.runner .description', function(text){
			var failures = text.match(/(\d+) failures/);
			assert.ok(failures[1] == 0, 'there are ' + failures + ' failures');
		})
		.end(function(err){
			browser.testComplete(function(){

				if (err){
					console.log('\n\n\033[31mSelenium tests failed\033[0m');
					throw err;
				} else {
					console.log('\n\n\033[32mAll selenium tests passed\033[m');			
					process.exit(0);
				}
			});
		});
};

