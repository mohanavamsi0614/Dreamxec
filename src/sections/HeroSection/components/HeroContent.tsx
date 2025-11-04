import { HeroTitle } from "./HeroTitle";
import { HeroDescription } from "./HeroDescription";

export const HeroContent = () => {
  return (
    <div
      role=""
      className="relative self-start box-border caret-transparent flex flex-col col-end-2 col-start-1 row-end-2 row-start-1 justify-self-center w-[90.712%] mt-[49.0397%] mb-[0%] mx-[0%] md:w-[64.6337%] md:mr-[1.09202%] md:mt-[15.8874%]"
    >
      <div className="absolute bg-transparent caret-transparent inset-0"></div>
      <div className="relative self-center caret-transparent max-h-[99999px] max-w-[99999px] order-1 w-full mt-[0%] mb-[6%] mx-[0%] md:mb-[8%]">
        {/* Vibrant slogan with oil pastel card effect */}
        <div className="relative inline-block w-full">
          {/* Background card with pastel effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-dreamxec-saffron/10 via-white/50 to-dreamxec-green/10 rounded-3xl border-4 border-dreamxec-navy shadow-[8px_8px_0_rgba(0,0,128,0.2)] -rotate-1"></div>
          
          <h1 className="relative text-dreamxec-navy text-2xl md:text-5xl lg:text-6xl font-display font-black caret-transparent leading-tight break-words text-center p-6 md:p-8">
            <span className="block mb-2 relative">
              <span className="relative z-10 text-dreamxec-saffron drop-shadow-[3px_3px_0_rgba(255,127,0,0.3)] hover:scale-105 transition-transform inline-block">
                Research Karega India
              </span>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[90%] h-4 bg-dreamxec-saffron/40 -rotate-2 rounded-full blur-sm"></div>
            </span>
            
            <span className="block my-1 relative">
              <span className="relative z-10 text-dreamxec-navy text-2xl md:text-4xl lg:text-5xl font-bold italic">
                Toh
              </span>
            </span>
            
            <span className="block mt-2 relative">
              <span className="relative z-10 text-dreamxec-green drop-shadow-[3px_3px_0_rgba(11,156,44,0.3)] hover:scale-105 transition-transform inline-block">
                Badlega India
              </span>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[90%] h-4 bg-dreamxec-green/40 rotate-2 rounded-full blur-sm"></div>
            </span>
          </h1>
          
          {/* Decorative stars */}
          <div className="absolute -top-2 -left-2 text-dreamxec-saffron text-2xl md:text-4xl animate-pulse">
            ✦
          </div>
          <div className="absolute -top-2 -right-2 text-dreamxec-green text-2xl md:text-4xl animate-pulse" style={{animationDelay: '0.5s'}}>
            ✦
          </div>
        </div>
      </div>
      <HeroTitle />
      <HeroDescription />
    </div>
  );
};
