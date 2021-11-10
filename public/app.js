/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/big.js/big.js":
/*!************************************!*\
  !*** ./node_modules/big.js/big.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_RESULT__;/*\r\n *  big.js v6.1.1\r\n *  A small, fast, easy-to-use library for arbitrary-precision decimal arithmetic.\r\n *  Copyright (c) 2021 Michael Mclaughlin\r\n *  https://github.com/MikeMcl/big.js/LICENCE.md\r\n */\r\n;(function (GLOBAL) {\r\n  'use strict';\r\n  var Big,\r\n\r\n\r\n/************************************** EDITABLE DEFAULTS *****************************************/\r\n\r\n\r\n    // The default values below must be integers within the stated ranges.\r\n\r\n    /*\r\n     * The maximum number of decimal places (DP) of the results of operations involving division:\r\n     * div and sqrt, and pow with negative exponents.\r\n     */\r\n    DP = 20,            // 0 to MAX_DP\r\n\r\n    /*\r\n     * The rounding mode (RM) used when rounding to the above decimal places.\r\n     *\r\n     *  0  Towards zero (i.e. truncate, no rounding).       (ROUND_DOWN)\r\n     *  1  To nearest neighbour. If equidistant, round up.  (ROUND_HALF_UP)\r\n     *  2  To nearest neighbour. If equidistant, to even.   (ROUND_HALF_EVEN)\r\n     *  3  Away from zero.                                  (ROUND_UP)\r\n     */\r\n    RM = 1,             // 0, 1, 2 or 3\r\n\r\n    // The maximum value of DP and Big.DP.\r\n    MAX_DP = 1E6,       // 0 to 1000000\r\n\r\n    // The maximum magnitude of the exponent argument to the pow method.\r\n    MAX_POWER = 1E6,    // 1 to 1000000\r\n\r\n    /*\r\n     * The negative exponent (NE) at and beneath which toString returns exponential notation.\r\n     * (JavaScript numbers: -7)\r\n     * -1000000 is the minimum recommended exponent value of a Big.\r\n     */\r\n    NE = -7,            // 0 to -1000000\r\n\r\n    /*\r\n     * The positive exponent (PE) at and above which toString returns exponential notation.\r\n     * (JavaScript numbers: 21)\r\n     * 1000000 is the maximum recommended exponent value of a Big, but this limit is not enforced.\r\n     */\r\n    PE = 21,            // 0 to 1000000\r\n\r\n    /*\r\n     * When true, an error will be thrown if a primitive number is passed to the Big constructor,\r\n     * or if valueOf is called, or if toNumber is called on a Big which cannot be converted to a\r\n     * primitive number without a loss of precision.\r\n     */\r\n    STRICT = false,     // true or false\r\n\r\n\r\n/**************************************************************************************************/\r\n\r\n\r\n    // Error messages.\r\n    NAME = '[big.js] ',\r\n    INVALID = NAME + 'Invalid ',\r\n    INVALID_DP = INVALID + 'decimal places',\r\n    INVALID_RM = INVALID + 'rounding mode',\r\n    DIV_BY_ZERO = NAME + 'Division by zero',\r\n\r\n    // The shared prototype object.\r\n    P = {},\r\n    UNDEFINED = void 0,\r\n    NUMERIC = /^-?(\\d+(\\.\\d*)?|\\.\\d+)(e[+-]?\\d+)?$/i;\r\n\r\n\r\n  /*\r\n   * Create and return a Big constructor.\r\n   */\r\n  function _Big_() {\r\n\r\n    /*\r\n     * The Big constructor and exported function.\r\n     * Create and return a new instance of a Big number object.\r\n     *\r\n     * n {number|string|Big} A numeric value.\r\n     */\r\n    function Big(n) {\r\n      var x = this;\r\n\r\n      // Enable constructor usage without new.\r\n      if (!(x instanceof Big)) return n === UNDEFINED ? _Big_() : new Big(n);\r\n\r\n      // Duplicate.\r\n      if (n instanceof Big) {\r\n        x.s = n.s;\r\n        x.e = n.e;\r\n        x.c = n.c.slice();\r\n      } else {\r\n        if (typeof n !== 'string') {\r\n          if (Big.strict === true) {\r\n            throw TypeError(INVALID + 'number');\r\n          }\r\n\r\n          // Minus zero?\r\n          n = n === 0 && 1 / n < 0 ? '-0' : String(n);\r\n        }\r\n\r\n        parse(x, n);\r\n      }\r\n\r\n      // Retain a reference to this Big constructor.\r\n      // Shadow Big.prototype.constructor which points to Object.\r\n      x.constructor = Big;\r\n    }\r\n\r\n    Big.prototype = P;\r\n    Big.DP = DP;\r\n    Big.RM = RM;\r\n    Big.NE = NE;\r\n    Big.PE = PE;\r\n    Big.strict = STRICT;\r\n    Big.roundDown = 0;\r\n    Big.roundHalfUp = 1;\r\n    Big.roundHalfEven = 2;\r\n    Big.roundUp = 3;\r\n\r\n    return Big;\r\n  }\r\n\r\n\r\n  /*\r\n   * Parse the number or string value passed to a Big constructor.\r\n   *\r\n   * x {Big} A Big number instance.\r\n   * n {number|string} A numeric value.\r\n   */\r\n  function parse(x, n) {\r\n    var e, i, nl;\r\n\r\n    if (!NUMERIC.test(n)) {\r\n      throw Error(INVALID + 'number');\r\n    }\r\n\r\n    // Determine sign.\r\n    x.s = n.charAt(0) == '-' ? (n = n.slice(1), -1) : 1;\r\n\r\n    // Decimal point?\r\n    if ((e = n.indexOf('.')) > -1) n = n.replace('.', '');\r\n\r\n    // Exponential form?\r\n    if ((i = n.search(/e/i)) > 0) {\r\n\r\n      // Determine exponent.\r\n      if (e < 0) e = i;\r\n      e += +n.slice(i + 1);\r\n      n = n.substring(0, i);\r\n    } else if (e < 0) {\r\n\r\n      // Integer.\r\n      e = n.length;\r\n    }\r\n\r\n    nl = n.length;\r\n\r\n    // Determine leading zeros.\r\n    for (i = 0; i < nl && n.charAt(i) == '0';) ++i;\r\n\r\n    if (i == nl) {\r\n\r\n      // Zero.\r\n      x.c = [x.e = 0];\r\n    } else {\r\n\r\n      // Determine trailing zeros.\r\n      for (; nl > 0 && n.charAt(--nl) == '0';);\r\n      x.e = e - i - 1;\r\n      x.c = [];\r\n\r\n      // Convert string to array of digits without leading/trailing zeros.\r\n      for (e = 0; i <= nl;) x.c[e++] = +n.charAt(i++);\r\n    }\r\n\r\n    return x;\r\n  }\r\n\r\n\r\n  /*\r\n   * Round Big x to a maximum of sd significant digits using rounding mode rm.\r\n   *\r\n   * x {Big} The Big to round.\r\n   * sd {number} Significant digits: integer, 0 to MAX_DP inclusive.\r\n   * rm {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).\r\n   * [more] {boolean} Whether the result of division was truncated.\r\n   */\r\n  function round(x, sd, rm, more) {\r\n    var xc = x.c;\r\n\r\n    if (rm === UNDEFINED) rm = x.constructor.RM;\r\n    if (rm !== 0 && rm !== 1 && rm !== 2 && rm !== 3) {\r\n      throw Error(INVALID_RM);\r\n    }\r\n\r\n    if (sd < 1) {\r\n      more =\r\n        rm === 3 && (more || !!xc[0]) || sd === 0 && (\r\n        rm === 1 && xc[0] >= 5 ||\r\n        rm === 2 && (xc[0] > 5 || xc[0] === 5 && (more || xc[1] !== UNDEFINED))\r\n      );\r\n\r\n      xc.length = 1;\r\n\r\n      if (more) {\r\n\r\n        // 1, 0.1, 0.01, 0.001, 0.0001 etc.\r\n        x.e = x.e - sd + 1;\r\n        xc[0] = 1;\r\n      } else {\r\n\r\n        // Zero.\r\n        xc[0] = x.e = 0;\r\n      }\r\n    } else if (sd < xc.length) {\r\n\r\n      // xc[sd] is the digit after the digit that may be rounded up.\r\n      more =\r\n        rm === 1 && xc[sd] >= 5 ||\r\n        rm === 2 && (xc[sd] > 5 || xc[sd] === 5 &&\r\n          (more || xc[sd + 1] !== UNDEFINED || xc[sd - 1] & 1)) ||\r\n        rm === 3 && (more || !!xc[0]);\r\n\r\n      // Remove any digits after the required precision.\r\n      xc.length = sd--;\r\n\r\n      // Round up?\r\n      if (more) {\r\n\r\n        // Rounding up may mean the previous digit has to be rounded up.\r\n        for (; ++xc[sd] > 9;) {\r\n          xc[sd] = 0;\r\n          if (!sd--) {\r\n            ++x.e;\r\n            xc.unshift(1);\r\n          }\r\n        }\r\n      }\r\n\r\n      // Remove trailing zeros.\r\n      for (sd = xc.length; !xc[--sd];) xc.pop();\r\n    }\r\n\r\n    return x;\r\n  }\r\n\r\n\r\n  /*\r\n   * Return a string representing the value of Big x in normal or exponential notation.\r\n   * Handles P.toExponential, P.toFixed, P.toJSON, P.toPrecision, P.toString and P.valueOf.\r\n   */\r\n  function stringify(x, doExponential, isNonzero) {\r\n    var e = x.e,\r\n      s = x.c.join(''),\r\n      n = s.length;\r\n\r\n    // Exponential notation?\r\n    if (doExponential) {\r\n      s = s.charAt(0) + (n > 1 ? '.' + s.slice(1) : '') + (e < 0 ? 'e' : 'e+') + e;\r\n\r\n    // Normal notation.\r\n    } else if (e < 0) {\r\n      for (; ++e;) s = '0' + s;\r\n      s = '0.' + s;\r\n    } else if (e > 0) {\r\n      if (++e > n) {\r\n        for (e -= n; e--;) s += '0';\r\n      } else if (e < n) {\r\n        s = s.slice(0, e) + '.' + s.slice(e);\r\n      }\r\n    } else if (n > 1) {\r\n      s = s.charAt(0) + '.' + s.slice(1);\r\n    }\r\n\r\n    return x.s < 0 && isNonzero ? '-' + s : s;\r\n  }\r\n\r\n\r\n  // Prototype/instance methods\r\n\r\n\r\n  /*\r\n   * Return a new Big whose value is the absolute value of this Big.\r\n   */\r\n  P.abs = function () {\r\n    var x = new this.constructor(this);\r\n    x.s = 1;\r\n    return x;\r\n  };\r\n\r\n\r\n  /*\r\n   * Return 1 if the value of this Big is greater than the value of Big y,\r\n   *       -1 if the value of this Big is less than the value of Big y, or\r\n   *        0 if they have the same value.\r\n   */\r\n  P.cmp = function (y) {\r\n    var isneg,\r\n      x = this,\r\n      xc = x.c,\r\n      yc = (y = new x.constructor(y)).c,\r\n      i = x.s,\r\n      j = y.s,\r\n      k = x.e,\r\n      l = y.e;\r\n\r\n    // Either zero?\r\n    if (!xc[0] || !yc[0]) return !xc[0] ? !yc[0] ? 0 : -j : i;\r\n\r\n    // Signs differ?\r\n    if (i != j) return i;\r\n\r\n    isneg = i < 0;\r\n\r\n    // Compare exponents.\r\n    if (k != l) return k > l ^ isneg ? 1 : -1;\r\n\r\n    j = (k = xc.length) < (l = yc.length) ? k : l;\r\n\r\n    // Compare digit by digit.\r\n    for (i = -1; ++i < j;) {\r\n      if (xc[i] != yc[i]) return xc[i] > yc[i] ^ isneg ? 1 : -1;\r\n    }\r\n\r\n    // Compare lengths.\r\n    return k == l ? 0 : k > l ^ isneg ? 1 : -1;\r\n  };\r\n\r\n\r\n  /*\r\n   * Return a new Big whose value is the value of this Big divided by the value of Big y, rounded,\r\n   * if necessary, to a maximum of Big.DP decimal places using rounding mode Big.RM.\r\n   */\r\n  P.div = function (y) {\r\n    var x = this,\r\n      Big = x.constructor,\r\n      a = x.c,                  // dividend\r\n      b = (y = new Big(y)).c,   // divisor\r\n      k = x.s == y.s ? 1 : -1,\r\n      dp = Big.DP;\r\n\r\n    if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {\r\n      throw Error(INVALID_DP);\r\n    }\r\n\r\n    // Divisor is zero?\r\n    if (!b[0]) {\r\n      throw Error(DIV_BY_ZERO);\r\n    }\r\n\r\n    // Dividend is 0? Return +-0.\r\n    if (!a[0]) {\r\n      y.s = k;\r\n      y.c = [y.e = 0];\r\n      return y;\r\n    }\r\n\r\n    var bl, bt, n, cmp, ri,\r\n      bz = b.slice(),\r\n      ai = bl = b.length,\r\n      al = a.length,\r\n      r = a.slice(0, bl),   // remainder\r\n      rl = r.length,\r\n      q = y,                // quotient\r\n      qc = q.c = [],\r\n      qi = 0,\r\n      p = dp + (q.e = x.e - y.e) + 1;    // precision of the result\r\n\r\n    q.s = k;\r\n    k = p < 0 ? 0 : p;\r\n\r\n    // Create version of divisor with leading zero.\r\n    bz.unshift(0);\r\n\r\n    // Add zeros to make remainder as long as divisor.\r\n    for (; rl++ < bl;) r.push(0);\r\n\r\n    do {\r\n\r\n      // n is how many times the divisor goes into current remainder.\r\n      for (n = 0; n < 10; n++) {\r\n\r\n        // Compare divisor and remainder.\r\n        if (bl != (rl = r.length)) {\r\n          cmp = bl > rl ? 1 : -1;\r\n        } else {\r\n          for (ri = -1, cmp = 0; ++ri < bl;) {\r\n            if (b[ri] != r[ri]) {\r\n              cmp = b[ri] > r[ri] ? 1 : -1;\r\n              break;\r\n            }\r\n          }\r\n        }\r\n\r\n        // If divisor < remainder, subtract divisor from remainder.\r\n        if (cmp < 0) {\r\n\r\n          // Remainder can't be more than 1 digit longer than divisor.\r\n          // Equalise lengths using divisor with extra leading zero?\r\n          for (bt = rl == bl ? b : bz; rl;) {\r\n            if (r[--rl] < bt[rl]) {\r\n              ri = rl;\r\n              for (; ri && !r[--ri];) r[ri] = 9;\r\n              --r[ri];\r\n              r[rl] += 10;\r\n            }\r\n            r[rl] -= bt[rl];\r\n          }\r\n\r\n          for (; !r[0];) r.shift();\r\n        } else {\r\n          break;\r\n        }\r\n      }\r\n\r\n      // Add the digit n to the result array.\r\n      qc[qi++] = cmp ? n : ++n;\r\n\r\n      // Update the remainder.\r\n      if (r[0] && cmp) r[rl] = a[ai] || 0;\r\n      else r = [a[ai]];\r\n\r\n    } while ((ai++ < al || r[0] !== UNDEFINED) && k--);\r\n\r\n    // Leading zero? Do not remove if result is simply zero (qi == 1).\r\n    if (!qc[0] && qi != 1) {\r\n\r\n      // There can't be more than one zero.\r\n      qc.shift();\r\n      q.e--;\r\n      p--;\r\n    }\r\n\r\n    // Round?\r\n    if (qi > p) round(q, p, Big.RM, r[0] !== UNDEFINED);\r\n\r\n    return q;\r\n  };\r\n\r\n\r\n  /*\r\n   * Return true if the value of this Big is equal to the value of Big y, otherwise return false.\r\n   */\r\n  P.eq = function (y) {\r\n    return this.cmp(y) === 0;\r\n  };\r\n\r\n\r\n  /*\r\n   * Return true if the value of this Big is greater than the value of Big y, otherwise return\r\n   * false.\r\n   */\r\n  P.gt = function (y) {\r\n    return this.cmp(y) > 0;\r\n  };\r\n\r\n\r\n  /*\r\n   * Return true if the value of this Big is greater than or equal to the value of Big y, otherwise\r\n   * return false.\r\n   */\r\n  P.gte = function (y) {\r\n    return this.cmp(y) > -1;\r\n  };\r\n\r\n\r\n  /*\r\n   * Return true if the value of this Big is less than the value of Big y, otherwise return false.\r\n   */\r\n  P.lt = function (y) {\r\n    return this.cmp(y) < 0;\r\n  };\r\n\r\n\r\n  /*\r\n   * Return true if the value of this Big is less than or equal to the value of Big y, otherwise\r\n   * return false.\r\n   */\r\n  P.lte = function (y) {\r\n    return this.cmp(y) < 1;\r\n  };\r\n\r\n\r\n  /*\r\n   * Return a new Big whose value is the value of this Big minus the value of Big y.\r\n   */\r\n  P.minus = P.sub = function (y) {\r\n    var i, j, t, xlty,\r\n      x = this,\r\n      Big = x.constructor,\r\n      a = x.s,\r\n      b = (y = new Big(y)).s;\r\n\r\n    // Signs differ?\r\n    if (a != b) {\r\n      y.s = -b;\r\n      return x.plus(y);\r\n    }\r\n\r\n    var xc = x.c.slice(),\r\n      xe = x.e,\r\n      yc = y.c,\r\n      ye = y.e;\r\n\r\n    // Either zero?\r\n    if (!xc[0] || !yc[0]) {\r\n      if (yc[0]) {\r\n        y.s = -b;\r\n      } else if (xc[0]) {\r\n        y = new Big(x);\r\n      } else {\r\n        y.s = 1;\r\n      }\r\n      return y;\r\n    }\r\n\r\n    // Determine which is the bigger number. Prepend zeros to equalise exponents.\r\n    if (a = xe - ye) {\r\n\r\n      if (xlty = a < 0) {\r\n        a = -a;\r\n        t = xc;\r\n      } else {\r\n        ye = xe;\r\n        t = yc;\r\n      }\r\n\r\n      t.reverse();\r\n      for (b = a; b--;) t.push(0);\r\n      t.reverse();\r\n    } else {\r\n\r\n      // Exponents equal. Check digit by digit.\r\n      j = ((xlty = xc.length < yc.length) ? xc : yc).length;\r\n\r\n      for (a = b = 0; b < j; b++) {\r\n        if (xc[b] != yc[b]) {\r\n          xlty = xc[b] < yc[b];\r\n          break;\r\n        }\r\n      }\r\n    }\r\n\r\n    // x < y? Point xc to the array of the bigger number.\r\n    if (xlty) {\r\n      t = xc;\r\n      xc = yc;\r\n      yc = t;\r\n      y.s = -y.s;\r\n    }\r\n\r\n    /*\r\n     * Append zeros to xc if shorter. No need to add zeros to yc if shorter as subtraction only\r\n     * needs to start at yc.length.\r\n     */\r\n    if ((b = (j = yc.length) - (i = xc.length)) > 0) for (; b--;) xc[i++] = 0;\r\n\r\n    // Subtract yc from xc.\r\n    for (b = i; j > a;) {\r\n      if (xc[--j] < yc[j]) {\r\n        for (i = j; i && !xc[--i];) xc[i] = 9;\r\n        --xc[i];\r\n        xc[j] += 10;\r\n      }\r\n\r\n      xc[j] -= yc[j];\r\n    }\r\n\r\n    // Remove trailing zeros.\r\n    for (; xc[--b] === 0;) xc.pop();\r\n\r\n    // Remove leading zeros and adjust exponent accordingly.\r\n    for (; xc[0] === 0;) {\r\n      xc.shift();\r\n      --ye;\r\n    }\r\n\r\n    if (!xc[0]) {\r\n\r\n      // n - n = +0\r\n      y.s = 1;\r\n\r\n      // Result must be zero.\r\n      xc = [ye = 0];\r\n    }\r\n\r\n    y.c = xc;\r\n    y.e = ye;\r\n\r\n    return y;\r\n  };\r\n\r\n\r\n  /*\r\n   * Return a new Big whose value is the value of this Big modulo the value of Big y.\r\n   */\r\n  P.mod = function (y) {\r\n    var ygtx,\r\n      x = this,\r\n      Big = x.constructor,\r\n      a = x.s,\r\n      b = (y = new Big(y)).s;\r\n\r\n    if (!y.c[0]) {\r\n      throw Error(DIV_BY_ZERO);\r\n    }\r\n\r\n    x.s = y.s = 1;\r\n    ygtx = y.cmp(x) == 1;\r\n    x.s = a;\r\n    y.s = b;\r\n\r\n    if (ygtx) return new Big(x);\r\n\r\n    a = Big.DP;\r\n    b = Big.RM;\r\n    Big.DP = Big.RM = 0;\r\n    x = x.div(y);\r\n    Big.DP = a;\r\n    Big.RM = b;\r\n\r\n    return this.minus(x.times(y));\r\n  };\r\n\r\n\r\n  /*\r\n   * Return a new Big whose value is the value of this Big plus the value of Big y.\r\n   */\r\n  P.plus = P.add = function (y) {\r\n    var e, k, t,\r\n      x = this,\r\n      Big = x.constructor;\r\n\r\n    y = new Big(y);\r\n\r\n    // Signs differ?\r\n    if (x.s != y.s) {\r\n      y.s = -y.s;\r\n      return x.minus(y);\r\n    }\r\n\r\n    var xe = x.e,\r\n      xc = x.c,\r\n      ye = y.e,\r\n      yc = y.c;\r\n\r\n    // Either zero?\r\n    if (!xc[0] || !yc[0]) {\r\n      if (!yc[0]) {\r\n        if (xc[0]) {\r\n          y = new Big(x);\r\n        } else {\r\n          y.s = x.s;\r\n        }\r\n      }\r\n      return y;\r\n    }\r\n\r\n    xc = xc.slice();\r\n\r\n    // Prepend zeros to equalise exponents.\r\n    // Note: reverse faster than unshifts.\r\n    if (e = xe - ye) {\r\n      if (e > 0) {\r\n        ye = xe;\r\n        t = yc;\r\n      } else {\r\n        e = -e;\r\n        t = xc;\r\n      }\r\n\r\n      t.reverse();\r\n      for (; e--;) t.push(0);\r\n      t.reverse();\r\n    }\r\n\r\n    // Point xc to the longer array.\r\n    if (xc.length - yc.length < 0) {\r\n      t = yc;\r\n      yc = xc;\r\n      xc = t;\r\n    }\r\n\r\n    e = yc.length;\r\n\r\n    // Only start adding at yc.length - 1 as the further digits of xc can be left as they are.\r\n    for (k = 0; e; xc[e] %= 10) k = (xc[--e] = xc[e] + yc[e] + k) / 10 | 0;\r\n\r\n    // No need to check for zero, as +x + +y != 0 && -x + -y != 0\r\n\r\n    if (k) {\r\n      xc.unshift(k);\r\n      ++ye;\r\n    }\r\n\r\n    // Remove trailing zeros.\r\n    for (e = xc.length; xc[--e] === 0;) xc.pop();\r\n\r\n    y.c = xc;\r\n    y.e = ye;\r\n\r\n    return y;\r\n  };\r\n\r\n\r\n  /*\r\n   * Return a Big whose value is the value of this Big raised to the power n.\r\n   * If n is negative, round to a maximum of Big.DP decimal places using rounding\r\n   * mode Big.RM.\r\n   *\r\n   * n {number} Integer, -MAX_POWER to MAX_POWER inclusive.\r\n   */\r\n  P.pow = function (n) {\r\n    var x = this,\r\n      one = new x.constructor('1'),\r\n      y = one,\r\n      isneg = n < 0;\r\n\r\n    if (n !== ~~n || n < -MAX_POWER || n > MAX_POWER) {\r\n      throw Error(INVALID + 'exponent');\r\n    }\r\n\r\n    if (isneg) n = -n;\r\n\r\n    for (;;) {\r\n      if (n & 1) y = y.times(x);\r\n      n >>= 1;\r\n      if (!n) break;\r\n      x = x.times(x);\r\n    }\r\n\r\n    return isneg ? one.div(y) : y;\r\n  };\r\n\r\n\r\n  /*\r\n   * Return a new Big whose value is the value of this Big rounded to a maximum precision of sd\r\n   * significant digits using rounding mode rm, or Big.RM if rm is not specified.\r\n   *\r\n   * sd {number} Significant digits: integer, 1 to MAX_DP inclusive.\r\n   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).\r\n   */\r\n  P.prec = function (sd, rm) {\r\n    if (sd !== ~~sd || sd < 1 || sd > MAX_DP) {\r\n      throw Error(INVALID + 'precision');\r\n    }\r\n    return round(new this.constructor(this), sd, rm);\r\n  };\r\n\r\n\r\n  /*\r\n   * Return a new Big whose value is the value of this Big rounded to a maximum of dp decimal places\r\n   * using rounding mode rm, or Big.RM if rm is not specified.\r\n   * If dp is negative, round to an integer which is a multiple of 10**-dp.\r\n   * If dp is not specified, round to 0 decimal places.\r\n   *\r\n   * dp? {number} Integer, -MAX_DP to MAX_DP inclusive.\r\n   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).\r\n   */\r\n  P.round = function (dp, rm) {\r\n    if (dp === UNDEFINED) dp = 0;\r\n    else if (dp !== ~~dp || dp < -MAX_DP || dp > MAX_DP) {\r\n      throw Error(INVALID_DP);\r\n    }\r\n    return round(new this.constructor(this), dp + this.e + 1, rm);\r\n  };\r\n\r\n\r\n  /*\r\n   * Return a new Big whose value is the square root of the value of this Big, rounded, if\r\n   * necessary, to a maximum of Big.DP decimal places using rounding mode Big.RM.\r\n   */\r\n  P.sqrt = function () {\r\n    var r, c, t,\r\n      x = this,\r\n      Big = x.constructor,\r\n      s = x.s,\r\n      e = x.e,\r\n      half = new Big('0.5');\r\n\r\n    // Zero?\r\n    if (!x.c[0]) return new Big(x);\r\n\r\n    // Negative?\r\n    if (s < 0) {\r\n      throw Error(NAME + 'No square root');\r\n    }\r\n\r\n    // Estimate.\r\n    s = Math.sqrt(x + '');\r\n\r\n    // Math.sqrt underflow/overflow?\r\n    // Re-estimate: pass x coefficient to Math.sqrt as integer, then adjust the result exponent.\r\n    if (s === 0 || s === 1 / 0) {\r\n      c = x.c.join('');\r\n      if (!(c.length + e & 1)) c += '0';\r\n      s = Math.sqrt(c);\r\n      e = ((e + 1) / 2 | 0) - (e < 0 || e & 1);\r\n      r = new Big((s == 1 / 0 ? '5e' : (s = s.toExponential()).slice(0, s.indexOf('e') + 1)) + e);\r\n    } else {\r\n      r = new Big(s + '');\r\n    }\r\n\r\n    e = r.e + (Big.DP += 4);\r\n\r\n    // Newton-Raphson iteration.\r\n    do {\r\n      t = r;\r\n      r = half.times(t.plus(x.div(t)));\r\n    } while (t.c.slice(0, e).join('') !== r.c.slice(0, e).join(''));\r\n\r\n    return round(r, (Big.DP -= 4) + r.e + 1, Big.RM);\r\n  };\r\n\r\n\r\n  /*\r\n   * Return a new Big whose value is the value of this Big times the value of Big y.\r\n   */\r\n  P.times = P.mul = function (y) {\r\n    var c,\r\n      x = this,\r\n      Big = x.constructor,\r\n      xc = x.c,\r\n      yc = (y = new Big(y)).c,\r\n      a = xc.length,\r\n      b = yc.length,\r\n      i = x.e,\r\n      j = y.e;\r\n\r\n    // Determine sign of result.\r\n    y.s = x.s == y.s ? 1 : -1;\r\n\r\n    // Return signed 0 if either 0.\r\n    if (!xc[0] || !yc[0]) {\r\n      y.c = [y.e = 0];\r\n      return y;\r\n    }\r\n\r\n    // Initialise exponent of result as x.e + y.e.\r\n    y.e = i + j;\r\n\r\n    // If array xc has fewer digits than yc, swap xc and yc, and lengths.\r\n    if (a < b) {\r\n      c = xc;\r\n      xc = yc;\r\n      yc = c;\r\n      j = a;\r\n      a = b;\r\n      b = j;\r\n    }\r\n\r\n    // Initialise coefficient array of result with zeros.\r\n    for (c = new Array(j = a + b); j--;) c[j] = 0;\r\n\r\n    // Multiply.\r\n\r\n    // i is initially xc.length.\r\n    for (i = b; i--;) {\r\n      b = 0;\r\n\r\n      // a is yc.length.\r\n      for (j = a + i; j > i;) {\r\n\r\n        // Current sum of products at this digit position, plus carry.\r\n        b = c[j] + yc[i] * xc[j - i - 1] + b;\r\n        c[j--] = b % 10;\r\n\r\n        // carry\r\n        b = b / 10 | 0;\r\n      }\r\n\r\n      c[j] = b;\r\n    }\r\n\r\n    // Increment result exponent if there is a final carry, otherwise remove leading zero.\r\n    if (b) ++y.e;\r\n    else c.shift();\r\n\r\n    // Remove trailing zeros.\r\n    for (i = c.length; !c[--i];) c.pop();\r\n    y.c = c;\r\n\r\n    return y;\r\n  };\r\n\r\n\r\n  /*\r\n   * Return a string representing the value of this Big in exponential notation rounded to dp fixed\r\n   * decimal places using rounding mode rm, or Big.RM if rm is not specified.\r\n   *\r\n   * dp? {number} Decimal places: integer, 0 to MAX_DP inclusive.\r\n   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).\r\n   */\r\n  P.toExponential = function (dp, rm) {\r\n    var x = this,\r\n      n = x.c[0];\r\n\r\n    if (dp !== UNDEFINED) {\r\n      if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {\r\n        throw Error(INVALID_DP);\r\n      }\r\n      x = round(new x.constructor(x), ++dp, rm);\r\n      for (; x.c.length < dp;) x.c.push(0);\r\n    }\r\n\r\n    return stringify(x, true, !!n);\r\n  };\r\n\r\n\r\n  /*\r\n   * Return a string representing the value of this Big in normal notation rounded to dp fixed\r\n   * decimal places using rounding mode rm, or Big.RM if rm is not specified.\r\n   *\r\n   * dp? {number} Decimal places: integer, 0 to MAX_DP inclusive.\r\n   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).\r\n   *\r\n   * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.\r\n   * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.\r\n   */\r\n  P.toFixed = function (dp, rm) {\r\n    var x = this,\r\n      n = x.c[0];\r\n\r\n    if (dp !== UNDEFINED) {\r\n      if (dp !== ~~dp || dp < 0 || dp > MAX_DP) {\r\n        throw Error(INVALID_DP);\r\n      }\r\n      x = round(new x.constructor(x), dp + x.e + 1, rm);\r\n\r\n      // x.e may have changed if the value is rounded up.\r\n      for (dp = dp + x.e + 1; x.c.length < dp;) x.c.push(0);\r\n    }\r\n\r\n    return stringify(x, false, !!n);\r\n  };\r\n\r\n\r\n  /*\r\n   * Return a string representing the value of this Big.\r\n   * Return exponential notation if this Big has a positive exponent equal to or greater than\r\n   * Big.PE, or a negative exponent equal to or less than Big.NE.\r\n   * Omit the sign for negative zero.\r\n   */\r\n  P.toJSON = P.toString = function () {\r\n    var x = this,\r\n      Big = x.constructor;\r\n    return stringify(x, x.e <= Big.NE || x.e >= Big.PE, !!x.c[0]);\r\n  };\r\n\r\n\r\n  /*\r\n   * Return the value of this Big as a primitve number.\r\n   */\r\n  P.toNumber = function () {\r\n    var n = Number(stringify(this, true, true));\r\n    if (this.constructor.strict === true && !this.eq(n.toString())) {\r\n      throw Error(NAME + 'Imprecise conversion');\r\n    }\r\n    return n;\r\n  };\r\n\r\n\r\n  /*\r\n   * Return a string representing the value of this Big rounded to sd significant digits using\r\n   * rounding mode rm, or Big.RM if rm is not specified.\r\n   * Use exponential notation if sd is less than the number of digits necessary to represent\r\n   * the integer part of the value in normal notation.\r\n   *\r\n   * sd {number} Significant digits: integer, 1 to MAX_DP inclusive.\r\n   * rm? {number} Rounding mode: 0 (down), 1 (half-up), 2 (half-even) or 3 (up).\r\n   */\r\n  P.toPrecision = function (sd, rm) {\r\n    var x = this,\r\n      Big = x.constructor,\r\n      n = x.c[0];\r\n\r\n    if (sd !== UNDEFINED) {\r\n      if (sd !== ~~sd || sd < 1 || sd > MAX_DP) {\r\n        throw Error(INVALID + 'precision');\r\n      }\r\n      x = round(new Big(x), sd, rm);\r\n      for (; x.c.length < sd;) x.c.push(0);\r\n    }\r\n\r\n    return stringify(x, sd <= x.e || x.e <= Big.NE || x.e >= Big.PE, !!n);\r\n  };\r\n\r\n\r\n  /*\r\n   * Return a string representing the value of this Big.\r\n   * Return exponential notation if this Big has a positive exponent equal to or greater than\r\n   * Big.PE, or a negative exponent equal to or less than Big.NE.\r\n   * Include the sign for negative zero.\r\n   */\r\n  P.valueOf = function () {\r\n    var x = this,\r\n      Big = x.constructor;\r\n    if (Big.strict === true) {\r\n      throw Error(NAME + 'valueOf disallowed');\r\n    }\r\n    return stringify(x, x.e <= Big.NE || x.e >= Big.PE, true);\r\n  };\r\n\r\n\r\n  // Export\r\n\r\n\r\n  Big = _Big_();\r\n\r\n  Big['default'] = Big.Big = Big;\r\n\r\n  //AMD.\r\n  if (true) {\r\n    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () { return Big; }).call(exports, __webpack_require__, exports, module),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\r\n\r\n  // Node and other CommonJS-like environments that support module.exports.\r\n  } else {}\r\n})(this);\r\n\n\n//# sourceURL=webpack://bigjs-test/./node_modules/big.js/big.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Big = __webpack_require__(/*! big.js */ \"./node_modules/big.js/big.js\");\n\n//# sourceURL=webpack://bigjs-test/./src/app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;