
// import { Card } from "@/components/ui/card";
// import { CapitalGainsResponse } from "@/services/mockApi";

// interface HarvestingCardsProps {
//   preHarvesting: CapitalGainsResponse;
//   afterHarvesting: CapitalGainsResponse;
// }

// const HarvestingCards = ({ preHarvesting, afterHarvesting }: HarvestingCardsProps) => {
//   // Format currency with dollar sign
//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       maximumFractionDigits: 0,
//     }).format(amount);
//   };

//   // Calculate pre-harvesting data
//   const preHarvestData = {
//     stcg: {
//       profits: preHarvesting.capitalGains.stcg.profits,
//       losses: preHarvesting.capitalGains.stcg.losses,
//       net: preHarvesting.capitalGains.stcg.profits - preHarvesting.capitalGains.stcg.losses
//     },
//     ltcg: {
//       profits: preHarvesting.capitalGains.ltcg.profits,
//       losses: preHarvesting.capitalGains.ltcg.losses,
//       net: preHarvesting.capitalGains.ltcg.profits - preHarvesting.capitalGains.ltcg.losses
//     }
//   };
  
//   // Calculate total for pre-harvesting
//   const preHarvestTotal = preHarvestData.stcg.net + preHarvestData.ltcg.net;

//   // Calculate after-harvesting data
//   const afterHarvestData = {
//     stcg: {
//       profits: afterHarvesting.capitalGains.stcg.profits,
//       losses: afterHarvesting.capitalGains.stcg.losses,
//       net: afterHarvesting.capitalGains.stcg.profits - afterHarvesting.capitalGains.stcg.losses
//     },
//     ltcg: {
//       profits: afterHarvesting.capitalGains.ltcg.profits,
//       losses: afterHarvesting.capitalGains.ltcg.losses,
//       net: afterHarvesting.capitalGains.ltcg.profits - afterHarvesting.capitalGains.ltcg.losses
//     }
//   };
  
//   // Calculate total for after-harvesting
//   const afterHarvestTotal = afterHarvestData.stcg.net + afterHarvestData.ltcg.net;
  
//   // Calculate savings (the difference between pre and after)
//   const savings = preHarvestTotal - afterHarvestTotal;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       {/* Pre-Harvesting Card */}
//       <Card className="p-6 rounded-lg shadow-md  bg-slate-200">
//         <div className="mb-4">
//           <h2 className="text-xl font-bold mb-1">Pre Harvesting</h2>
//         </div>

//         <div className="space-y-4">
//           <div className="grid grid-cols-3 gap-2">
//             <div></div>
//             <div className="text-center text-sm font-medium text-gray-600">Short-term</div>
//             <div className="text-center text-sm font-medium text-gray-600">Long-term</div>
//           </div>

//           {/* Profits */}
//           <div className="grid grid-cols-3 gap-2 py-2 border-b border-gray-100">
//             <div className="font-medium text-gray-800">Profits</div>
//             <div className="text-center text-green-500">{formatCurrency(preHarvestData.stcg.profits)}</div>
//             <div className="text-center text-green-500">{formatCurrency(preHarvestData.ltcg.profits)}</div>
//           </div>

//           {/* Losses */}
//           <div className="grid grid-cols-3 gap-2 py-2 border-b border-gray-100">
//             <div className="font-medium text-gray-800">Losses</div>
//             <div className="text-center text-[#ea384c]">- {formatCurrency(preHarvestData.stcg.losses)}</div>
//             <div className="text-center text-[#ea384c]">- {formatCurrency(preHarvestData.ltcg.losses)}</div>
//           </div>

//           {/* Net Capital Gains */}
//           <div className="grid grid-cols-3 gap-2 py-2">
//             <div className="font-medium text-gray-800">Net Capital Gains</div>
//             <div className={`text-center ${preHarvestData.stcg.net < 0 ? "text-[#ea384c]" : "text-green-500"}`}>
//               {preHarvestData.stcg.net < 0 ? "- " : ""}{formatCurrency(Math.abs(preHarvestData.stcg.net))}
//             </div>
//             <div className={`text-center ${preHarvestData.ltcg.net < 0 ? "text-[#ea384c]" : "text-green-500"}`}>
//               {preHarvestData.ltcg.net < 0 ? "- " : ""}{formatCurrency(Math.abs(preHarvestData.ltcg.net))}
//             </div>
//           </div>

//           {/* Realised Capital Gains */}
//           <div className="pt-4">
//             <div className="flex justify-between items-center">
//               <p className="font-medium text-gray-800">Realised Capital Gains:</p>
//               <p className={`text-xl font-bold ${preHarvestTotal < 0 ? "text-[#ea384c]" : "text-gray-900"}`}>
//                 {preHarvestTotal < 0 ? "- " : ""}{formatCurrency(Math.abs(preHarvestTotal))}
//               </p>
//             </div>
//           </div>
//         </div>
//       </Card>

