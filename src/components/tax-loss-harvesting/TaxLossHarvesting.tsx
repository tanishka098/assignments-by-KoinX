
import { useEffect, useState } from "react";
import { 
  CapitalGainsResponse, 
  Holding, 
  fetchCapitalGains, 
  fetchHoldings 
} from "@/services/mockApi";
import { Card } from "@/components/ui/card";
import HarvestingCards from "./HarvestingCards";
import HoldingsTable from "./HoldingsTable";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "./Header";
import { useToast } from "@/hooks/use-toast";

export const TaxLossHarvesting = () => {
  const [capitalGains, setCapitalGains] = useState<CapitalGainsResponse | null>(null);
  const [holdings, setHoldings] = useState<Holding[] | null>(null);
  const [selectedHoldings, setSelectedHoldings] = useState<Holding[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [afterHarvestingGains, setAfterHarvestingGains] = useState<CapitalGainsResponse | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [gainsData, holdingsData] = await Promise.all([
          fetchCapitalGains(),
          fetchHoldings()
        ]);
        setCapitalGains(gainsData);
        setAfterHarvestingGains(gainsData);
        setHoldings(holdingsData.map(holding => ({ ...holding, selected: false })));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleHoldingSelection = (holding: Holding, isSelected: boolean) => {
    // Update holdings list with selection status
    if (holdings) {
      const updatedHoldings = holdings.map(h => 
        h.coin === holding.coin ? { ...h, selected: isSelected } : h
      );
      setHoldings(updatedHoldings);
      
      // Update selected holdings list
      let newSelectedHoldings;
      if (isSelected) {
        newSelectedHoldings = [...selectedHoldings, holding];
      } else {
        newSelectedHoldings = selectedHoldings.filter(h => h.coin !== holding.coin);
      }
      setSelectedHoldings(newSelectedHoldings);
      
      // Calculate new capital gains after harvesting
      if (capitalGains) {
        recalculateAfterHarvesting(newSelectedHoldings);
      }
    }
  };

  const handleSelectAll = (isSelected: boolean) => {
    if (holdings) {
      const updatedHoldings = holdings.map(h => ({ ...h, selected: isSelected }));
      setHoldings(updatedHoldings);
      
      const newSelectedHoldings = isSelected ? [...updatedHoldings] : [];
      setSelectedHoldings(newSelectedHoldings);

      if (capitalGains) {
        recalculateAfterHarvesting(newSelectedHoldings);
      }
    }
  };

  const handleShortTermSelection = (holding: Holding) => {
    if (!capitalGains) return;

    // Create a deep copy of the original capital gains for the "After Harvesting" section
    const updatedGains = {
      capitalGains: {
        stcg: {
          profits: capitalGains.capitalGains.stcg.profits,
          losses: capitalGains.capitalGains.stcg.losses
        },
        ltcg: {
          profits: capitalGains.capitalGains.ltcg.profits,
          losses: capitalGains.capitalGains.ltcg.losses
        }
      }
    };

    // Update the short-term capital gains based on the clicked value
    if (holding.stcg.gain > 0) {
      updatedGains.capitalGains.stcg.profits += holding.stcg.gain;
      toast({
        title: "Profit Added",
        description: `Added ${holding.coin} profit of $${Math.abs(holding.stcg.gain).toFixed(2)} to short-term gains`,
      });
    } else if (holding.stcg.gain < 0) {
      updatedGains.capitalGains.stcg.losses += Math.abs(holding.stcg.gain);
      toast({
        title: "Loss Added",
        description: `Added ${holding.coin} loss of $${Math.abs(holding.stcg.gain).toFixed(2)} to short-term losses`,
      });
    }

    setAfterHarvestingGains(updatedGains);
  };

  const recalculateAfterHarvesting = (selectedHoldings: Holding[]) => {
    if (!capitalGains) return;

    // Start with the original capital gains values (important to reset)
    const updatedGains = {
      capitalGains: {
        stcg: {
          profits: capitalGains.capitalGains.stcg.profits,
          losses: capitalGains.capitalGains.stcg.losses
        },
        ltcg: {
          profits: capitalGains.capitalGains.ltcg.profits,
          losses: capitalGains.capitalGains.ltcg.losses
        }
      }
    };

    // Process each selected holding and update the calculations
    selectedHoldings.forEach(holding => {
      // Short-term capital gains/losses
      if (holding.stcg.gain > 0) {
        updatedGains.capitalGains.stcg.profits += holding.stcg.gain;
      } else if (holding.stcg.gain < 0) {
        // For losses, we add the absolute value to the losses field
        updatedGains.capitalGains.stcg.losses += Math.abs(holding.stcg.gain);
      }

      // Long-term capital gains/losses
      if (holding.ltcg.gain > 0) {
        updatedGains.capitalGains.ltcg.profits += holding.ltcg.gain;
      } else if (holding.ltcg.gain < 0) {
        // For losses, we add the absolute value to the losses field
        updatedGains.capitalGains.ltcg.losses += Math.abs(holding.ltcg.gain);
      }
    });

    setAfterHarvestingGains(updatedGains);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 px-4">
        <Skeleton className="h-12 w-32 mb-6" />
        <Skeleton className="h-[200px] w-full mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[300px] w-full" />
        </div>
        <Skeleton className="h-[500px] w-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 bg-gray-50 min-h-screen">
      <Header />
      
      <div className="mt-8">
        {capitalGains && afterHarvestingGains && (
          <HarvestingCards 
            preHarvesting={capitalGains} 
            afterHarvesting={afterHarvestingGains} 
          />
        )}
      </div>
      
      <div className="mt-8">
        <Card className="bg-white p-6">
          {holdings && (
            <HoldingsTable 
              holdings={holdings} 
              onSelectHolding={handleHoldingSelection} 
              onSelectAll={handleSelectAll}
              onSelectShortTerm={handleShortTermSelection}
            />
          )}
        </Card>
      </div>
    </div>
  );
};
