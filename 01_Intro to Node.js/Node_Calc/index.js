// index.js

//  import the crypto module



//  get a commands using process.argv


// complete the  function
// console.log("hi");

const crypto = require('crypto');

const args = process.argv.slice(2); // Skip the first two default entries
const operation = args[0];

// Use parseFloat to handle both integer and floating point numbers
const num1 = args[1] ? parseFloat(args[1]) : null;
const num2 = args[2] ? parseFloat(args[2]) : null;

switch (operation) {
  case 'add':
    if (args.length === 3) console.log(num1 + num2);
    break;
  case 'sub':
    if (args.length === 3) console.log(num1 - num2);
    break;
  case 'mult':
    if (args.length === 3) console.log(num1 * num2);
    break;
  case 'divide':
    if (args.length === 3) {
      if (num2 === 0) {
        console.log("Cannot divide by zero.");
      } else {
        console.log(num1 / num2);
      }
    }
    break;
  case 'sin':
    if (args.length === 2) console.log(Math.sin(num1));
    break;
  case 'cos':
    if (args.length === 2) console.log(Math.cos(num1));
    break;
  case 'tan':
    if (args.length === 2) console.log(Math.tan(num1));
    break;
  case 'random':
    if (!args[1]) {
      console.log("Provide length for random number generation.");
      return;
    }

    const randomBytes = crypto.randomBytes(parseInt(args[1]));
    const hex = randomBytes.toString('hex');
    const bigIntNumber = BigInt('0x' + hex);

    // Modulo operation to ensure the number does not exceed 99999
    const limitedNumber = bigIntNumber % 100n;

    console.log(`Random Number: ${limitedNumber.toString()}`);
    break;
  default:
    console.log('Invalid operation');
}

function generateRandomNumber(length) {

}