//       {/* After-Harvesting Card */}
//       <Card className="p-6 rounded-lg shadow-md bg-blue-600 text-white">
//         <div className="mb-4">
//           <h2 className="text-xl font-bold mb-1">After Harvesting</h2>
//         </div>

//         <div className="space-y-4">
//           <div className="grid grid-cols-3 gap-2">
//             <div></div>
//             <div className="text-center text-sm font-medium text-blue-100">Short-term</div>
//             <div className="text-center text-sm font-medium text-blue-100">Long-term</div>
//           </div>

//           {/* Profits */}
//           <div className="grid grid-cols-3 gap-2 py-2 border-b border-blue-500">
//             <div className="font-medium">Profits</div>
//             <div className="text-center">{formatCurrency(afterHarvestData.stcg.profits)}</div>
//             <div className="text-center">{formatCurrency(afterHarvestData.ltcg.profits)}</div>
//           </div>

//           {/* Losses */}
//           <div className="grid grid-cols-3 gap-2 py-2 border-b border-blue-500">
//             <div className="font-medium">Losses</div>
//             <div className="text-center text-red-300">- {formatCurrency(afterHarvestData.stcg.losses)}</div>
//             <div className="text-center text-red-300">- {formatCurrency(afterHarvestData.ltcg.losses)}</div>
//           </div>

//           {/* Net Capital Gains */}
//           <div className="grid grid-cols-3 gap-2 py-2">
//             <div className="font-medium">Net Capital Gains</div>
//             <div className={`text-center ${afterHarvestData.stcg.net < 0 ? "text-red-300" : ""}`}>
//               {afterHarvestData.stcg.net < 0 ? "- " : ""}{formatCurrency(Math.abs(afterHarvestData.stcg.net))}
//             </div>
//             <div className={`text-center ${afterHarvestData.ltcg.net < 0 ? "text-red-300" : ""}`}>
//               {afterHarvestData.ltcg.net < 0 ? "- " : ""}{formatCurrency(Math.abs(afterHarvestData.ltcg.net))}
//             </div>
//           </div>

//           {/* Effective Capital Gains */}
//           <div className="pt-4">
//             <div className="flex justify-between items-center">
//               <p className="font-medium">Effective Capital Gains:</p>
//               <p className={`text-xl font-bold ${afterHarvestTotal < 0 ? "text-red-300" : ""}`}>
//                 {afterHarvestTotal < 0 ? "- " : ""}{formatCurrency(Math.abs(afterHarvestTotal))}
//               </p>
//             </div>
//           </div>

//           {/* Always show the savings message with the effective capital gains value */}
//           <div className="mt-2 bg-blue-500/30 p-3 rounded-lg">
//             <p className="text-white font-medium flex items-center gap-2">
//               <span className="text-yellow-300 text-lg">🎯</span>
//               You are going to save up to {formatCurrency(Math.abs(afterHarvestTotal))}
//             </p>
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default HarvestingCards;




import { Card } from "@/components/ui/card";
import { CapitalGainsResponse } from "@/services/mockApi";

interface HarvestingCardsProps {
  preHarvesting: CapitalGainsResponse;
  afterHarvesting: CapitalGainsResponse;
}

