import { SectionHeader } from "./SectionHeader";
import { CriteriaGrid } from "../sections/LookingForSection/components/CriteriaGrid";

export const SectionContent = () => {
  return (
    <div className="relative box-border caret-transparent gap-x-0 grid grow grid-cols-[minmax(0px,1fr)] grid-rows-[minmax(1589.24px,auto)] pointer-events-none gap-y-0 px-[18px] py-[60px] md:grid-rows-[minmax(856.016px,auto)] md:p-[5.71646%]">
      <div
        role=""
        className="relative self-start box-border caret-transparent flex flex-col col-end-2 col-start-1 row-end-2 row-start-1 justify-self-center mb-[-0.00131381%] mt-[-0.591216%] pointer-events-auto w-[103.329%] mx-[0%] md:self-center md:w-[93.4478%] md:ml-[0.00112218%] md:my-[0%]"
      >
        <div className="absolute bg-transparent caret-transparent inset-0"></div>
        <SectionHeader
          variant="simple"
          title="At WTFund, we’re looking for"
          subtitle="High-potential, innovative and visionary founders, creators, makers and dreamers 25 & under who are committed to transforming their industries through groundbreaking ideas and solutions"
        />
        <CriteriaGrid />
      </div>
    </div>
  );
};
