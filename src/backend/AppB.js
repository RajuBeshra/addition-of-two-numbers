const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Regular expression to validate positive numbers
const positiveNumberRegex = /^\d+$/;

// Route for the API call to generate step addition
app.post('/generateSteps', (req, res) => {
  const num1 = req.body.num1;
  const num2 = req.body.num2;

  // Validate request body
  if (!positiveNumberRegex.test(num1) || !positiveNumberRegex.test(num2)) {
    return res.status(400).send({ error: 'Invalid input. Only positive numbers are allowed.' });
  }

  // Generate step addition
  const result = stepAddition(num1, num2);

  // Return the result
  res.send(result);
});

// Function to generate step addition
function stepAddition(num1, num2) {
  let carryString = '';
  let sumString = '';

  // Convert numbers to arrays of digits
  num1 = num1.split('').reverse();
  num2 = num2.split('').reverse();

  // Add digits one by one
  let carry = 0;
  for (let i = 0; i < num1.length || i < num2.length; i++) {
    let digit1 = num1[i] ? parseInt(num1[i]) : 0;
    let digit2 = num2[i] ? parseInt(num2[i]) : 0;
    let sum = digit1 + digit2 + carry;
    let digit = sum % 10;
    carry = (sum - digit) / 10;

    // Update carryString and sumString
    carryString = `${carry}_${carryString}`;
    sumString = `${digit}${sumString}`;
  }

  // Add carry if it exists
  if (carry > 0) {
    sumString = `${carry}${sumString}`;
  }

  // Remove trailing "_" from carryString
  carryString = carryString.replace(/_$/, '');

  // Return the result
  return { carryString, sumString };
}

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});