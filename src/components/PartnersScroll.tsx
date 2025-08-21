"use client";

import MarqueeItem from "./MarqueeItem";

const partners1: {
  name: string;
  logo: string;
}[] = [
  { name: "Agro Converge", logo: "/partners/1/logo-agro-converge.png" },
  { name: "CAGECFI", logo: "/partners/1/logo-cagecfi.webp" },
  { name: "CCM-B", logo: "/partners/1/logo-CCM-B-web-RVB.jpg" },
  { name: "Digital Group", logo: "/partners/1/logo-digital-group.png" },
  {
    name: "Global Monitoring Consulting",
    logo: "/partners/1/logo-global-monitoring-consulting.png",
  },
  { name: "Gouvernement", logo: "/partners/1/logo-gouvernement_400x400.png" },
  { name: "Kivu Entrepreneur", logo: "/partners/1/logo-kivu-entrepreneur.png" },
  { name: "SECAM", logo: "/partners/1/logo-secam-blanc.png" },
  { name: "PADMPME", logo: "/partners/1/logo-padmpme-transparent.png" },
  { name: "MSI", logo: "/partners/1/logo-MSI.png" },
];

const partners2: {
  name: string;
  logo: string;
}[] = [
  { name: "ADRA", logo: "/partners/2/adra-vertical-logo.png" },
  { name: "AGPACT", logo: "/partners/2/agpact.png" },
  { name: "Partner", logo: "/partners/2/BizBnx8ZwqMu2lzMYftK.png" },
  { name: "Event", logo: "/partners/2/event.png" },
  { name: "Jaft", logo: "/partners/2/jaft-logo.png" },
  { name: "ADRA", logo: "/partners/2/LOGO-ADRA.png" },
  { name: "CEPO3", logo: "/partners/2/logo-cepo3.png" },
  { name: "LT", logo: "/partners/2/logo-lt-2.png" },
  { name: "transforme", logo: "/partners/2/transforme-logo.png" },
  { name: "UNICEF", logo: "/partners/3/UNICEF_Logo.png" },
];

const partners3: {
  name: string;
  logo: string;
}[] = [
  {
    name: "Banque Mondiale",
    logo: "/partners/3/la-banque-mondiale-logo-640x480.png",
  },
  { name: "Annonceurs", logo: "/partners/3/LOGO-ANNONCEURS.png" },
  { name: "Bomoyi SARL", logo: "/partners/3/logo-bomoyi-sarl.png" },
  { name: "BPRES", logo: "/partners/3/LOGO-BPRES.png" },
  { name: "ITES", logo: "/partners/3/logo-ITES.png" },
  { name: "Ludakis", logo: "/partners/3/LOGO-LUDAKIS.png" },
  { name: "PAC RDC", logo: "/partners/3/LOGO-PAC-RDC.png" },
  { name: "Perse", logo: "/partners/3/logo-perse.png" },
  { name: "Maisha", logo: "/partners/3/MAISHA.png" },
  { name: "COPA", logo: "/partners/3/Logo-Final-slogan-copin.png" },
];

export default function PartnersScroll() {
  return (
    <div className="w-full overflow-hidden bg-gray-50 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Nos Partenaires</h2>
      </div>

      <div className="mx-auto overflow-hidden select-none">
        <MarqueeItem images={partners1} direction="rtl" />
      </div>
      <div className="mx-auto overflow-hidden select-none">
        <MarqueeItem images={partners2} direction="ltr" />
      </div>
      <div className="mx-auto overflow-hidden select-none">
        <MarqueeItem images={partners3} direction="rtl" />
      </div>
    </div>
  );
}
