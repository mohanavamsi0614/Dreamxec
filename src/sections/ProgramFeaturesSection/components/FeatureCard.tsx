export type FeatureCardProps = {
  title: string;
  description: string;
  iconUrl: string;
  containerVariant: string;
  innerContainerVariant: string;
  contentWrapperVariant: string;
  contentInnerVariant: string;
  contentBoxVariant: string;
  titleWrapperVariant: string;
  descriptionWrapperVariant: string;
  borderVariant?: string;
};

export const FeatureCard = (props: FeatureCardProps) => {
  return (
    <div
      role=""
      className={`sticky self-stretch caret-transparent flex flex-col col-end-2 col-start-1 justify-self-stretch pointer-events-auto top-[16%] ${props.containerVariant}`}
    >
      <div
        className={`absolute bg-dreamxec-navy caret-transparent border-dreamxec-orange border-solid inset-0 border-[7px] shadow-orange-glow md:border-8 ${props.borderVariant || ""}`}
      ></div>
      <div
        className={`relative box-border caret-transparent grid grow grid-cols-[minmax(0px,1fr)] grid-rows-[minmax(max-content,100%)] pointer-events-none ${props.innerContainerVariant}`}
      >
        <div
          role=""
          className={`relative self-center box-border caret-transparent flex flex-col col-end-2 col-start-1 row-end-2 row-start-1 justify-self-center max-h-[99999px] max-w-[99999px] min-h-0 min-w-0 pointer-events-auto md:flex-row md:max-h-none md:max-w-none md:min-w-[auto] md:w-max ${props.contentWrapperVariant}`}
        >
          <div className="absolute bg-transparent caret-transparent inset-0"></div>
          <div
            role=""
            className={`relative self-start box-border caret-transparent grid grid-cols-[minmax(0px,1fr)] max-h-[99999px] max-w-[99999px] order-2 w-[100.16%] m-[0%] md:grid-cols-[minmax(0px,816.406fr)] md:order-1 md:w-[647.829px] md:ml-0 md:my-0 ${props.contentInnerVariant}`}
          >
            <div className="absolute bg-dreamxec-navy caret-transparent inset-0"></div>
            <div
              role=""
              className={`relative self-end box-border caret-transparent flex flex-col col-end-2 col-start-1 row-end-2 row-start-1 justify-self-start ${props.contentBoxVariant}`}
            >
              <div className="absolute bg-transparent caret-transparent inset-0"></div>
              <div
                className={`relative self-start caret-transparent max-w-[99999px] order-1 break-words mb-[5.92886px] md:mb-[20.2372px] ${props.titleWrapperVariant}`}
              >
                <h3 className="text-dreamxec-orange text-[24.0642px] font-bold caret-transparent break-words text-left font-display md:text-[36.6001px]">
                  <span className="text-[24.0642px] caret-transparent break-words md:text-[36.6001px]">
                    {props.title}
                  </span>
                </h3>
              </div>
              <div
                className={`relative self-start caret-transparent max-h-[99999px] max-w-[99999px] order-2 break-words ${props.descriptionWrapperVariant}`}
              >
                <p className="text-dreamxec-cream text-[13px] caret-transparent leading-[20.8px] break-words text-left font-sans md:text-lg md:leading-[28.8px]">
                  <span className="text-[13px] caret-transparent leading-[20.8px] break-words md:text-lg md:leading-[28.8px]">
                    {props.description}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="relative self-start aspect-auto caret-transparent h-[60px] max-h-[99999px] max-w-[99999px] min-h-0 min-w-0 order-1 w-[60px] mt-[0%] mx-[0%] md:self-center md:aspect-square md:h-auto md:max-h-none md:max-w-none md:min-h-[auto] md:min-w-[auto] md:order-2 md:w-[103.372px] md:m-0 mb-[12.3%]">
            <div className="absolute caret-transparent inset-0">
              <img
                src={props.iconUrl}
                alt="Icon"
                className="absolute caret-transparent h-full w-full m-auto inset-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};