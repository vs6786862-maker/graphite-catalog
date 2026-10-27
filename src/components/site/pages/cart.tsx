"use client";

import { useState } from "react";
import { useSyncExternalStore } from "react";
import {
  findItem,
  fmtPrice,
  plural,
} from "@/lib/catalog";
import {
  subscribeCart,
  getCartSnapshot,
  getServerCartSnapshot,
  setQty,
  removeFromCart,
  clearCart,
  cartCount,
  resolveCart,
} from "@/lib/cart";
import { PageHeader, ImageStub, IconArrowRight, IconX } from "../bits";

export function CartPage() {
  const lines = useSyncExternalStore(subscribeCart, getCartSnapshot, getServerCartSnapshot);
  const [sent, setSent] = useState(false);

  const rows = resolveCart(lines, findItem);
  const count = cartCount(lines);
  const total = rows.reduce((acc, r) => acc + r.item.price * r.line.qty, 0);

  return (
    <article className="mx-auto max-w-[1280px] px-4 py-8 lg:px-8 lg:py-12">
      <PageHeader
        badge="КОРЗИНА"
        code="[НАЗВАНИЕ БРЕНДА] · ЗАКАЗ"
        count={`${count} ${plural(count, ["позиция", "позиции", "позиций"])}`}
        title="Корзина"
        text="Товары, добавленные к заказу. Корзина хранится локально в браузере — это демо: никакие заказы не оформляются."
      />

      {sent ? (
        <div className="mt-8 flex flex-col items-start gap-3 rounded-sm border-2 border-foreground bg-card/85 px-6 py-10">
          <span className="bg-primary px-2 py-1 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-primary-foreground">
            Принято
          </span>
          <h2 className="font-display text-2xl uppercase tracking-tight text-card-foreground">
            Заказ оформлен (демо)
          </h2>
          <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-card-foreground/80">
            Это демо-подтверждение — заказ не покинул браузер. В реальном магазине здесь
            были бы номер заказа, способы оплаты и срок доставки.
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <a
              href="#/catalog"
              className="inline-flex items-center gap-2 rounded-sm border-2 border-foreground bg-primary px-4 py-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-primary-foreground"
            >
              В каталог <IconArrowRight className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="inline-flex items-center gap-2 rounded-sm border-2 border-foreground bg-card px-4 py-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] hover:bg-foreground hover:text-background"
            >
              Вернуться в корзину
            </button>
          </div>
        </div>
      ) : rows.length === 0 ? (
        <div className="mt-8 rounded-sm border-2 border-dashed border-foreground/40 bg-card/60 px-6 py-14 text-center">
          <p className="font-display text-xl uppercase tracking-[0.18em] text-card-foreground">
            Корзина пуста
          </p>
          <p className="mx-auto mt-2 max-w-[44ch] font-mono text-[0.75rem] uppercase tracking-[0.18em] text-card-foreground">
            Добавьте товары из каталога — они появятся здесь.
          </p>
          <a
            href="#/catalog"
            className="mt-5 inline-flex items-center gap-2 rounded-sm border-2 border-foreground bg-primary px-4 py-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-primary-foreground"
          >
            Открыть каталог <IconArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          {/* список */}
          <ul className="divide-y divide-dashed divide-card-foreground/25 rounded-sm border-2 border-foreground bg-card/85">
            {rows.map(({ line, item }) => (
              <li key={line.slug} className="flex gap-4 p-4">
                <a
                  href={`#/item/${item.slug}`}
                  className="relative block h-24 w-32 shrink-0 overflow-hidden rounded-[2px] border border-foreground/30 bg-foreground/5"
                >
                  <ImageStub label="ФОТО" />
                </a>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex items-start justify-between gap-3">
                    <a
                      href={`#/item/${item.slug}`}
                      className="truncate font-display text-base uppercase leading-tight tracking-tight text-card-foreground underline-offset-4 hover:underline"
                    >
                      {item.title}
                    </a>
                    <button
                      type="button"
                      aria-label="Убрать из корзины"
                      onClick={() => removeFromCart(item.slug)}
                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[2px] border border-card-foreground/30 text-card-foreground/70 hover:border-card-foreground hover:text-card-foreground"
                    >
                      <IconX className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-card-foreground/80">
                    АРТ. {item.num} · {fmtPrice(item.price)}
                  </span>
                  <div className="mt-auto flex items-center justify-between gap-3">
                    <div className="inline-flex items-center rounded-[2px] border-2 border-card-foreground/30">
                      <button
                        type="button"
                        aria-label="Меньше"
                        onClick={() => setQty(item.slug, line.qty - 1)}
                        className="h-8 w-8 font-mono text-sm font-bold text-card-foreground hover:bg-card-foreground/10"
                      >
                        −
                      </button>
                      <span className="w-9 text-center font-mono text-sm font-bold tabular-nums text-card-foreground">
                        {line.qty}
                      </span>
                      <button
                        type="button"
                        aria-label="Больше"
                        onClick={() => setQty(item.slug, line.qty + 1)}
                        className="h-8 w-8 font-mono text-sm font-bold text-card-foreground hover:bg-card-foreground/10"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-display text-lg font-bold tabular-nums text-card-foreground">
                      {fmtPrice(item.price * line.qty)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* итог */}
          <aside className="h-fit space-y-3 self-start rounded-sm border-2 border-foreground bg-foreground p-5 text-background lg:sticky lg:top-[4.5rem]">
            <span className="font-display text-base uppercase tracking-[0.18em]">Итог заказа</span>
            <dl className="space-y-2 font-mono text-[0.875rem] tabular-nums">
              <div className="flex items-baseline justify-between gap-2">
                <dt className="opacity-80">
                  {count} {plural(count, ["позиция", "позиции", "позиций"])}
                </dt>
                <dd className="font-bold">{fmtPrice(total)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <dt className="opacity-80">Доставка</dt>
                <dd>при оформлении (демо)</dd>
              </div>
            </dl>
            <div className="border-t border-dashed border-background/40 pt-3">
              <span className="font-display text-2xl font-bold tabular-nums">
                {fmtPrice(total)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setSent(true);
                clearCart();
              }}
              className="group flex w-full items-center justify-center gap-2 rounded-sm border-2 border-foreground bg-primary px-4 py-3 font-display text-[0.875rem] uppercase tracking-[0.2em] text-primary-foreground transition-transform active:translate-y-px"
            >
              Оформить заказ
              <IconArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </button>
            <p className="font-mono text-[0.5625rem] uppercase leading-relaxed tracking-[0.16em] opacity-80">
              Демо: оплата и доставка не подключены, все суммы — демо-значения.
            </p>
          </aside>
        </div>
      )}
    </article>
  );
}
