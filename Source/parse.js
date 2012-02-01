
define(function(){

var trim = String.prototype.trim || (function() {
	// http://es5.github.com/#x15.5.4.20
	var ws = "\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003" +
		"\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028" +
		"\u2029\uFEFF";
	// http://blog.stevenlevithan.com/archives/faster-trim-javascript
	// http://perfectionkills.com/whitespace-deviations/
	ws = "[" + ws + "]";
	var trimBeginRegexp = new RegExp("^" + ws + ws + "*");
	var trimEndRegexp = new RegExp(ws + ws + "*$");
	return function() {
		return String(this).replace(trimBeginRegexp, "").replace(trimEndRegexp, "");
	};
})();

return function(text){

	text = trim.call(text);

	if (text.charAt(0) != '(') return text;

	var stack = [];
	var token;
	var tokens = '';
	var comment = false;
	var i = 0;
	var expr;

	while (i < text.length){
		token = text.charAt(i++);

		if (token == '(' || token == ')' || (token == ' ' && !comment)){
			if (expr && tokens.length){
				var n = +tokens;
				expr.push(isNaN(n) ? tokens : n);
			}
			tokens = '';
		} else {
			if (token == '"') comment = !comment;
			if (!/\s/.test(token) || comment) tokens += token;
		}

		if (token == '('){

			var previous = expr;
			expr = [];

			if (previous){
				// push the previous expresion to the stack
				stack.push(previous);
				// if expr is not top-level, append the expression
				previous.push(expr);
			}

		} else if (token == ')'){

			// pop one from stack
			var pop = stack.pop();
			// stack is empty, so expr is the top-level expression
			if (!pop) return expr;
			expr = pop;

		}

	}

	throw new Error('unbalanced parenthesis');

};

});
