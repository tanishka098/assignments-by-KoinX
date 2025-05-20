
// import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
// import { useState } from "react";
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
// import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="flex flex-col gap-4">
//       <div className="flex items-center">
//         <img src="/logo/koinx-logo.png.png" alt="KoinX" className="width: 1440px; height: 1094px;" />
//       </div>
//       <div className="flex flex-col mt-4">
//         <div className="flex items-center gap-2">
//           <h1 className="text-xl font-medium">Tax Harvesting</h1>
//           <HoverCard>
//             <HoverCardTrigger asChild>
//               <span className="text-blue-600 text-sm cursor-pointer flex items-center gap-1">
//                 How it works? <HelpCircle className="h-3 w-3" />
//               </span>
//             </HoverCardTrigger>
//             <HoverCardContent className="w-80 p-4">
//               <div className="space-y-2">
//                 <p className="text-sm">See your capital gains for FY 2024-25 in the left card</p>
//                 <p className="text-sm">Check boxes for assets you plan on selling to reduce your tax liability</p>
//                 <p className="text-sm">Instantly see your updated tax liability in the right card</p>
//                 <p className="text-sm font-medium text-blue-600">Pro tip: Experiment with different combinations of your holdings to optimize your tax liability</p>
//               </div>
//             </HoverCardContent>
//           </HoverCard>
//         </div>
//         <div className="mt-4 bg-blue-50 rounded-md p-4 border border-blue-200">
//           <Collapsible open={isOpen} onOpenChange={setIsOpen}>
//             <CollapsibleTrigger className="w-full">
//               <div className="flex justify-between items-center cursor-pointer">
//                 <div className="flex items-center gap-2 text-blue-800">
//                   <div className=" rounded-full bg-blue-100 flex items-center justify-center text-blue-800">
//                     <span className="text-sm">i</span>
//                   </div>
//                   <span className="font-semibold">Important Notes & Disclaimers</span>
//                 </div>
//                 {isOpen ? <ChevronUp className="text-blue-800" /> : <ChevronDown className="text-blue-800" />}
//               </div>
//             </CollapsibleTrigger>
//             <CollapsibleContent>
//               <div className="mt-4 space-y-4 text-sm text-gray-700">
//                 <div>
//                   <h3 className="font-medium text-blue-800 mb-1">Regulatory Compliance</h3>
//                   <p>Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.</p>
//                 </div>
                
//                 <div>
//                   <h3 className="font-medium text-blue-800 mb-1">Asset Classification</h3>
//                   <p>Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.</p>
//                 </div>
                
//                 <div>
//                   <h3 className="font-medium text-blue-800 mb-1">Data Sources</h3>
//                   <p>Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.</p>
//                 </div>
                
//                 <div>
//                   <h3 className="font-medium text-blue-800 mb-1">Tax Period Calculation</h3>
//                   <p>Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.</p>
//                 </div>
                
//                 <div>
//                   <h3 className="font-medium text-blue-800 mb-1">Loss Recognition</h3>
//                   <p>Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.</p>
//                 </div>
//               </div>
//             </CollapsibleContent>
//           </Collapsible>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;





import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between w-full">
        <img src="/logo/koinx-logo.png.png" alt="KoinX" className="h-10 w-auto" />
        {isMobile && (
          <button className="p-2 md:hidden">
            {/* Custom two-line menu icon */}
            <div className="flex flex-col gap-1.5">
              <div className="w-6 h-0.5 bg-black"></div>
              <div className="w-6 h-0.5 bg-black"></div>
            </div>
          </button>
        )}
      </div>
      <div className="flex flex-col mt-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium">Tax Harvesting</h1>
          <HoverCard>
            <HoverCardTrigger asChild>
              <span className="text-blue-600 text-sm cursor-pointer flex items-center gap-1">
                How it works? <HelpCircle className="h-3 w-3" />
              </span>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 p-4">
              <div className="space-y-2">
                <p className="text-sm">See your capital gains for FY 2024-25 in the left card</p>
                <p className="text-sm">Check boxes for assets you plan on selling to reduce your tax liability</p>
                <p className="text-sm">Instantly see your updated tax liability in the right card</p>
                <p className="text-sm font-medium text-blue-600">Pro tip: Experiment with different combinations of your holdings to optimize your tax liability</p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className="mt-4 bg-blue-50 rounded-md p-4 border border-blue-200">
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="w-full">
              <div className="flex justify-between items-center cursor-pointer">
                <div className="flex items-center gap-2 text-blue-800">
                  <div className="rounded-full bg-blue-100 flex items-center justify-center text-blue-800">
                    <span className="text-sm">i</span>
                  </div>
                  <span className="font-semibold">Important Notes & Disclaimers</span>
                </div>
                {isOpen ? <ChevronUp className="text-blue-800" /> : <ChevronDown className="text-blue-800" />}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-4 space-y-4 text-sm text-gray-700">
                <div>
                  <h3 className="font-medium text-blue-800 mb-1">Regulatory Compliance</h3>
                  <p>Tax-loss harvesting is currently not allowed under Indian tax regulations. Please consult your tax advisor before making any decisions.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-blue-800 mb-1">Asset Classification</h3>
                  <p>Tax harvesting does not apply to derivatives or futures. These are handled separately as business income under tax rules.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-blue-800 mb-1">Data Sources</h3>
                  <p>Price and market value data is fetched from Coingecko, not from individual exchanges. As a result, values may slightly differ from the ones on your exchange.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-blue-800 mb-1">Tax Period Calculation</h3>
                  <p>Some countries do not have a short-term / long-term bifurcation. For now, we are calculating everything as long-term.</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-blue-800 mb-1">Loss Recognition</h3>
                  <p>Only realized losses are considered for harvesting. Unrealized losses in held assets are not counted.</p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
};

export default Header;