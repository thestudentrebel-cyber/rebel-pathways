import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader } from "@/components/rebel/Loader";
import { CustomCursor } from "@/components/rebel/CustomCursor";
import { Nav } from "@/components/rebel/Nav";
import { Hero } from "@/components/rebel/Hero";
import { IntroSection } from "@/components/rebel/IntroSection";
import { ServicesSection } from "@/components/rebel/ServicesSection";
import { WhyRebelSection, TrustSection } from "@/components/rebel/WhyRebelSection";
import { ProcessSection } from "@/components/rebel/ProcessSection";
import { StatementSection } from "@/components/rebel/StatementSection";
import { WhoWeHelpSection, DifferenceSection } from "@/components/rebel/WhoWeHelpSection";
import { CtaSection } from "@/components/rebel/CtaSection";
import { EnquirySection } from "@/components/rebel/EnquirySection";
import { Footer } from "@/components/rebel/Footer";

const title = "Rebel Media HQ — B2B Lead Generation & Growth Partner";
const description =
  "Rebel Media HQ helps businesses connect with the right prospects, start meaningful conversations and build a predictable growth pipeline.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative">
      {loading ? <Loader onDone={() => setLoading(false)} /> : null}
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <IntroSection />
        <ServicesSection />
        <WhyRebelSection />
        <TrustSection />
        <ProcessSection />
        <StatementSection />
        <WhoWeHelpSection />
        <DifferenceSection />
        <CtaSection />
        <EnquirySection />
      </main>
      <Footer />
    </div>
  );
}
