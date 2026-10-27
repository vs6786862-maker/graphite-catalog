"use client";

import { useState } from "react";
import { findItem, fmtPrice, plural, STOCK_LABEL } from "@/lib/catalog";
import { addToCart } from "@/lib/cart";
import {
  ImageStub,
  IconArrowRight,
  IconBookmark,
  IconChevronLeft,
  IconChevronRight,
  IconHeart,
  IconMessageSquare,
  IconPaperclip,
  IconShare2,
  IconShoppingBag,
} from "../bits";

export function ItemPage({ slug }: { slug: string }) {
  const item = findItem(slug);
  const [plate, setPlate] = useState(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [added, setAdded] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [msg, setMsg] = useState("");

  const onAdd = () => {
    if (!item) return;
    addToCart(item.slug);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  if (!item) {
    return (
      <article className="mx-auto max-w-[1280px] px-4 py-8 lg:px-8 lg:py-12">
        <div className="rounded-sm border-2 border-dashed border-foreground/40 bg-card/60 px-6 py-14 text-center">
          <p className="font-display text-xl uppercase tracking-[0.18em] text-card-foreground">
            Запись не найдена
          </p>
          <p className="mx-auto mt-2 max-w-[44ch] font-mono text-[0.75rem] uppercase tracking-[0.18em] text-card-foreground">
            По этому адресу записи нет. Откройте каталог товаров.
          </p>
          <a
            href="#/catalog"
            className="mt-5 inline-flex items-center gap-2 rounded-sm border-2 border-foreground bg-primary px-4 py-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-primary-foreground"
          >
            Открыть каталог <IconArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </article>
    );
  }

  const kit = [
    { name: "Товар в упаковке", note: "основная позиция", qty: "1 ШТ" },
    { name: "Защитная упаковка", note: "демо-коробка", qty: "1 ШТ" },
    { name: "Паспорт изделия", note: "демо-вкладыш", qty: "1 ШТ" },
  ];
  const plates = 2;

  return (
    <article className="mx-auto max-w-[1280px] px-4 py-8 lg:px-8 lg:py-12">
      {/* shipping-label header */}
      <header className="relative grid grid-cols-1 gap-0 overflow-hidden rounded-sm border-2 border-foreground bg-accent text-accent-foreground shadow-[inset_0_0_0_2px_color-mix(in_oklab,var(--color-foreground)_8%,transparent),0_4px_0_0_color-mix(in_oklab,var(--color-foreground)_70%,transparent)] sm:grid-cols-[auto_1fr]">
        <div className="flex flex-col items-center justify-center gap-1 border-r-2 border-foreground/80 bg-foreground px-6 py-6 text-background sm:py-8">
          <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.24em] opacity-80">
            Товар №
          </span>
          <span className="font-display text-[3.6rem] leading-none tabular-nums tracking-tight sm:text-[4.4rem]">
            {String(item.id + 1).padStart(4, "0").slice(1)}
          </span>
        </div>
        <div className="flex flex-col gap-3 px-5 py-5 sm:px-8 sm:py-7">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em]">
            <span className="bg-foreground px-1.5 py-0.5 text-background">Продавец</span>
            <span>[НАЗВАНИЕ БРЕНДА]</span>
            <span>→</span>
            <span className="bg-foreground px-1.5 py-0.5 text-background">Получатель</span>
            <span>[ПОКУПАТЕЛЬ]</span>
            <span className="ml-auto opacity-50">·</span>
            <span className="opacity-70">обновлено {item.date}</span>
          </div>
          <h1 className="font-display text-[clamp(1.9rem,3.8vw,3.4rem)] uppercase leading-[0.95] tracking-tight">
            {item.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 font-mono text-[0.75rem] font-bold uppercase tracking-[0.18em]">
            <span className="rounded-[2px] bg-foreground px-2 py-1 text-background">{item.tags}</span>
            <span className="rounded-[2px] border-2 border-foreground/80 px-2 py-0.5">
              {fmtPrice(item.price)}
            </span>
            <span className="rounded-[2px] border-2 border-foreground/80 px-2 py-0.5">
              {STOCK_LABEL[item.stock]}
            </span>
            <span className="rounded-[2px] border-2 border-foreground/80 px-2 py-0.5 tabular-nums">
              {item.sold} {plural(item.sold, ["продажа", "продажи", "продаж"])}
            </span>
            <a
              href="#/categories"
              className="rounded-[2px] border-2 border-foreground/80 px-2 py-0.5 hover:bg-foreground hover:text-background"
            >
              {item.category}
            </a>
          </div>
        </div>
      </header>

      {/* network aside */}
      <aside className="mt-4 flex flex-col gap-2 rounded-sm border border-foreground/30 bg-card/70 px-4 py-3 text-foreground sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-[0.625rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Общая сетевая запись
          </p>
          <p className="mt-1 text-[0.8125rem] leading-snug text-foreground/80">
            Демо-блок. Здесь размещается перекрёстная ссылка на общую запись каталога.
          </p>
        </div>
        <a
          href="#/simple/network"
          className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-foreground underline decoration-foreground/35 underline-offset-4 hover:decoration-foreground"
        >
          Смотреть
          <span className="hidden sm:inline">общую запись</span>
          <IconArrowRight className="h-3.5 w-3.5" />
        </a>
      </aside>

      {/* карточка товара (табличка) */}
      <section className="mt-6 border border-border bg-card text-card-foreground">
        <header className="flex items-center justify-between border-b border-border/50 bg-secondary px-3 py-2">
          <span className="font-mono text-[0.6875rem] font-bold tracking-[0.16em]">
            КАРТОЧКА ТОВАРА
          </span>
          <span className="font-mono text-[0.6875rem] font-bold">
            АРТ. <span>{item.num}</span>
          </span>
        </header>
        <dl className="px-3 py-3 font-mono text-xs">
          {[
            ["ТОВАР", item.title, true],
            ["АРТИКУЛ", item.num, false],
            ["СЕРИЯ", `${item.series} · ${item.group}`, true],
          ].map(([dt, dd, up], i) => (
            <div
              key={dt as string}
              className={`flex gap-3 border-b border-dotted border-muted-foreground/50 py-1 ${
                i === 2 ? "border-b-0" : ""
              }`}
            >
              <dt className="w-28 shrink-0 tracking-[0.1em] opacity-65">{dt}</dt>
              <dd className={`font-bold ${up ? "uppercase" : ""}`}>{dd}</dd>
            </div>
          ))}
        </dl>
        <footer className="flex justify-between border-t border-border bg-muted px-3 py-1">
          <span className="font-mono text-[0.625rem] tracking-[0.12em]">
            [БРЕНД] · КАРТОЧКА ТОВАРА
          </span>
          <span className="font-mono text-[0.625rem] tracking-[0.12em]">
            РЕД <span>2026</span>
          </span>
        </footer>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {/* left column */}
        <section className="space-y-6">
          {/* фото товара */}
          <div className="relative overflow-hidden rounded-sm border-2 border-foreground bg-foreground/5 p-4">
            <div
              className="pointer-events-none absolute -right-12 -top-6 rotate-12 select-none font-display text-[5rem] uppercase leading-none tracking-tight text-foreground/10"
              aria-hidden="true"
            >
              ОБРАЗЕЦ
            </div>
            <div className="space-y-2">
              <div className="flex aspect-[4/3] items-center justify-center rounded-lg bg-muted">
                <ImageStub label="ФОТО ТОВАРА · 4:3" />
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t-2 border-dashed border-foreground/40 pt-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
              <span>
                <strong className="text-foreground">АРТ.</strong> · ДЕМО / {item.num}
              </span>
              <span>
                УПАКОВКА · 1 ШТ
              </span>
              <span>ДЕМО · БЕЗ ДАННЫХ</span>
            </div>
          </div>

          {/* plates */}
          <section className="rounded-sm border-2 border-foreground bg-card/85 p-5">
            <div className="flex items-center justify-between border-b-2 border-dashed border-card-foreground/40 pb-2">
              <div className="flex items-center gap-2">
                <span className="font-display uppercase text-sm text-card-foreground">
                  Фотографии товара
                </span>
              </div>
              <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-card-foreground/80">
                <span>{plates}</span> {" "}
                {plural(plates, ["кадр", "кадра", "кадров"])}
              </span>
            </div>
            <div className="mt-4">
              <div className="space-y-3">
                <div className="relative">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm border-2 border-foreground bg-foreground/5">
                    <ImageStub label={`ФОТО · КАДР ${String(plate + 1).padStart(2, "0")}`} />
                    <button
                      type="button"
                      onClick={() => setPlate((p) => (p - 1 + plates) % plates)}
                      className="absolute left-3 top-1/2 inline-flex h-9 -translate-y-1/2 items-center gap-1 rounded-sm border-2 border-foreground bg-background px-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-foreground transition-transform hover:bg-card active:translate-y-[calc(-50%+1px)]"
                    >
                      <IconChevronLeft className="h-3.5 w-3.5 shrink-0" />
                      Назад
                    </button>
                    <button
                      type="button"
                      onClick={() => setPlate((p) => (p + 1) % plates)}
                      className="absolute right-3 top-1/2 inline-flex h-9 -translate-y-1/2 items-center gap-1 rounded-sm border-2 border-foreground bg-background px-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-foreground transition-transform hover:bg-card active:translate-y-[calc(-50%+1px)]"
                    >
                      Вперёд
                      <IconChevronRight className="h-3.5 w-3.5 shrink-0" />
                    </button>
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-[2px] bg-foreground px-2 py-0.5 font-mono text-[0.625rem] font-bold uppercase leading-none tracking-[0.22em] text-background">
                      <span className="opacity-70">Кадр</span>
                      <span className="tabular-nums">
                        {String(plate + 1).padStart(2, "0")} / {String(plates).padStart(2, "0")}
                      </span>
                    </span>
                  </div>
                  <div className="mt-2 flex items-baseline justify-between gap-3 border-t-2 border-dashed border-foreground/40 pt-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em]">
                    <span className="font-bold text-foreground">
                      Кадр {String(plate + 1).padStart(2, "0")} /{" "}
                      {String(plates).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-right text-muted-foreground">
                      <span className="opacity-60">Подпись не задана</span>
                    </span>
                  </div>
                </div>
                <ol className="flex gap-2 overflow-x-auto">
                  {Array.from({ length: plates }, (_, i) => (
                    <li key={i}>
                      <button
                        type="button"
                        onClick={() => setPlate(i)}
                        className={`group/thumb relative h-16 w-16 shrink-0 overflow-hidden rounded-[2px] border-2 transition-colors ${
                          i === plate
                            ? "border-foreground"
                            : "border-foreground/20 hover:border-foreground/60"
                        }`}
                      >
                        <ImageStub label={`${i + 1}`} />
                        <span
                          className={`absolute bottom-0 left-0 right-0 px-1 py-0.5 font-mono text-[0.5625rem] font-bold uppercase leading-none tracking-[0.18em] tabular-nums ${
                            i === plate
                              ? "bg-foreground text-background"
                              : "bg-foreground/70 text-background group-hover/thumb:bg-foreground"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* комплектация */}
          <section className="rounded-sm border-2 border-foreground bg-card/85 p-5">
            <div className="flex items-center justify-between border-b-2 border-dashed border-card-foreground/40 pb-2">
              <div className="flex items-center gap-2">
                <span className="font-display uppercase text-sm text-card-foreground">
                  Комплектация
                </span>
              </div>
              <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-card-foreground/80">
                КОМПЛЕКТ-{item.num}
              </span>
            </div>
            <ul className="mt-3 space-y-2 font-mono text-[0.875rem]">
              {kit.map((f, i) => (
                <li
                  key={f.name}
                  className={`grid grid-cols-[2rem_1fr_auto] items-center gap-x-3 border-b border-dashed border-card-foreground/30 py-2 last:border-b-0 sm:grid-cols-[2rem_1fr_auto_auto] ${
                    i === kit.length - 1 ? "pt-2" : ""
                  }`}
                >
                  <span className="font-bold tabular-nums text-card-foreground/80">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>
                  <span className="truncate font-semibold text-card-foreground">{f.name}</span>
                  <span className="hidden max-w-[16ch] truncate tabular-nums text-card-foreground/80 sm:inline">
                    {f.note}
                  </span>
                  <span className="rounded-[2px] bg-foreground px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-[0.18em] text-background">
                    {f.qty}
                  </span>
                </li>
              ))}
              <li className="grid grid-cols-[2rem_1fr_auto] items-center gap-x-3 py-2 text-card-foreground">
                <span className="font-bold tabular-nums text-card-foreground/80">
                  [{String(kit.length + 1).padStart(2, "0")}]
                </span>
                <span className="font-semibold">Габариты упаковки</span>
                <span className="tabular-nums">000 × 000 × 000 мм</span>
              </li>
              <li className="grid grid-cols-[2rem_1fr_auto] items-center gap-x-3 text-card-foreground">
                <span className="font-bold tabular-nums text-card-foreground/80">
                  [{String(kit.length + 2).padStart(2, "0")}]
                </span>
                <span className="font-semibold">Вес брутто</span>
                <span className="tabular-nums">0.000 кг</span>
              </li>
            </ul>
          </section>

          {/* описание */}
          <section className="rounded-sm border-2 border-foreground bg-card/85 p-5">
            <div className="flex items-center justify-between border-b-2 border-dashed border-card-foreground/40 pb-2">
              <div className="flex items-center gap-2">
                <span className="font-display uppercase text-sm text-card-foreground">Описание</span>
              </div>
              <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-card-foreground/80">
                BY <span>{item.author.split(" (")[0].toUpperCase().replace(" ", "")}</span>
              </span>
            </div>
            <div className="mt-4 space-y-4 text-[0.95rem] leading-relaxed text-card-foreground [&>p]:max-w-[64ch]">
              <p>
                {item.desc} Страница записи повторяет образец целиком: демо-фото,
                кадры, комплектация, описание, панель покупки и отзывы. Все размеры, даты и
                цены здесь — условные.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-dashed border-card-foreground/30 pt-3 text-[0.875rem]">
              <a
                href="#/simple/source"
                className="ml-auto font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-card-foreground underline decoration-card-foreground/40 underline-offset-4 hover:decoration-card-foreground"
              >
                Первоисточник ↗
              </a>
            </div>
          </section>
        </section>

        {/* right column */}
        <aside className="space-y-6 lg:sticky lg:top-[4.5rem] lg:self-start">
          {/* покупка */}
          <section className="space-y-3 rounded-sm border-2 border-foreground bg-foreground p-4 text-background">
            <div className="flex items-center justify-between border-b-2 border-dashed border-background/40 pb-2">
              <span className="font-display text-base uppercase tracking-[0.18em]">
                К покупке
              </span>
              <span className="font-mono text-[0.625rem] font-bold uppercase tracking-[0.2em] opacity-80">
                {item.date}
              </span>
            </div>
            <div className="flex items-end justify-between gap-3">
              <span className="font-display text-3xl font-bold tabular-nums leading-none tracking-tight text-background">
                {fmtPrice(item.price)}
              </span>
              <span className="rounded-[2px] bg-background px-2 py-0.5 font-mono text-[0.5625rem] font-bold uppercase tracking-[0.18em] text-foreground">
                {STOCK_LABEL[item.stock]}
              </span>
            </div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={onAdd}
                className="group flex w-full items-center gap-3 rounded-sm border-2 border-foreground bg-accent px-4 py-3 text-accent-foreground transition-transform active:translate-y-px"
              >
                <span className="bg-foreground px-2 py-0.5 font-display text-[0.6875rem] uppercase tracking-[0.22em] text-background">
                  КОРЗ
                </span>
                <span className="truncate font-display text-base uppercase leading-none tracking-tight">
                  {added ? "Добавлено ✓" : "Добавить в корзину"}
                </span>
                <span className="ml-auto inline-flex shrink-0 items-center gap-1 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.18em] opacity-80">
                  <IconShoppingBag className="h-3.5 w-3.5 shrink-0" />
                </span>
              </button>
              <div className="grid gap-2 sm:grid-cols-2">
                <a
                  href="#/simple/delivery"
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-sm border border-background/50 bg-background/10 px-3 py-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-background transition-colors hover:bg-background/20"
                >
                  Доставка и оплата
                </a>
                <a
                  href="#/simple/terms"
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-sm border border-background/50 bg-background/10 px-3 py-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-background transition-colors hover:bg-background/20"
                >
                  Гарантия и возврат
                </a>
              </div>
            </div>
            <div className="space-y-2">
              <a
                href="#/cart"
                className="group flex w-full items-center gap-3 rounded-sm border-2 border-foreground bg-primary px-4 py-3 text-primary-foreground transition-transform active:translate-y-px"
              >
                <span className="bg-foreground px-2 py-0.5 font-display text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-background">
                  ЗАКАЗ
                </span>
                <span className="font-display text-base font-bold uppercase leading-none tracking-tight">
                  Оформить заказ
                </span>
                <span className="ml-auto inline-flex items-center gap-1 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.18em]">
                  Перейти
                  <IconArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            </div>
            <div className="border-t border-dashed border-background/30 pt-2">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLiked((v) => !v)}
                  className={`group/stamp inline-flex h-9 items-center gap-2 rounded-[2px] border-2 px-2.5 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.18em] transition-transform active:translate-y-px ${
                    liked
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-background/40 bg-transparent text-background hover:bg-background/10"
                  }`}
                >
                  <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center">
                    <IconHeart className="h-3.5 w-3.5" />
                  </span>
                  <span className="leading-none">Нравится</span>
                  <span className="h-4 w-px bg-current opacity-30" />
                  <span className="leading-none tabular-nums">{item.likes + (liked ? 1 : 0)}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSaved((v) => !v)}
                  className={`group/stamp inline-flex h-9 items-center gap-2 rounded-[2px] border-2 px-2.5 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.18em] transition-transform active:translate-y-px ${
                    saved
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-background/40 bg-transparent text-background hover:bg-background/10"
                  }`}
                >
                  <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center">
                    <IconBookmark className="h-3.5 w-3.5" />
                  </span>
                  <span className="leading-none">{saved ? "В избранном" : "В избранное"}</span>
                </button>
                <button
                  type="button"
                  className="group/stamp inline-flex h-9 items-center gap-2 rounded-[2px] border-2 border-background/40 bg-transparent px-2.5 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-background transition-transform hover:bg-background/10 active:translate-y-px"
                >
                  <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center">
                    <IconMessageSquare className="h-3.5 w-3.5" />
                  </span>
                  <span className="leading-none">Отзыв</span>
                </button>
                <span className="group/stamp inline-flex h-9 items-center gap-2 rounded-[2px] border-2 border-background/40 bg-transparent px-2.5 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-background transition-transform hover:bg-background/10 active:translate-y-px">
                  <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center">
                    <IconShare2 className="h-3.5 w-3.5" />
                  </span>
                  <span className="leading-none">Поделиться</span>
                </span>
              </div>
            </div>
          </section>

          {/* линейка */}
          <section className="rounded-sm border-2 border-foreground bg-card/85 p-4">
            <div className="flex items-center gap-2">
              <span className="font-display uppercase text-[0.6875rem] text-card-foreground">
                Линейка
              </span>
            </div>
            <ul className="mt-3 space-y-2 font-mono text-[0.8125rem]">
              <li className="flex items-baseline gap-2 border-b border-dashed border-card-foreground/30 pb-1.5 last:border-b-0">
                <span className="rounded-[2px] bg-foreground px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-background">
                  Серия
                </span>
                <a
                  href={`#/catalog?series=${encodeURIComponent(item.series)}`}
                  className="font-semibold text-card-foreground underline decoration-card-foreground/30 underline-offset-4 hover:decoration-card-foreground"
                >
                  {item.series} · {item.group}
                </a>
                <span className="ml-auto tabular-nums text-card-foreground/80">{item.years}</span>
              </li>
            </ul>
          </section>

          {/* продавец */}
          <section className="rounded-sm border-2 border-foreground bg-card/85 p-4">
            <div className="flex items-center gap-2">
              <span className="font-display uppercase text-[0.6875rem] text-card-foreground">
                Продавец
              </span>
            </div>
            <p className="mt-3 text-[0.9375rem]">
              <a
                href="#/profile"
                className="font-semibold text-card-foreground underline decoration-card-foreground/40 underline-offset-4 hover:decoration-card-foreground"
              >
                {item.author}
              </a>
              <span className="ml-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-card-foreground/80">
                · {item.date}
              </span>
            </p>
            <p className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-card-foreground/80">
              Опубликовано <span>{item.date}</span>
            </p>
          </section>
        </aside>
      </div>

      {/* отзывы */}
      <section className="mt-10 rounded-sm border-2 border-foreground bg-card/85 p-6">
        <div className="flex items-baseline justify-between border-b-2 border-dashed border-card-foreground/40 pb-3">
          <div className="flex items-center gap-2">
            <span className="font-display uppercase text-sm text-card-foreground">
              Отзывы покупателей
            </span>
          </div>
          <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-card-foreground/80">
            <span>{log.length}</span> {" "}
            {plural(log.length, ["отзыв", "отзыва", "отзывов"])} · открытый список
          </span>
        </div>
        <div className="mt-5">
          <div className="space-y-6">
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                const v = msg.trim();
                if (!v) return;
                setLog((l) => [v, ...l]);
                setMsg("");
              }}
            >
              <div className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-card-foreground/80">
                Новый отзыв
              </div>
              <textarea
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                rows={4}
                placeholder="НАПИШИТЕ ОТЗЫВ О ТОВАРЕ…"
                className="w-full resize-y rounded-sm border-2 border-foreground/40 bg-card/80 p-3 font-sans text-[0.9375rem] leading-relaxed text-card-foreground focus:border-foreground focus:outline-none placeholder:font-mono placeholder:text-[0.8125rem] placeholder:uppercase placeholder:tracking-[0.16em] placeholder:text-card-foreground/70"
              />
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="group flex items-center gap-2 rounded-sm border-2 border-foreground bg-primary px-3.5 py-2 font-display text-[0.75rem] uppercase tracking-[0.2em] text-primary-foreground transition-transform active:translate-y-px"
                >
                  <IconArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
                  Отправить
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-sm border-2 border-card-foreground/40 px-2.5 py-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-card-foreground/80 hover:border-card-foreground hover:text-card-foreground"
                >
                  <IconPaperclip className="h-3.5 w-3.5" />
                  Прикрепить фото
                </button>
              </div>
            </form>
            {log.map((entry, i) => (
              <div
                key={i}
                className="border-b border-dashed border-card-foreground/30 pb-3 font-mono text-[0.8125rem] text-card-foreground/90"
              >
                <span className="mr-2 rounded-[2px] bg-foreground px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-background">
                  {String(log.length - i).padStart(2, "0")}
                </span>
                {entry}
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mt-8 flex items-center justify-between border-t-2 border-dashed border-foreground/40 pt-3 font-mono text-[0.625rem] font-bold uppercase tracking-[0.22em] text-muted-foreground">
        <span>
          Конец карточки · ДЕМО / {item.num}
        </span>
        <span>
          Обновлено <span>{item.date}</span>
        </span>
      </footer>
    </article>
  );
}
