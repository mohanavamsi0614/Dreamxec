import { DesktopFooter } from "./DesktopFooter";
import { MobileFooter } from "./MobileFooter";

export const FooterContent = () => {
  return (
    <div
      role=""
      className="relative self-stretch caret-transparent flex flex-col col-end-2 col-start-1 row-end-2 row-start-1 justify-self-stretch max-h-[99999px] max-w-[99999px] pointer-events-auto m-[0%]"
    >
      <div className="absolute bg-transparent caret-transparent inset-0"></div>
      <div className="relative box-border caret-transparent grid grow grid-cols-[minmax(0px,1fr)] grid-rows-[minmax(max-content,100%)] pointer-events-none">
        <DesktopFooter />
        <MobileFooter />
      </div>
    </div>
  );
};
