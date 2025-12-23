"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  KadccimaLogo,
  GrbsLogo,
  TradeFairLogo,
  KadIctHubLogo,
} from "@/components/icons";
import { useMonnifyPayment } from "@/hooks/use-monnify";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const { initializePayment, isInitializing } = useMonnifyPayment({
    amount: 1000,
    currency: "NGN",
    description: "Sponsorship for Kaduna International Trade Fair",
    customerFullName: "Guest Sponsor",
    customerEmail: "guest@example.com",
    paymentReference: `KAD-TF-${Date.now()}`,
    onComplete: () => alert("Payment successful!"),
    onClose: () => {},
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4">

        {/* LEFT: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <TradeFairLogo className="h-8 w-8" />
          <span className="font-bold text-lg hidden sm:inline">
            Kaduna Trade Fair
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-3 border-l pl-4">
            <KadccimaLogo className="h-7 w-7" />
            <GrbsLogo className="h-7 w-7" />
            <KadIctHubLogo className="h-7 w-7" />
          </div>

          <Button onClick={initializePayment} disabled={isInitializing}>
            {isInitializing ? "Loading..." : "Become a Sponsor"}
          </Button>

          <Link href="/admin/login">
            <Button variant="outline">Admin Login</Button>
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden border-t bg-background">
          <div className="flex flex-col gap-4 p-4">

            <Button
              onClick={() => {
                initializePayment();
                setOpen(false);
              }}
              disabled={isInitializing}
              className="w-full"
            >
              Become a Sponsor
            </Button>

            <Link href="/admin/login" onClick={() => setOpen(false)}>
              <Button variant="outline" className="w-full">
                Admin Login
              </Button>
            </Link>

            <div className="flex items-center justify-center gap-4 pt-4 border-t">
              <KadccimaLogo className="h-7 w-7" />
              <GrbsLogo className="h-7 w-7" />
              <KadIctHubLogo className="h-7 w-7" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
