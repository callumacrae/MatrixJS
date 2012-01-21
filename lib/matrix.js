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

/**
 * Subtracts Matrix b from Matrix a.
 *
 * @param Matrix a Matrix a.
 * @param Matrix b Matrix b.
 * @returns Matrix The new matrix.
 */
Matrix.subtract = function (a, b) {
	var end = a.array.slice(), row, col;

	if (b.array.length !== end.length) {
		throw Error('Matrix is wrong size.');
	}

	for (row = 0; row < b.array.length; row += 1) {
		if (b.array[row].length !== end[row].length) {
			throw Error('Matrix is wrong size.');
		}

		end[row] = end[row].slice();

		for (col = 0; col < b.array[row].length; col += 1) {
			end[row][col] -= b.array[row][col];
		}
	}

	return new Matrix(end);
};

Matrix.multiply = function () {

};

// a + b = b + a
Matrix.prototype.addTo = Matrix.prototype.add = function (b) {
	return Matrix.add(this, b);
};

/**
 * Subtracts b from the current Matrix.
 *
 * @param Matrix b The matrix to subtract.
 * @returns Matrix The new matrix.
 */
Matrix.prototype.subtract = function (b) {
return Matrix.subtract(this, b);
};

/**
 * Subtracts the current Matrix from b.
 *
 * @param Matrix b The matrix to subtract from.
 * @returns Matrix The new matrix.
 */
Matrix.prototype.subFrom = function (b) {
	return Matrix.subtract(b, this);
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
