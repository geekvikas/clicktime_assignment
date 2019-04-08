

const { CalEx } = require("./calex.js");
const CASE_SENSITIVE = true;

let cal = new CalEx(CASE_SENSITIVE);


console.log(cal.Exec("ADD(1,2)"));  // this will fail as "Case-Sensitivity" is turned on
console.log(cal.Exec("add(1, mult(2, 3))"));
console.log(cal.Exec("mult(add(2, 2), div(9, 3))"));
console.log(cal.Exec("let(a, 5, add(a, a))"));
console.log(cal.Exec("let(foo, 5, let(bar, mult(foo, 10), add(bar, foo)))"));
console.log(cal.Exec("let(a, let(b, 10, add(b, b)), let(b, 20, add(a, b)))"));

console.log(cal.Exec("add(5,mult(6,mult(7,mult(8,mult(9,10)))))"));
console.log(cal.Exec("sub(1,sub(2,sub(3,sub(4,sub(5,sub(6,7))))))"));




