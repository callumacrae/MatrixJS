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
	var end = Array.prototype.slice.call(arguments, -1)[0].array,
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

			for (col = 0; col < mat[row].length; col += 1) {
				end[row][col] += mat[row][col];
			}
		}
	}

	return end;
};

Matrix.subtract = function () {

};

Matrix.multiply = function () {

};

Matrix.prototype.addto = function () {

};

Matrix.prototype.subtract = function () {

};

Matrix.prototype.subfrom = function () {

};

Matrix.prototype.multby = function () {

};
