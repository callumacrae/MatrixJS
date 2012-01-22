/**
 * Returns a new Matrix object.
 *
 * @constructor
 * @param array input Array of arrays, or array of strings, to turn in Matrix.
 * @param bool check If false, input will not be checked or parsed - only use
 * 	this when you're certain that you're passing it a valid matrix.
 */
function Matrix(input, check) {
	if (!(this instanceof Matrix)) {
		return new Matrix(input, check);
	}

	if (!(input instanceof Array)) {
		throw Error('Invalid matrix.');
	}

	if (typeof check !== 'boolean') {
		check = true;
	}

	if (check && input.length && typeof input[0] === 'string') {
		for (var i = 0, j, l; i < input.length; i += 1) {
			input[i] = input[i].split(/\s+/g);
			if (i === 0) {
				l = input[i].length
			} else if (input[i].length !== l) {
				throw Error('Invalid matrix.');
			}

			for (j = 0; j < input[i].length; j += 1) {
				input[i][j] = (input[i][j] === '-') ? null : Number(input[i][j]);
				if (isNaN(input[i][j])) {
					throw Error('Invalid matrix.');
				}
			}
		}
	} else if (check && input.length) {
		// Object; check whether everything same length and all ints or null
		for (var i = 0, j, l; i < input.length; i += 1) {
			if (i === 0) {
				l = input[i].length;
			} else if (input[i].length !== l) {
				throw Error('Invalid matrix.');
			}

			for (j = 0; j < input[i].length; j += 1) {
				if (typeof input[i][j] !== 'number') {
					input[i][j] = Number(input[i][j]);
					if (isNaN(input[i][j])) {
						throw Error('Invalid matrix.');
					}
				}
			}
		}
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

	return new Matrix(end, false);
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

	return new Matrix(end, false);
};

/**
 * Multiplies matrix a by b (can be matrix or constant).
 *
 * Remember, ab != ba.
 *
 * @param Matrix a Matrix a.
 * @param mixed b Matrix or constant to multiply a by.
 * @returns Matrix The new matrix.
 */
Matrix.multiply = function (a, b) {
	var c, end = [], row = 0, col, i;

	if (typeof a === 'number' && typeof b === 'number') {
		return a * b;
	} else if (typeof a === 'number' && b instanceof Matrix) {
		// Swap them the other way round
		c = b;
		b = a;
		a = c;
	}

	//Allow for multiplication by a constant
	if (typeof b === 'number' && a instanceof Matrix) {
		end = a.array.slice();
		for (; row < end.length; row += 1) {
			end[row] = end[row].slice();
			for (col = 0; col < end[row].length; col += 1) {
				end[row][col] *= b;
			}
		}
	} else if (a instanceof Matrix && b instanceof Matrix) {
		if (b.array.length !== a.array[0].length) {
			throw Error('Matrix dimensions do not match.');
		}

		for (; row < a.array.length; row += 1) {
			end.push([]);
			for (col = 0; col < b.array[row].length; col += 1) {
				end[row][col] = 0;
				for (i = 0; i < a.array[row].length; i += 1) {
					end[row][col] += a.array[row][i] * b.array[i][col];
				}
			}
		}
	} else {
		throw Error('Invalid arguments.');
	}

	return new Matrix(end, false);
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

/**
 * Multiplies the current matrix by b. b can be another matrix, or a constant.
 *
 * @param mixed b What to multiply b by - can be Matrix or number.
 * @returns Matrix The new matrix.
 */
Matrix.prototype.multBy = function (b) {
	return Matrix.multiply(this, b);
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
