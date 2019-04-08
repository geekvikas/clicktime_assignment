const { CalEx } = require("./calex.js");
const CASE_SENSITIVE = true;

let cal = new CalEx(CASE_SENSITIVE);

var assert = require('assert');
  describe('add(1,2)', function() {
    it('should return "3"', function() {
      assert.equal(cal.Exec("add(1,2)"),3);
    });
});

describe('add(1, mult(2, 3))', function() {
    it('should return "7"', function() {
      assert.equal(cal.Exec("add(1, mult(2, 3))"),7);
    });
});

describe('mult(add(2, 2), div(9, 3))', function() {
    it('should return "12"', function() {
      assert.equal(cal.Exec("mult(add(2, 2), div(9, 3))"),12);
    });
});

describe('let(a, 5, add(a, a))', function() {
    it('should return "10"', function() {
      assert.equal(cal.Exec("let(a, 5, add(a, a))"),10);
    });
});

describe('let(foo, 5, let(bar, mult(foo, 10), add(bar, foo)))', function() {
    it('should return "55"', function() {
      assert.equal(cal.Exec("let(foo, 5, let(bar, mult(foo, 10), add(bar, foo)))"),55);
    });
});

describe('let(a, let(b, 10, add(b, b)), let(b, 20, add(a, b)))', function() {
    it('should return "40"', function() {
      assert.equal(cal.Exec("let(a, let(b, 10, add(b, b)), let(b, 20, add(a, b)))"),40);
    });
});

describe('add(5,mult(6,mult(7,mult(8,mult(9,10)))))', function() {
    it('should return "30245"', function() {
      assert.equal(cal.Exec("add(5,mult(6,mult(7,mult(8,mult(9,10)))))"),30245);
    });
});

describe('sub(1,sub(2,sub(3,sub(4,sub(5,sub(6,7))))))', function() {
    it('should return "4"', function() {
      assert.equal(cal.Exec("sub(1,sub(2,sub(3,sub(4,sub(5,sub(6,7))))))"),4);
    });
});



describe('this(a, 5, shouldFail(a, a))', function() {
    it('should generate an error', function() {
      assert.equal(cal.Exec("this(a, 5, shouldFail(a, a))"),"Invalid Expression, please check input");
    });
});


describe('EMPTY Expression', function() {
    it('should return undefined', function() {
      assert.equal(cal.Exec(""),undefined);
    });
});