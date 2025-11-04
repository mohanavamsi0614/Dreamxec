import { SectionHeader } from "../../components/SectionHeader";

export const WhatWeBringSection = () => {
  return (
    <section className="relative self-stretch bg-transparent box-border caret-transparent grid col-end-2 col-start-1 row-end-5 row-start-4 grid-cols-[minmax(0px,1fr)] grid-rows-[minmax(60.8624px,auto)] justify-self-stretch max-h-[99999px] max-w-[99999px] pointer-events-auto md:grid-rows-[minmax(189.635px,auto)]">
      <div className="absolute caret-transparent h-full [mask-repeat:no-repeat] [mask-size:100%] w-full overflow-hidden left-0 top-0">
        <div className="caret-transparent h-full"></div>
      </div>
      <div
        role=""
        className="relative self-stretch caret-transparent flex flex-col col-end-2 col-start-1 row-end-2 row-start-1 justify-self-stretch max-h-[99999px] max-w-[99999px] mb-[0%] mx-[0%]"
      >
        <div className="absolute bg-transparent caret-transparent inset-0"></div>
        <div className="relative box-border caret-transparent grid grow grid-cols-[minmax(0px,1fr)] grid-rows-[minmax(max-content,100%)] pointer-events-none pt-[60px] pb-[30px] px-[0%] md:pt-0 md:pb-[50px]">
          <SectionHeader
            variant="detailed"
            title="What DreamXec brings to the table"
            showDecorations={true}
            stages={[
              { day: "Stage 1", label: "CORPORATE PARTNERS" },
              { day: "Stage 2", label: "EXPERT MENTORS" },
              { day: "Stage 3", label: "INNOVATION BUILDERS" },
            ]}
          />
        </div>
      </div>
    </section>
  );
};
