import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
export default function ReportPage() {
  return (
     <div className="flex min-h-screen flex-col">
              <Header />
    <main className="container max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-extrabold mb-6">
        Kaduna International Trade Fair Report
      </h1>

      {/* Report Summary */}
      <div className="bg-muted/50 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-3">Executive Summary</h2>
        <p className="text-muted-foreground leading-relaxed">
          The 46th Kaduna International Trade Fair, held from 14 to 23 February 2025 at the Kaduna Trade and Investment Centre, marked a significant milestone in the history of commercial exhibitions in Nigeria. Organized by the Kaduna Chamber of Commerce, Industry, Mines, and Agriculture (KADCCIMA) in collaboration with the Kaduna State Government and private sector partners, this year’s edition carried the theme “Promoting Efficiency in Manufacturing, Agriculture, and Trade through Digital Transformation.”
          <br></br>
          <br></br>
          
The Fair served as a unifying platform that brought together a cross-section of stakeholders, including policymakers, business leaders, foreign trade delegations, micro, small and medium-sized enterprises (MSMEs), investors, development partners, and the general public. The event underscored Kaduna’s reputation as the commercial nerve centre of Northern Nigeria, reaffirming its place as a critical gateway for national and regional trade.
<br></br>
<br></br>

The Fair was particularly significant in light of Nigeria’s ongoing economic diversification agenda and the global shift towards digital innovation in commerce. Against the backdrop of national efforts to reduce reliance on oil revenues, the Fair provided an opportunity to explore alternative growth drivers such as agriculture, manufacturing, ICT, and SME development. Exhibitors and participants had the opportunity to showcase products, introduce innovative technologies, exchange knowledge, and establish new partnerships. The event also gave prominence to the increasing role of digital platforms in facilitating business transactions, trade efficiency, and market expansion. In this regard, the Fair’s alignment with the digital transformation agenda of both federal and state governments positioned it not merely as an exhibition but as a forward-looking policy dialogue space.
<br></br>
<br></br>
The outcomes of the Fair were broad and impactful. On the innovation front, the Raw Materials Research and Development Council (RMRDC) launched two major digital platforms. One is the Nigeria Raw Materials Information Management System (NRMIMS) and the other is the Raw Materials e-Registration Portal (RMe- regP). Both were designed to enhance industrial efficiency and data accessibility for manufacturers. The Fair also provided a platform for cultural diplomacy, with the Indian High Commission and its cultural association hosting performances and business dialogues that strengthened bilateral relations. A wide array of MSMEs benefited from exposure, networking
opportunities, and training sessions, while larger corporates such as the Dangote Group reaffirmed their commitment to industrial and trade development in Nigeria.
<br></br>
<br></br>

It highlighted challenges such as access to finance and infrastructural deficits while simultaneously providing actionable recommendations for stakeholders. Moving forward, the Kaduna International Trade Fair is well-positioned to evolve into a continental platform under the African Continental Free Trade Area (AfCFTA), helping to accelerate Nigeria’s integration.
 

        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
       

        <a
          href="/reports/Report.pdf"
          download
        >
          <Button variant="outline" size="lg">
            Download PDF
          </Button>
        </a>
      </div>
    </main>
    
        <Footer />
        </div>

  );
}
