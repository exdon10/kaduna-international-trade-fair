import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

const contacts = [
  {
    name: "Hon. Abdulkareem Siyaka",
    titles: ["FCCA, ACA, MSc, MBA", "Partner, Project Finance, Commercial & Business Development, KADCCIMA"],
    email: "abdul.siyaka76@gmail.com",
    phones: ["+234-803-537-6736", "+234-802-885-9541"],
  },
  {
    name: "Engr. Yusuf Bashir",
    titles: ["Founder/CEO KAD ICT HUB", "Partner, Technology and Digital Transformation, KADCCIMA"],
    email: "Yusuf@kadhub.ng",
    phones: ["+234-812-139-7019"],
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-white dark:bg-card">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl font-headline">
            How to Partner
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Contact our partnership team to discuss your goals or visit us in person at Kaduna Chamber of Commerce Headquarters, or KAD ICT HUB, Opposite Murtala Square, Kaduna.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {contacts.map((contact) => (
            <Card key={contact.name} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-headline">{contact.name}</CardTitle>
                {contact.titles.map(title => <p key={title} className="text-sm text-muted-foreground">{title}</p>)}
              </CardHeader>
              <CardContent className="space-y-4">
                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 group">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-base text-foreground group-hover:text-primary transition-colors">{contact.email}</span>
                </a>
                {contact.phones.map(phone => (
                    <a href={`tel:${phone}`} key={phone} className="flex items-center gap-3 group">
                        <Phone className="h-5 w-5 text-primary" />
                        <span className="text-base text-foreground group-hover:text-primary transition-colors">{phone}</span>
                    </a>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
