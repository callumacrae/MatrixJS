MatrixJS
============

MatrixJS is a [matrix](http://en.wikipedia.org/wiki/Matrix_(mathematics) library for JavaScript and Node.js.

**It doesn't work yet, the below code will not work.**


### Example


``` javascript
var a = new Matrix([
	[1, 3],
	[3, 4]
]);

var b = new Matrix("\
	5 	-1	\
	2	3.5	\
");

// add together:
var c = Matrix.add(a, b);
// or:
var c = a.add(b);

// multiply together
var d = Matrix.multiply(a, b);
// or:
var d = a.multby(b);


console.log(d.toString()); // will format it nicely
```
