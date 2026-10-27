"use client";

import type { Item } from "@/lib/catalog";
import { STOCK_LABEL, fmtPrice, plural } from "@/lib/catalog";
import { addToCart } from "@/lib/cart";
import {
  ImageStub,
  IconHeart,
  IconBookmark,
  IconMessageCircle,
  IconShoppingBag,
} from "./bits";

export function ItemCard({ item }: { item: Item }) {
  return (
    <article className="group/card relative flex h-full flex-col overflow-hidden rounded-sm border-2 border-foreground/30 bg-card/90 transition-all hover:-translate-y-0.5 hover:border-foreground">
      <a href={`#/item/${item.slug}`} className="block">
        <span className="absolute left-2 top-2 z-10 inline-flex items-stretch overflow-hidden rounded-[var(--radius)] border-2 border-primary">
          <span className="bg-ink px-1.5 py-0.5 font-mono text-[0.5625rem] font-bold uppercase leading-none tracking-[0.2em] text-ink-foreground">
            Товар
          </span>
          <span className="bg-primary px-1.5 py-0.5 font-mono text-[0.6875rem] font-bold tabular-nums leading-none tracking-tight text-primary-foreground">
            {item.num}
          </span>
        </span>
        <span
          className={`absolute right-2 top-2 z-10 rounded-[2px] px-1.5 py-0.5 font-mono text-[0.5625rem] font-bold uppercase leading-none tracking-[0.18em] ${
            item.stock === "stock"
              ? "bg-foreground text-background"
              : "border border-foreground/60 bg-card/90 text-foreground"
          }`}
        >
          {STOCK_LABEL[item.stock]}
        </span>
        <div className="relative aspect-[4/3] overflow-hidden bg-foreground/5">
          <ImageStub label="ФОТО · 4:3" />
        </div>
      </a>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <a href={`#/item/${item.slug}`}>
            <h3 className="line-clamp-1 font-display text-lg uppercase leading-tight tracking-tight [text-wrap:balance] text-card-foreground underline-offset-4 decoration-card-foreground/40 group-hover/card:underline">
              {item.title}
            </h3>
          </a>
          <p className="mt-1 line-clamp-2 max-w-[40ch] text-[0.875rem] leading-snug text-card-foreground/80">
            {item.desc}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.18em]">
          <span className="max-w-full whitespace-normal break-words rounded-[2px] bg-accent px-1.5 py-0.5 text-accent-foreground">
            {item.tags}
          </span>
          <span className="rounded-[2px] border border-card-foreground/40 bg-card-foreground/5 px-1.5 py-0.5 text-card-foreground">
            {item.category}
          </span>
        </div>
        <div className="flex items-baseline gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.16em]">
          <span className="shrink-0 rounded-[2px] bg-foreground px-1.5 py-0.5 text-[0.6rem] font-bold tracking-[0.18em] text-background">
            Серия
          </span>
          <span className="min-w-0 whitespace-normal break-words text-card-foreground/80">
            {item.series}
          </span>
        </div>
        {/* цена + корзина */}
        <div className="flex items-center justify-between gap-2">
          <span className="font-display text-lg font-bold tabular-nums leading-none tracking-tight text-card-foreground">
            {fmtPrice(item.price)}
          </span>
          <button
            type="button"
            onClick={() => addToCart(item.slug)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-[2px] border-2 border-primary px-2 py-1 font-mono text-[0.625rem] font-bold uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <IconShoppingBag className="h-3 w-3 shrink-0" />
            В корзину
          </button>
        </div>
        <div className="mt-auto flex items-center gap-1 border-t border-dashed border-card-foreground/30 pt-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em]">
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-[2px] px-1.5 py-1 transition-colors text-card-foreground/80 hover:bg-card-foreground/5 hover:text-card-foreground"
          >
            <IconHeart className="h-3 w-3 shrink-0" />
            <span className="tabular-nums">{item.likes}</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-[2px] px-1.5 py-1 transition-colors text-card-foreground/80 hover:bg-card-foreground/5 hover:text-card-foreground"
          >
            <IconBookmark className="h-3 w-3 shrink-0" />
          </button>
          <span className="inline-flex items-center gap-1 px-1.5 py-1 text-card-foreground/80">
            <IconMessageCircle className="h-3 w-3 shrink-0" />
            <span className="tabular-nums">{item.comments}</span>
          </span>
          <span className="inline-flex items-center gap-1 px-1.5 py-1 text-card-foreground/80">
            <IconShoppingBag className="h-3 w-3 shrink-0" />
            <span className="tabular-nums">
              {item.sold} {plural(item.sold, ["продажа", "продажи", "продаж"])}
            </span>
          </span>
          <span className="ml-auto truncate text-card-foreground/80">{item.author}</span>
        </div>
      </div>
    </article>
  );
}
