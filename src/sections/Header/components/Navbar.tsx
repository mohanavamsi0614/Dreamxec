import { ApplyButton } from "../../../components/ApplyButton";
import { Logo } from "../../../components/Logo";
import { MobileMenuButton } from "../../../components/MobileMenuButton";
import { DesktopMenu } from "./DesktopMenu";

export const Navbar = () => {
  return (
    <div className="relative box-border caret-transparent grid grow grid-cols-[39.9983%_20.0008%_40.0055%] grid-rows-[minmax(max-content,100%)] pointer-events-none pt-[0%] px-[0%] md:grid-cols-[10%_70%_20%] md:grid-rows-[minmax(73.1996px,auto)]">
      <ApplyButton />
      <Logo />
      <MobileMenuButton />
      <DesktopMenu />
    </div>
  );
};