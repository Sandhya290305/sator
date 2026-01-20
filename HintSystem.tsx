import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';
import type { Task } from '../data/levels';

interface HintSystemProps {
  task: Task;
  isActive: boolean;
  onClose: () => void;
}

// Scenario-contextual hints for each task
const TASK_HINTS: { [key: string]: string[] } = {
  // Level 1 - Excel Basics (Business Context)
  '1-1': ['Start by entering the product code in cell A1', 'Then click on cell B1 to create the warehouse location reference', 'Type =A1 to link the cells together', 'This creates a dynamic reference that updates automatically'],
  '1-2': ['The daily sales figures are already entered in cells A1 through A5', 'Click on cell A6 where the weekly total should appear', 'Type =SUM(A1:A5) to add all daily sales', 'Press Enter to see the total weekly sales amount'],
  '1-3': ['The test scores are already in cells B1 through B4', 'Click on cell B5 for the semester average', 'Type =AVERAGE(B1:B4) to calculate the mean score', 'This gives you the student\'s overall performance'],
  '1-4': ['Enter the invoice amount in cell C1', 'Select cell C1 to format it', 'Click the Currency ($) button in the toolbar', 'The amount will now display with proper currency formatting'],
  '1-5': ['Type 1 in cell A1 for the first employee ID', 'Type 2 in cell A2 for the second ID', 'Select both cells A1 and A2', 'Drag the fill handle down to A5 to generate the sequence'],
  '1-6': ['The current stock quantity is in cell D1', 'Click on cell D2 for the status indicator', 'Type =IF(D1>10,"High","Low") to create the alert', 'This checks if inventory is above or below the threshold'],
  '1-7': ['Customer response scores are already in cells E1 through E6', 'Click on cell E7 for the count', 'Type =COUNT(E1:E6) to count responses', 'This tells you how many customers responded'],
  '1-8': ['Weekly sales figures are already in cells F1 through F5', 'Click on cell F6 for the highest amount', 'Type =MAX(F1:F5) to find the top performer', 'This identifies the best sales week'],
  '1-9': ['Click on cell G1 to start the selection', 'Hold and drag down to G10 to select all departments', 'Type the budget amount (e.g., 50000)', 'Press Ctrl+Enter to fill all selected cells at once'],
  '1-10': ['Enter the base price in cell H1', 'Click on cell H2 for the tax calculation', 'Type =$H$1*2 using absolute reference', 'The $ signs ensure the formula can be copied without changing the reference'],
  
  // Level 2 - PowerPoint Fundamentals (Business Context)
  '2-1': ['Look for the "New Slide" button in the toolbar', 'Click it to add the agenda slide', 'You should now have 2 slides for your quarterly review', 'The new slide appears in the navigation panel'],
  '2-2': ['Click on the title placeholder that says "Click to add title"', 'Type "My Presentation" for the investor pitch', 'Click outside the text box to finish', 'This creates a professional title slide'],
  '2-3': ['Click the "Shapes" button in the toolbar', 'Select the rectangle shape for the first process step', 'Click and drag on the slide to draw it', 'This represents the first step in your approval process'],
  '2-4': ['Click the "Insert Image" button for the product photo', 'An image placeholder will appear on the slide', 'You can resize it by dragging the corners', 'Position it prominently for the product showcase'],
  '2-5': ['Click the "Text Box" button in the toolbar', 'Click on the slide where you want the module title', 'Type "Learning PowerPoint" for the training content', 'Click outside to finish'],
  '2-6': ['Start with your current slide', 'Click "New Slide" to add the Challenges slide', 'Click "New Slide" again to add the Solutions slide', 'You now have all three parts of your strategy'],
  '2-7': ['Click "Shapes" and select the circle for your legend', 'Draw the circle on the slide', 'Click "Text Box" to add the label', 'Type "Circle" to identify the icon'],
  '2-8': ['Add the title "Summary" for your project slide', 'Insert one shape for the chart placeholder', 'Insert one image for the key metrics', 'Arrange them for a balanced stakeholder presentation'],
  '2-9': ['Click "Text Box" to add your key message', 'Type "Bold Text" for the takeaway', 'Select the text by dragging over it', 'Click the Bold (B) button to emphasize it'],
  '2-10': ['Add title "Final Slide" for your conclusion', 'Insert two shapes as visual elements', 'Add a text box for your call-to-action', 'Arrange everything for a strong closing'],
  
  // Level 3 - Advanced Excel Formulas (Business Context)
  '3-1': ['First and last names are already in A1 and B1', 'Click on C1 for the full name', 'Type =CONCATENATE(A1," ",B1) to combine them', 'The space " " goes between the names for the mailing list'],
  '3-2': ['Employee attendance responses are already entered', 'Click on A6 for the confirmation count', 'Type =COUNTIF(A1:A5,"Yes") to count confirmations', 'This tells you how many are attending the event'],
  '3-3': ['Transaction amounts are already in B1 through B5', 'Click on B6 for the high-value total', 'Type =SUMIF(B1:B5,">10") for fraud detection', 'This sums only transactions over $10'],
  '3-4': ['The invoice amount is already in C1', 'Click on C2 for the formatted version', 'Type =TEXT(C1,"$#,##0.00") for client presentation', 'This formats it with dollar sign and decimals'],
  '3-5': ['Click on D2 for the error-free calculation', 'Type =IFERROR(10/0,"Error") to handle the error', 'This replaces #DIV/0! with clean "Error" text', 'Your automated report will look professional'],
  '3-6': ['The full product code is already in E1', 'Click on E2 for the category extraction', 'Type =LEFT(E1,5) to get the first 5 characters', 'This extracts the product category from the code'],
  '3-7': ['Click on F1 for the report date stamp', 'Type =TODAY() to insert today\'s date', 'Press Enter', 'The date updates automatically each day'],
  '3-8': ['The performance score is already in G1', 'Click on G2 for the rating', 'Type =IF(G1>20,"High",IF(G1>10,"Medium","Low"))', 'This creates the three-tier rating system for HR'],
  '3-9': ['The original subject line is already in H1', 'Click on H2 for the uppercase version', 'Type =UPPER(H1) to convert it', 'This standardizes your email marketing campaign'],
  '3-10': ['The product description is in I1', 'Click on I2 for the character count', 'Type =LEN(I1) to count characters', 'This validates the 50-character database limit'],
  
  // Level 4 - PowerPoint Design Mastery (Business Context)
  '4-1': ['Click on the title placeholder', 'Type "Professional Presentation" for the board', 'Click on subtitle area', 'Add your name as the presenter'],
  '4-2': ['Add title "Key Points" for Q2 priorities', 'Insert first shape for priority one', 'Insert second shape for priority two', 'Position them to represent strategic focus areas'],
  '4-3': ['Add title "Balance" for the product slide', 'Insert image on left for the product photo', 'Add text box on right for feature descriptions', 'Create a professional balanced layout'],
  '4-4': ['Insert circle for the initiation stage', 'Insert rectangle for the review stage', 'Insert triangle for the approval stage', 'Arrange them to show the workflow progression'],
  '4-5': ['Add title "Design" for the design team', 'Insert 2 example shapes', 'Add 2 text boxes for design principles', 'Create a balanced educational layout'],
  '4-6': ['Add title "Visual" for the comparison', 'Insert first product image', 'Insert second product image', 'Position them side-by-side for marketing'],
  '4-7': ['Add title "Complete" for project overview', 'Insert 1 chart image', 'Add 2 data visualization shapes', 'Add 1 summary text box', 'Arrange all elements professionally'],
  '4-8': ['Create first slide titled "Introduction"', 'Add second slide titled "Content"', 'Add third slide titled "Practice"', 'Add fourth slide titled "Summary"'],
  '4-9': ['Insert 4 shapes for the order fulfillment process', 'Arrange them in a flow from order to delivery', 'Position them to show connection', 'Add labels for each stage'],
  '4-10': ['Create title slide for your pitch', 'Add problem/solution slide with 2 visual elements', 'Add closing slide with company logo', 'Review the complete pitch deck'],
  
  // Level 5 - Excel Data Analysis (Business Context)
  '5-1': ['Headers "Name" and "Score" are already in row 1', 'Sample student data is in rows 2-4', 'The grade tracking table is ready', 'You can add more students if needed'],
  '5-2': ['Priority scores are already entered in A1-A5', 'Select the range A1:A5', 'Click Sort Ascending button', 'Tasks are now ordered from lowest to highest priority'],
  '5-3': ['Sales figures are already in B1-B5', 'Select the range B1:B5', 'Click Conditional Formatting', 'Choose "Greater Than" and enter 50 to highlight high performers'],
  '5-4': ['Expense amounts are already in C1-C6', 'Click on C7 for the minimum', 'Type =MIN(C1:C6) to find the lowest expense', 'This identifies cost-saving opportunities'],
  '5-5': ['Select cell D1 for age validation', 'Click Data Validation button', 'Choose "Whole number" for the registration form', 'Set minimum 1, maximum 100 for valid ages'],
  '5-6': ['The calculated price is already in E1', 'Click on E2 for the display price', 'Type =ROUND(E1,2) for e-commerce display', 'This rounds to 2 decimal places'],
  '5-7': ['Survey responses are already in F1-F8', 'Click on F9 for the response count', 'Type =COUNTA(F1:F8) to count completed surveys', 'This calculates your response rate'],
  '5-8': ['Points earned (80) is in G1, total (100) is in G2', 'Click on G3 for the percentage', 'Type =G1/G2 to calculate the grade', 'Format as percentage for the report'],
  '5-9': ['Response times are already in H1-H7', 'Click on H8 for the median', 'Type =MEDIAN(H1:H7) to find typical time', 'This sets realistic customer expectations'],
  '5-10': ['Sales data is already in I1-I10', 'In I11: =SUM(I1:I10) for total', 'In I12: =AVERAGE(I1:I10) for daily average', 'In I13: =MAX(I1:I10), I14: =MIN(I1:I10) for range'],
  
  // Level 6 - PowerPoint Multimedia (Business Context)
  '6-1': ['Add title "Media" for the product launch', 'Click Insert Image for the product photo', 'Position it prominently on the slide', 'This showcases your new product'],
  '6-2': ['Insert first product variant image', 'Insert second variant image', 'Insert third variant image', 'Arrange them horizontally for customer comparison'],
  '6-3': ['Add title "Gallery" for the portfolio', 'Insert 2 project images', 'Add text box describing the projects', 'Create a professional portfolio layout'],
  '6-4': ['Insert 5 shapes for brand identity elements', 'Arrange them creatively', 'Form a recognizable brand pattern', 'Show logo variations and design elements'],
  '6-5': ['Add title "Overview" for the project', 'Insert 1 timeline image', 'Add 2 milestone shapes', 'Add 2 text boxes for key details', 'Create comprehensive summary'],
  '6-6': ['Create first slide with title "Before"', 'Add image showing old process', 'Create second slide with title "After"', 'Add image showing improved process'],
  '6-7': ['Add title "Stats" for the metrics dashboard', 'Insert 3 KPI shapes', 'Add text box in each for numbers', 'Show revenue, customers, and growth'],
  '6-8': ['Add title "Compare" for product options', 'Insert 2 product images side by side', 'Add text box under left for features', 'Add text box under right for features'],
  '6-9': ['Add title "Features" for service offerings', 'Insert 4 shapes in 2x2 grid', 'Add text box for each service feature', 'Label each offering clearly'],
  '6-10': ['Create title slide for marketing', 'Create content slide with 2 product images and 2 benefit shapes', 'Create summary slide', 'Review complete marketing deck'],
  
  // Level 7 - Excel & PowerPoint Integration (Business Context)
  '7-1': ['Headers and inventory data are already set up', 'The table shows items, quantities, and prices', 'This is ready for the monthly report', 'You can format it further if needed'],
  '7-2': ['Prices are in column A, taxes in column B', 'Click on C1 for the total', 'Type =A1+B1 to calculate order total', 'Copy formula down for all shopping cart items'],
  '7-3': ['Sales data is already in A1-A10', 'Create labels in A11-A14: Total, Average, Highest, Lowest', 'Add formulas in B11-B14 using SUM, AVERAGE, MAX, MIN', 'This creates the CEO dashboard'],
  '7-4': ['Product revenue table is already created', 'Select the revenue column B2:B5', 'Apply currency format', 'All monetary values now show properly for the board'],
  '7-5': ['Actual sales are in column A, targets in column B', 'Click on C1 for achievement percentage', 'Type =A1/B1 to calculate performance', 'Copy down and format as percentage for reviews'],
  '7-6': ['Department categories and amounts are entered', 'Use =SUMIF(A:A,"Sales",B:B) to sum Sales budget', 'This totals all Sales department expenses', 'Finance can see total allocation'],
  '7-7': ['2023 revenue is in column A, 2024 in column B', 'Click on C1 for the change', 'Type =B1-A1 to calculate growth', 'Copy down to see year-over-year trends'],
  '7-8': ['Employee names and scores are entered', 'In Rank column, use =RANK(B1,$B$1:$B$10)', 'Use $ for absolute references', 'This ranks employees for bonus allocation'],
  '7-9': ['Employee directory is in columns A and B', 'In D1, enter an employee ID to lookup', 'In E1, use =VLOOKUP(D1,A:B,2,FALSE)', 'This finds the employee name automatically'],
  '7-10': ['Quarterly sales data is already loaded', 'Add summary row with SUM formulas for each quarter', 'Format professionally with currency', 'This creates the executive dashboard for the board'],
};

