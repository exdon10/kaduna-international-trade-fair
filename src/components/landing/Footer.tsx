import Link from "next/link";
import { KadccimaLogo, GrbsLogo, TradeFairLogo, KadIctHubLogo, LagosTradeOfficeLogo } from "@/components/icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <TradeFairLogo className="h-12 w-12" />
              <LagosTradeOfficeLogo className="h-12 w-12" />
              <div>
                <p className="text-lg font-bold">Kaduna International Trade Fair</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <KadccimaLogo className="h-8 w-8" />
            <GrbsLogo className="h-8 w-8" />
            <KadIctHubLogo className="h-8 w-8" />
          </div>
        </div>
        <div className="mt-8 border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/80 flex justify-between">
          <p>&copy; {currentYear} Kaduna Chamber of Commerce, Industry, Mines & Agriculture. All rights reserved.</p>
          <Link href="/admin/login" className="hover:underline">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
}
