import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DollarSign, Percent, Hash, Type } from 'lucide-react';
import type { ValidationCriteria } from '../data/levels';

interface ExcelSimulationProps {
  validationCriteria: ValidationCriteria;
  onValidate: (isValid: boolean) => void;
  taskId: number;
  levelNumber: number;
}

interface CellData {
  value: string;
  formula?: string;
  format?: 'text' | 'number' | 'currency' | 'percentage';
}

// Preloaded datasets for different tasks
const PRELOADED_DATASETS: { [key: string]: { [key: string]: CellData } } = {
  // Level 1 - Excel Basics
  '1-2': { A1: { value: '10' }, A2: { value: '20' }, A3: { value: '30' }, A4: { value: '15' }, A5: { value: '25' } },
  '1-3': { B1: { value: '85' }, B2: { value: '92' }, B3: { value: '78' }, B4: { value: '88' } },
  '1-6': { D1: { value: '15' } },
  '1-7': { E1: { value: '10' }, E2: { value: '25' }, E3: { value: '30' }, E4: { value: '45' }, E5: { value: '12' }, E6: { value: '8' } },
  '1-8': { F1: { value: '45' }, F2: { value: '12' }, F3: { value: '89' }, F4: { value: '23' }, F5: { value: '67' } },
  '1-10': { H1: { value: '10' } },
  
  // Level 3 - Advanced Excel Formulas
  '3-1': { A1: { value: 'Hello' }, B1: { value: 'World' } },
  '3-2': { A1: { value: 'Yes' }, A2: { value: 'Yes' }, A3: { value: 'Yes' }, A4: { value: 'No' }, A5: { value: 'No' } },
  '3-3': { B1: { value: '5' }, B2: { value: '15' }, B3: { value: '25' }, B4: { value: '8' }, B5: { value: '50' } },
  '3-4': { C1: { value: '1234.56' } },
  '3-6': { E1: { value: 'Excel2024' } },
  '3-8': { G1: { value: '15' } },
  '3-9': { H1: { value: 'hello world' } },
  
  // Level 5 - Excel Data Analysis
  '5-1': { A1: { value: 'Name' }, B1: { value: 'Score' }, A2: { value: 'John' }, B2: { value: '85' }, A3: { value: 'Sarah' }, B3: { value: '92' }, A4: { value: 'Mike' }, B4: { value: '78' } },
  '5-2': { A1: { value: '5' }, A2: { value: '2' }, A3: { value: '8' }, A4: { value: '1' }, A5: { value: '9' } },
  '5-3': { B1: { value: '25' }, B2: { value: '60' }, B3: { value: '45' }, B4: { value: '80' }, B5: { value: '30' } },
  '5-4': { C1: { value: '45' }, C2: { value: '12' }, C3: { value: '89' }, C4: { value: '23' }, C5: { value: '67' }, C6: { value: '34' } },
  '5-6': { E1: { value: '3.14159' } },
  '5-7': { F1: { value: 'Apple' }, F2: { value: '100' }, F3: { value: 'Banana' }, F4: { value: '200' }, F5: { value: 'Cherry' }, F6: { value: '150' }, F7: { value: 'Date' }, F8: { value: '75' } },
  '5-8': { G1: { value: '80' }, G2: { value: '100' } },
  '5-9': { H1: { value: '12' }, H2: { value: '45' }, H3: { value: '23' }, H4: { value: '67' }, H5: { value: '34' }, H6: { value: '89' }, H7: { value: '56' } },
  '5-10': { I1: { value: '10' }, I2: { value: '20' }, I3: { value: '30' }, I4: { value: '15' }, I5: { value: '25' }, I6: { value: '35' }, I7: { value: '40' }, I8: { value: '18' }, I9: { value: '22' }, I10: { value: '28' } },
  
  // Level 7 - Excel & PowerPoint Integration
  '7-1': { A1: { value: 'Item' }, B1: { value: 'Quantity' }, C1: { value: 'Price' }, A2: { value: 'Laptop' }, B2: { value: '5' }, C2: { value: '1200' }, A3: { value: 'Mouse' }, B3: { value: '20' }, C3: { value: '25' } },
  '7-2': { A1: { value: '100' }, A2: { value: '150' }, A3: { value: '200' }, B1: { value: '10' }, B2: { value: '15' }, B3: { value: '20' } },
  '7-3': { A1: { value: '45' }, A2: { value: '67' }, A3: { value: '89' }, A4: { value: '23' }, A5: { value: '56' }, A6: { value: '78' }, A7: { value: '34' }, A8: { value: '90' }, A9: { value: '12' }, A10: { value: '65' } },
  '7-4': { A1: { value: 'Product' }, B1: { value: 'Price' }, A2: { value: 'Laptop' }, B2: { value: '1200' }, A3: { value: 'Phone' }, B3: { value: '800' }, A4: { value: 'Tablet' }, B4: { value: '500' }, A5: { value: 'Monitor' }, B5: { value: '300' } },
  '7-5': { A1: { value: '8500' }, A2: { value: '9200' }, A3: { value: '7800' }, A4: { value: '10500' }, B1: { value: '10000' }, B2: { value: '10000' }, B3: { value: '10000' }, B4: { value: '10000' } },
  '7-6': { A1: { value: 'Category' }, B1: { value: 'Amount' }, A2: { value: 'Sales' }, B2: { value: '5000' }, A3: { value: 'Marketing' }, B3: { value: '2000' }, A4: { value: 'Sales' }, B4: { value: '3000' }, A5: { value: 'Operations' }, B5: { value: '4000' } },
  '7-7': { A1: { value: '2023' }, B1: { value: '2024' }, A2: { value: '5000' }, B2: { value: '6500' }, A3: { value: '4500' }, B3: { value: '5200' }, A4: { value: '7000' }, B4: { value: '8100' } },
  '7-8': { A1: { value: 'Name' }, B1: { value: 'Score' }, A2: { value: 'Alice' }, B2: { value: '95' }, A3: { value: 'Bob' }, B3: { value: '87' }, A4: { value: 'Charlie' }, B4: { value: '92' }, A5: { value: 'Diana' }, B5: { value: '88' } },
  '7-9': { A1: { value: 'ID' }, B1: { value: 'Name' }, A2: { value: '101' }, B2: { value: 'Alice' }, A3: { value: '102' }, B3: { value: 'Bob' }, A4: { value: '103' }, B4: { value: 'Charlie' } },
  '7-10': { A1: { value: 'Product' }, B1: { value: 'Q1' }, C1: { value: 'Q2' }, D1: { value: 'Q3' }, A2: { value: 'Laptops' }, B2: { value: '1200' }, C2: { value: '1500' }, D2: { value: '1800' }, A3: { value: 'Phones' }, B3: { value: '800' }, C3: { value: '950' }, D3: { value: '1100' }, A4: { value: 'Tablets' }, B4: { value: '500' }, C4: { value: '600' }, D4: { value: '700' }, A5: { value: 'Monitors' }, B5: { value: '300' }, C5: { value: '350' }, D5: { value: '400' } },
};

