import { FooterContent } from "./components/FooterContent";

export const Footer = () => {
  return (
    <div className="relative self-stretch box-border caret-transparent grid col-end-2 col-start-1 row-end-[14] row-start-13 grid-cols-[1fr] grid-rows-[1fr] justify-self-stretch">
      <section className="relative bg-transparent caret-transparent flex flex-col max-h-[99999px] max-w-[99999px] pointer-events-auto">
        <div className="absolute caret-transparent h-full [mask-repeat:no-repeat] [mask-size:100%] w-full overflow-hidden left-0 top-0">
          <div className="absolute bg-dreamxec-navy caret-transparent h-full w-full top-0"></div>
          <div className="caret-transparent h-full"></div>
        </div>
        <div className="relative box-border caret-transparent grid grow grid-cols-[minmax(0px,1fr)] grid-rows-[minmax(204.891px,auto)] pointer-events-none px-[0%] py-[2%] md:grid-rows-[minmax(189.875px,auto)]">
          <FooterContent />
        </div>
      </section>
    </div>
  );
};
