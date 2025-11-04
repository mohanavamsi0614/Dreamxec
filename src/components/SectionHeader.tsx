import { StarDecoration } from "./icons/StarDecoration";

export type SectionHeaderProps = {
  variant: "simple" | "detailed";
  title?: string;
  subtitle?: string;
  showDecorations?: boolean;
  stages?: Array<{
    day: string;
    label: string;
  }>;
};

export const SectionHeader = (props: SectionHeaderProps) => {
  const { variant, title, subtitle, showDecorations = false, stages } = props;

  if (variant === "simple") {
    return (
      <div
        role=""
        className="relative caret-transparent flex flex-col mx-[0%] self-center box-border max-h-[99999px] max-w-[99999px] order-1 w-[331px] mt-[0%] mb-[30px] md:w-[76.7732%] md:mb-[5.76098%]"
      >
        <div className="absolute bg-transparent caret-transparent inset-0"></div>
        
        {/* Tricolor decorative line */}
        <div className="flex justify-center mb-6">
          <div className="bg-tricolor-horizontal h-2 w-32 rounded-full"></div>
        </div>
        
        {/* Decorative stars */}
        <div className="absolute -top-4 left-4">
          <StarDecoration className="w-8 h-8 md:w-10 md:h-10 opacity-40" color="#FF9933" />
        </div>
        <div className="absolute -top-4 right-4">
          <StarDecoration className="w-8 h-8 md:w-10 md:h-10 opacity-40" color="#138808" />
        </div>
        
        <div className="relative caret-transparent self-center max-h-[99999px] max-w-[99999px] order-1 break-words w-full px-4 mt-[0%] mb-4 mx-[0%] md:mb-6">
          <h2 className="text-dreamxec-navy text-3xl md:text-5xl font-extrabold caret-transparent leading-tight break-words text-center font-display">
            <span className="relative inline-block">
              {title || "At DreamXec, we're looking for"}
              <div className="absolute -bottom-2 left-0 right-0 h-2 bg-saffron-pastel opacity-30 -rotate-1"></div>
            </span>
          </h2>
        </div>
        <div className="relative self-center caret-transparent max-w-[99999px] order-2 break-words w-full mt-[0%] mx-[0%] px-4 md:px-[10%]">
          <h2 className="text-dreamxec-navy text-base md:text-xl caret-transparent leading-relaxed break-words text-center font-sans font-semibold">
            {subtitle ||
              "High-potential, innovative students and young professionals who are committed to transforming their industries through groundbreaking ideas, mentorship, and corporate collaboration"}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div
      role=""
      className="relative caret-transparent flex flex-col mx-[0%] self-start col-end-2 col-start-1 row-end-2 row-start-1 justify-self-center mt-[-25.8197%] pointer-events-auto w-[98.2563%] mb-[0%] md:self-center md:mb-[-0.499135%] md:w-[92.9286%] md:mr-[0.787076%] md:mt-[0%]"
    >
      <div className="absolute bg-transparent caret-transparent inset-0"></div>
      <div className="relative caret-transparent box-border flex flex-col grow pointer-events-none">
        {showDecorations && (
          <>
            <div className="relative self-start aspect-[1_/_1.31601] caret-transparent mb-[-14.289%] max-h-[99999px] max-w-[99999px] order-1 pointer-events-auto w-[22.2448%] mt-[0%] mx-[0%] md:aspect-[1_/_1.1589] md:mb-[-13.5333%] md:w-[14.3333%] md:ml-[2.46622%]">
              <div className="absolute box-border caret-transparent overflow-hidden inset-0">
                <div className="caret-transparent">
                  <div className="absolute caret-transparent block h-full w-full overflow-clip inset-0">
                    <picture className="caret-transparent">
                      <img
                        src="https://c.animaapp.com/mhd6hm18SGcCN3/assets/4dcc2d_8b1f3b1a918543b091599ea4f1da13e2~mv2.png"
                        alt=""
                        className="caret-transparent h-full [mask-repeat:no-repeat] [mask-size:100%_100%] object-cover w-full"
                      />
                    </picture>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative self-start aspect-[1_/_1.13443] caret-transparent order-5 pointer-events-auto w-[1.53816%] ml-[52.2793%] mr-[0%] my-[0%] md:aspect-square md:order-2 md:ml-[92.7042%] md:mb-[1.43336%]">
              <div className="absolute caret-transparent inset-0">
                <img
                  src="https://c.animaapp.com/mhd6hm18SGcCN3/assets/icon-22.svg"
                  alt="Icon"
                  className="absolute caret-transparent h-full w-full m-auto inset-0"
                />
              </div>
            </div>
            <div className="relative self-start aspect-[1_/_1.13687] caret-transparent mb-[-14.4667px] order-2 pointer-events-auto w-[3.73819%] ml-[51.1132%] mr-[0%] mt-[0%] md:aspect-square md:mb-[-2.29158%] md:order-3 md:w-[4.08803%] md:ml-[88.9434%]">
              <div className="absolute caret-transparent inset-0">
                <img
                  src="https://c.animaapp.com/mhd6hm18SGcCN3/assets/icon-23.svg"
                  alt="Icon"
                  className="absolute caret-transparent h-full w-full m-auto inset-0"
                />
              </div>
            </div>
          </>
        )}
        <div className="relative self-center caret-transparent max-h-[99999px] max-w-[99999px] order-3 break-words pointer-events-auto w-[87.4994%] mt-[0%] mb-[2.19405%] mx-[0%] md:order-4 md:w-[98.5472%] md:mb-3">
          <h2 className="text-neutral-700 text-[36.0968px] caret-transparent leading-[36.0968px] break-words text-center font-wfont_ce99ac_4ed46f60929d456da1a6bed910d343f8 md:text-[42.001px] md:leading-[42.001px]">
            <span className="text-[36.0968px] caret-transparent leading-[36.0968px] break-words md:text-[42.001px] md:leading-[42.001px]">
              {title || "What WTFund brings to the table"}
            </span>
          </h2>
        </div>
        {stages && stages.length > 0 && (
          <div
            role=""
            className="relative self-center box-border caret-transparent flex min-h-[39px] order-4 pointer-events-auto w-max mt-[0%] mx-[0%] md:order-5"
          >
            <div className="absolute bg-transparent caret-transparent inset-0"></div>
            {stages.map((stage, index) => (
              <>
                <div
                  role=""
                  className="relative self-start box-border caret-transparent flex flex-col order-1 w-[99.2649px] mr-[2.98334px] md:w-[161.653px] md:mr-[18.3011px]"
                  key={`stage-${index}`}
                >
                  <div className="absolute bg-transparent caret-transparent inset-0"></div>
                  <div className="relative self-center caret-transparent max-h-[99999px] max-w-[99999px] order-1 break-words w-max mt-[0%] mb-[9.01665px] mx-[0%] md:mb-[8.99995px]">
                    <h2 className="text-neutral-700 text-[15.0401px] caret-transparent leading-[19.5522px] break-words text-center font-wfont_ce99ac_126efc2a7a2f40f487bb18022eaaa9b4 md:text-[24.4px] md:leading-[31.72px]">
                      <span className="text-[15.0401px] caret-transparent leading-[19.5522px] break-words md:text-[24.4px] md:leading-[31.72px]">
                        {stage.day}
                      </span>
                    </h2>
                  </div>
                  <div className="relative self-center caret-transparent max-h-[99999px] max-w-[99999px] order-2 break-words w-max mt-[0%] mx-[0%]">
                    <h2 className="text-neutral-700 text-[13.2473px] font-bold caret-transparent leading-[17.2215px] break-words text-center font-wfont_ce99ac_577db5f1461144f1b2361498caa2f537 md:text-[24.4px] md:leading-[31.72px]">
                      <span className="text-[13.2473px] caret-transparent leading-[17.2215px] break-words md:text-[24.4px] md:leading-[31.72px]">
                        {stage.label}
                      </span>
                    </h2>
                  </div>
                </div>
                {index < stages.length - 1 && (
                  <div
                    className="relative self-center aspect-square caret-transparent order-2 w-[18.048px] mr-[2.98332px] mt-0 md:self-start md:w-[18.3011px] md:mr-[18.3011px] md:mt-[27.126px]"
                    key={`icon-${index}`}
                  >
                    <div className="absolute caret-transparent inset-0">
                      <img
                        src="https://c.animaapp.com/mhd6hm18SGcCN3/assets/icon-6.svg"
                        alt="Icon"
                        className="absolute caret-transparent h-full w-full m-auto inset-0"
                      />
                    </div>
                  </div>
                )}
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
