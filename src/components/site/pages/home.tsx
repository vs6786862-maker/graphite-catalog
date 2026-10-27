"use client";

import { GROUPS, LATEST, stats, plural } from "@/lib/catalog";
import { SectionRule } from "../bits";
import { ItemCard } from "../item-card";
import { IconArrowRight, IconPlus } from "../bits";

const FEATURES = [
  {
    n: "01",
    title: "Свободный просмотр",
    text: "Каждая запись — демо-образец. Никаких платных уровней — вёрстка открыта для изучения, доработки и наполнения реальным контентом.",
  },
  {
    n: "02",
    title: "Единый формат записей",
    text: "Каждый товар описан по одному формату: название, метки, серия, цена и продавец. Ничего здесь не описывает реальный товар.",
  },
  {
    n: "03",
    title: "Открытый шаблон",
    text: "Демо построено по структуре магазина. Замените демо-данные своим ассортиментом — вёрстка, типографика и поведение останутся прежними.",
  },
];

export function HomePage() {
  return (
    <article className="mx-auto max-w-[1280px] px-4 py-8 lg:px-8 lg:py-12">
      {/* hero */}
      <header className="relative overflow-hidden rounded-[var(--radius)] bg-ink text-ink-foreground">
        <div className="livery-sweep pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative grid grid-cols-1 sm:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-4 px-5 py-7 sm:px-10 sm:py-10">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em]">
              <span className="bg-primary px-1.5 py-0.5 text-primary-foreground">Товары</span>
              <span>Все категории, все серии</span>
              <span aria-hidden="true">·</span>
              <span className="opacity-80">Открытый каталог · Свободный просмотр</span>
            </div>
            <h1 className="font-display text-[clamp(2.4rem,5.4vw,4.8rem)] uppercase leading-[0.92] tracking-[-0.005em] [text-wrap:balance]">
              Шаблон магазина
            </h1>
            <p className="max-w-[58ch] text-[1.0625rem] font-semibold leading-snug">
              Структурное демо — ничего реального, ничего выдуманного.
            </p>
            <p className="max-w-[58ch] text-[1.0625rem] leading-snug opacity-90">
              Страница воспроизводит вёрстку интернет-магазина физических товаров. Каждое
              название, цена и число здесь — демо-значение: карточки, фильтры и записи не описывают
              реальный товар. Подставьте свой ассортимент — и дизайн останется тем же.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <a
                href="#/catalog"
                className="group inline-flex items-center gap-2 rounded-[var(--radius)] border-2 border-primary bg-primary px-4 py-3 font-display text-[0.875rem] uppercase tracking-[0.2em] text-primary-foreground transition-transform active:translate-y-px"
              >
                В каталог
                <IconArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#/submit"
                className="group inline-flex items-center gap-2 rounded-[var(--radius)] border-2 border-ink-foreground/40 bg-transparent px-4 py-3 font-display text-[0.875rem] uppercase tracking-[0.2em] text-ink-foreground hover:bg-ink-foreground/10"
              >
                Добавить товар
                <IconArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
          <aside className="grid grid-cols-3 gap-px overflow-hidden border-t-2 border-ink-foreground/20 bg-ink-foreground/20 sm:grid-cols-1 sm:border-l-2 sm:border-t-0">
            {[
              { label: "Товары", value: String(stats.items) },
              { label: "Линейки", value: String(stats.groups) },
              { label: "Серии", value: String(stats.series) },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-start justify-center bg-ink px-5 py-4 text-ink-foreground sm:px-7 sm:py-6"
              >
                <span className="font-mono text-[0.625rem] font-bold uppercase tracking-[0.22em] opacity-75">
                  {s.label}
                </span>
                <span className="font-display text-[2rem] leading-none tabular-nums tracking-tight sm:text-[2.6rem]">
                  {s.value}
                </span>
              </div>
            ))}
          </aside>
        </div>
      </header>

      {/* 02 — what lives here */}
      <section className="mt-12">
        <SectionRule num="02" title="Что внутри" />
        <ol className="mt-5 grid gap-px overflow-hidden rounded-sm border-2 border-foreground bg-foreground sm:grid-cols-3">
          {FEATURES.map((f) => (
            <li key={f.n} className="flex flex-col gap-2 bg-card px-5 py-5 sm:px-6 sm:py-6">
              <span className="inline-flex items-center gap-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-card-foreground/80">
                <span className="rounded-[2px] bg-foreground px-1.5 py-0.5 text-background tabular-nums">
                  {f.n}
                </span>
                {f.title}
              </span>
              <p className="max-w-[42ch] text-[0.9375rem] leading-relaxed text-card-foreground/90">
                {f.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* 01 group index + 03 latest */}
      <section className="mt-12 grid items-start gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-5">
        <aside className="self-start rounded-sm border-2 border-foreground/40 bg-card/70 lg:sticky lg:top-24">
          <div className="flex items-center justify-between gap-3 border-b-2 border-dashed border-foreground/30 px-3 py-3">
            <div className="flex items-center gap-2">
              <span className="bg-primary px-1.5 py-1 font-mono text-[0.625rem] font-bold tracking-[0.12em] text-primary-foreground">
                01
              </span>
              <span className="font-display uppercase text-sm text-foreground">Индекс линеек</span>
            </div>
            <a
              href="#/items"
              className="font-mono text-[0.5625rem] font-bold uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground hover:underline"
            >
              Полный индекс
            </a>
          </div>
          <ol className="slim-scroll max-h-[52rem] overflow-y-auto">
            {GROUPS.map((g, gi) => (
              <li key={g.slug} className="border-b border-foreground/20 last:border-b-0">
                <details className="group/model">
                  <summary className="grid cursor-pointer list-none grid-cols-[1.5rem_minmax(0,1fr)_auto] items-center gap-2 px-3 py-3 outline-none transition-colors hover:bg-foreground/[0.04] focus-visible:bg-foreground/[0.06] [&::-webkit-details-marker]:hidden">
                    <span className="font-mono text-[0.5625rem] font-bold tabular-nums text-muted-foreground">
                      {String(gi + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-base uppercase leading-none tracking-tight group-open/model:text-primary">
                        {g.name}
                      </span>
                      <span className="mt-1 block truncate font-mono text-[0.5rem] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                        {g.years} · {g.series.length} {" "}
                        {plural(g.series.length, ["серия", "серии", "серий"])}
                      </span>
                    </span>
                    <IconPlus className="h-3.5 w-3.5 text-primary transition-transform group-open/model:rotate-45" />
                  </summary>
                  <div className="border-t border-foreground/15 px-3 pb-3 pl-9 pt-1">
                    <ol>
                      {g.series.map((s) => (
                        <li key={s.name}>
                          <a
                            href={`#/catalog?series=${encodeURIComponent(s.name)}`}
                            className="group/generation flex items-baseline justify-between gap-3 border-b border-foreground/15 py-2 outline-none last:border-b-0 hover:text-primary focus-visible:bg-foreground/[0.06] focus-visible:text-primary"
                          >
                            <span className="text-xs font-semibold leading-tight">{s.name}</span>
                            <span className="shrink-0 font-mono text-[0.475rem] tabular-nums tracking-[0.08em] text-muted-foreground group-hover/generation:text-primary">
                              {s.years}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ol>
                    <a
                      href={`#/catalog?group=${encodeURIComponent(g.name)}`}
                      className="mt-2 inline-flex items-center gap-1.5 font-mono text-[0.525rem] font-bold uppercase tracking-[0.1em] text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    >
                      Все товары {g.name}
                      <IconArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </details>
              </li>
            ))}
          </ol>
        </aside>

        <div className="space-y-12">
          <div>
            <div className="flex items-baseline gap-3 border-b-2 border-dashed border-foreground/30 pb-2">
              <div className="flex items-center gap-2">
                <span className="bg-primary px-1.5 py-1 font-mono text-[0.625rem] font-bold tracking-[0.12em] text-primary-foreground">
                  03
                </span>
                <span className="font-display uppercase text-sm text-foreground">
                  Новые поступления
                </span>
              </div>
              <span aria-hidden="true" className="h-px flex-1 bg-foreground/15" />
              <a
                href="#/catalog"
                className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Ещё →
              </a>
            </div>
            <div className="mt-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                {LATEST.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 CTA + coverage */}
      <section className="mt-12 grid gap-px overflow-hidden rounded-sm border-2 border-foreground bg-foreground/40 lg:grid-cols-[1fr_auto]">
        <div className="flex flex-col gap-3 bg-card/95 px-6 py-7 sm:px-9 sm:py-9">
          <div className="flex items-center gap-2">
            <span className="bg-primary px-1.5 py-1 font-mono text-[0.625rem] font-bold tracking-[0.12em] text-primary-foreground">
              05
            </span>
            <span className="font-display uppercase text-sm text-card-foreground">
              Есть свой товар?
            </span>
          </div>
          <h2 className="font-display text-[clamp(1.4rem,2.6vw,2rem)] uppercase leading-[1] tracking-tight text-card-foreground">
            Добавьте его в каталог.
          </h2>
          <p className="max-w-[58ch] text-[0.9375rem] leading-relaxed text-card-foreground/90">
            Форма добавления уже входит в шаблон. Заполните её реальными записями, когда
            замените демо-данные — все поля, состояния проверки и подтверждение уже
            настроены.
          </p>
          <div className="mt-1">
            <a
              href="#/submit"
              className="group inline-flex items-center gap-2 rounded-sm border-2 border-foreground bg-primary px-4 py-3 font-display text-[0.875rem] uppercase tracking-[0.2em] text-primary-foreground transition-transform active:translate-y-px"
            >
              Добавить товар
              <IconArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
        <aside className="bg-foreground px-6 py-7 text-background sm:px-9 sm:py-9 lg:min-w-[18rem]">
          <span className="font-mono text-[0.625rem] font-bold uppercase tracking-[0.22em] opacity-80">
            Ассортимент
          </span>
          <dl className="mt-3 space-y-2 font-mono text-[0.875rem] tabular-nums">
            {[
              ["Линейки", String(stats.groups)],
              ["Серии", String(stats.series)],
              ["Категории", String(stats.categories)],
              ["Товаров в каталоге", String(stats.items)],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline gap-2">
                <dt className="text-background/80">{k}</dt>
                <span className="h-px flex-1 translate-y-[-3px] border-b border-dotted border-background/40" />
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>
    </article>
  );
}
