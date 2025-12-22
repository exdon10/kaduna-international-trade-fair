import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Briefcase, Tv, Handshake, Star, Target } from "lucide-react";

const benefits = [
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "1.8M+ Visitors",
    description: "Connect with a massive audience from across Nigeria and beyond.",
  },
  {
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    title: "2,000+ Exhibitors",
    description: "Network with local and foreign businesses across diverse sectors.",
  },
  {
    icon: <Tv className="h-8 w-8 text-primary" />,
    title: "Full National Media Coverage",
    description: "Gain exposure on TV, radio, online platforms, and in the press.",
  },
  {
    icon: <Handshake className="h-8 w-8 text-primary" />,
    title: "High-Profile Attendance",
    description: "Engage with government officials, diplomats, and industry leaders.",
  },
  {
    icon: <Star className="h-8 w-8 text-primary" />,
    title: "Powerful Brand Visibility",
    description: "Leverage internationally recognized brand influencers for promotion.",
  },
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: "Unmatched ROI",
    description: "Achieve superior returns in brand activation and customer acquisition.",
  },
];

export default function WhyPartner() {
  return (
    <section id="why-partner" className="py-16 sm:py-24 bg-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl font-headline">
            Why Partner With Us?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            The Trade Fair offers a powerful platform for businesses to showcase their products and services, expand distribution channels, and strengthen brand visibility.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 mb-4">
                  {benefit.icon}
                </div>
                <CardTitle className="font-headline text-xl">{benefit.title}</CardTitle>
                <CardDescription className="mt-2 text-base text-muted-foreground">
                  {benefit.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