const HarvestingCards = ({ preHarvesting, afterHarvesting }: HarvestingCardsProps) => {
  // Format currency with dollar sign
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate pre-harvesting data
  const preHarvestData = {
    stcg: {
      profits: preHarvesting.capitalGains.stcg.profits,
      losses: preHarvesting.capitalGains.stcg.losses,
      net: preHarvesting.capitalGains.stcg.profits - preHarvesting.capitalGains.stcg.losses
    },
    ltcg: {
      profits: preHarvesting.capitalGains.ltcg.profits,
      losses: preHarvesting.capitalGains.ltcg.losses,
      net: preHarvesting.capitalGains.ltcg.profits - preHarvesting.capitalGains.ltcg.losses
    }
  };
  
  // Calculate total for pre-harvesting
  const preHarvestTotal = preHarvestData.stcg.net + preHarvestData.ltcg.net;

  // Calculate after-harvesting data
  const afterHarvestData = {
    stcg: {
      profits: afterHarvesting.capitalGains.stcg.profits,
      losses: afterHarvesting.capitalGains.stcg.losses,
      net: afterHarvesting.capitalGains.stcg.profits - afterHarvesting.capitalGains.stcg.losses
    },
    ltcg: {
      profits: afterHarvesting.capitalGains.ltcg.profits,
      losses: afterHarvesting.capitalGains.ltcg.losses,
      net: afterHarvesting.capitalGains.ltcg.profits - afterHarvesting.capitalGains.ltcg.losses
    }
  };
  
  // Calculate total for after-harvesting
  const afterHarvestTotal = afterHarvestData.stcg.net + afterHarvestData.ltcg.net;
  
  // Calculate savings (the difference between pre and after)
  const savings = preHarvestTotal - afterHarvestTotal;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Pre-Harvesting Card */}
      <Card className="p-6 rounded-lg shadow-md bg-slate-300">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-1">Pre Harvesting</h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <div></div>
            <div className="text-center text-sm font-medium text-gray-600">Short-term</div>
            <div className="text-center text-sm font-medium text-gray-600">Long-term</div>
          </div>

          {/* Profits */}
          <div className="grid grid-cols-3 gap-2 py-2 border-b border-gray-100">
            <div className="font-medium text-gray-800">Profits</div>
            <div className="text-center text-green-500">{formatCurrency(preHarvestData.stcg.profits)}</div>
            <div className="text-center text-green-500">{formatCurrency(preHarvestData.ltcg.profits)}</div>
          </div>

          {/* Losses */}
          <div className="grid grid-cols-3 gap-2 py-2 border-b border-gray-100">
            <div className="font-medium text-gray-800">Losses</div>
            <div className="text-center text-[#ea384c]">- {formatCurrency(preHarvestData.stcg.losses)}</div>
            <div className="text-center text-[#ea384c]">- {formatCurrency(preHarvestData.ltcg.losses)}</div>
          </div>

          {/* Net Capital Gains */}
          <div className="grid grid-cols-3 gap-2 py-2">
            <div className="font-medium text-gray-800">Net Capital Gains</div>
            <div className={`text-center ${preHarvestData.stcg.net < 0 ? "text-[#ea384c]" : "text-green-500"}`}>
              {preHarvestData.stcg.net < 0 ? "- " : ""}{formatCurrency(Math.abs(preHarvestData.stcg.net))}
            </div>
            <div className={`text-center ${preHarvestData.ltcg.net < 0 ? "text-[#ea384c]" : "text-green-500"}`}>
              {preHarvestData.ltcg.net < 0 ? "- " : ""}{formatCurrency(Math.abs(preHarvestData.ltcg.net))}
            </div>
          </div>

          {/* Realised Capital Gains */}
          <div className="pt-4">
            <div className="flex items-center">
              <p className="font-medium text-gray-800">Realised Capital Gains: </p>
              <p className={`ml-2 text-xl font-bold ${preHarvestTotal < 0 ? "text-[#ea384c]" : "text-gray-900"}`}>
                {preHarvestTotal < 0 ? "- " : ""}{formatCurrency(Math.abs(preHarvestTotal))}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* After-Harvesting Card */}
      <Card className="p-6 rounded-lg shadow-md bg-blue-600 text-white">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-1">After Harvesting</h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <div></div>
            <div className="text-center text-sm font-medium text-blue-100">Short-term</div>
            <div className="text-center text-sm font-medium text-blue-100">Long-term</div>
          </div>

          {/* Profits */}
          <div className="grid grid-cols-3 gap-2 py-2 border-b border-blue-500">
            <div className="font-medium">Profits</div>
            <div className="text-center">{formatCurrency(afterHarvestData.stcg.profits)}</div>
            <div className="text-center">{formatCurrency(afterHarvestData.ltcg.profits)}</div>
          </div>

          {/* Losses */}
          <div className="grid grid-cols-3 gap-2 py-2 border-b border-blue-500">
            <div className="font-medium">Losses</div>
            <div className="text-center text-red-300">- {formatCurrency(afterHarvestData.stcg.losses)}</div>
            <div className="text-center text-red-300">- {formatCurrency(afterHarvestData.ltcg.losses)}</div>
          </div>

          {/* Net Capital Gains */}
          <div className="grid grid-cols-3 gap-2 py-2">
            <div className="font-medium">Net Capital Gains</div>
            <div className={`text-center ${afterHarvestData.stcg.net < 0 ? "text-red-300" : ""}`}>
              {afterHarvestData.stcg.net < 0 ? "- " : ""}{formatCurrency(Math.abs(afterHarvestData.stcg.net))}
            </div>
            <div className={`text-center ${afterHarvestData.ltcg.net < 0 ? "text-red-300" : ""}`}>
              {afterHarvestData.ltcg.net < 0 ? "- " : ""}{formatCurrency(Math.abs(afterHarvestData.ltcg.net))}
            </div>
          </div>

          {/* Effective Capital Gains */}
          <div className="pt-4">
            <div className="flex items-center">
              <p className="font-medium">Effective Capital Gains: </p>
              <p className={`ml-2 text-xl font-bold ${afterHarvestTotal < 0 ? "text-red-300" : ""}`}>
                {afterHarvestTotal < 0 ? "- " : ""}{formatCurrency(Math.abs(afterHarvestTotal))}
              </p>
            </div>
          </div>

          {/* Always show the savings message with the effective capital gains value */}
          <div className="mt-2 bg-blue-500/30 p-3 rounded-lg">
            <p className="text-white font-medium flex items-center gap-2">
              <span className="text-yellow-300 text-lg">🎯</span>
              You are going to save up to {formatCurrency(Math.abs(afterHarvestTotal))}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HarvestingCards;

