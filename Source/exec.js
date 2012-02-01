
define(function(require){

var parse = require('./parse');

var toString = Object.prototype.toString;

var isArray = function(arr) {
	return toString.call(arr) == '[object Array]';
};

var create = Object.create || function(obj){
	var F = function(){};
	F.prototype = Object(obj);
	return new F;
};

var exec = function(expr, env){

	if (typeof expr == 'string' && expr.charAt(0) == '(') expr = parse(expr);
	else if (typeof expr == 'number') return expr;
	else if (!isArray(expr)) expr = [expr];

	if (!env) env = create(atoms);

	var args = [];
	for (var i = 0; i < expr.length; i++){
		if (expr[i] in env) args.push(env[expr[i]]);
		else args.push(expr[i]);
	}

	var fn = args[0];
	args = args.slice(1);

	if (procedures.hasOwnProperty(fn)){
		return procedures[fn](args, env);
	} else {
		return fn;
	}

	return false;

};

var atoms = {
	'nil': false,
	't': true
};

var procedures = {

	'defun': function(args){
		var fn = args[0], a = args[1], body = args.slice(2);
		procedures[fn] = function(_args, env){
			var _env = create(env), res = false;
			for (var i = 0; i < a.length; i++) _env[a[i]] = exec(_args[i], _env);
			for (var j = 0; j < body.length; j++) (res = exec(body[j], _env));
			return res;
		};
		return fn;
	},

	'if': function(args, env){
		var condition = exec(args[0], env), res = false;
		if (condition != false) res = exec(args[1], env);
		else if (args[2]) res = exec(args[2], env);
		return res;
	},

	'setq': function(args, env){
		var res = false;
		for (var i = 0; i < args.length; i += 2){
			res = env[args[i]] = exec(args[i + 1], env);
		}
		return res;
	},

	'let': function(args, env){
		env[exec(args[0][0][0], env)] = exec(args[0][0][1], env);
		return exec(args[1], env);
	},

	'+': function(args, env){
		var res = 0;
		for (var i = 0; i < args.length; i++) res += exec(args[i], env);
		return res;
	},

	'-': function(args, env){
		var res = exec(args[0], env);
		for (var i = 1; i < args.length; i++) res -= exec(args[i], env);
		return res;
	},

	'*': function(args, env){
		var res = 1;
		for (var i = 0; i < args.length; i++) res *= exec(args[i], env);
		return res;
	},

	'/': function(args, env){
		var res = exec(args[0], env);
		for (var i = 1; i < args.length; i++) res /= exec(args[i], env);
		return res;
	},

	// gonometry
	'cos': function(args, env){
		return Math.cos(exec(args[0]), env);
	},

	'sin': function(args, env){
		return Math.sin(exec(args[0]), env);
	},

	'tan': function(args, env){
		return Math.tan(exec(args[0]), env);
	},

	// comparison
	'<=': function(a, env) { return exec(a[0], env) <=  exec(a[1], env); },
	'<':  function(a, env) { return exec(a[0], env) <   exec(a[1], env); },
	'>=': function(a, env) { return exec(a[0], env) >=  exec(a[1], env); },
	'>':  function(a, env) { return exec(a[0], env) >   exec(a[1], env); },
	'=':  function(a, env) { return exec(a[0], env) ==  exec(a[1], env); },
	'eq': function(a, env) { return exec(a[0], env) === exec(a[1], env); },

	// logical
	'not': function(args, env){
		return !exec(args[0], env);
	},

	'and': function(args, env){
		var res = false;
		for (var i = 0; i < args.length; i++){
			if ((res = exec(args[i], env)) == false) return false;
		}
		return res;
	},

	'or': function(args, env){
		var res = false;
		for (var i = 0; i < args.length; i++){
			if ((res = exec(args[i], env)) != false) return res;
		}
		return false;
	},

	// stuff

	'list': function(args, env){
		for (var i = 0; i < args.length; i++) args[i] = exec(args[i], env);
		return args;
	},

	'progn': function(args, env){
		var res = this.list(args, env);
		return res.length ? res[res.length - 1] : false;
	},

	'print': function(args, env){
		var res = this.progn(args, env);
		console.log(res);
		return res;
	}

}

return exec;

});
