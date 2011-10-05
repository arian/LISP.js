
define(['LISP/parse'], function(parse){

var tests = {

	'(+ 1 3)': ['+', 1, 3],
	'(+ (- 3 2) 4)': ['+', ['-', 3, 2], 4],
	'(+ (- (+ 2 1) 2) 4)': ['+', ['-', ['+', 2, 1], 2], 4],
	'(+ (- (+ 2 1) (+ 1 1)) 4)': ['+', ['-', ['+', 2, 1], ['+', 1, 1]], 4],
	'(+ (- (+ 2 1) 5 (+ 1 1)) 4)': ['+', ['-', ['+', 2, 1], 5, ['+', 1, 1]], 4],
	'(   +  4  2)': ['+', 4, 2],

	'\
(defun factorial (N)\n\
  "Compute the factorial of N."\n\
  (if (= N 1)\n\
    1\n\
    (* N (factorial (- N 1)))\n\
  )\n\
)\n\
': ['defun', 'factorial', ['N'],
		'"Compute the factorial of N."',
		['if', ['=', 'N', 1],
			1,
			['*', 'N', ['factorial', ['-', 'N', 1]]]
		]
	]

};

describe('parser', function(){

	for (var code in tests) (function(code, expected){

		it('should parse `' + code + '`', function(){
			expect(parse(code)).toEqual(expected);
		});

	})(code, tests[code]);

});

});
