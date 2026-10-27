"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, GROUPS, ITEMS, REQUESTS, stats, plural } from "@/lib/catalog";
import { PageHeader, ImageStub, IconSearch, IconArrowRight } from "../bits";
import { ItemCard } from "../item-card";

const PAGE = 24;

type Props = {
  query: URLSearchParams;
};

export function CatalogPage({ query }: Props) {
  const q = (query.get("q") ?? "").toLowerCase();
  const initGroup = query.get("group") ?? "";
  const initSeries = query.get("series") ?? "";
  const initCategory = query.get("category") ?? "";

  const [search, setSearch] = useState(q);
  const [category, setCategory] = useState(initCategory);
  const [group, setGroup] = useState(initGroup);
  const [series, setSeries] = useState(initSeries);
  const [showRequested, setShowRequested] = useState(false);
  const [visible, setVisible] = useState(PAGE);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return ITEMS.filter((it) => {
      if (s && !(`${it.title} ${it.num} ${it.tags} ${it.series}`.toLowerCase().includes(s)))
        return false;
      if (category && it.category !== category) return false;
      if (group && it.group !== group) return false;
      if (series && it.series !== series) return false;
      return true;
    });
  }, [search, category, group, series]);

  const shown = filtered.slice(0, visible);
  const requestCards = showRequested ? REQUESTS.slice(0, 6) : [];

  const selectCls =
    "h-[calc(theme(spacing.9)+0.25rem)] w-full rounded-sm border-2 border-foreground/40 bg-background px-2 font-mono !text-[0.75rem] font-bold uppercase tracking-[0.16em] text-foreground hover:border-foreground sm:w-48 cursor-pointer";

  return (
    <>
      <article className="mx-auto max-w-[1280px] px-4 py-8 lg:px-8 lg:py-12">
        <PageHeader
          badge="ТОВАРЫ"
          code="[НАЗВАНИЕ БРЕНДА] · ИНДЕКС"
          count={`${stats.items} ${plural(stats.items, ["позиция", "позиции", "позиций"])}`}
          title="Каталог товаров"
          text="Страница воспроизводит каталог шаблона. Каждая запись ниже — демо-образец: поиск, фильтры и пагинация работают, но ни одна запись не описывает реальный товар."
        />

        <div className="mt-8 flex items-baseline gap-3 border-b-2 border-dashed border-foreground/30 pb-2">
          <div className="flex items-center gap-2">
            <span className="font-display uppercase text-sm text-foreground">В каталоге</span>
          </div>
          <span aria-hidden="true" className="h-px flex-1 bg-foreground/15" />
          <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {filtered.length} {" "}
            {plural(filtered.length, ["позиция", "позиции", "позиций"])}
          </span>
        </div>

        <div className="mt-5">
          {shown.length === 0 && requestCards.length === 0 ? (
            <div className="rounded-sm border-2 border-dashed border-foreground/40 bg-card/60 px-6 py-14 text-center">
              <p className="font-display text-xl uppercase tracking-[0.18em] text-card-foreground">
                Ничего не найдено
              </p>
              <p className="mx-auto mt-2 max-w-[44ch] font-mono text-[0.75rem] uppercase tracking-[0.18em] text-card-foreground">
                Под текущие фильтры не подходит ни один товар. Ослабьте фильтр и попробуйте
                снова или добавьте новую запись.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {shown.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
              {requestCards.map((r) => (
                <article
                  key={`req-${r.id}`}
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
                      <span className="ml-auto truncate text-card-foreground/80">
                        от {r.author}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {visible < filtered.length ? (
            <div className="mt-8 flex flex-col items-center gap-3 border-t-2 border-dashed border-foreground/30 pt-6">
              <p
                aria-live="polite"
                className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-card-foreground/80"
              >
                {shown.length} из {filtered.length} показано
              </p>
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE)}
                className="rounded-sm border-2 border-foreground bg-card px-4 py-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] transition-colors hover:bg-foreground hover:text-background disabled:opacity-50"
              >
                Показать ещё
              </button>
            </div>
          ) : (
            <div className="mt-8 flex flex-col items-center gap-3 border-t-2 border-dashed border-foreground/30 pt-6">
              <p className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-card-foreground/80">
                Конец каталога · {filtered.length} {" "}
                {plural(filtered.length, ["позиция", "позиции", "позиций"])}
              </p>
            </div>
          )}
        </div>
      </article>

      {/* fixed filter toolbar */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
        <div className="pointer-events-auto mx-auto max-w-[1280px] px-4 pb-3 lg:px-8">
          <div className="rounded-sm border-2 border-foreground/40 bg-card/80 shadow-lg backdrop-blur-sm">
            <div className="flex flex-col gap-2 p-3 sm:flex-row sm:items-stretch">
              <form
                className="flex min-w-0 flex-1 items-stretch gap-0"
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  setSearch(String(fd.get("q") ?? ""));
                  setVisible(PAGE);
                }}
              >
                <div className="flex flex-1 items-center gap-2 rounded-sm border-2 border-foreground/40 bg-background px-3 transition-colors focus-within:border-foreground">
                  <IconSearch className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <input
                    name="q"
                    type="search"
                    defaultValue={q}
                    placeholder="ПОИСК ПО НАЗВАНИЮ, АРТИКУЛУ…"
                    className="h-9 w-full bg-transparent font-mono text-[0.8125rem] uppercase tracking-[0.1em] text-foreground outline-none placeholder:font-mono placeholder:text-[0.75rem] placeholder:uppercase placeholder:tracking-[0.16em] placeholder:text-muted-foreground/70"
                  />
                </div>
                <button
                  type="submit"
                  className="ml-2 inline-flex h-[calc(theme(spacing.9)+0.25rem)] items-center gap-1.5 rounded-sm border-2 border-foreground bg-foreground px-3 font-display text-[0.75rem] uppercase tracking-[0.2em] text-background transition-transform active:translate-y-px"
                >
                  Поиск
                  <IconArrowRight className="h-3.5 w-3.5 shrink-0" />
                </button>
              </form>
              <select
                aria-label="Категория"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setVisible(PAGE);
                }}
                className={`${selectCls} sm:w-48`}
              >
                <option value="">Все категории</option>
                {CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <select
                aria-label="Серия"
                value={series}
                onChange={(e) => {
                  setSeries(e.target.value);
                  setVisible(PAGE);
                }}
                className={`${selectCls} sm:w-56`}
              >
                <option value="">Все серии</option>
                {GROUPS.flatMap((g) => g.series).map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t-2 border-dashed border-card-foreground/30 px-3 py-2">
              <label className="inline-flex cursor-pointer items-center gap-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-card-foreground/80 hover:text-card-foreground">
                <input
                  type="checkbox"
                  checked={showRequested}
                  onChange={(e) => setShowRequested(e.target.checked)}
                  className="h-3.5 w-3.5 accent-primary"
                />
                Показывать заявки
              </label>
              <span className="ml-auto hidden font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground sm:inline">
                Демо-записи · {filtered.length} {" "}
                {plural(filtered.length, ["совпадение", "совпадения", "совпадений"])}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
