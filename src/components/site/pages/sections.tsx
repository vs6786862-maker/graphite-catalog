"use client";

import { useState } from "react";
import { CATEGORIES, GROUPS, REQUESTS, stats, plural } from "@/lib/catalog";
import { PageHeader, SectionRule, ImageStub, IconArrowRight } from "../bits";

/* ============ /items — grouping page (reference: /vehicles) ============ */

export function ItemsPage() {
  return (
    <article className="mx-auto max-w-[1280px] px-4 py-8 lg:px-8 lg:py-12">
      <PageHeader
        badge="ИНДЕКС"
        code="[НАЗВАНИЕ БРЕНДА] · ЛИНЕЙКИ"
        count={`${stats.groups} ${plural(stats.groups, ["линейка", "линейки", "линеек"])} · ${stats.series} ${plural(stats.series, ["серия", "серии", "серий"])}`}
        title="По линейкам"
        text="Все линейки товаров этого шаблона. Выберите линейку, чтобы увидеть назначенные ей товары по сериям. Все названия и даты — демо-значения."
      />
      <section className="mt-8">
        <div className="flex items-baseline gap-3 border-b-2 border-dashed border-foreground/30 pb-2">
          <div className="flex items-center gap-2">
            <span className="font-display uppercase text-sm text-foreground">В ассортименте</span>
          </div>
          <span aria-hidden="true" className="h-px flex-1 bg-foreground/15" />
          <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {stats.groups} {" "}
            {plural(stats.groups, ["линейка", "линейки", "линеек"])}
          </span>
        </div>
        <ol className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {GROUPS.map((g) => (
            <li key={g.slug}>
              <a
                href={`#/catalog?group=${encodeURIComponent(g.name)}`}
                className="group flex h-full flex-col gap-3 rounded-sm border-2 border-foreground/40 bg-card/85 p-5 transition-all hover:-translate-y-0.5 hover:border-foreground"
              >
                <div className="flex items-center justify-end font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-card-foreground/80">
                  <span>{g.years}</span>
                </div>
                <div className="font-display text-[clamp(1.6rem,2.8vw,2.2rem)] uppercase leading-[1] tracking-tight text-card-foreground">
                  {g.name}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {g.series.slice(0, 5).map((s) => (
                    <span
                      key={s.name}
                      className="rounded-[2px] border border-card-foreground/30 bg-card-foreground/5 px-1.5 py-0.5 font-mono text-[0.625rem] font-bold uppercase tracking-[0.18em] text-card-foreground"
                    >
                      {s.name}
                    </span>
                  ))}
                  {g.series.length > 5 ? (
                    <span className="font-mono text-[0.625rem] font-bold uppercase tracking-[0.18em] text-card-foreground/80">
                      +{g.series.length - 5}
                    </span>
                  ) : null}
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-dashed border-card-foreground/30 pt-3 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em]">
                  <span className="text-card-foreground/80">
                    {g.series.length} {" "}
                    {plural(g.series.length, ["серия", "серии", "серий"])}
                  </span>
                  <span className="inline-flex items-center gap-1 text-card-foreground">
                    Смотреть товары
                    <IconArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}

/* ============ /categories ============ */

export function CategoriesPage() {
  return (
    <article className="mx-auto max-w-[1280px] px-4 py-8 lg:px-8 lg:py-12">
      <PageHeader
        badge="ИНДЕКС"
        code="[НАЗВАНИЕ БРЕНДА] · КАРТА КАТЕГОРИЙ"
        count={`${stats.categories} ${plural(stats.categories, ["категория", "категории", "категорий"])}`}
        title="По категориям"
        text="Четыре демо-категории, у каждой свой набор подкатегорий. Выберите категорию, чтобы отфильтровать каталог. Все названия — обезличенные."
      />
      <section className="mt-8">
        <div className="flex items-baseline gap-3 border-b-2 border-dashed border-foreground/30 pb-2">
          <div className="flex items-center gap-2">
            <span className="font-display uppercase text-sm text-foreground">На карте</span>
          </div>
          <span aria-hidden="true" className="h-px flex-1 bg-foreground/15" />
          <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {stats.categories} {" "}
            {plural(stats.categories, ["категория", "категории", "категорий"])}
          </span>
        </div>
        <ol className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <a
                href={`#/catalog?category=${encodeURIComponent(c.name)}`}
                className="group flex h-full flex-col gap-3 rounded-sm border-2 border-foreground/40 bg-card/85 p-5 transition-all hover:-translate-y-0.5 hover:border-foreground"
              >
                <div className="flex items-center justify-between font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-card-foreground/80">
                  <span>Категория</span>
                  <span>
                    {c.subs.length} {" "}
                    {plural(c.subs.length, ["подкатегория", "подкатегории", "подкатегорий"])}
                  </span>
                </div>
                <div className="font-display text-[clamp(1.4rem,2.4vw,1.9rem)] uppercase leading-[1] tracking-tight text-card-foreground">
                  {c.name}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {c.subs.slice(0, 5).map((s) => (
                    <span
                      key={s}
                      className="rounded-[2px] border border-card-foreground/30 bg-card-foreground/5 px-1.5 py-0.5 font-mono text-[0.625rem] font-bold uppercase tracking-[0.18em] text-card-foreground"
                    >
                      {s}
                    </span>
                  ))}
                  {c.subs.length > 5 ? (
                    <span className="font-mono text-[0.625rem] font-bold uppercase tracking-[0.18em] text-card-foreground/80">
                      +{c.subs.length - 5}
                    </span>
                  ) : null}
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-dashed border-card-foreground/30 pt-3 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em]">
                  <span className="text-card-foreground/80">Смотреть товары</span>
                  <IconArrowRight className="h-3 w-3 text-card-foreground transition-transform group-hover:translate-x-0.5" />
                </div>
              </a>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}

/* ============ /requests (reference: /wanted) ============ */

export function RequestsPage() {
  return (
    <article className="mx-auto max-w-[1280px] px-4 py-8 lg:px-8 lg:py-12">
      <PageHeader
        badge="ЗАЯВКИ"
        code="[НАЗВАНИЕ БРЕНДА] · РЕЕСТР ЗАЯВОК"
        count={`${REQUESTS.length} из ${REQUESTS.length} заявок`}
        title="Товары, которых просят покупатели."
        text="Каждая запись ниже — демо-заявка: запись о товаре, которого пока нет в каталоге. Все названия и даты — условные."
      />
      <div className="mt-8 flex items-baseline gap-3 border-b-2 border-dashed border-foreground/30 pb-2">
        <div className="flex items-center gap-2">
          <span className="font-display uppercase text-sm text-foreground">Открытые заявки</span>
        </div>
        <span aria-hidden="true" className="h-px flex-1 bg-foreground/15" />
        <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          {REQUESTS.length} {" "}
          {plural(REQUESTS.length, ["заявка", "заявки", "заявок"])}
        </span>
      </div>
      <div className="mt-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {REQUESTS.map((r) => (
            <article
              key={r.id}
              className="group/card relative flex h-full flex-col overflow-hidden rounded-sm border-2 border-foreground/30 bg-card/90 transition-all hover:-translate-y-0.5 hover:border-foreground"
            >
              <span className="block">
                <span className="absolute left-2 top-2 z-10 inline-flex items-stretch overflow-hidden rounded-[var(--radius)] border-2 border-primary">
                  <span className="bg-ink px-1.5 py-0.5 font-mono text-[0.5625rem] font-bold uppercase leading-none tracking-[0.2em] text-ink-foreground">
                    Заявка
                  </span>
                  <span className="bg-primary px-1.5 py-0.5 font-mono text-[0.6875rem] font-bold tabular-nums leading-none tracking-tight text-primary-foreground">
                    {r.num}
                  </span>
                </span>
                <span className="relative block aspect-[4/3] overflow-hidden bg-foreground/5">
                  <ImageStub label="ФОТО · ОЖИДАЕТСЯ" />
                </span>
              </span>
              <div className="flex flex-1 flex-col gap-3 p-4">
                <div>
                  <h3 className="line-clamp-1 font-display text-lg uppercase leading-tight tracking-tight [text-wrap:balance] text-card-foreground">
                    {r.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 max-w-[40ch] text-[0.875rem] leading-snug text-card-foreground/80">
                    {r.desc}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.18em]">
                  <span className="rounded-[2px] bg-foreground px-1.5 py-0.5 text-background">
                    Открыта
                  </span>
                  <span className="rounded-[2px] border border-card-foreground/40 bg-card-foreground/5 px-1.5 py-0.5 text-card-foreground">
                    {r.category}
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.16em]">
                  <span className="shrink-0 rounded-[2px] bg-foreground px-1.5 py-0.5 text-[0.6rem] font-bold tracking-[0.18em] text-background">
                    Серия
                  </span>
                  <span className="min-w-0 whitespace-normal break-words text-card-foreground/80">
                    {r.series}
                  </span>
                </div>
                <div className="mt-auto flex items-center border-t border-dashed border-card-foreground/30 pt-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em]">
                  <span className="text-card-foreground/80">заявка от {r.date}</span>
                  <span className="ml-auto truncate text-card-foreground/80">от {r.author}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center gap-3 border-t-2 border-dashed border-foreground/30 pt-6">
          <p className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-card-foreground/80">
            Конец списка · {REQUESTS.length} {" "}
            {plural(REQUESTS.length, ["заявка", "заявки", "заявок"])}
          </p>
        </div>
      </div>
    </article>
  );
}

/* ============ /services (reference: /printing) ============ */

const STEPS = [
  {
    n: "01",
    title: "Заявка",
    text: "Демо-шаг. Опишите, как продавец регистрируется, заполняет контакты и условия работы.",
  },
  {
    n: "02",
    title: "Подключение выплат",
    text: "Демо-шаг. Опишите, как подключаются выплаты и когда деньги поступают продавцу.",
  },
  {
    n: "03",
    title: "Настройка условий",
    text: "Демо-шаг. Задайте зоны доставки, тарифы и охват один раз, затем управляйте исключениями по товарам.",
  },
];

const REQUIREMENTS = [
  "Собственный склад или поставки товара.",
  "Хотя бы одно условие доставки, которое вы выполняете стабильно.",
  "Контактный адрес и счёт для выплат.",
];

const FAQ = [
  {
    q: "Сколько занимает модерация?",
    a: "Демо-ответ. Замените реальными сроками проверки, когда шаблон будет наполнен.",
  },
  {
    q: "Доставку нужно организовывать самому?",
    a: "Демо-ответ. Опишите процесс доставки и зону ответственности площадки.",
  },
  {
    q: "Возможен ли самовывоз?",
    a: "Демо-ответ. Объясните, как включается самовывоз и как он отображается в объявлениях.",
  },
  {
    q: "Можно добавить условия позже?",
    a: "Демо-ответ. Опишите, как со временем расширяются условия доставки и оплаты.",
  },
];

export function ServicesPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <article className="mx-auto max-w-[1280px] px-4 py-8 lg:px-8 lg:py-12">
      {/* hero */}
      <header className="relative overflow-hidden rounded-[var(--radius)] bg-ink text-ink-foreground">
        <div className="livery-sweep pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative grid grid-cols-1 sm:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-4 px-5 py-7 sm:px-10 sm:py-10">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em]">
              <span className="bg-foreground px-1.5 py-0.5 text-background">Сервисы</span>
              <span>[НАЗВАНИЕ БРЕНДА] · ПАРТНЁРСКАЯ ПРОГРАММА</span>
              <span>·</span>
              <span className="opacity-80">Открытый набор</span>
            </div>
            <h1 className="font-display text-[clamp(2rem,4.6vw,3.8rem)] uppercase leading-[0.95] tracking-[-0.005em] [text-wrap:balance]">
              Продавайте товары на площадке.
            </h1>
            <p className="max-w-[58ch] text-[1.0625rem] leading-snug">
              Демо-текст: опишите сервис — настройте условия один раз, управляйте своими
              товарами и получайте выплаты после доставки заказов.
            </p>
            <div className="flex flex-wrap gap-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.14em]">
              <span className="rounded-[2px] border border-foreground/50 px-2 py-1">
                Поддержка входит в расчёт
              </span>
              <span className="rounded-[2px] border border-foreground/50 px-2 py-1">
                Цена уточняется перед оплатой
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              <a
                href="#/services/apply"
                className="group inline-flex items-center gap-2 rounded-sm border-2 border-foreground bg-foreground px-4 py-3 font-display text-[0.875rem] uppercase tracking-[0.2em] text-background transition-transform active:translate-y-px"
              >
                Стать продавцом
                <IconArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#/services/listings"
                className="inline-flex items-center gap-2 rounded-sm border-2 border-foreground bg-transparent px-4 py-3 font-display text-[0.875rem] uppercase tracking-[0.2em] text-ink-foreground hover:bg-ink-foreground/10"
              >
                Уже продавец? Кабинет
              </a>
            </div>
          </div>
          <aside className="grid grid-cols-3 gap-px overflow-hidden border-t-2 border-foreground/80 bg-foreground/80 sm:grid-cols-1 sm:border-l-2 sm:border-t-0">
            {[
              { label: "Выплата", value: "94%" },
              { label: "Модерация", value: "1–2 дн" },
              { label: "Старт", value: "~10 мин" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-start justify-center bg-foreground px-5 py-4 text-background sm:px-7 sm:py-6"
              >
                <span className="font-mono text-[0.625rem] font-bold uppercase tracking-[0.22em] opacity-80">
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

      {/* 01 how it works */}
      <section className="mt-10">
        <SectionRule num="01" title="Как это работает" />
        <ol className="mt-5 grid gap-px overflow-hidden rounded-sm border-2 border-foreground bg-foreground sm:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="flex flex-col gap-2 bg-card px-5 py-5 sm:px-6 sm:py-6">
              <span className="inline-flex items-center gap-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-card-foreground/80">
                <span className="rounded-[2px] bg-foreground px-1.5 py-0.5 text-background tabular-nums">
                  {s.n}
                </span>
                <span className="font-display text-card-foreground">{s.title}</span>
              </span>
              <p className="max-w-[42ch] text-[0.9375rem] leading-relaxed text-card-foreground/90">
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* 02 what you need */}
      <section className="mt-12">
        <SectionRule num="02" title="Что понадобится" />
        <ul className="mt-5 max-w-[64ch] space-y-2 font-mono text-[0.875rem]">
          {REQUIREMENTS.map((r, i) => (
            <li
              key={r}
              className="flex items-baseline gap-3 border-b border-dashed border-foreground/30 pb-2 last:border-b-0"
            >
              <span className="rounded-[2px] bg-foreground px-1.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-[0.18em] tabular-nums text-background">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="leading-snug text-foreground/90">{r}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 03 payouts */}
      <section className="mt-12 grid gap-px overflow-hidden rounded-sm border-2 border-foreground bg-foreground/40 lg:grid-cols-[1fr_auto]">
        <div className="flex flex-col gap-3 bg-card/95 px-6 py-7 sm:px-9 sm:py-9">
          <div className="flex items-center gap-2">
            <span className="bg-primary px-1.5 py-1 font-mono text-[0.625rem] font-bold tracking-[0.12em] text-primary-foreground">
              03
            </span>
            <span className="font-display uppercase text-sm text-card-foreground">
              Выплаты и комиссии
            </span>
          </div>
          <h2 className="font-display text-[clamp(1.4rem,2.6vw,2rem)] uppercase leading-[1] tracking-tight text-card-foreground">
            Замораживаются до доставки.
          </h2>
          <p className="max-w-[58ch] text-[0.9375rem] leading-relaxed text-card-foreground/90">
            Демо-текст: покупатель платит при оформлении заказа. Деньги хранятся до
            подтверждения доставки, затем выплачиваются продавцу за вычетом комиссии
            площадки. Автовыплата после гарантийного окна.
          </p>
        </div>
        <aside className="bg-foreground px-6 py-7 text-background sm:px-9 sm:py-9 lg:min-w-[16rem]">
          <span className="font-mono text-[0.625rem] font-bold uppercase tracking-[0.22em] opacity-80">
            Условия выплат
          </span>
          <dl className="mt-3 space-y-2 font-mono text-[0.875rem] tabular-nums">
            {[
              ["Комиссия сервиса", "6,2%"],
              ["Гарантийное окно", "7 дней"],
              ["Доставка", "Включена"],
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

      {/* 04 questions */}
      <section className="mt-12">
        <SectionRule num="04" title="Вопросы и ответы" />
        <div className="mt-4 flex w-full max-w-[68ch] flex-col">
          {FAQ.map((f, i) => (
            <div
              key={f.q}
              className="border-b border-dashed border-foreground/30 last:border-b-0"
            >
              <h3 className="flex">
                <button
                  type="button"
                  onClick={() => setOpen((o) => (o === i ? null : i))}
                  aria-expanded={open === i}
                  className="flex flex-1 items-start justify-between py-4 text-left font-display text-base uppercase tracking-[0.04em] text-foreground"
                >
                  {f.q}
                  <span className="ml-2 mt-1 font-mono text-xs text-muted-foreground">
                    {open === i ? "−" : "+"}
                  </span>
                </button>
              </h3>
              {open === i ? (
                <p className="pb-4 text-sm leading-relaxed text-foreground/80">{f.a}</p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* 05 ready */}
      <section className="mt-12 flex flex-col items-start gap-4 rounded-sm border-2 border-foreground bg-card/95 p-6 sm:p-8">
        <div className="flex items-center gap-2">
          <span className="bg-primary px-1.5 py-1 font-mono text-[0.625rem] font-bold tracking-[0.12em] text-primary-foreground">
            05
          </span>
          <span className="font-display uppercase text-sm text-card-foreground">Готовы?</span>
        </div>
        <h2 className="font-display text-[clamp(1.4rem,2.6vw,2rem)] uppercase leading-[1] tracking-tight text-card-foreground">
          Есть ассортимент? Подайте заявку.
        </h2>
        <a
          href="#/services/apply"
          className="group inline-flex items-center gap-2 rounded-sm border-2 border-foreground bg-primary px-5 py-3 font-display text-[0.875rem] uppercase tracking-[0.2em] text-primary-foreground transition-transform active:translate-y-px"
        >
          Стать продавцом
          <IconArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
        </a>
      </section>
    </article>
  );
}
