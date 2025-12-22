'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { KadccimaLogo, GrbsLogo, TradeFairLogo, KadIctHubLogo } from "@/components/icons";
import { useMonnifyPayment } from "@/hooks/use-monnify";

export default function Header() {
  const { initializePayment, isInitializing } = useMonnifyPayment({
    amount: 1000,
    currency: "NGN",
    description: "Sponsorship for Kaduna International Trade Fair",
    customerFullName: "Guest Sponsor",
    customerEmail: "guest@example.com",
    paymentReference: `KAD-TF-${new Date().getTime()}`,
    onComplete: (response) => {
      console.log("Payment successful", response);
      alert("Payment successful!");
    },
    onClose: () => {
      console.log("Payment widget closed.");
    }
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <TradeFairLogo className="h-8 w-8" />
            <KadccimaLogo className="h-8 w-8" />
            <span className="hidden font-bold sm:inline-block">
              Kaduna Trade Fair
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-4 border-l border-border pl-4">
             <p className="text-sm font-medium text-muted-foreground mr-2">Partners:</p>
             <GrbsLogo className="h-7 w-7" />
             <KadIctHubLogo className="h-7 w-7" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={initializePayment} disabled={isInitializing}>
            {isInitializing ? "Loading..." : "Become a Sponsor"}
          </Button>
          <Link href="/admin/login">
            <Button variant="outline">Admin Login</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
