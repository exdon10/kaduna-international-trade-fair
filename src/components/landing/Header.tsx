'use client';

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  KadccimaLogo,
  GrbsLogo,
  TradeFairLogo,
  KadIctHubLogo
} from "@/components/icons";
import { useMonnifyPayment } from "@/hooks/use-monnify";

const navLinks = [
  { label: "LEADERSHIP", href: "/leadership" },
  { label: "REPORT", href: "/report" },
  { label: "GALLERY", href: "/gallery" }


  


];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b bg-background">
      <div className="container max-w-7xl flex h-16 items-center justify-between">

        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <TradeFairLogo className="h-8 w-8" />
            <KadccimaLogo className="h-8 w-8" />
           
          </Link>

          {/* Partner Logos */}
          <GrbsLogo className="h-7 w-7" />
          <KadIctHubLogo className="h-7 w-7" />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden border-t bg-background">
          <nav className="flex flex-col p-4 gap-4">
            {navLinks.map(link => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