export function HintSystem({ task, isActive, onClose }: HintSystemProps) {
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const taskKey = `${task.id}`;
  const hints = TASK_HINTS[taskKey] || [
    'Review the business scenario carefully to understand the context',
    'Look at the dataset provided to see what data you\'re working with',
    'Follow the task instructions step by step',
    'Use the tutorial button if you need more detailed guidance'
  ];

  useEffect(() => {
    if (isActive) {
      setCurrentHintIndex(0);
    }
  }, [isActive, task.id]);

  const handleNextHint = () => {
    if (currentHintIndex < hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
    }
  };

  const handlePreviousHint = () => {
    if (currentHintIndex > 0) {
      setCurrentHintIndex(currentHintIndex - 1);
    }
  };

  return (
    <Dialog open={isActive} onOpenChange={onClose}>
      <DialogContent className="border-2 border-primary/50 bg-black/95 shadow-glow-intense max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-red-100">
            <Lightbulb className="h-6 w-6 text-primary animate-pulse" />
            Business Context Hint
          </DialogTitle>
          <DialogDescription className="text-red-300">
            Here's guidance to help you solve this business problem
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="rounded-lg bg-primary/10 border-2 border-primary/30 p-4 min-h-[120px] flex items-center">
            <p className="text-red-100 text-base leading-relaxed">
              💡 {hints[currentHintIndex]}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <Button
              onClick={handlePreviousHint}
              disabled={currentHintIndex === 0}
              variant="outline"
              size="sm"
              className="border-primary/50 text-red-300 hover:bg-primary/20"
            >
              ← Previous
            </Button>
            
            <span className="text-sm text-red-400">
              Hint {currentHintIndex + 1} of {hints.length}
            </span>
            
            <Button
              onClick={handleNextHint}
              disabled={currentHintIndex === hints.length - 1}
              variant="outline"
              size="sm"
              className="border-primary/50 text-red-300 hover:bg-primary/20"
            >
              Next →
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={onClose}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Got it! Let me try
            </Button>
          </div>

          <p className="text-xs text-red-400 text-center">
            Hints don't affect your score or attempts
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
