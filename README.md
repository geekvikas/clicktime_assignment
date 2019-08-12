# Lexical Parser

Simple Lexical Parser as an assignment I was thrown at for an interview


# EXERCISE:

Write a calculator program in your programming language of choice that evaluates expressions in a very simple integer expression language. The program takes an input on the command line, computes the result, and prints it to the console. For example:
 
% java calculator.Main “mult(2, 2)”
4
 
Here are a few more examples:
 
Input
Output
add(1, 2)
3
add(1, mult(2, 3))
7
mult(add(2, 2), div(9, 3))
12
let(a, 5, add(a, a))
10
let(foo, 5, let(bar, mult(foo, 10), add(bar, foo)))
55
let(a, let(b, 10, add(b, b)), let(b, 20, add(a, b)))
40

An expression consists of:
Numbers: Integers between Integer.MIN_VALUE and Integer.MAX_VALUE
Variables: Strings of characters, where each character is one of a-z, A-Z
Arithmetic functions: Add, sub, mult, div, each taking two arbitrary expressions as arguments. In other words, each argument may be any of the expressions on this list.
A “let” operator for assigning values to variables: let(<variable name>, <value>, <expression where variable is used>)
 
As with arithmetic functions,  the expression where the variable is used may be an arbitrary expression from this list.
 

