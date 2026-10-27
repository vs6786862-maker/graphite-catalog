/**
 * Мини-корзина шаблона: localStorage + подписки.
 * Это демо — никаких реальных заказов не создаётся.
 */

import type { Item } from "./catalog";

export type CartLine = { slug: string; qty: number };

const KEY = "cart-v1";
const EMPTY: CartLine[] = [];

function read(): CartLine[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return EMPTY;
    return parsed.filter(
      (l): l is CartLine =>
        l && typeof l.slug === "string" && Number.isFinite(l.qty) && l.qty > 0
    );
  } catch {
    return EMPTY;
  }
}

let lines: CartLine[] = read();
const subs = new Set<() => void>();

function commit(next: CartLine[]) {
  lines = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    /* приватный режим — просто держим в памяти */
  }
  subs.forEach((fn) => fn());
}

export function subscribeCart(fn: () => void) {
  subs.add(fn);
  return () => {
    subs.delete(fn);
  };
}

/** Снапшот для useSyncExternalStore (ссылка стабильна между изменениями). */
export function getCartSnapshot(): CartLine[] {
  return lines;
}

/** Серверный снапшот для гидратации. */
export function getServerCartSnapshot(): CartLine[] {
  return EMPTY;
}

export function addToCart(slug: string, qty = 1) {
  const found = lines.find((l) => l.slug === slug);
  const next = found
    ? lines.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l))
    : [...lines, { slug, qty }];
  commit(next);
}

export function setQty(slug: string, qty: number) {
  if (qty <= 0) return removeFromCart(slug);
  commit(lines.map((l) => (l.slug === slug ? { ...l, qty } : l)));
}

export function removeFromCart(slug: string) {
  commit(lines.filter((l) => l.slug !== slug));
}

export function clearCart() {
  commit([]);
}

export function cartCount(linesArg: CartLine[]) {
  return linesArg.reduce((acc, l) => acc + l.qty, 0);
}

/** Разворачивает корзину в пары «товар + количество» (несуществующие slug пропускаем). */
export function resolveCart(
  linesArg: CartLine[],
  find: (slug: string) => Item | undefined
) {
  return linesArg
    .map((l) => ({ line: l, item: find(l.slug) }))
    .filter((x): x is { line: CartLine; item: Item } => Boolean(x.item));
}
