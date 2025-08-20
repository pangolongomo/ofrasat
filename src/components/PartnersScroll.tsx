"use client";

import MarqueeItem from "./MarqueeItem";

const partners: {
  name: string;
  logo: string;
}[] = [
  { name: "Agro Converge", logo: "/partners/logo-agro-converge.png" },
  { name: "CAGECFI", logo: "/partners/logo-cagecfi.webp" },
  { name: "CCM-B", logo: "/partners/logo-CCM-B-web-RVB.jpg" },
  { name: "Digital Group", logo: "/partners/logo-digital-group.png" },
  {
    name: "Global Monitoring Consulting",
    logo: "/partners/logo-global-monitoring-consulting.png",
  },
  { name: "Gouvernement", logo: "/partners/logo-gouvernement_400x400.png" },
  { name: "Kivu Entrepreneur", logo: "/partners/logo-kivu-entrepreneur.png" },
  { name: "SECAM", logo: "/partners/logo-secam-blanc.png" },
];

export default function PartnersScroll() {
  return (
    <div className="w-full overflow-hidden bg-gray-50 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Nos Partenaires</h2>
      </div>

      <div className="mx-auto overflow-hidden select-none">
        <MarqueeItem images={partners} from={0} to={"-100%"} />
      </div>
    </div>
  );
}
