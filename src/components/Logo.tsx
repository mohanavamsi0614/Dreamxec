export const Logo = () => {
  return (
    <div
      role=""
      className="relative self-start caret-transparent grid flex-col col-end-2 col-start-1 row-end-2 row-start-1 grid-cols-[minmax(0px,1fr)] grid-rows-[1fr] justify-self-start max-h-[99999px] max-w-[99999px] min-h-12 pointer-events-auto w-[97.3611px] mt-[0.000261829%] mb-[0%] mx-[0%] md:self-stretch md:flex md:grid-cols-none md:grid-rows-none md:justify-self-stretch md:min-h-0 md:w-auto md:mt-[0%]"
    >
      <div className="absolute bg-transparent caret-transparent inset-0"></div>
      <div className="relative box-border caret-transparent gap-x-0 grid grow grid-cols-[minmax(0px,1fr)] grid-rows-[minmax(1.27776px,auto)] pointer-events-none gap-y-0 p-[2%] md:grid-rows-[minmax(max-content,100%)] md:p-[0%]">
        <div className="relative self-center flex items-center gap-2 caret-transparent col-end-2 col-start-1 row-end-2 row-start-1 justify-self-start max-h-[99999px] max-w-[99999px] pointer-events-auto ml-[10.6984%] mr-[0%] mt-[0%] mb-[0.0148379%] md:ml-[30px] md:mb-[0%]">
          <a
            href="/"
            className="flex items-center gap-2 text-dreamxec-navy hover:opacity-80 transition-opacity"
          >
            {/* DreamXec Logo Icon */}
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-dreamxec-orange via-white to-dreamxec-green rounded-lg shadow-md">
              <span className="text-2xl font-bold text-dreamxec-navy">D</span>
            </div>
            {/* DreamXec Text */}
            <div className="flex flex-col">
              <span className="text-xl font-display font-bold text-dreamxec-navy leading-tight">
                DreamXec
              </span>
              <span className="text-[10px] font-sans text-dreamxec-navy leading-tight font-semibold">
                Empowering India's Success
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
