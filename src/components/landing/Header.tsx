'use client';

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Facebook,
  Instagram,
  Linkedin,
  Twitter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  KadccimaLogo,
  GrbsLogo,
  TradeFairLogo,
  KadIctHubLogo
} from "@/components/icons";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "LEADERSHIP", href: "/leadership" },
  { label: "REPORT", href: "/report" },
  { label: "GALLERY", href: "/gallery" }
];

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" }
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

        {/* Right: CTA + Social Icons (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                aria-label={label}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>

          {/* CTA Link */}
          <Button asChild size="sm">
            <Link href="/register">Register</Link>
          </Button>
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

            {/* Mobile Social Icons */}
            <div className="flex gap-4 pt-4 border-t">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  aria-label={label}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>

            {/* Mobile CTA */}
            <Button asChild className="mt-4">
              <Link href="/register">Register</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
