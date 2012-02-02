
var jasmine = require('./jasmine-core/jasmine');
for (var k in jasmine) global[k] = jasmine[k];
var jasmineNode = require('./jasmine-node/reporter').jasmineNode;

require('amd-loader');

var exec = require('./spec/exec');
var parse = require('./spec/parse');

var reporter = new jasmineNode.TerminalReporter({
	color: true
});

reporter.reportRunnerResults = function(runner){
	jasmineNode.TerminalReporter.prototype.reportRunnerResults.apply(this, arguments);
	
	var results = runner.results();
	process.exit(results.failedCount);
};

var jasmineEnv = global.jasmine.getEnv(reporter);
jasmineEnv.addReporter(reporter);
jasmineEnv.execute();



