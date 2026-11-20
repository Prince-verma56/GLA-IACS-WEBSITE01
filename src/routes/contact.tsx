import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout, SectionHeading } from "@/components/PageLayout";
import { contacts, conference, accommodationCommittee } from "@/lib/conference";
import { TextReveal, StaggerReveal } from "@/components/motion/ScrollReveal";
import { pageHeroes } from "@/lib/pageHeroes";
import { Download, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — IACS 2027, GLA University Mathura" },
      {
        name: "description",
        content: `Contact details for the ${conference.name} organizing committee.`,
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <PageLayout heroConfig={pageHeroes.contact}>
      <div className="max-w-4xl">
        <SectionHeading index="01" title="General Enquiries" />
        <TextReveal>
          <div className="mt-6 flex flex-col gap-2 text-muted-foreground">
            <p>
              <strong className="text-foreground">Email:</strong>{" "}
              <a href={`mailto:${conference.email}`} className="text-primary hover:underline">
                {conference.email}
              </a>
            </p>
            <p className="mt-2">
              <strong className="text-foreground">Primary contact:</strong>{" "}
              <a
                href={`tel:${conference.phone.replace(/ /g, "")}`}
                className="text-primary hover:underline"
              >
                {conference.phone}
              </a>
              <span className="block mt-1">
                Prof. (Dr.) Kamal Shah
                <br />
                Organizing Secretary
              </span>
            </p>
          </div>
        </TextReveal>

        <SectionHeading index="02" title="Organizing Committee Contacts" />
        <StaggerReveal as="ul" className="mt-6 divide-y divide-rule border-y border-rule">
          {contacts.map((contact, i) => (
            <li key={contact.name} className="flex flex-col md:flex-row gap-2 md:gap-6 py-5">
              <span className="eyebrow shrink-0 text-primary hidden md:block">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <p className="font-medium text-foreground">{contact.name}</p>
                {contact.role && <p className="text-sm text-muted-foreground">{contact.role}</p>}
              </div>
              <div className="md:text-right">
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone.replace(/ /g, "")}`}
                    className="text-primary hover:underline"
                  >
                    {contact.phone}
                  </a>
                )}
              </div>
            </li>
          ))}
        </StaggerReveal>

        <SectionHeading index="03" title="Accommodation Committee & Stay Assistance" />
        <TextReveal>
          <div className="mt-6 space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              For any queries regarding hotel reservations, tariffs, and accommodation near GLA
              University Mathura, feel free to contact our dedicated accommodation coordinators:
            </p>
            <ul className="divide-y divide-rule border-y border-rule">
              {accommodationCommittee.map((item, i) => (
                <li key={item.name} className="flex flex-col md:flex-row gap-2 md:gap-6 py-5">
                  <span className="eyebrow shrink-0 text-primary hidden md:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.role}</p>
                    <a
                      href={`mailto:${item.email}`}
                      className="text-xs text-primary hover:underline mt-0.5 inline-block"
                    >
                      {item.email}
                    </a>
                  </div>
                  <div className="md:text-right">
                    <a
                      href={`tel:${item.phone}`}
                      className="text-primary hover:underline font-medium"
                    >
                      {item.displayPhone}
                    </a>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 flex flex-wrap items-center gap-4">
              <a
                href="/docs/IACS_2027_Accommodation_Guide.pdf"
                download="IACS-2027-Accommodation-Guide.pdf"
                className="btn-solid inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase"
              >
                <Download className="w-4 h-4" /> Download Hotel Guide (PDF)
              </a>
              <Link
                to="/accommodation"
                className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-primary hover:underline border border-primary/30 px-5 py-2.5 rounded"
              >
                View 15 Budget Hotels →
              </Link>
            </div>
          </div>
        </TextReveal>
      </div>
    </PageLayout>
  );
}
