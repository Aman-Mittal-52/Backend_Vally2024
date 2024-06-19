
// make the validator function and export it.


// module.exports = validatorfunction;
const fs = require("fs");

// make the validator function and export it.
const validator = (req, res, next) => {
  const { ID, Name, Rating, Description, Genre, Cast } = req.body;

  // Check data types and format
  if (
    typeof ID === 'number' &&
    typeof Name === 'string' &&
    !/\d/.test(Name) &&
    typeof Rating === 'number' &&
    typeof Description === 'string' &&
    typeof Genre === 'string' &&
    Array.isArray(Cast) &&
    Cast.every(item => typeof item === 'string')
  ) {
    // Write validation messages to a file
    fs.appendFileSync('./res.txt', `ID is a number\nName is a string\nDescription is a string\nRating is a number\nGenre is a string\nCast is an array of strings\n`);
    console.log("hi")
    next(); // Proceed to the route handler
  } else {
    // Respond with bad request and write error message to file
    fs.appendFileSync('res.txt', `bad request.some data is incorrect.\n`);
    res.status(400).send('bad request.some data is incorrect.');
  }
};

module.exports = validator;
