
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

var nest = function(text) {
	text = trim.call(text);

	if (text.charAt(0) != '(') throw new Error('The code should start with a (');
	if (text.charAt(text.length - 1) != ')') throw new Error('The code should end with a )');

	var level = 0, i = 0, c;
	var part = '', parts = [];

	var push = function(){
		part = trim.call(part.slice(1, -1));
		if (part != '') parts.push(part);
		part = '';
	};

	while (i < text.length) {
		c = text.charAt(i);

		part += c;

		if (c == '('){
			level++;
			if (level == 2) push();
		}

		else if (c == ')'){
			level--;
			if (level == 1){
				part = ' (' + part + ' ';
				push();
			}
		}

		i++;
	}

	push();
	return parts;

};

var parse = function(str) {
	var nested = nest(str);
	var parsed = [];
	for (var i = 0; i < nested.length; i++){
		var part = nested[i];
		if (part.charAt(0) == '('){
			parsed.push(parse(part));
		} else {
			if (part.charAt(0) == '"') parsed.push(part);
			else {
				part = part.split(' ');
				for (var j = 0; j < part.length; j++){
					if (part[j] != ''){
						var n = +part[j];
						parsed.push(isNaN(n) ? part[j] : n);
					}
				}
			}
		}
	}
	return parsed;
};

return parse;

});
