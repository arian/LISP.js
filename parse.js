"use strict";

var trim = String.prototype.trim || function(){
	return (this + '').replace(/^\s+|\s+$/g, '');
};

module.exports = function(text){

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

	throw new Error('unbalanced parentheses');

};
