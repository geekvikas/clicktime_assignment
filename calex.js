

const errors = {
    "MissingExpression": "Missing Expression",
    "InvalidExpression": "Invalid Expression, please check input",
}

let CASE_SENSITIVE = false;

const CalEx = function (CheckCase) {
    CASE_SENSITIVE = CheckCase;
    // constructor code here
};


// Function Name:   Exec
// Scope:           Public
// Purpose:         Main Execute Function, convert code into IL & Execute it

CalEx.prototype.Exec = function (expr) {
    if (CheckAndRaise(expr))
        return;

    var result = InternalExecute(expr);


    if (result !== undefined && result.length == 1)
        return result[0];
    else
        return errors["InvalidExpression"];

}


// Function Name:   InternalExecute
// Scope:           Private
// Purpose:         Parse entire expression into Stack and process it accordingly

let InternalExecute = function (expr) {

    // Check for valid input string
    if (expr === undefined)
        return;

    // Convert entire expression into lower case if case-sensitivity is turned off
    if (!CASE_SENSITIVE)
        expr = expr.toLowerCase();

    let exprStack = [];     // Placeholder to keep the running stack, calculated values
    let varStack = [];      // Placeholder to keep variables, "let" command
    let keyword = "";       // Placeholder to generate keywords by parsing char-by-char
    let idx = 0;            // General Index counter

    // Keep the loop running until all characters are processed
    while (idx < expr.length) {
        let char = expr[idx++];   // read the char and increment the index

        if (char === ' ')    // IGNORE WhiteSpace
            continue;

        // Keyword breakers are "," "(" ")"... unless we find these we assume the Keyword/value is continuous
        if (char === "," || char === "(" || char === ")") {

            // Keyword Found, ensure its not false positive by checking the length of keyword 
            if (keyword.length > 0)
                exprStack.push(keyword);    // Push the keyword in Stack

            // Reset the keyword for next iteration
            keyword = "";

            // We found the end of a statement / or substatement, lets "calculate" the value for last operation
            // We need to ensure the Stack has atleast 3 items in it, otherwise its Invalid stack
            if (char === ")" && exprStack.length >= 3) {

                //DEBUGING CODE, Uncomment to see the exprStack as it unfold
                //console.log(...exprStack);

                // Read operand2,operand1 & operator in that order and remove them from stack
                let p2 = exprStack.pop();
                let p1 = exprStack.pop();
                let op = exprStack.pop();

                // If the operator is "let", we need to put this into Variable Stack
                if (op === "let" && isNumeric(p2) && !isNumeric(p1)) {
                    varStack[p1] = p2;
                    continue; // No operation is required, just put in stack and continue
                }

                // We either parse the value if its integer or lookup the value from either Variable Stack or runtime exprStack
                p1 = parseInt(isNumeric(p1) ? p1 : GetVariable(p1, exprStack, varStack));
                p2 = parseInt(isNumeric(p2) ? p2 : GetVariable(p2, exprStack, varStack));

                // Ensure all the operator & operands has valid value                
                if (op === undefined || p1 === undefined || p2 === undefined)
                    continue;

                // The real operation to calculate the value via Switch
                let output = 0;
                switch (op) {
                    case "add":
                        output = p1 + p2;
                        break;
                    case "sub":
                        output = p1 - p2;
                        break;
                    case "mult":
                        output = p1 * p2;
                        break;
                    case "div":
                        output = p1 / p2;
                        break;
                    default:
                        // Invalid Keyword, need to get out
                        return;
                }

                // Lets push the calculated value at the end of stack
                exprStack.push(output);
            }


        }
        else
            keyword += char;    // Generating keyword, char by char
    }

    // At this time , we should have only single value left in exprStack ie. the calculated value of Expression
    return exprStack;
}




// Function Name:   GetVariable
// Scope:           Private
// Purpose:         Lookup the value of a variable in exprStack
// Inputs:          Value to lookup, Expression Stack & Variable Stack
let GetVariable = function (v, ES, VS) {
    let retVal = 0;

    // Placeholder if the variable still exists in ES, 
    // Reading the value from expression stack first 
    // as the value of same variable name might have changed in later expressions
    let foundInES = false;

    // Scan through the runtime expression stack, see if the value exists, important to read backwards
    for (idx = ES.length; idx > 0; idx--) {

        if (ES[idx] === v) {
            // Value found in stack, so read the value and update in Variable Stack too.
            retVal = ES[idx + 1];
            VS[v] = retVal;
            ES = ES.splice(idx - 1, 3);
            foundInES = true;
            break;
        }
    }

    // Not found in Runtime expression stack, it MUST exists in Variable Stack then 
    // if not found in either place that means invalid expression
    if (VS[v] !== undefined && !foundInES)
        retVal = VS[v];

    //DEBUGING CODE, Uncomment to see what lookup value is being returned
    //console.log("Lookup: ", v , " = " , retVal);
    return retVal;
}



///////////////////////////////////
/// Utility functions below
///////////////////////////////////



// Function Name:   CheckAndRaise
// Scope:           Private
// Purpose:         Basic assert style error handling, check if input missing and print the error

let CheckAndRaise = function (input) {
    if (input === undefined || input.length == 0) {
        RaiseError("MissingExpression");
        return true;
    }

    return false;
}

// Function Name:   RaiseError
// Scope:           Private
// Purpose:         Print pre-defined error messages

let RaiseError = function (msg) {
    console.log(`Error: ${errors[msg]}`);
}

// Function Name:   isNumeric
// Scope:           Private
// Purpose:         Check if given string is numeric or not

let isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


// Exporting the library
module.exports.CalEx = CalEx;
