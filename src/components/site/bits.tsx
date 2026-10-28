import type { ReactNode } from "react";

/* ---------- inline lucide-style icons ---------- */

type IconProps = { className?: string };

const makeIcon =
  (paths: ReactNode) =>
  ({ className }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths}
    </svg>
  );

export const IconSearch = makeIcon(
  <>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.34-4.34" />
  </>
);
export const IconMenu = makeIcon(
  <>
    <path d="M4 5h16" />
    <path d="M4 12h16" />
    <path d="M4 19h16" />
  </>
);
export const IconArrowRight = makeIcon(
  <>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </>
);
export const IconArrowUpRight = makeIcon(
  <>
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </>
);
export const IconArrowDownToLine = makeIcon(
  <>
    <path d="M12 17V3" />
    <path d="m6 11 6 6 6-6" />
    <path d="M19 21H5" />
  </>
);
export const IconShoppingBag = makeIcon(
  <>
    <path d="M16 10a4 4 0 0 1-8 0" />
    <path d="M3.103 6.034h17.794" />
    <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
  </>
);
export const IconSun = makeIcon(
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </>
);
export const IconMoon = makeIcon(
  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
);
export const IconHeart = makeIcon(
  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
);
export const IconBookmark = makeIcon(
  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
);
export const IconMessageCircle = makeIcon(
  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
);
export const IconMessageSquare = makeIcon(
  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
);
export const IconDownload = makeIcon(
  <>
    <path d="M12 15V3" />
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="m7 10 5 5 5-5" />
  </>
);
export const IconChevronDown = makeIcon(<path d="m6 9 6 6 6-6" />);
export const IconChevronUp = makeIcon(<path d="m18 15-6-6-6 6" />);
export const IconChevronLeft = makeIcon(<path d="m15 18-6-6 6-6" />);
export const IconChevronRight = makeIcon(<path d="m9 18 6-6-6-6" />);
export const IconPlus = makeIcon(
  <>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </>
);
export const IconExternalLink = makeIcon(
  <>
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </>
);
export const IconBox = makeIcon(
  <>
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </>
);
export const IconShare2 = makeIcon(
  <>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="m8.59 13.51 6.83 3.98" />
    <path d="m15.41 6.51-6.82 3.98" />
  </>
);
export const IconPaperclip = makeIcon(
  <>
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </>
);
export const IconImage = makeIcon(
  <>
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-5-5L5 21" />
  </>
);
export const IconX = makeIcon(
  <>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </>
);

/* ---------- shared building blocks ---------- */

/** Grey dashed placeholder for photos. */
export function ImageStub({
  label = "ФОТО · 4:3",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-1 border border-dashed border-foreground/25 bg-muted/70 ${className}`}
    >
      <IconImage className="h-5 w-5 text-muted-foreground/60" />
      <span className="font-mono text-[0.5625rem] font-bold uppercase tracking-[0.22em] text-muted-foreground/70">
        {label}
      </span>
    </div>
  );
}

/** Numbered dashed-rule section header, e.g. “02 — What lives here”. */
export function SectionRule({
  num,
  title,
  more,
}: {
  num?: string;
  title: string;
  more?: { href: string; label: string };
}) {
  return (
    <div className="flex items-baseline gap-3 border-b-2 border-dashed border-foreground/30 pb-2">
      <div className="flex items-center gap-2">
        {num ? (
          <span className="bg-primary px-1.5 py-1 font-mono text-[0.625rem] font-bold tracking-[0.12em] text-primary-foreground">
            {num}
          </span>
        ) : null}
        <span className="font-display uppercase text-sm text-foreground">{title}</span>
      </div>
      <span aria-hidden="true" className="h-px flex-1 bg-foreground/15" />
      {more ? (
        <a
          href={more.href}
          className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          {more.label}
        </a>
      ) : null}
    </div>
  );
}

/** Big page header card used by inner pages. */
export function PageHeader({
  badge,
  code,
  count,
  title,
  text,
}: {
  badge: string;
  code: string;
  count: string;
  title: string;
  text: string;
}) {
  return (
    <header className="rounded-sm border-2 border-foreground bg-card/85 p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-card-foreground/80">
        <span className="bg-foreground px-1.5 py-0.5 text-background">{badge}</span>
        <span>{code}</span>
        <span className="ml-auto opacity-50">·</span>
        <span>{count}</span>
      </div>
      <h1 className="mt-3 font-display text-[clamp(1.6rem,3.2vw,2.6rem)] uppercase leading-[1] tracking-tight text-card-foreground">
        {title}
      </h1>
      <p className="mt-2 max-w-[60ch] text-[0.9375rem] leading-relaxed text-card-foreground/80">
        {text}
      </p>
    </header>
  );
}
