MatrixJS
============

MatrixJS is a [matrix](http://en.wikipedia.org/wiki/Matrix_%28mathematics%29) library for JavaScript and Node.js.

Documentation hasn't been written yet.
A

### Example


``` javascript
var a = new Matrix([
	[1,   3,  7],
	[3,   4, -3],
	[3.5, 2, 22]
]);

var b = new Matrix([
	"1    3   7",
	"3    4  -3",
	"3.5  2  22"
]);

// add together:
var c = Matrix.add(a, b);
// or:
var c = a.add(b);

// multiply together
var d = Matrix.multiply(a, b);
// or:
var d = a.multBy(b);


console.log(d.toString()); // will format it nicely
```
