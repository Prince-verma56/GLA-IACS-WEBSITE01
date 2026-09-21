import { Link } from "@tanstack/react-router";
import { conference, navigation } from "@/lib/conference";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Globe } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-primary-deep text-white/80">
      <div className="shell grid gap-12 py-20 md:grid-cols-12 lg:gap-8">
        <div className="md:col-span-12 lg:col-span-4">
          <p className="font-display text-xl font-semibold text-white">GLA University, Mathura</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed">
            Institute of Pharmaceutical Research
            <br />
            In association with {conference.society}
          </p>
          <p className="mt-8 text-sm leading-relaxed">
            {conference.dates}
            <br />
            {conference.venue}
          </p>
        </div>

        <div className="md:col-span-7 lg:col-span-5">
          <p className="eyebrow text-white/50">Navigation</p>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {navigation.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5 lg:col-span-3">
          <p className="eyebrow text-white/50">Conference secretariat</p>
          <p className="mt-5 text-sm">
            <a
              href={`mailto:${conference.email}`}
              className="border-b border-white/30 pb-0.5 transition-colors hover:text-white"
            >
              {conference.email}
            </a>
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/60">{conference.phone}</p>
          <div className="mt-8">
            <a
              href={conference.registrationFormUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-block border border-white/30 px-5 py-2.5 text-xs uppercase tracking-widest text-white/80 transition-all hover:border-white/60 hover:text-white"
            >
              Register Now →
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="shell flex flex-col gap-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 text-xs text-white/55">
            <p>{conference.name} — IACS India Section</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-white/55">Developed by</span>
            
            <a 
              href="https://anshumeshsaini.me" 
              target="_blank" 
              rel="noreferrer"
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 pr-3 pl-1 py-1 transition-all hover:bg-white/10 hover:border-white/20"
            >
              <Avatar className="h-6 w-6 border border-white/20">
                <AvatarFallback className="bg-primary text-[10px] text-white">AS</AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium text-white/80 group-hover:text-white transition-colors flex items-center gap-1.5">
                Anshumesh Saini
                <Globe className="h-3 w-3 opacity-70 group-hover:opacity-100 transition-opacity" />
              </span>
            </a>

            <a 
              href="https://princevermadev26-portfolio.vercel.app/" 
              target="_blank" 
              rel="noreferrer"
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 pr-3 pl-1 py-1 transition-all hover:bg-white/10 hover:border-white/20"
            >
              <Avatar className="h-6 w-6 border border-white/20">
                <AvatarImage src="https://github.com/Prince-verma56.png" alt="Prince Sharma" />
                <AvatarFallback className="bg-primary text-[10px] text-white">PS</AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium text-white/80 group-hover:text-white transition-colors flex items-center gap-1.5">
                Prince Sharma
                <Globe className="h-3 w-3 opacity-70 group-hover:opacity-100 transition-opacity" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}



