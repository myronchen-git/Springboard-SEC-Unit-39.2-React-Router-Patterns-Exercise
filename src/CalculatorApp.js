import { useParams } from 'react-router-dom';

import './CalculatorApp.css';

// ==================================================

/**
 * App for adding, subtracting, multiplying, and dividing two numbers.
 */
function CalculatorApp() {
  const { operation, n1, n2 } = useParams();

  const nums = [n1, n2].map((str) => {
    const n = Number(str);
    return Number.isNaN(n) || !Number.isSafeInteger(n) ? null : n;
  });

  let output;

  if (nums[0] !== null && nums[1] !== null) {
    switch (operation) {
      case 'add':
        output = `${nums[0]} + ${nums[1]} = ${nums[0] + nums[1]}`;
        break;
      case 'subtract':
        output = `${nums[0]} - ${nums[1]} = ${nums[0] - nums[1]}`;
        break;
      case 'multiply':
        output = `${nums[0]} * ${nums[1]} = ${nums[0] * nums[1]}`;
        break;
      case 'divide':
        if (nums[1] !== 0) {
          output = `${nums[0]} / ${nums[1]} = ${nums[0] / nums[1]}`;
        } else {
          output = 'Can not divide by 0.';
        }
        break;
      default:
        output = 'Unrecognized operation: ' + operation;
        break;
    }

    output = <p>{output}</p>;
  } else {
    output = (
      <>
        {nums[0] === null && <p>First input is not an integer.</p>}
        {nums[1] === null && <p>Second input is not an integer.</p>}
      </>
    );
  }

  return <main className="CalculatorApp">{output}</main>;
}

// ==================================================

export default CalculatorApp;
