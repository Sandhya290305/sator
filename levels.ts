export interface Task {
  id: number;
  title: string;
  description: string;
  scenario: string; // Real-world business context
  dataTable?: string[][]; // Structured data table for display
  instructions: string;
  type: 'excel-simulation' | 'powerpoint-simulation';
  timeLimit: number;
  validationCriteria: ValidationCriteria;
  tutorialVideo?: string;
  tutorialSteps?: string[];
}

export interface ValidationCriteria {
  // For Excel tasks
  expectedFormula?: string;
  expectedCellValue?: { cell: string; value: string | number };
  expectedRange?: { start: string; end: string; operation: string };
  expectedFormatting?: { cell: string; format: string };
  
  // For PowerPoint tasks
  expectedSlideCount?: number;
  expectedTextContent?: string;
  expectedShapeCount?: number;
  expectedImageCount?: number;
  
  // Generic validation
  customValidation?: string;
}

export interface Level {
  number: number;
  title: string;
  description: string;
  type: 'excel' | 'powerpoint';
  tasks: Task[];
}

export const LEVELS: Level[] = [
  {
    number: 1,
    title: 'Excel Basics',
    description: 'Learn fundamental Excel operations and formulas',
    type: 'excel',
    tasks: [
      {
        id: 1,
        title: 'Product Inventory Reference',
        description: 'Setting up inventory tracking system',
        scenario: 'Your warehouse manager needs you to set up a basic inventory tracking system. The first step is to create a reference between the product code and its location in the warehouse.',
        dataTable: [
          ['Product Code', 'Warehouse Location'],
          ['A1', 'Aisle 3, Shelf B'],
        ],
        instructions: 'Enter the product code in cell A1, then create a reference formula in cell B1 that links to A1.',
        type: 'excel-simulation',
        timeLimit: 120,
        validationCriteria: {
          expectedFormula: '=A1',
          expectedCellValue: { cell: 'B1', value: '=A1' }
        },
        tutorialSteps: [
          'Click on cell A1',
          'Type any product code',
          'Press Enter',
          'Click on cell B1',
          'Type =A1 to create the reference',
          'Press Enter to see the reference work'
        ]
      },
      {
        id: 2,
        title: 'Weekly Sales Total',
        description: 'Calculate total weekly sales',
        scenario: 'Your manager needs the total sales for the week to report to the regional director. You have daily sales figures from Monday through Friday and need to calculate the weekly total.',
        dataTable: [
          ['Day', 'Sales ($)'],
          ['Monday', '1,250'],
          ['Tuesday', '1,480'],
          ['Wednesday', '1,320'],
          ['Thursday', '1,650'],
          ['Friday', '1,890'],
        ],
        instructions: 'The daily sales are already entered in cells A1 to A5. Use the SUM function in cell A6 to calculate the total weekly sales.',
        type: 'excel-simulation',
        timeLimit: 150,
        validationCriteria: {
          expectedFormula: '=SUM(A1:A5)',
          expectedCellValue: { cell: 'A6', value: '=SUM(A1:A5)' }
        },
        tutorialSteps: [
          'Daily sales are already in cells A1 through A5',
          'Click on cell A6',
          'Type =SUM(A1:A5)',
          'Press Enter to calculate the total'
        ]
      },
      {
        id: 3,
        title: 'Student Grade Average',
        description: 'Calculate average test scores',
        scenario: 'As a teaching assistant, you need to calculate the average test score for a student across four exams to determine their semester grade.',
        dataTable: [
          ['Exam', 'Score'],
          ['Exam 1', '85'],
          ['Exam 2', '92'],
          ['Exam 3', '78'],
          ['Exam 4', '88'],
        ],
        instructions: 'Test scores are already in cells B1 to B4. Calculate the average score in cell B5.',
        type: 'excel-simulation',
        timeLimit: 150,
        validationCriteria: {
          expectedFormula: '=AVERAGE(B1:B4)',
          expectedCellValue: { cell: 'B5', value: '=AVERAGE(B1:B4)' }
        },
        tutorialSteps: [
          'Scores are already in cells B1, B2, B3, and B4',
          'Click on cell B5',
          'Type =AVERAGE(B1:B4)',
          'Press Enter to see the average'
        ]
      },
      {
        id: 4,
        title: 'Invoice Amount Formatting',
        description: 'Format invoice totals as currency',
        scenario: 'Your accounting department requires all invoice amounts to be formatted as currency with the dollar sign for the monthly financial report.',
        dataTable: [
          ['Invoice #', 'Amount'],
          ['INV-001', '2,450.75'],
        ],
        instructions: 'Enter the invoice amount in cell C1 and format it as currency using the toolbar.',
        type: 'excel-simulation',
        timeLimit: 120,
        validationCriteria: {
          expectedFormatting: { cell: 'C1', format: 'currency' }
        },
        tutorialSteps: [
          'Enter the amount in cell C1',
          'Select cell C1',
          'Click the Currency format button in the toolbar',
          'The number should now display with a $ symbol'
        ]
      },
      {
        id: 5,
        title: 'Employee ID Sequence',
        description: 'Generate sequential employee IDs',
        scenario: 'HR is onboarding five new employees and needs you to generate sequential employee ID numbers starting from 1001.',
        dataTable: [
          ['Employee', 'ID Number'],
          ['New Hire 1', '1001'],
          ['New Hire 2', '1002'],
          ['New Hire 3', '...'],
          ['New Hire 4', '...'],
          ['New Hire 5', '...'],
        ],
        instructions: 'Enter 1 in A1 and 2 in A2. Select both cells and drag down to A5 to auto-fill the sequence.',
        type: 'excel-simulation',
        timeLimit: 120,
        validationCriteria: {
          expectedRange: { start: 'A1', end: 'A5', operation: 'sequence' }
        },
        tutorialSteps: [
          'Type 1 in cell A1',
          'Type 2 in cell A2',
          'Select cells A1 and A2',
          'Drag the fill handle down to A5',
          'The sequence 1, 2, 3, 4, 5 should appear'
        ]
      },
      {
        id: 6,
        title: 'Inventory Alert System',
        description: 'Create low stock alerts',
        scenario: 'The warehouse manager needs an alert system that shows "Reorder" when inventory falls below 10 units, otherwise shows "Sufficient".',
        dataTable: [
          ['Product', 'Current Stock', 'Status'],
          ['Widget A', '15', 'Check status'],
        ],
        instructions: 'Current stock is in D1. In D2, write an IF formula that shows "High" if D1 > 10, otherwise "Low".',
        type: 'excel-simulation',
        timeLimit: 180,
        validationCriteria: {
          expectedFormula: '=IF(D1>10,"High","Low")'
        },
        tutorialSteps: [
          'Stock quantity is in cell D1',
          'Click on cell D2',
          'Type =IF(D1>10,"High","Low")',
          'Press Enter',
          'Try changing D1 to see the result change'
        ]
      },
      {
        id: 7,
        title: 'Customer Response Count',
        description: 'Count survey responses',
        scenario: 'Marketing needs to know how many customers responded to the satisfaction survey out of the six customers contacted.',
        dataTable: [
          ['Customer', 'Response'],
          ['Customer 1', '8'],
          ['Customer 2', '9'],
          ['Customer 3', '7'],
          ['Customer 4', '10'],
          ['Customer 5', '8'],
          ['Customer 6', '9'],
        ],
        instructions: 'Response scores are in E1 to E6. In E7, use COUNT to count how many responses were received.',
        type: 'excel-simulation',
        timeLimit: 150,
        validationCriteria: {
          expectedFormula: '=COUNT(E1:E6)'
        },
        tutorialSteps: [
          'Responses are already in cells E1 through E6',
          'Click on cell E7',
          'Type =COUNT(E1:E6)',
          'Press Enter to see the count'
        ]
      },
      {
        id: 8,
        title: 'Highest Sales Performance',
        description: 'Identify top sales performer',
        scenario: 'Your sales director wants to identify the highest sales figure from this week to award the top performer a bonus.',
        dataTable: [
          ['Salesperson', 'Weekly Sales ($)'],
          ['Alice', '4,500'],
          ['Bob', '3,200'],
          ['Carol', '5,800'],
          ['David', '2,900'],
          ['Emma', '4,100'],
        ],
        instructions: 'Sales figures are in F1 to F5. Use MAX in F6 to find the highest sales amount.',
        type: 'excel-simulation',
        timeLimit: 150,
        validationCriteria: {
          expectedFormula: '=MAX(F1:F5)'
        },
        tutorialSteps: [
          'Sales figures are already in cells F1 through F5',
          'Click on cell F6',
          'Type =MAX(F1:F5)',
          'Press Enter to see the maximum value'
        ]
      },
      {
        id: 9,
        title: 'Department Budget Allocation',
        description: 'Fill budget amounts for departments',
        scenario: 'Finance needs you to allocate the same initial budget amount of $50,000 to ten different departments for the new fiscal year.',
        dataTable: [
          ['Department', 'Budget ($)'],
          ['Marketing', '50,000'],
          ['Sales', '50,000'],
          ['...', '...'],
        ],
        instructions: 'Select the range G1:G10 by clicking and dragging, then type a value to fill all cells.',
        type: 'excel-simulation',
        timeLimit: 120,
        validationCriteria: {
          expectedRange: { start: 'G1', end: 'G10', operation: 'fill' }
        },
        tutorialSteps: [
          'Click on cell G1',
          'Hold and drag down to G10',
          'Type any value',
          'Press Ctrl+Enter to fill all selected cells'
        ]
      },
      {
        id: 10,
        title: 'Tax Calculation Formula',
        description: 'Calculate tax on base price',
        scenario: 'Accounting needs a formula to calculate sales tax. The base price is $100 and the tax rate is fixed at 8%. Create a formula that can be copied down for multiple products.',
        dataTable: [
          ['Base Price', 'Tax Rate', 'Tax Amount'],
          ['$100', '8%', 'Calculate'],
        ],
        instructions: 'Base price is in H1. In H2, create a formula that multiplies H1 by 2 using absolute reference ($H$1).',
        type: 'excel-simulation',
        timeLimit: 150,
        validationCriteria: {
          expectedFormula: '=$H$1*2'
        },
        tutorialSteps: [
          'Enter 10 in cell H1',
          'Click on cell H2',
          'Type =$H$1*2',
          'Press Enter',
          'The $ signs make the reference absolute'
        ]
      },
    ],
  },
  {
    number: 2,
    title: 'PowerPoint Fundamentals',
    description: 'Master basic PowerPoint presentation skills',
    type: 'powerpoint',
    tasks: [
      {
        id: 1,
        title: 'Quarterly Review Presentation',
        description: 'Add agenda slide',
        scenario: 'Your manager asked you to prepare a quarterly business review presentation. You need to add an agenda slide after the title slide.',
        instructions: 'Click the "New Slide" button to add a second slide to your presentation.',
        type: 'powerpoint-simulation',
        timeLimit: 90,
        validationCriteria: {
          expectedSlideCount: 2
        },
        tutorialSteps: [
          'Look for the "New Slide" button in the toolbar',
          'Click the button',
          'A new slide should appear',
          'You should now have 2 slides total'
        ]
      },
      {
        id: 2,
        title: 'Company Presentation Title',
        description: 'Create professional title slide',
        scenario: 'You\'re presenting to potential investors and need to create a professional title slide with your company presentation name.',
        instructions: 'Click on the title placeholder and type "My Presentation" as the slide title.',
        type: 'powerpoint-simulation',
        timeLimit: 120,
        validationCriteria: {
          expectedTextContent: 'My Presentation'
        },
        tutorialSteps: [
          'Click on the title text box that says "Click to add title"',
          'Type "My Presentation"',
          'Click outside the text box to finish'
        ]
      },
      {
        id: 3,
        title: 'Process Flow Diagram',
        description: 'Illustrate business process',
        scenario: 'Your team needs a visual representation of the approval process. Start by adding a rectangle shape to represent the first step.',
        instructions: 'Use the shapes tool to insert a rectangle on your slide.',
        type: 'powerpoint-simulation',
        timeLimit: 120,
        validationCriteria: {
          expectedShapeCount: 1
        },
        tutorialSteps: [
          'Click the "Shapes" button in the toolbar',
          'Select the rectangle shape',
          'Click and drag on the slide to draw the rectangle'
        ]
      },
      {
        id: 4,
        title: 'Product Showcase',
        description: 'Display product image',
        scenario: 'Marketing wants you to create a product showcase slide. Add an image placeholder for the new product photo.',
        instructions: 'Click the "Insert Image" button to add an image placeholder to your slide.',
        type: 'powerpoint-simulation',
        timeLimit: 120,
        validationCriteria: {
          expectedImageCount: 1
        },
        tutorialSteps: [
          'Click the "Insert Image" button',
          'An image placeholder will be added',
          'You can resize it by dragging the corners'
        ]
      },
      {
        id: 5,
        title: 'Training Module Title',
        description: 'Add training content',
        scenario: 'You\'re creating a training presentation for new employees. Add a text box with the module title "Learning PowerPoint".',
        instructions: 'Insert a text box and type "Learning PowerPoint" inside it.',
        type: 'powerpoint-simulation',
        timeLimit: 120,
        validationCriteria: {
          expectedTextContent: 'Learning PowerPoint'
        },
        tutorialSteps: [
          'Click the "Text Box" button',
          'Click on the slide where you want the text',
          'Type "Learning PowerPoint"',
          'Click outside to finish'
        ]
      },
      {
        id: 6,
        title: 'Three-Part Strategy',
        description: 'Create strategy presentation',
        scenario: 'The executive team needs a presentation outlining the three-part business strategy: Current State, Challenges, and Solutions.',
        instructions: 'Create a presentation with exactly 3 slides.',
        type: 'powerpoint-simulation',
        timeLimit: 120,
        validationCriteria: {
          expectedSlideCount: 3
        },
        tutorialSteps: [
          'Start with your current slide',
          'Click "New Slide" button',
          'Click "New Slide" again',
          'You should now have 3 slides total'
        ]
      },
      {
        id: 7,
        title: 'Icon Legend',
        description: 'Create visual legend',
        scenario: 'Your infographic needs a legend explaining what the circle icon represents. Add the shape and label it.',
        instructions: 'Add a circle shape and a text box with "Circle" written in it.',
        type: 'powerpoint-simulation',
        timeLimit: 150,
        validationCriteria: {
          expectedShapeCount: 1,
          expectedTextContent: 'Circle'
        },
        tutorialSteps: [
          'Click "Shapes" and select circle',
          'Draw a circle on the slide',
          'Click "Text Box"',
          'Type "Circle"'
        ]
      },
      {
        id: 8,
        title: 'Project Summary Slide',
        description: 'Summarize project outcomes',
        scenario: 'Create a project summary slide for the stakeholder meeting with the title "Summary", a chart placeholder, and a key metrics image.',
        instructions: 'Create a slide with a title "Summary", one shape, and one image.',
        type: 'powerpoint-simulation',
        timeLimit: 180,
        validationCriteria: {
          expectedTextContent: 'Summary',
          expectedShapeCount: 1,
          expectedImageCount: 1
        },
        tutorialSteps: [
          'Add title "Summary"',
          'Insert a shape',
          'Insert an image',
          'Arrange them nicely on the slide'
        ]
      },
      {
        id: 9,
        title: 'Emphasis Text',
        description: 'Highlight key message',
        scenario: 'Your presentation needs to emphasize the key takeaway message. Add bold text that stands out to the audience.',
        instructions: 'Add a text box with "Bold Text" and make it bold using the toolbar.',
        type: 'powerpoint-simulation',
        timeLimit: 120,
        validationCriteria: {
          expectedTextContent: 'Bold Text'
        },
        tutorialSteps: [
          'Insert a text box',
          'Type "Bold Text"',
          'Select the text',
          'Click the Bold button (B) in the toolbar'
        ]
      },
      {
        id: 10,
        title: 'Closing Slide',
        description: 'Create presentation conclusion',
        scenario: 'Every professional presentation needs a strong closing slide. Create a final slide with title "Final Slide", two visual elements, and a call-to-action text.',
        instructions: 'Create a complete slide with title "Final Slide", 2 shapes, and 1 text box.',
        type: 'powerpoint-simulation',
        timeLimit: 240,
        validationCriteria: {
          expectedTextContent: 'Final Slide',
          expectedShapeCount: 2
        },
        tutorialSteps: [
          'Add title "Final Slide"',
          'Insert first shape',
          'Insert second shape',
          'Add a text box with any content',
          'Arrange everything nicely'
        ]
      },
    ],
  },
  {
    number: 3,
    title: 'Advanced Excel Formulas',
    description: 'Master complex Excel formulas and functions',
    type: 'excel',
    tasks: [
      {
        id: 1,
        title: 'Customer Full Name',
        description: 'Combine first and last names',
        scenario: 'Your CRM system stores first and last names separately, but the mailing list requires full names. Combine them with a space in between.',
        dataTable: [
          ['First Name', 'Last Name', 'Full Name'],
          ['Hello', 'World', 'Combine →'],
        ],
        instructions: 'First name is in A1 and last name is in B1. In C1, use CONCATENATE to combine them with a space.',
        type: 'excel-simulation',
        timeLimit: 150,
        validationCriteria: {
          expectedFormula: '=CONCATENATE(A1," ",B1)'
        },
        tutorialSteps: [
          'Names are already in A1 and B1',
          'Click C1',
          'Type =CONCATENATE(A1," ",B1)',
          'Press Enter'
        ]
      },
      {
        id: 2,
        title: 'Attendance Confirmation Count',
        description: 'Count confirmed attendees',
        scenario: 'You\'re organizing a company event and need to count how many employees confirmed their attendance with "Yes" responses.',
        dataTable: [
          ['Employee', 'Attending?'],
          ['Employee 1', 'Yes'],
          ['Employee 2', 'Yes'],
          ['Employee 3', 'Yes'],
          ['Employee 4', 'No'],
          ['Employee 5', 'No'],
        ],
        instructions: 'Responses are in A1-A5. In A6, count how many cells contain "Yes".',
        type: 'excel-simulation',
        timeLimit: 180,
        validationCriteria: {
          expectedFormula: '=COUNTIF(A1:A5,"Yes")'
        },
        tutorialSteps: [
          'Responses are already entered',
          'Click on A6',
          'Type =COUNTIF(A1:A5,"Yes")',
          'Press Enter'
        ]
      },
      {
        id: 3,
        title: 'High-Value Transaction Sum',
        description: 'Sum transactions over threshold',
        scenario: 'Finance needs the total of all transactions exceeding $10 for the fraud detection report.',
        dataTable: [
          ['Transaction', 'Amount ($)'],
          ['TX-001', '5'],
          ['TX-002', '15'],
          ['TX-003', '25'],
          ['TX-004', '8'],
          ['TX-005', '50'],
        ],
        instructions: 'Transaction amounts are in B1-B5. In B6, sum only the values greater than 10.',
        type: 'excel-simulation',
        timeLimit: 180,
        validationCriteria: {
          expectedFormula: '=SUMIF(B1:B5,">10")'
        },
        tutorialSteps: [
          'Amounts are already in B1 through B5',
          'Click on B6',
          'Type =SUMIF(B1:B5,">10")',
          'Press Enter to sum values > 10'
        ]
      },
      {
        id: 4,
        title: 'Invoice Currency Format',
        description: 'Format invoice for client',
        scenario: 'Your client requires invoice amounts to be displayed in proper currency format with dollar sign and two decimal places.',
        dataTable: [
          ['Invoice Amount', 'Formatted'],
          ['1234.56', 'Format →'],
        ],
        instructions: 'Amount is in C1. In C2, use TEXT function to format it as currency.',
        type: 'excel-simulation',
        timeLimit: 180,
        validationCriteria: {
          expectedFormula: '=TEXT(C1,"$#,##0.00")'
        },
        tutorialSteps: [
          'Amount is already in C1',
          'Click on C2',
          'Type =TEXT(C1,"$#,##0.00")',
          'Press Enter'
        ]
      },
      {
        id: 5,
        title: 'Error-Free Report',
        description: 'Handle calculation errors',
        scenario: 'Your automated report sometimes encounters division errors. Replace error messages with "Error" text for cleaner presentation.',
        dataTable: [
          ['Calculation', 'Result'],
          ['10/0', 'Handle error →'],
        ],
        instructions: 'In D2, wrap the calculation with IFERROR to show "Error" instead of #DIV/0!.',
        type: 'excel-simulation',
        timeLimit: 180,
        validationCriteria: {
          expectedFormula: '=IFERROR(10/0,"Error")'
        },
        tutorialSteps: [
          'Click on D2',
          'Type =IFERROR(10/0,"Error")',
          'Press Enter',
          'Instead of #DIV/0!, you see "Error"'
        ]
      },
      {
        id: 6,
        title: 'Product Code Extraction',
        description: 'Extract product category',
        scenario: 'Your inventory system uses codes like "Excel2024" where the first 5 characters represent the product category. Extract the category code.',
        dataTable: [
          ['Full Code', 'Category'],
          ['Excel2024', 'Extract →'],
        ],
        instructions: 'Full code is in E1. In E2, use LEFT to extract the first 5 characters.',
        type: 'excel-simulation',
        timeLimit: 150,
        validationCriteria: {
          expectedFormula: '=LEFT(E1,5)'
        },
        tutorialSteps: [
          'Code is already in E1',
          'Click on E2',
          'Type =LEFT(E1,5)',
          'Press Enter to see "Excel"'
        ]
      },
      {
        id: 7,
        title: 'Report Date Stamp',
        description: 'Add current date to report',
        scenario: 'Your daily sales report needs to automatically display today\'s date in the header for record-keeping.',
        dataTable: [
          ['Report Date', 'Auto-fill →'],
        ],
        instructions: 'In F1, use the TODAY function to display today\'s date.',
        type: 'excel-simulation',
        timeLimit: 120,
        validationCriteria: {
          expectedFormula: '=TODAY()'
        },
        tutorialSteps: [
          'Click on F1',
          'Type =TODAY()',
          'Press Enter',
          'Current date appears'
        ]
      },
      {
        id: 8,
        title: 'Performance Rating System',
        description: 'Categorize employee performance',
        scenario: 'HR needs a performance rating system: "High" for scores above 20, "Medium" for scores above 10, and "Low" for all others.',
        dataTable: [
          ['Score', 'Rating'],
          ['15', 'Calculate →'],
        ],
        instructions: 'Score is in G1. In G2, create nested IF: "High" if >20, "Medium" if >10, else "Low".',
        type: 'excel-simulation',
        timeLimit: 240,
        validationCriteria: {
          expectedFormula: '=IF(G1>20,"High",IF(G1>10,"Medium","Low"))'
        },
        tutorialSteps: [
          'Score is already in G1',
          'Click on G2',
          'Type =IF(G1>20,"High",IF(G1>10,"Medium","Low"))',
          'Press Enter',
          'Try different values in G1'
        ]
      },
      {
        id: 9,
        title: 'Email Subject Line',
        description: 'Standardize email format',
        scenario: 'Your email marketing campaign requires all subject lines to be in uppercase for consistency and impact.',
        dataTable: [
          ['Original', 'Uppercase'],
          ['hello world', 'Convert →'],
        ],
        instructions: 'Original text is in H1. In H2, use UPPER to convert it to uppercase.',
        type: 'excel-simulation',
        timeLimit: 120,
        validationCriteria: {
          expectedFormula: '=UPPER(H1)'
        },
        tutorialSteps: [
          'Text is already in H1',
          'Click on H2',
          'Type =UPPER(H1)',
          'Press Enter to see "HELLO WORLD"'
        ]
      },
      {
        id: 10,
        title: 'Character Limit Check',
        description: 'Validate text length',
        scenario: 'Your database has a 50-character limit for product descriptions. Count the characters to ensure compliance.',
        dataTable: [
          ['Description', 'Character Count'],
          ['Enter text', 'Count →'],
        ],
        instructions: 'Description is in I1. In I2, use LEN to count the number of characters.',
        type: 'excel-simulation',
        timeLimit: 120,
        validationCriteria: {
          expectedFormula: '=LEN(I1)'
        },
        tutorialSteps: [
          'Type any text in I1',
          'Click on I2',
          'Type =LEN(I1)',
          'Press Enter to see character count'
        ]
      },
    ],
  },
  {
    number: 4,
    title: 'PowerPoint Design Mastery',
    description: 'Create professional and engaging presentations',
    type: 'powerpoint',
    tasks: [
      {
        id: 1,
        title: 'Board Meeting Presentation',
        description: 'Create executive title slide',
        scenario: 'You\'re presenting to the board of directors. Create a professional title slide with "Professional Presentation" and add your name as the presenter.',
        instructions: 'Create a title slide with "Professional Presentation" as title and your name as subtitle.',
        type: 'powerpoint-simulation',
        timeLimit: 150,
        validationCriteria: {
          expectedTextContent: 'Professional Presentation'
        },
        tutorialSteps: [
          'Click on title placeholder',
          'Type "Professional Presentation"',
          'Click on subtitle placeholder',
          'Type your name'
        ]
      },
      {
        id: 2,
        title: 'Strategic Priorities',
        description: 'Present key business points',
        scenario: 'Management wants a slide showing the two key strategic priorities for Q2. Use shapes to represent each priority visually.',
        instructions: 'Create a slide with title "Key Points" and add 2 shapes to represent bullet points.',
        type: 'powerpoint-simulation',
        timeLimit: 180,
        validationCriteria: {
          expectedTextContent: 'Key Points',
          expectedShapeCount: 2
        },
        tutorialSteps: [
          'Add title "Key Points"',
          'Insert first shape',
          'Insert second shape',
          'Position them as bullet points'
        ]
      },
      {
        id: 3,
        title: 'Product-Feature Layout',
        description: 'Balance visual and text',
        scenario: 'Create a product slide with the product image on the left and feature descriptions on the right for a balanced, professional look.',
        instructions: 'Create a slide with title "Balance", 1 image on left, and 1 text box on right.',
        type: 'powerpoint-simulation',
        timeLimit: 180,
        validationCriteria: {
          expectedTextContent: 'Balance',
          expectedImageCount: 1
        },
        tutorialSteps: [
          'Add title "Balance"',
          'Insert image on left side',
          'Add text box on right side',
          'Align them properly'
        ]
      },
      {
        id: 4,
        title: 'Process Steps Diagram',
        description: 'Visualize workflow stages',
        scenario: 'Illustrate the three-stage approval process using different shapes: circle for initiation, rectangle for review, triangle for approval.',
        instructions: 'Create a slide with 3 different shapes: circle, rectangle, and triangle.',
        type: 'powerpoint-simulation',
        timeLimit: 180,
        validationCriteria: {
          expectedShapeCount: 3
        },
        tutorialSteps: [
          'Insert a circle shape',
          'Insert a rectangle shape',
          'Insert a triangle shape',
          'Arrange them nicely'
        ]
      },
      {
        id: 5,
        title: 'Design Principles Slide',
        description: 'Showcase design elements',
        scenario: 'Create a slide for the design team showing the title "Design", two example shapes, and two text descriptions of design principles.',
        instructions: 'Create slide with title "Design", 2 shapes, and 2 text boxes.',
        type: 'powerpoint-simulation',
        timeLimit: 240,
        validationCriteria: {
          expectedTextContent: 'Design',
          expectedShapeCount: 2
        },
        tutorialSteps: [
          'Add title "Design"',
          'Insert 2 shapes',
          'Add 2 text boxes',
          'Create a balanced layout'
        ]
      },
      {
        id: 6,
        title: 'Before-After Comparison',
        description: 'Show visual transformation',
        scenario: 'Marketing needs a slide titled "Visual" showing two product images side-by-side for comparison.',
        instructions: 'Create a slide with title "Visual" and 2 image placeholders.',
        type: 'powerpoint-simulation',
        timeLimit: 150,
        validationCriteria: {
          expectedTextContent: 'Visual',
          expectedImageCount: 2
        },
        tutorialSteps: [
          'Add title "Visual"',
          'Insert first image',
          'Insert second image',
          'Resize and position them'
        ]
      },
      {
        id: 7,
        title: 'Comprehensive Overview',
        description: 'Create information-rich slide',
        scenario: 'The project overview slide needs title "Complete", one chart image, two data visualization shapes, and one summary text box.',
        instructions: 'Create slide with title "Complete", 1 image, 2 shapes, and 1 text box.',
        type: 'powerpoint-simulation',
        timeLimit: 300,
        validationCriteria: {
          expectedTextContent: 'Complete',
          expectedImageCount: 1,
          expectedShapeCount: 2
        },
        tutorialSteps: [
          'Add title "Complete"',
          'Insert 1 image',
          'Add 2 shapes',
          'Add 1 text box',
          'Arrange all elements'
        ]
      },
      {
        id: 8,
        title: 'Training Module Series',
        description: 'Build multi-slide training',
        scenario: 'Create a 4-slide training module with consistent titles: Introduction, Content, Practice, and Summary.',
        instructions: 'Create a 4-slide presentation with consistent titles on each slide.',
        type: 'powerpoint-simulation',
        timeLimit: 300,
        validationCriteria: {
          expectedSlideCount: 4
        },
        tutorialSteps: [
          'Create first slide with title',
          'Add second slide with title',
          'Add third slide with title',
          'Add fourth slide with title'
        ]
      },
      {
        id: 9,
        title: 'Workflow Diagram',
        description: 'Map business process',
        scenario: 'Create a simple workflow diagram with 4 connected shapes showing the order fulfillment process from order to delivery.',
        instructions: 'Create a simple flowchart with 4 shapes connected visually.',
        type: 'powerpoint-simulation',
        timeLimit: 300,
        validationCriteria: {
          expectedShapeCount: 4
        },
        tutorialSteps: [
          'Insert 4 shapes',
          'Arrange them in a flow',
          'Position them to show connection',
          'Add text labels if needed'
        ]
      },
      {
        id: 10,
        title: 'Complete Business Pitch',
        description: 'Build full pitch deck',
        scenario: 'Create a complete 3-slide pitch: title slide, problem/solution slide with 2 visual elements, and closing slide with company logo.',
        instructions: 'Create a 3-slide presentation: title slide, content slide with 2 shapes, and closing slide with image.',
        type: 'powerpoint-simulation',
        timeLimit: 360,
        validationCriteria: {
          expectedSlideCount: 3,
          expectedShapeCount: 2,
          expectedImageCount: 1
        },
        tutorialSteps: [
          'Create title slide',
          'Add content slide with 2 shapes',
          'Add closing slide with image',
          'Review all slides'
        ]
      },
    ],
  },
  {
    number: 5,
    title: 'Excel Data Analysis',
    description: 'Analyze and visualize data effectively',
    type: 'excel',
    tasks: [
      {
        id: 1,
        title: 'Student Grade Tracker',
        description: 'Create grade tracking table',
        scenario: 'As a teacher, you need to create a grade tracking system. Set up a table with student names and their test scores.',
        dataTable: [
          ['Name', 'Score'],
          ['John', '85'],
          ['Sarah', '92'],
          ['Mike', '78'],
        ],
        instructions: 'Headers are already in row 1. The table structure is set up with sample data.',
        type: 'excel-simulation',
        timeLimit: 180,
        validationCriteria: {
          expectedRange: { start: 'A1', end: 'B4', operation: 'table' }
        },
        tutorialSteps: [
          'Headers are already in A1 and B1',
          'Sample data is in rows 2-4',
          'This creates a simple table structure'
        ]
      },
      {
        id: 2,
        title: 'Priority Task Ranking',
        description: 'Sort tasks by priority',
        scenario: 'Your project manager needs the task list sorted by priority score in ascending order to identify which tasks to tackle first.',
        dataTable: [
          ['Task', 'Priority Score'],
          ['Task A', '5'],
          ['Task B', '2'],
          ['Task C', '8'],
          ['Task D', '1'],
          ['Task E', '9'],
        ],
        instructions: 'Priority scores are in A1-A5. Sort them in ascending order.',
        type: 'excel-simulation',
        timeLimit: 150,
        validationCriteria: {
          expectedRange: { start: 'A1', end: 'A5', operation: 'sorted' }
        },
        tutorialSteps: [
          'Scores are already entered',
          'Select the range A1:A5',
          'Click Sort Ascending button',
          'Numbers should be 1, 2, 5, 8, 9'
        ]
      },
      {
        id: 3,
        title: 'Sales Target Achievement',
        description: 'Highlight high performers',
        scenario: 'Sales management wants to visually identify all salespeople who exceeded the 50-unit target this month.',
        dataTable: [
          ['Salesperson', 'Units Sold'],
          ['Alice', '25'],
          ['Bob', '60'],
          ['Carol', '45'],
          ['David', '80'],
          ['Emma', '30'],
        ],
        instructions: 'Sales figures are in B1-B5. Apply conditional formatting to highlight values greater than 50.',
        type: 'excel-simulation',
        timeLimit: 180,
        validationCriteria: {
          expectedFormatting: { cell: 'B1:B5', format: 'conditional' }
        },
        tutorialSteps: [
          'Numbers are already in B1-B5',
          'Select the range',
          'Click Conditional Formatting button',
          'Choose "Greater Than" and enter 50'
        ]
      },
      {
        id: 4,
        title: 'Lowest Expense Item',
        description: 'Find minimum expense',
        scenario: 'Finance needs to identify the lowest monthly expense category to analyze cost-saving opportunities.',
        dataTable: [
          ['Expense Category', 'Amount ($)'],
          ['Rent', '45'],
          ['Utilities', '12'],
          ['Supplies', '89'],
          ['Marketing', '23'],
          ['Insurance', '67'],
          ['Maintenance', '34'],
        ],
        instructions: 'Expense amounts are in C1-C6. In C7, use MIN function to find the smallest value.',
        type: 'excel-simulation',
        timeLimit: 150,
        validationCriteria: {
          expectedFormula: '=MIN(C1:C6)'
        },
        tutorialSteps: [
          'Amounts are already in C1 through C6',
          'Click on C7',
          'Type =MIN(C1:C6)',
          'Press Enter'
        ]
      },
      {
        id: 5,
        title: 'Age Verification System',
        description: 'Validate user input',
        scenario: 'Your registration form needs age validation. Set up data validation to only accept ages between 1 and 100.',
        dataTable: [
          ['Field', 'Validation Rule'],
          ['Age', '1-100 only'],
        ],
        instructions: 'Set up data validation on D1 to only allow numbers between 1 and 100.',
        type: 'excel-simulation',
        timeLimit: 180,
        validationCriteria: {
          customValidation: 'data-validation-D1'
        },
        tutorialSteps: [
          'Select cell D1',
          'Click Data Validation button',
          'Choose "Whole number"',
          'Set minimum 1, maximum 100'
        ]
      },
      {
        id: 6,
        title: 'Price Display Format',
        description: 'Round prices for display',
        scenario: 'Your e-commerce site displays prices with 2 decimal places. Round the calculated price of $3.14159 appropriately.',
        dataTable: [
          ['Calculated Price', 'Display Price'],
          ['3.14159', 'Round →'],
        ],
        instructions: 'Calculated price is in E1. In E2, use ROUND to round it to 2 decimal places.',
        type: 'excel-simulation',
        timeLimit: 150,
        validationCriteria: {
          expectedFormula: '=ROUND(E1,2)'
        },
        tutorialSteps: [
          'Price is already in E1',
          'Click on E2',
          'Type =ROUND(E1,2)',
          'Press Enter to see 3.14'
        ]
      },
      {
        id: 7,
        title: 'Survey Response Rate',
        description: 'Count completed surveys',
        scenario: 'Marketing sent out 8 surveys and needs to know how many were completed (non-empty responses) for the response rate calculation.',
        dataTable: [
          ['Survey ID', 'Response'],
          ['S001', 'Apple'],
          ['S002', '100'],
          ['S003', 'Banana'],
          ['S004', '200'],
          ['S005', 'Cherry'],
          ['S006', '150'],
          ['S007', 'Date'],
          ['S008', '75'],
        ],
        instructions: 'Survey responses are in F1-F8. In F9, use COUNTA to count all non-empty cells.',
        type: 'excel-simulation',
        timeLimit: 150,
        validationCriteria: {
          expectedFormula: '=COUNTA(F1:F8)'
        },
        tutorialSteps: [
          'Responses are already in F1-F8',
          'Click on F9',
          'Type =COUNTA(F1:F8)',
          'Press Enter'
        ]
      },
      {
        id: 8,
        title: 'Test Score Percentage',
        description: 'Calculate grade percentage',
        scenario: 'A student scored 80 points out of 100 possible points. Calculate what percentage this represents for their grade report.',
        dataTable: [
          ['Points Earned', 'Total Points', 'Percentage'],
          ['80', '100', 'Calculate →'],
        ],
        instructions: 'Points earned is in G1 and total points is in G2. In G3, calculate what percentage 80 is of 100.',
        type: 'excel-simulation',
        timeLimit: 150,
        validationCriteria: {
          expectedFormula: '=G1/G2'
        },
        tutorialSteps: [
          'Values are already in G1 and G2',
          'Click on G3',
          'Type =G1/G2',
          'Format as percentage'
        ]
      },
      {
        id: 9,
        title: 'Median Response Time',
        description: 'Find typical response time',
        scenario: 'Customer service needs the median response time (middle value) from this week\'s data to set realistic expectations.',
        dataTable: [
          ['Day', 'Response Time (min)'],
          ['Mon', '12'],
          ['Tue', '45'],
          ['Wed', '23'],
          ['Thu', '67'],
          ['Fri', '34'],
          ['Sat', '89'],
          ['Sun', '56'],
        ],
        instructions: 'Response times are in H1-H7. In H8, use MEDIAN to find the middle value.',
        type: 'excel-simulation',
        timeLimit: 150,
        validationCriteria: {
          expectedFormula: '=MEDIAN(H1:H7)'
        },
        tutorialSteps: [
          'Times are already in H1-H7',
          'Click on H8',
          'Type =MEDIAN(H1:H7)',
          'Press Enter'
        ]
      },
      {
        id: 10,
        title: 'Monthly Sales Dashboard',
        description: 'Create summary statistics',
        scenario: 'Create a sales dashboard showing total sales, average daily sales, highest day, and lowest day for the 10-day period.',
        dataTable: [
          ['Day', 'Sales ($)'],
          ['Day 1', '10'],
          ['Day 2', '20'],
          ['...', '...'],
          ['Day 10', '28'],
          ['', ''],
          ['Total', '?'],
          ['Average', '?'],
          ['Highest', '?'],
          ['Lowest', '?'],
        ],
        instructions: 'Sales data is in I1-I10. Create formulas for SUM, AVERAGE, MAX, and MIN in I11-I14.',
        type: 'excel-simulation',
        timeLimit: 300,
        validationCriteria: {
          expectedRange: { start: 'I11', end: 'I14', operation: 'summary' }
        },
        tutorialSteps: [
          'Data is already in I1-I10',
          'In I11: =SUM(I1:I10)',
          'In I12: =AVERAGE(I1:I10)',
          'In I13: =MAX(I1:I10)',
          'In I14: =MIN(I1:I10)'
        ]
      },
    ],
  },
  {
    number: 6,
    title: 'PowerPoint Multimedia',
    description: 'Enhance presentations with multimedia elements',
    type: 'powerpoint',
    tasks: [
      {
        id: 1,
        title: 'Product Launch Slide',
        description: 'Showcase new product',
        scenario: 'You\'re launching a new product and need a slide titled "Media" with the product image prominently displayed.',
        instructions: 'Create a slide with title "Media" and add 1 image placeholder.',
        type: 'powerpoint-simulation',
        timeLimit: 120,
        validationCriteria: {
          expectedTextContent: 'Media',
          expectedImageCount: 1
        },
        tutorialSteps: [
          'Add title "Media"',
          'Click Insert Image',
          'Position the image'
        ]
      },
      {
        id: 2,
        title: 'Product Comparison Gallery',
        description: 'Display product variants',
        scenario: 'Show three product variants side-by-side for customer comparison in the sales presentation.',
        instructions: 'Create a slide with 3 image placeholders arranged in a row.',
        type: 'powerpoint-simulation',
        timeLimit: 180,
        validationCriteria: {
          expectedImageCount: 3
        },
        tutorialSteps: [
          'Insert first image',
          'Insert second image',
          'Insert third image',
          'Arrange them horizontally'
        ]
      },
      {
        id: 3,
        title: 'Portfolio Showcase',
        description: 'Present work samples',
        scenario: 'Create a portfolio slide titled "Gallery" with two project images and descriptive text explaining each project.',
        instructions: 'Create slide with title "Gallery", 2 images, and 1 text box describing them.',
        type: 'powerpoint-simulation',
        timeLimit: 240,
        validationCriteria: {
          expectedTextContent: 'Gallery',
          expectedImageCount: 2
        },
        tutorialSteps: [
          'Add title "Gallery"',
          'Insert 2 images',
          'Add text box with description',
          'Arrange elements'
        ]
      },
      {
        id: 4,
        title: 'Brand Identity Elements',
        description: 'Display brand components',
        scenario: 'Design team needs a slide showing 5 brand identity elements (logo variations, color swatches, typography samples) using shapes.',
        instructions: 'Create a slide with 5 shapes arranged to form a simple icon or symbol.',
        type: 'powerpoint-simulation',
        timeLimit: 240,
        validationCriteria: {
          expectedShapeCount: 5
        },
        tutorialSteps: [
          'Insert 5 different shapes',
          'Arrange them creatively',
          'Form a recognizable pattern',
          'Adjust sizes and positions'
        ]
      },
      {
        id: 5,
        title: 'Project Overview Slide',
        description: 'Comprehensive project summary',
        scenario: 'Create a project overview slide titled "Overview" with a timeline image, two milestone shapes, and two text boxes for key details.',
        instructions: 'Create slide with title "Overview", 1 image, 2 shapes, and 2 text boxes.',
        type: 'powerpoint-simulation',
        timeLimit: 300,
        validationCriteria: {
          expectedTextContent: 'Overview',
          expectedImageCount: 1,
          expectedShapeCount: 2
        },
        tutorialSteps: [
          'Add title "Overview"',
          'Insert 1 image',
          'Add 2 shapes',
          'Add 2 text boxes',
          'Create balanced layout'
        ]
      },
      {
        id: 6,
        title: 'Transformation Story',
        description: 'Show before and after',
        scenario: 'Tell the company transformation story with two slides: "Before" showing the old process with an image, and "After" showing the improved process.',
        instructions: 'Create 2 slides that tell a story: first with title "Before" and 1 image, second with "After" and 1 image.',
        type: 'powerpoint-simulation',
        timeLimit: 240,
        validationCriteria: {
          expectedSlideCount: 2,
          expectedImageCount: 2
        },
        tutorialSteps: [
          'Create first slide with title "Before"',
          'Add image to first slide',
          'Create second slide with title "After"',
          'Add image to second slide'
        ]
      },
      {
        id: 7,
        title: 'Key Metrics Dashboard',
        description: 'Display performance numbers',
        scenario: 'Create a metrics slide titled "Stats" with three KPI shapes, each containing a text box showing important numbers (revenue, customers, growth).',
        instructions: 'Create slide with title "Stats", 3 shapes with text boxes inside showing numbers.',
        type: 'powerpoint-simulation',
        timeLimit: 300,
        validationCriteria: {
          expectedTextContent: 'Stats',
          expectedShapeCount: 3
        },
        tutorialSteps: [
          'Add title "Stats"',
          'Insert 3 shapes',
          'Add text box in each shape',
          'Enter numbers in text boxes'
        ]
      },
      {
        id: 8,
        title: 'Feature Comparison',
        description: 'Compare two options',
        scenario: 'Create a comparison slide titled "Compare" showing two product options side-by-side with images and feature descriptions below each.',
        instructions: 'Create slide with title "Compare", 2 images side by side, and text box under each.',
        type: 'powerpoint-simulation',
        timeLimit: 300,
        validationCriteria: {
          expectedTextContent: 'Compare',
          expectedImageCount: 2
        },
        tutorialSteps: [
          'Add title "Compare"',
          'Insert 2 images side by side',
          'Add text box under left image',
          'Add text box under right image'
        ]
      },
      {
        id: 9,
        title: 'Service Features Grid',
        description: 'Showcase service offerings',
        scenario: 'Create a slide titled "Features" displaying four service features in a 2x2 grid, each represented by a shape with a descriptive label.',
        instructions: 'Create slide with title "Features", 4 shapes arranged in a grid, each with a text label.',
        type: 'powerpoint-simulation',
        timeLimit: 300,
        validationCriteria: {
          expectedTextContent: 'Features',
          expectedShapeCount: 4
        },
        tutorialSteps: [
          'Add title "Features"',
          'Insert 4 shapes in 2x2 grid',
          'Add text box for each shape',
          'Label each feature'
        ]
      },
      {
        id: 10,
        title: 'Complete Marketing Deck',
        description: 'Build full presentation',
        scenario: 'Create a complete 3-slide marketing presentation: title slide, content slide with 2 product images and 2 benefit shapes, and summary slide.',
        instructions: 'Create 3-slide presentation: title slide, content slide with 2 images and 2 shapes, summary slide.',
        type: 'powerpoint-simulation',
        timeLimit: 480,
        validationCriteria: {
          expectedSlideCount: 3,
          expectedImageCount: 2,
          expectedShapeCount: 2
        },
        tutorialSteps: [
          'Create title slide',
          'Create content slide with 2 images and 2 shapes',
          'Create summary slide',
          'Review entire presentation'
        ]
      },
    ],
  },
  {
    number: 7,
    title: 'Excel & PowerPoint Integration',
    description: 'Master the integration between Excel and PowerPoint',
    type: 'excel',
    tasks: [
      {
        id: 1,
        title: 'Product Inventory Table',
        description: 'Create inventory summary',
        scenario: 'The warehouse manager needs a summary table showing items, quantities, and prices for the monthly inventory report.',
        dataTable: [
          ['Item', 'Quantity', 'Price'],
          ['Laptop', '5', '1200'],
          ['Mouse', '20', '25'],
        ],
        instructions: 'The table structure is already set up with headers and sample data.',
        type: 'excel-simulation',
        timeLimit: 180,
        validationCriteria: {
          expectedRange: { start: 'A1', end: 'C3', operation: 'table' }
        },
        tutorialSteps: [
          'Headers are already in row 1',
          'Sample data is in rows 2 and 3',
          'Table is ready for presentation'
        ]
      },
      {
        id: 2,
        title: 'Order Total Calculator',
        description: 'Calculate order totals',
        scenario: 'E-commerce needs to calculate the total cost (price + tax) for each order line item in the shopping cart.',
        dataTable: [
          ['Price', 'Tax', 'Total'],
          ['100', '10', 'Calculate →'],
          ['150', '15', 'Calculate →'],
          ['200', '20', 'Calculate →'],
        ],
        instructions: 'Prices are in column A, taxes in column B. In column C, calculate total (Price + Tax).',
        type: 'excel-simulation',
        timeLimit: 240,
        validationCriteria: {
          expectedFormula: '=A1+B1'
        },
        tutorialSteps: [
          'Prices and taxes are already entered',
          'In C1, type =A1+B1',
          'Copy formula down to C2 and C3'
        ]
      },
      {
        id: 3,
        title: 'Sales Performance Dashboard',
        description: 'Create executive summary',
        scenario: 'Create a dashboard for the CEO showing total sales, average daily sales, highest performing day, and lowest performing day.',
        dataTable: [
          ['Day', 'Sales ($)'],
          ['Day 1-10', 'Various amounts'],
          ['', ''],
          ['Total', '?'],
          ['Average', '?'],
          ['Highest', '?'],
          ['Lowest', '?'],
        ],
        instructions: 'Sales data is in A1-A10. Below, create labels and formulas for Total, Average, Max, Min.',
        type: 'excel-simulation',
        timeLimit: 300,
        validationCriteria: {
          expectedRange: { start: 'A11', end: 'B14', operation: 'summary' }
        },
        tutorialSteps: [
          'Data is already in A1-A10',
          'In A11: "Total", B11: =SUM(A1:A10)',
          'In A12: "Average", B12: =AVERAGE(A1:A10)',
          'In A13: "Max", B13: =MAX(A1:A10)',
          'In A14: "Min", B14: =MIN(A1:A10)'
        ]
      },
      {
        id: 4,
        title: 'Financial Report Formatting',
        description: 'Format for presentation',
        scenario: 'Finance requires all monetary values in the quarterly report to be formatted as currency for the board presentation.',
        dataTable: [
          ['Product', 'Revenue ($)'],
          ['Laptop', '1200'],
          ['Phone', '800'],
          ['Tablet', '500'],
          ['Monitor', '300'],
        ],
        instructions: 'Product table is set up. Apply currency formatting to the revenue column (B2:B5).',
        type: 'excel-simulation',
        timeLimit: 240,
        validationCriteria: {
          expectedFormatting: { cell: 'B2:B5', format: 'currency' }
        },
        tutorialSteps: [
          'Table is already created',
          'Select the revenue columns (B2:B5)',
          'Apply currency format'
        ]
      },
      {
        id: 5,
        title: 'Sales Target Achievement',
        description: 'Calculate performance percentage',
        scenario: 'Calculate what percentage each salesperson achieved of their target for the performance review meeting.',
        dataTable: [
          ['Salesperson', 'Actual Sales', 'Target', '% Achieved'],
          ['Alice', '8500', '10000', 'Calculate →'],
          ['Bob', '9200', '10000', 'Calculate →'],
          ['Carol', '7800', '10000', 'Calculate →'],
          ['David', '10500', '10000', 'Calculate →'],
        ],
        instructions: 'Actual sales are in column A, targets in column B. In column C, calculate percentage achieved.',
        type: 'excel-simulation',
        timeLimit: 240,
        validationCriteria: {
          expectedFormula: '=A1/B1'
        },
        tutorialSteps: [
          'Sales and targets are already entered',
          'In C1, type =A1/B1',
          'Copy down and format as percentage'
        ]
      },
      {
        id: 6,
        title: 'Department Budget Summary',
        description: 'Sum by category',
        scenario: 'Finance needs the total budget allocated to the Sales department across all expense categories.',
        dataTable: [
          ['Category', 'Amount ($)'],
          ['Sales', '5000'],
          ['Marketing', '2000'],
          ['Sales', '3000'],
          ['Operations', '4000'],
        ],
        instructions: 'Categories and amounts are entered. Use SUMIF to sum amounts for the "Sales" category.',
        type: 'excel-simulation',
        timeLimit: 300,
        validationCriteria: {
          expectedFormula: '=SUMIF(A:A,"Category",B:B)'
        },
        tutorialSteps: [
          'Data is already entered',
          'Use =SUMIF(A:A,"Sales",B:B)',
          'This sums amounts where category is "Sales"'
        ]
      },
      {
        id: 7,
        title: 'Year-over-Year Growth',
        description: 'Calculate annual change',
        scenario: 'Management needs to see the year-over-year change in revenue for each quarter to assess growth trends.',
        dataTable: [
          ['Quarter', '2023 ($)', '2024 ($)', 'Change ($)'],
          ['Q1', '5000', '6500', 'Calculate →'],
          ['Q2', '4500', '5200', 'Calculate →'],
          ['Q3', '7000', '8100', 'Calculate →'],
        ],
        instructions: '2023 data is in column A, 2024 data in column B. In column C, calculate the difference.',
        type: 'excel-simulation',
        timeLimit: 240,
        validationCriteria: {
          expectedFormula: '=B1-A1'
        },
        tutorialSteps: [
          'Historical data is already entered',
          'In column C, type =B1-A1',
          'Copy formula down'
        ]
      },
      {
        id: 8,
        title: 'Performance Ranking',
        description: 'Rank employees by score',
        scenario: 'HR needs to rank employees by their performance scores for the annual review and bonus allocation.',
        dataTable: [
          ['Name', 'Score', 'Rank'],
          ['Alice', '95', 'Calculate →'],
          ['Bob', '87', 'Calculate →'],
          ['Charlie', '92', 'Calculate →'],
          ['Diana', '88', 'Calculate →'],
        ],
        instructions: 'Names and scores are entered. Add "Rank" column using RANK function.',
        type: 'excel-simulation',
        timeLimit: 300,
        validationCriteria: {
          expectedFormula: '=RANK(B1,$B$1:$B$10)'
        },
        tutorialSteps: [
          'Data is already entered',
          'In Rank column, use RANK function',
          'Use absolute references for range'
        ]
      },
      {
        id: 9,
        title: 'Employee Directory Lookup',
        description: 'Find employee by ID',
        scenario: 'HR needs a lookup system where entering an employee ID automatically displays their name from the directory.',
        dataTable: [
          ['ID', 'Name'],
          ['101', 'Alice'],
          ['102', 'Bob'],
          ['103', 'Charlie'],
          ['', ''],
          ['Lookup ID:', 'Name:'],
        ],
        instructions: 'Directory is set up. Use VLOOKUP to find a name by ID.',
        type: 'excel-simulation',
        timeLimit: 300,
        validationCriteria: {
          expectedFormula: '=VLOOKUP(D1,A:B,2,FALSE)'
        },
        tutorialSteps: [
          'Directory is in columns A and B',
          'In D1, enter an ID to lookup',
          'In E1, use VLOOKUP to find name'
        ]
      },
      {
        id: 10,
        title: 'Executive Dashboard',
        description: 'Create comprehensive dashboard',
        scenario: 'Create an executive dashboard with quarterly sales data for 4 products, including totals row for presentation to the board.',
        dataTable: [
          ['Product', 'Q1', 'Q2', 'Q3'],
          ['Laptops', '1200', '1500', '1800'],
          ['Phones', '800', '950', '1100'],
          ['Tablets', '500', '600', '700'],
          ['Monitors', '300', '350', '400'],
          ['TOTAL', '?', '?', '?'],
        ],
        instructions: 'Create comprehensive table with 4 columns and 5 rows, including headers, data, and summary row with totals.',
        type: 'excel-simulation',
        timeLimit: 420,
        validationCriteria: {
          expectedRange: { start: 'A1', end: 'D6', operation: 'dashboard' }
        },
        tutorialSteps: [
          'Data is already loaded',
          'Add summary row with totals',
          'Format professionally',
          'Ensure all calculations work'
        ]
      },
    ],
  },
];
