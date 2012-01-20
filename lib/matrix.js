function Matrix(input) {
	if (!(this instanceof Matrix)) {
		return new Matrix(input);
	}

	if (typeof input === 'string') {
		// parse input into array
	} else if (!(input instanceof Array)) {
		throw Error('Invalid matrix.');
	}

	this.array = input;
}

Matrix.add = function () {
	var end = Array.prototype.slice.call(arguments, -1)[0].array.slice(),
		i = arguments.length - 1, row, col, mat;

	while (i--) {
		if (!(arguments[i] instanceof Matrix)) {
			mat = new Matrix(arguments[i]);
		}

		mat = arguments[i].array;

		if (mat.length != end.length) {
			throw Error('Matrix is wrong size.');
		}

		for (row = 0; row < mat.length; row += 1) {
			if (mat[row].length != end[row].length) {
				throw Error('Matrix is the wrong size.');
			}

			if (i === arguments.length - 2) {
				end[row] = end[row].slice();
			}

			for (col = 0; col < mat[row].length; col += 1) {
				end[row][col] += mat[row][col];
			}
		}
	}

	return new Matrix(end);
};

Matrix.subtract = function () {

};

Matrix.multiply = function () {

};

// a + b = b + a
Matrix.prototype.addTo = Matrix.prototype.add = function (b) {
	return Matrix.add(this, b);
};

Matrix.prototype.subtract = function () {

};

Matrix.prototype.subFrom = function () {

};

Matrix.prototype.multBy = function () {

};

Matrix.prototype.toString = function (join, joinline) {
	if (typeof join !== 'string') {
		join = '\t';
	}
	if (typeof joinline !== 'string') {
		joinline = '\n';
	}

	var e = '', i = 0, l = this.array.length;
	for (; i < l; i += 1) {
		e += this.array[i].join(join) + joinline;
	}

	return e.slice(0, -(joinline.length)); // remove final new line
};