export function ExcelSimulation({ validationCriteria, onValidate, taskId, levelNumber }: ExcelSimulationProps) {
  const [cells, setCells] = useState<{ [key: string]: CellData }>({});
  const [selectedCell, setSelectedCell] = useState<string>('A1');
  const [formulaBar, setFormulaBar] = useState('');

  const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Load preloaded dataset when task changes
  useEffect(() => {
    const datasetKey = `${levelNumber}-${taskId}`;
    const preloadedData = PRELOADED_DATASETS[datasetKey];
    if (preloadedData) {
      setCells(preloadedData);
    } else {
      setCells({});
    }
    setSelectedCell('A1');
  }, [taskId, levelNumber]);

  useEffect(() => {
    const cell = cells[selectedCell];
    setFormulaBar(cell?.formula || cell?.value || '');
  }, [selectedCell, cells]);

  // Validate whenever cells change
  useEffect(() => {
    validateTask(cells);
  }, [cells, validationCriteria]);

  const handleCellClick = (cellId: string) => {
    setSelectedCell(cellId);
  };

  const handleFormulaChange = (value: string) => {
    setFormulaBar(value);
  };

  const handleFormulaSubmit = () => {
    const newCells = { ...cells };
    
    if (formulaBar.startsWith('=')) {
      // It's a formula
      newCells[selectedCell] = {
        value: evaluateFormula(formulaBar, cells),
        formula: formulaBar,
        format: cells[selectedCell]?.format || 'text'
      };
    } else {
      // It's a value
      newCells[selectedCell] = {
        value: formulaBar,
        format: cells[selectedCell]?.format || 'text'
      };
    }
    
    setCells(newCells);
  };

  const evaluateFormula = (formula: string, cellData: { [key: string]: CellData }): string => {
    try {
      let expression = formula.substring(1).toUpperCase();
      
      // Handle SUM function
      if (expression.includes('SUM')) {
        const match = expression.match(/SUM\(([A-Z]\d+):([A-Z]\d+)\)/);
        if (match) {
          const [, start, end] = match;
          const sum = calculateRangeSum(start, end, cellData);
          return sum.toString();
        }
      }
      
      // Handle AVERAGE function
      if (expression.includes('AVERAGE')) {
        const match = expression.match(/AVERAGE\(([A-Z]\d+):([A-Z]\d+)\)/);
        if (match) {
          const [, start, end] = match;
          const avg = calculateRangeAverage(start, end, cellData);
          return avg.toString();
        }
      }
      
      // Handle COUNT function
      if (expression.includes('COUNT')) {
        const match = expression.match(/COUNT\(([A-Z]\d+):([A-Z]\d+)\)/);
        if (match) {
          const [, start, end] = match;
          const count = calculateRangeCount(start, end, cellData);
          return count.toString();
        }
      }
      
      // Handle MAX function
      if (expression.includes('MAX')) {
        const match = expression.match(/MAX\(([A-Z]\d+):([A-Z]\d+)\)/);
        if (match) {
          const [, start, end] = match;
          const max = calculateRangeMax(start, end, cellData);
          return max.toString();
        }
      }
      
      // Handle MIN function
      if (expression.includes('MIN')) {
        const match = expression.match(/MIN\(([A-Z]\d+):([A-Z]\d+)\)/);
        if (match) {
          const [, start, end] = match;
          const min = calculateRangeMin(start, end, cellData);
          return min.toString();
        }
      }
      
      // Handle IF function
      if (expression.includes('IF')) {
        const match = expression.match(/IF\(([^,]+),([^,]+),([^)]+)\)/);
        if (match) {
          const [, condition, trueVal, falseVal] = match;
          const result = evaluateCondition(condition, cellData);
          return result ? trueVal.replace(/"/g, '') : falseVal.replace(/"/g, '');
        }
      }
      
      // Handle COUNTIF function
      if (expression.includes('COUNTIF')) {
        const match = expression.match(/COUNTIF\(([A-Z]\d+):([A-Z]\d+),([^)]+)\)/);
        if (match) {
          const [, start, end, criteria] = match;
          const count = calculateCountIf(start, end, criteria.replace(/"/g, ''), cellData);
          return count.toString();
        }
      }
      
      // Handle SUMIF function
      if (expression.includes('SUMIF')) {
        const match = expression.match(/SUMIF\(([A-Z]\d+):([A-Z]\d+),([^)]+)\)/);
        if (match) {
          const [, start, end, criteria] = match;
          const sum = calculateSumIf(start, end, criteria.replace(/"/g, ''), cellData);
          return sum.toString();
        }
      }
      
      // Handle CONCATENATE function
      if (expression.includes('CONCATENATE')) {
        const match = expression.match(/CONCATENATE\(([^)]+)\)/);
        if (match) {
          const args = match[1].split(',').map(arg => {
            arg = arg.trim();
            if (arg.startsWith('"')) return arg.replace(/"/g, '');
            return cellData[arg]?.value || '';
          });
          return args.join('');
        }
      }
      
      // Handle LEFT function
      if (expression.includes('LEFT')) {
        const match = expression.match(/LEFT\(([A-Z]\d+),(\d+)\)/);
        if (match) {
          const [, cell, length] = match;
          const value = cellData[cell]?.value || '';
          return value.substring(0, parseInt(length));
        }
      }
      
      // Handle UPPER function
      if (expression.includes('UPPER')) {
        const match = expression.match(/UPPER\(([A-Z]\d+)\)/);
        if (match) {
          const cell = match[1];
          return (cellData[cell]?.value || '').toUpperCase();
        }
      }
      
      // Handle LEN function
      if (expression.includes('LEN')) {
        const match = expression.match(/LEN\(([A-Z]\d+)\)/);
        if (match) {
          const cell = match[1];
          return (cellData[cell]?.value || '').length.toString();
        }
      }
      
      // Handle TODAY function
      if (expression.includes('TODAY()')) {
        return new Date().toLocaleDateString();
      }
      
      // Handle ROUND function
      if (expression.includes('ROUND')) {
        const match = expression.match(/ROUND\(([A-Z]\d+),(\d+)\)/);
        if (match) {
          const [, cell, decimals] = match;
          const value = parseFloat(cellData[cell]?.value || '0');
          return value.toFixed(parseInt(decimals));
        }
      }
      
      // Handle MEDIAN function
      if (expression.includes('MEDIAN')) {
        const match = expression.match(/MEDIAN\(([A-Z]\d+):([A-Z]\d+)\)/);
        if (match) {
          const [, start, end] = match;
          const median = calculateRangeMedian(start, end, cellData);
          return median.toString();
        }
      }
      
      // Handle COUNTA function
      if (expression.includes('COUNTA')) {
        const match = expression.match(/COUNTA\(([A-Z]\d+):([A-Z]\d+)\)/);
        if (match) {
          const [, start, end] = match;
          const count = calculateRangeCountA(start, end, cellData);
          return count.toString();
        }
      }
      
      // Handle TEXT function
      if (expression.includes('TEXT')) {
        const match = expression.match(/TEXT\(([A-Z]\d+),([^)]+)\)/);
        if (match) {
          const [, cell, format] = match;
          const value = parseFloat(cellData[cell]?.value || '0');
          if (format.includes('$')) {
            return '$' + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          }
          return value.toString();
        }
      }
      
      // Handle IFERROR function
      if (expression.includes('IFERROR')) {
        const match = expression.match(/IFERROR\(([^,]+),([^)]+)\)/);
        if (match) {
          const [, formula, errorValue] = match;
          try {
            return evaluateFormula('=' + formula, cellData);
          } catch {
            return errorValue.replace(/"/g, '');
          }
        }
      }
      
      // Handle simple cell references
      const cellMatch = expression.match(/^([A-Z]\d+)$/);
      if (cellMatch) {
        return cellData[cellMatch[1]]?.value || '0';
      }
      
      // Handle simple arithmetic with cell references
      let evalExpression = expression;
      Object.keys(cellData).forEach(cellId => {
        const regex = new RegExp(`\\$?${cellId}`, 'g');
        evalExpression = evalExpression.replace(regex, cellData[cellId]?.value || '0');
      });
      
      // Evaluate the expression
      const result = Function('"use strict"; return (' + evalExpression + ')')();
      return result.toString();
    } catch (error) {
      return '#ERROR';
    }
  };

  const calculateRangeSum = (start: string, end: string, cellData: { [key: string]: CellData }): number => {
    const values = getRangeValues(start, end, cellData);
    return values.reduce((sum, val) => sum + val, 0);
  };

  const calculateRangeAverage = (start: string, end: string, cellData: { [key: string]: CellData }): number => {
    const values = getRangeValues(start, end, cellData);
    return values.length > 0 ? values.reduce((sum, val) => sum + val, 0) / values.length : 0;
  };

  const calculateRangeCount = (start: string, end: string, cellData: { [key: string]: CellData }): number => {
    const values = getRangeValues(start, end, cellData);
    return values.length;
  };

  const calculateRangeMax = (start: string, end: string, cellData: { [key: string]: CellData }): number => {
    const values = getRangeValues(start, end, cellData);
    return values.length > 0 ? Math.max(...values) : 0;
  };

  const calculateRangeMin = (start: string, end: string, cellData: { [key: string]: CellData }): number => {
    const values = getRangeValues(start, end, cellData);
    return values.length > 0 ? Math.min(...values) : 0;
  };

  const calculateRangeMedian = (start: string, end: string, cellData: { [key: string]: CellData }): number => {
    const values = getRangeValues(start, end, cellData).sort((a, b) => a - b);
    if (values.length === 0) return 0;
    const mid = Math.floor(values.length / 2);
    return values.length % 2 === 0 ? (values[mid - 1] + values[mid]) / 2 : values[mid];
  };

  const calculateRangeCountA = (start: string, end: string, cellData: { [key: string]: CellData }): number => {
    const cells = getRangeCells(start, end);
    return cells.filter(cellId => cellData[cellId]?.value).length;
  };

  const calculateCountIf = (start: string, end: string, criteria: string, cellData: { [key: string]: CellData }): number => {
    const cells = getRangeCells(start, end);
    return cells.filter(cellId => cellData[cellId]?.value === criteria).length;
  };

  const calculateSumIf = (start: string, end: string, criteria: string, cellData: { [key: string]: CellData }): number => {
    const cells = getRangeCells(start, end);
    return cells
      .filter(cellId => {
        const value = cellData[cellId]?.value || '';
        if (criteria.startsWith('>')) {
          return parseFloat(value) > parseFloat(criteria.substring(1));
        }
        return value === criteria;
      })
      .reduce((sum, cellId) => sum + (parseFloat(cellData[cellId]?.value) || 0), 0);
  };

  const getRangeValues = (start: string, end: string, cellData: { [key: string]: CellData }): number[] => {
    const cells = getRangeCells(start, end);
    return cells
      .map(cellId => parseFloat(cellData[cellId]?.value || '0'))
      .filter(val => !isNaN(val));
  };

  const getRangeCells = (start: string, end: string): string[] => {
    const startCol = start.charAt(0);
    const startRow = parseInt(start.substring(1));
    const endCol = end.charAt(0);
    const endRow = parseInt(end.substring(1));
    
    const cells: string[] = [];
    for (let col = startCol.charCodeAt(0); col <= endCol.charCodeAt(0); col++) {
      for (let row = startRow; row <= endRow; row++) {
        cells.push(String.fromCharCode(col) + row);
      }
    }
    return cells;
  };

  const evaluateCondition = (condition: string, cellData: { [key: string]: CellData }): boolean => {
    let evalCondition = condition;
    Object.keys(cellData).forEach(cellId => {
      evalCondition = evalCondition.replace(cellId, cellData[cellId]?.value || '0');
    });
    try {
      return Function('"use strict"; return (' + evalCondition + ')')();
    } catch {
      return false;
    }
  };

  const validateTask = (cellData: { [key: string]: CellData }) => {
    let isValid = false;

    // Validate formula
    if (validationCriteria.expectedFormula) {
      const targetCell = validationCriteria.expectedCellValue?.cell || selectedCell;
      const cellFormula = cellData[targetCell]?.formula?.toUpperCase().replace(/\s/g, '');
      const expectedFormula = validationCriteria.expectedFormula.toUpperCase().replace(/\s/g, '');
      isValid = cellFormula === expectedFormula;
    }

    // Validate cell value
    if (validationCriteria.expectedCellValue && !validationCriteria.expectedFormula) {
      const { cell, value } = validationCriteria.expectedCellValue;
      isValid = cellData[cell]?.value === value.toString();
    }

    // Validate formatting
    if (validationCriteria.expectedFormatting) {
      const { cell, format } = validationCriteria.expectedFormatting;
      isValid = cellData[cell]?.format === format;
    }

    onValidate(isValid);
  };

  const applyFormat = (format: 'currency' | 'percentage' | 'number' | 'text') => {
    const newCells = { ...cells };
    newCells[selectedCell] = {
      ...newCells[selectedCell],
      value: newCells[selectedCell]?.value || '',
      format
    };
    setCells(newCells);
  };

  const formatCellValue = (cellId: string): string => {
    const cell = cells[cellId];
    if (!cell) return '';
    
    const value = cell.value;
    switch (cell.format) {
      case 'currency':
        return '$' + parseFloat(value || '0').toFixed(2);
      case 'percentage':
        return (parseFloat(value || '0') * 100).toFixed(2) + '%';
      case 'number':
        return parseFloat(value || '0').toFixed(2);
      default:
        return value;
    }
  };

  return (
    <Card className="border-2 border-primary/50 bg-black/60 shadow-glow">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-transparent border-b border-primary/30">
        <CardTitle className="text-red-100">Excel Simulation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        {/* Formula Bar */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-red-300 w-12">{selectedCell}</span>
            <Input
              value={formulaBar}
              onChange={(e) => handleFormulaChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleFormulaSubmit()}
              placeholder="Enter value or formula (=SUM(A1:A5))"
              className="flex-1 bg-black/60 border-primary/50 text-red-100"
            />
            <Button
              onClick={handleFormulaSubmit}
              size="sm"
              className="bg-primary hover:bg-primary/90"
            >
              Enter
            </Button>
          </div>
          
          {/* Format Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={() => applyFormat('currency')}
              size="sm"
              variant="outline"
              className="border-primary/50 text-red-300 hover:bg-primary/20"
            >
              <DollarSign className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => applyFormat('percentage')}
              size="sm"
              variant="outline"
              className="border-primary/50 text-red-300 hover:bg-primary/20"
            >
              <Percent className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => applyFormat('number')}
              size="sm"
              variant="outline"
              className="border-primary/50 text-red-300 hover:bg-primary/20"
            >
              <Hash className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => applyFormat('text')}
              size="sm"
              variant="outline"
              className="border-primary/50 text-red-300 hover:bg-primary/20"
            >
              <Type className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Spreadsheet Grid */}
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            <div className="grid grid-cols-[40px_repeat(9,80px)] gap-0 border-2 border-primary/30">
              {/* Header Row */}
              <div className="bg-gray-800 border border-gray-700" />
              {columns.map(col => (
                <div
                  key={col}
                  className="bg-gray-800 border border-gray-700 text-center py-1 text-sm font-bold text-red-300"
                >
                  {col}
                </div>
              ))}
              
              {/* Data Rows */}
              {rows.map(row => (
                <>
                  <div
                    key={`row-${row}`}
                    className="bg-gray-800 border border-gray-700 text-center py-1 text-sm font-bold text-red-300"
                  >
                    {row}
                  </div>
                  {columns.map(col => {
                    const cellId = `${col}${row}`;
                    const isSelected = cellId === selectedCell;
                    return (
                      <div
                        key={cellId}
                        onClick={() => handleCellClick(cellId)}
                        className={`border border-gray-700 p-1 text-sm cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-primary/30 border-primary shadow-glow'
                            : 'bg-black/40 hover:bg-gray-900/50'
                        }`}
                      >
                        <div className="text-red-100 truncate">
                          {formatCellValue(cellId)}
                        </div>
                      </div>
                    );
                  })}
                </>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
