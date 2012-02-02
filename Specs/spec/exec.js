
define(function(require){

var exec = require('../../Source/exec');

var tests = {

	// basic calculations
	'(+ 1 3)': 4,
	'(+ (- 3 2) 4)': 5,
	'(+ (- (+ 2 1) 2) 4)': 5,
	'(+ (- (+ 2 1) (+ 1 1)) 4)': 5,
	'(+ (- (+ 2 1) 5 (+ 1 1)) 4)': 0,
	'(/ 12 4)': 3,
	'(* 3 4)': 12,

	// gonometry
	'(* 2 (cos 0) (+ 4 6))': 20,
	'(tan 0)': Math.tan(0),
	'(sin 0)': Math.sin(0),

	// comparison
	'(<= 3 3)': true,
	'(<= 2 3)': true,
	'(<= 3 2)': false,
	'(<  3 3)': false,
	'(<  2 3)': true,
	'(<  3 2)': false,
	'(>= 3 3)': true,
	'(>= 2 3)': false,
	'(>= 3 2)': true,
	'(>  3 3)': false,
	'(>  2 3)': false,
	'(>  3 2)': true,
	'(=  3 3)': true,
	'(=  2 3)': false,
	'(=  3 2)': false,
	'(eq 3 3)': true,
	'(eq 2 3)': false,
	'(eq 3 2)': false,

	// logic
	'(not nil)': true,
	'(and nil t)': false,
	'(or nil t)': true,

	// atoms
	'(t)': true,
	'(nil)': false,

	// comparison
	'(if (> 3 1) 1 2)': 1,
	'(if (> 1 3) 1 2)': 2,
	'(if (> 1 3) 1)': false,
	'(if t 3 4)': 3,
	'(if nil 3 4)': 4,
	'(if 3 4 5)': 4,

	// set variables
	'(and (setq a 5) a)': 5,
	'(let ((x 10)) x)': 10,
	'(let ((x (+ 10 2))) (- x 4))': 8,

	// functions
	'(defun foo (n) n)': 'foo',
	'(foo 4)': 4,
	'(defun bar (n m) (+ n m))': 'bar',
	'(bar 4 5)': 9,

	// recursive functions
	'(defun fib (n) (if (< n 2) 1 (+ (fib (- n 1)) (fib (- n 2)) ) ))': 'fib',
	'(fib 5)': 8,

	'\
(defun factorial (N)\n\
  "Compute the factorial of N."\n\
  (if (<= N 1)\n\
    1\n\
    (* N (factorial (- N 1)))\n\
  )\n\
)\n\
': 'factorial',
	'(factorial 4)': 24,

	// stuffz
	'(list 3 4 5)': [3, 4, 5],
	'(progn 4 5)': 5,
	'(progn (setq a (+ 5 7)) (setq b (+ a 8)))': 20

};

describe('execute', function(){

	for (var code in tests) (function(code, expected){

		it('should evaluate `' + code + '` to ' + expected, function(){
			expect(exec(code)).toEqual(expected);
		});

	})(code, tests[code]);

});

});
