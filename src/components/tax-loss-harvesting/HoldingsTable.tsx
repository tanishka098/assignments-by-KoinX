
import { useState, useEffect } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Holding } from "@/services/mockApi";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowDown, ArrowUp, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface HoldingsTableProps {
  holdings: Holding[];
  onSelectHolding: (holding: Holding, isSelected: boolean) => void;
  onSelectAll: (isSelected: boolean) => void;
  onSelectShortTerm?: (holding: Holding) => void;
}

const HoldingsTable = ({ 
  holdings, 
  onSelectHolding, 
  onSelectAll, 
  onSelectShortTerm 
}: HoldingsTableProps) => {
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [sortedHoldings, setSortedHoldings] = useState<Holding[]>(holdings);
  const [showAllHoldings, setShowAllHoldings] = useState(false);
  const isMobile = useIsMobile();
  
  // Update sorted holdings and selection state when holdings change
  useEffect(() => {
    // Apply current sort if it exists
    if (sortDirection) {
      const sorted = [...holdings].sort((a, b) => {
        if (sortDirection === 'asc') {
          return a.stcg.gain - b.stcg.gain;
        } else {
          return b.stcg.gain - a.stcg.gain;
        }
      });
      setSortedHoldings(sorted);
    } else {
      setSortedHoldings([...holdings]);
    }
    
    // Check if all holdings are selected or none
    const allSelected = holdings.length > 0 && holdings.every(h => h.selected);
    setSelectAllChecked(allSelected);
  }, [holdings, sortDirection]);

  // Format currency with dollar sign
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Format for tooltip - more human readable with words
  const formatReadableCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$ ${(amount / 1000000).toFixed(2)} Million`;
    } else if (amount >= 1000) {
      return `$ ${(amount / 1000).toFixed(2)} Thousand`;
    } else {
      return `$ ${amount.toFixed(2)}`;
    }
  };

  const handleSelectAll = () => {
    const newValue = !selectAllChecked;
    setSelectAllChecked(newValue);
    onSelectAll(newValue);
  };

  const handleSelectHolding = (holding: Holding, isSelected: boolean) => {
    onSelectHolding(holding, isSelected);
  };

  const handleSort = () => {
    let newDirection: 'asc' | 'desc' | null;
    
    if (sortDirection === null) {
      newDirection = 'asc';
    } else if (sortDirection === 'asc') {
      newDirection = 'desc';
    } else {
      newDirection = null;
    }
    
    setSortDirection(newDirection);
    
    if (newDirection === null) {
      // Reset to original order
      setSortedHoldings([...holdings]);
    } else {
      const sorted = [...holdings].sort((a, b) => {
        if (newDirection === 'asc') {
          return a.stcg.gain - b.stcg.gain;
        } else {
          return b.stcg.gain - a.stcg.gain;
        }
      });
      setSortedHoldings(sorted);
    }
  };

  const handleShortTermClick = (holding: Holding) => {
    if (onSelectShortTerm) {
      onSelectShortTerm(holding);
    }
  };

  const toggleShowAllHoldings = () => {
    setShowAllHoldings(prev => !prev);
  };

  // Display only top 5 holdings if showAllHoldings is false
  const displayedHoldings = showAllHoldings ? sortedHoldings : sortedHoldings.slice(0, 5);

  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Holdings</h2>
      </div>
      <Table className="border-separate border-spacing-0 rounded-lg">
        <TableHeader className="bg-gray-100 rounded-t-lg">
          <TableRow className="border-none">
            <TableHead className="w-12 rounded-tl-lg">
              <Checkbox 
                checked={selectAllChecked}
                onCheckedChange={handleSelectAll}
                aria-label="Select all holdings"
              />
            </TableHead>
            <TableHead className="font-medium text-gray-700">Asset</TableHead>
            <TableHead className="text-center font-medium text-gray-700">
              <div>Holdings</div>
              <div className="text-xs text-gray-500">Current Market Rate</div>
            </TableHead>
            <TableHead className="text-center font-medium text-gray-700">Total Current Value</TableHead>
            <TableHead 
              className="text-center font-medium text-gray-700 cursor-pointer"
              onClick={handleSort}
            >
              <div className="flex items-center justify-center gap-1">
                Short-term
                {sortDirection === 'asc' && <ArrowUp className="h-4 w-4" />}
                {sortDirection === 'desc' && <ArrowDown className="h-4 w-4" />}
              </div>
            </TableHead>
            <TableHead className="text-center font-medium text-gray-700 rounded-tr-lg">Long-Term</TableHead>
            <TableHead className="text-center font-medium text-gray-700">Amount to Sell</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedHoldings.map((holding, index) => (
            <TableRow key={`${holding.coin}-${index}`} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <TableCell className="border-t border-gray-200">
                <Checkbox 
                  checked={holding.selected}
                  onCheckedChange={(checked) => 
                    handleSelectHolding(holding, checked === true)
                  }
                  aria-label={`Select ${holding.coin}`}
                />
              </TableCell>
              <TableCell className="border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <img 
                    src={holding.logo} 
                    alt={holding.coin} 
                    className="w-8 h-8 rounded-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg";
                    }}
                  />
                  <div>
                    <p className="font-medium">{holding.coin}</p>
                    <p className="text-xs text-gray-500">{holding.coinName}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-center border-t border-gray-200">
                <div>{holding.totalHolding.toFixed(4)} {holding.coin}</div>
                <div className="text-xs text-gray-500">$ {holding.averageBuyPrice.toFixed(2)}/{holding.coin}</div>
              </TableCell>
              <TableCell className="text-center border-t border-gray-200">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="cursor-help">
                      {formatCurrency(holding.totalHolding * holding.currentPrice)}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    {formatReadableCurrency(holding.totalHolding * holding.currentPrice)}
                  </TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell 
                className="text-center border-t border-gray-200"
                onClick={() => handleShortTermClick(holding)} 
              >
                <div 
                  className={`${holding.stcg.gain < 0 ? "text-[#ea384c]" : "text-green-500"} cursor-pointer hover:underline`}
                >
                  {holding.stcg.gain < 0 ? "-" : "+"}{formatCurrency(Math.abs(holding.stcg.gain))}
                </div>
                <div className="text-xs text-gray-500">{holding.stcg.balance.toFixed(4)} {holding.coin}</div>
              </TableCell>
              <TableCell className="text-center border-t border-gray-200">
                <div className={`${holding.ltcg.gain < 0 ? "text-[#ea384c]" : "text-green-500"}`}>
                  {holding.ltcg.gain < 0 ? "-" : "+"}{formatCurrency(Math.abs(holding.ltcg.gain))}
                </div>
                <div className="text-xs text-gray-500">{holding.ltcg.balance.toFixed(4)} {holding.coin}</div>
              </TableCell>
              <TableCell className="text-center border-t border-gray-200">
                {holding.selected ? (
                  <div>{holding.totalHolding.toFixed(4)} {holding.coin}</div>
                ) : (
                  <div>-</div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex justify-end">
        <Button 
          variant="ghost" 
          className="text-blue-600 font-medium flex items-center gap-1"
          onClick={toggleShowAllHoldings}
        >
          {showAllHoldings ? 'Show Less' : 'View All'}
          {!showAllHoldings && <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default HoldingsTable;
