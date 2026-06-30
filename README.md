# calculator
A fully functional calculator built with vanilla HTML, CSS, and JavaScript as part of The Odin Project Foundations course.

Features


- Basic operations: addition, subtraction, multiplication, division
- Chained calculations (e.g. 12 + 7 - 1 = correctly evaluates step by step)
- Decimal point support, with protection against multiple decimals in one number
- Backspace to undo the last digit entered
- Full keyboard support (numbers, operators, Enter for equals, Backspace, Delete)
- Handles edge cases: divide by zero, pressing operators consecutively, pressing - equals with incomplete input
- Results rounded to 2 decimal places to prevent display overflow


What I Learned


- Managing application state in vanilla JavaScript (tracking current numbers, selected operator, and calculation flow without a framework)
- DOM manipulation and event handling, including event delegation
- Writing pure functions (operate) that separate logic from side effects like updating the display
- Reusing existing click handlers to support keyboard input without duplicating logic
- Debugging edge cases


How to Run

Clone the repository and open index.html in your browser. No build steps or dependencies required.

Acknowledgements

Built following the project requirements from The Odin Project's Calculator assignment.