import React, { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  HorizontalReveal,
  MaskReveal,
  TextReveal,
  StaggerReveal,
} from "@/components/motion/ScrollReveal";
import { InternalPageHero } from "@/components/InternalPageHero";
import { pageHeroes } from "@/lib/pageHeroes";
import { SectionTransition } from "@/components/editorial/SectionTransition";
import { conference, budgetHotels, accommodationCommittee, BudgetHotel } from "@/lib/conference";
import { cn } from "@/lib/utils";
import {
  Download,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Building2,
  Bed,
  Search,
  FileText,
  Navigation as NavIcon,
  Check,
  Copy,
  Info,
} from "lucide-react";

export const Route = createFileRoute("/accommodation")({
  head: () => ({
    meta: [
      { title: "Accommodation & Budget Hotels — IACS 2027, GLA University Mathura" },
      {
        name: "description",
        content:
          "Official list of 15 recommended budget hotels and guest houses near GLA University, Mathura for IACS 2027 conference delegates. Verified tariffs, distances, contact details, and Accommodation Committee helpline.",
      },
      { property: "og:title", content: "Accommodation & Budget Hotels — IACS 2027" },
      {
        property: "og:description",
        content:
          "Curated budget hotels near GLA University Mathura for IACS 2027 delegates. Download official PDF tariff list and contact accommodation committee.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: AccommodationPage,
});

const ACCOMMODATION_PDF_PATH = "/docs/IACS_2027_Accommodation_Guide.pdf";
const ACCOMMODATION_PDF_FILENAME = "IACS-2027-Accommodation-Guide.pdf";

function CopyButton({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* silently fail */
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      title={`Copy ${label || value}`}
      className="inline-flex items-center gap-1 text-[0.7rem] uppercase tracking-wider text-primary/70 hover:text-primary transition-colors p-1"
      aria-label={`Copy ${label || value}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-[0.65rem] text-emerald-600 font-medium">Copied</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 opacity-60" />
          {label && <span>{label}</span>}
        </>
      )}
    </button>
  );
}

function AccommodationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "near" | "vrindavan" | "mathura">(
    "all",
  );
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  const filteredHotels = useMemo(() => {
    return budgetHotels.filter((hotel) => {
      // Filter tab
      if (selectedFilter === "near" && !hotel.distance.startsWith("1 Km")) {
        // under 10 km
        const km = parseFloat(hotel.distance);
        if (km > 10) return false;
      } else if (
        selectedFilter === "vrindavan" &&
        !hotel.address.toLowerCase().includes("vrindavan")
      ) {
        return false;
      } else if (selectedFilter === "mathura" && !hotel.address.toLowerCase().includes("mathura")) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = hotel.name.toLowerCase().includes(q);
        const matchesAddress = hotel.address.toLowerCase().includes(q);
        const matchesPrice = hotel.price.toLowerCase().includes(q);
        const matchesPhone = hotel.contacts.some((c) => c.includes(q));
        return matchesName || matchesAddress || matchesPrice || matchesPhone;
      }

      return true;
    });
  }, [searchQuery, selectedFilter]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SiteHeader />
      <main>
        {/* ── HERO ─────────────────────────────────────────── */}
        <InternalPageHero hero={pageHeroes.accommodation} />

        {/* ── OFFICIAL PDF DOWNLOAD BANNER ──────────────────── */}
        <section className="bg-white border-b border-rule relative z-10 pt-10 pb-10 md:pt-14 md:pb-14">
          <div className="shell">
            <div className="bg-gradient-to-br from-primary/5 via-primary/[0.02] to-accent/10 border border-primary/20 rounded-xl p-6 md:p-8 shadow-sm">
              <div className="grid gap-6 md:grid-cols-12 md:items-center">
                <div className="md:col-span-8 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase">
                    <FileText className="w-3.5 h-3.5" /> Official Document
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                    Budget Hotels & Accommodation Guide (PDF)
                  </h2>
                  <p className="text-sm text-foreground/75 leading-relaxed max-w-2xl">
                    Download the official 2-page circular issued by the IACS 2027 Accommodation
                    Committee. Includes verified tariffs, exact distances from GLA University, room
                    occupancy options, hotel manager contacts, and helpline details.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Format: PDF (2 pages) • Organised for International Conference 2027, GLA
                    University Mathura
                  </p>
                </div>

                <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 md:items-end justify-center">
                  <a
                    href={ACCOMMODATION_PDF_PATH}
                    download={ACCOMMODATION_PDF_FILENAME}
                    className="btn-solid inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium shadow-sm hover:shadow transition-all w-full sm:w-auto"
                    aria-label="Download IACS 2027 Accommodation Guide PDF"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF Guide
                  </a>
                  <a
                    href={ACCOMMODATION_PDF_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium border border-primary/30 text-primary hover:bg-primary/5 rounded-md transition-all w-full sm:w-auto"
                    aria-label="View IACS 2027 Accommodation Guide PDF in browser"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open PDF in Browser
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── COMMITTEE HELPLINE CALLOUT ────────────────────── */}
        <section className="bg-surface/50 border-b border-rule py-10">
          <div className="shell">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-xl">
                <p className="eyebrow text-primary mb-1">Accommodation Assistance</p>
                <h3 className="text-lg md:text-xl font-semibold text-foreground">
                  Feel Free to Contact Us for Any Query
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">
                  Our dedicated accommodation committee members are available to help delegates with
                  hotel reservations, group bookings, and travel guidance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 shrink-0">
                {accommodationCommittee.map((c) => (
                  <div
                    key={c.name}
                    className="p-4 bg-white border border-rule rounded-lg shadow-2xs hover:border-primary/40 transition-colors"
                  >
                    <p className="text-xs uppercase tracking-wider font-semibold text-primary/80">
                      Committee Member
                    </p>
                    <h4 className="font-semibold text-sm text-foreground mt-0.5">{c.name}</h4>
                    <div className="mt-2.5 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between gap-2">
                        <a
                          href={`tel:${c.phone}`}
                          className="inline-flex items-center gap-1.5 text-primary hover:underline font-medium"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          {c.displayPhone}
                        </a>
                        <CopyButton value={c.phone} />
                      </div>
                      <div>
                        <a
                          href={`mailto:${c.email}`}
                          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors truncate max-w-[210px]"
                        >
                          <Mail className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{c.email}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── HOTEL DIRECTORY SECTION ───────────────────────── */}
        <section className="py-14 md:py-20 bg-white relative">
          <div className="shell">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 border-b border-rule pb-6">
              <div>
                <HorizontalReveal>
                  <p className="eyebrow text-primary mb-2">Verified Directory</p>
                </HorizontalReveal>
                <MaskReveal delay={0.1}>
                  <h2 className="display-md">Budget Hotels Near GLA University</h2>
                </MaskReveal>
                <TextReveal delay={0.15}>
                  <p className="mt-2 text-sm text-foreground/60 max-w-xl">
                    Tariffs are approximate standard conference rates. Proximity varies from 1 Km
                    directly opposite campus to 18 Km across Mathura & Vrindavan.
                  </p>
                </TextReveal>
              </div>

              {/* View Switcher */}
              <div className="flex items-center gap-2 self-start md:self-end">
                <button
                  type="button"
                  onClick={() => setViewMode("cards")}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded border transition-colors",
                    viewMode === "cards"
                      ? "bg-primary text-white border-primary"
                      : "bg-surface text-foreground/70 border-rule hover:bg-muted",
                  )}
                >
                  Cards View
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("table")}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded border transition-colors",
                    viewMode === "table"
                      ? "bg-primary text-white border-primary"
                      : "bg-surface text-foreground/70 border-rule hover:bg-muted",
                  )}
                >
                  Table View
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-surface border border-rule rounded-lg p-4 mb-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "all", label: `All Hotels (${budgetHotels.length})` },
                  { id: "near", label: "Closest to Campus (< 10 Km)" },
                  { id: "vrindavan", label: "Vrindavan" },
                  { id: "mathura", label: "Mathura City" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() =>
                      setSelectedFilter(tab.id as "all" | "near" | "vrindavan" | "mathura")
                    }
                    className={cn(
                      "px-3 py-1.5 text-xs rounded-full transition-colors font-medium border",
                      selectedFilter === tab.id
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-foreground/70 border-rule hover:border-primary/40",
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative min-w-[240px] md:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search hotel, location, price..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-rule rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* HOTEL CARDS VIEW */}
            {viewMode === "cards" ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredHotels.length === 0 ? (
                  <div className="col-span-full py-12 text-center text-muted-foreground">
                    <p className="text-sm">No hotels found matching your search.</p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedFilter("all");
                      }}
                      className="mt-3 text-xs text-primary underline"
                    >
                      Clear search & filters
                    </button>
                  </div>
                ) : (
                  filteredHotels.map((hotel) => <HotelCard key={hotel.sNo} hotel={hotel} />)
                )}
              </div>
            ) : (
              /* HOTEL TABLE VIEW */
              <div className="overflow-x-auto border border-rule rounded-lg">
                <table className="w-full min-w-[760px] text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-muted/40 border-b border-rule">
                      <th className="py-3 px-4 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground w-12">
                        #
                      </th>
                      <th className="py-3 px-4 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                        Hotel Name
                      </th>
                      <th className="py-3 px-4 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                        Distance
                      </th>
                      <th className="py-3 px-4 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                        Price Approx. (₹)
                      </th>
                      <th className="py-3 px-4 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                        Contact Details
                      </th>
                      <th className="py-3 px-4 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                        Address
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rule">
                    {filteredHotels.map((hotel) => (
                      <tr key={hotel.sNo} className="hover:bg-primary/[0.02] transition-colors">
                        <td className="py-4 px-4 font-mono text-xs text-muted-foreground">
                          {String(hotel.sNo).padStart(2, "0")}
                        </td>
                        <td className="py-4 px-4 font-semibold text-foreground">{hotel.name}</td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span
                            className={cn(
                              "inline-block px-2 py-0.5 rounded text-[0.7rem] font-medium tracking-tight",
                              parseFloat(hotel.distance) <= 2
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                : parseFloat(hotel.distance) <= 10
                                  ? "bg-blue-100 text-blue-800 border border-blue-200"
                                  : "bg-neutral-100 text-neutral-700 border border-neutral-200",
                            )}
                          >
                            {hotel.distance}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-xs text-foreground/80 leading-relaxed">
                          {hotel.price}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex flex-col gap-1">
                            {hotel.contacts.map((c) => (
                              <div key={c} className="flex items-center gap-1.5">
                                <a
                                  href={`tel:${c.replace(/[^0-9]/g, "")}`}
                                  className="text-xs text-primary font-medium hover:underline inline-flex items-center gap-1"
                                >
                                  <Phone className="w-3 h-3 opacity-60" />
                                  {c}
                                </a>
                                <CopyButton value={c.replace(/[^0-9]/g, "")} />
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-xs text-muted-foreground max-w-xs leading-relaxed">
                          <p>{hotel.address}</p>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.name + ", " + hotel.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 text-[0.7rem] text-primary hover:underline inline-flex items-center gap-0.5"
                          >
                            <MapPin className="w-2.5 h-2.5" /> View on Map
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* ── IMPORTANT GUIDELINES & LOGISTICS ──────────────── */}
        <section className="bg-surface/70 py-16 border-t border-rule">
          <div className="shell">
            <div className="max-w-3xl mb-12">
              <HorizontalReveal>
                <p className="eyebrow text-primary mb-2">Delegate Logistics</p>
              </HorizontalReveal>
              <MaskReveal delay={0.1}>
                <h2 className="display-sm">Accommodation & Travel Information</h2>
              </MaskReveal>
              <TextReveal delay={0.2}>
                <p className="mt-3 text-sm text-foreground/60 leading-relaxed">
                  GLA University campus is located directly on National Highway 19 (NH-19
                  Mathura-Delhi road). Here are key points to help you plan your travel and stay
                  smoothly.
                </p>
              </TextReveal>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="p-6 bg-white border border-rule rounded-xl space-y-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <NavIcon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-base text-foreground">Getting to Campus</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  GLA University is located at 17 Km Stone, NH-19, Mathura-Delhi Road, Chaumuhan,
                  Mathura (281406). It is approx 15–20 minutes by auto or taxi from Mathura Junction
                  railway station.
                </p>
              </div>

              <div className="p-6 bg-white border border-rule rounded-xl space-y-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Bed className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-base text-foreground">Booking In Advance</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  February is peak pilgrimage season in Vrindavan and Mathura. Delegates are
                  strongly advised to contact the hotels and book their rooms early to avoid
                  last-minute rush.
                </p>
              </div>

              <div className="p-6 bg-white border border-rule rounded-xl space-y-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Info className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-base text-foreground">Mention IACS 2027</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  When booking with the listed hotels, please mention that you are a delegate for
                  the &ldquo;IACS 2027 International Conference at GLA University&rdquo; to
                  facilitate coordination.
                </p>
              </div>
            </div>

            {/* Bottom Actions banner */}
            <div className="mt-12 p-8 bg-primary-deep text-white rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-semibold">Also Exploring Mathura & Vrindavan?</h3>
                <p className="text-sm text-white/70 mt-1 max-w-xl">
                  Check out nearby destinations including Taj Mahal, Prem Mandir, Bankey Bihari
                  Temple, and Shri Krishna Janmabhoomi with our sightseeing guide.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/venue"
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-wider font-semibold border border-white/40 text-white hover:bg-white hover:text-primary-deep rounded transition-all"
                >
                  View Sightseeing Guide →
                </Link>
                <a
                  href={ACCOMMODATION_PDF_PATH}
                  download={ACCOMMODATION_PDF_FILENAME}
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-wider font-semibold bg-white text-primary-deep hover:bg-white/90 rounded transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </a>
              </div>
            </div>
          </div>
        </section>

        <SectionTransition variant="footer-entry" />
      </main>
      <SiteFooter />
    </div>
  );
}

function HotelCard({ hotel }: { hotel: BudgetHotel }) {
  const km = parseFloat(hotel.distance);
  const isSuperClose = km <= 2;
  const isClose = km <= 10;

  return (
    <div className="flex flex-col bg-white border border-rule rounded-xl overflow-hidden shadow-2xs hover:shadow-md hover:border-primary/30 transition-all group">
      {/* Top Header */}
      <div className="p-5 border-b border-rule/60 flex items-start justify-between gap-3 bg-surface/30">
        <div className="flex items-start gap-3">
          <span className="font-mono text-xs font-semibold text-primary/40 pt-0.5 tabular-nums">
            {String(hotel.sNo).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors leading-snug">
              {hotel.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3 shrink-0 text-primary/60" />
              <span>
                {hotel.address.split(",").slice(-3, -1).join(",").trim() || "Mathura Region"}
              </span>
            </p>
          </div>
        </div>

        <span
          className={cn(
            "shrink-0 px-2.5 py-1 rounded-full text-[0.6875rem] font-semibold tabular-nums border",
            isSuperClose
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : isClose
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : "bg-neutral-50 text-neutral-600 border-neutral-200",
          )}
        >
          {hotel.distance}
        </span>
      </div>

      {/* Body Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Tariff Info */}
        <div className="bg-primary/[0.03] border border-primary/10 rounded-lg p-3">
          <p className="text-[0.65rem] uppercase tracking-wider text-primary font-semibold mb-1 flex items-center gap-1">
            <Bed className="w-3 h-3" /> Tariff Approx (₹)
          </p>
          <p className="text-xs font-medium text-foreground leading-relaxed">{hotel.price}</p>
        </div>

        {/* Address */}
        <div>
          <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground font-medium mb-1">
            Address
          </p>
          <p className="text-xs text-foreground/75 leading-relaxed line-clamp-3">{hotel.address}</p>
        </div>

        {/* Phone numbers */}
        <div className="pt-3 border-t border-rule/50">
          <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground font-medium mb-2">
            Contact Details
          </p>
          <div className="flex flex-wrap gap-2">
            {hotel.contacts.map((contact) => {
              const cleanPhone = contact.replace(/[^0-9]/g, "");
              return (
                <div
                  key={contact}
                  className="inline-flex items-center gap-1 bg-surface border border-rule px-2.5 py-1 rounded-md text-xs"
                >
                  <a
                    href={`tel:${cleanPhone}`}
                    className="font-medium text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3 opacity-70" />
                    {contact}
                  </a>
                  <CopyButton value={cleanPhone} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Map link button */}
        <div className="pt-2">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.name + ", " + hotel.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary font-medium hover:underline inline-flex items-center gap-1"
          >
            <MapPin className="w-3.5 h-3.5" />
            Open on Google Maps <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>
      </div>
    </div>
  );
}
