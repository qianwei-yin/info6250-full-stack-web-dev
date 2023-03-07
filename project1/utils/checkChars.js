'use strict';

exports.isAlphaNumeric = (str) => /^[0-9A-Z]+$/i.test(str);

exports.isAlpha = (str) => /^[A-Z]+$/i.test(str);
