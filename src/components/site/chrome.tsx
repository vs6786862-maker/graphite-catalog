"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  IconSearch,
  IconShoppingBag,
  IconMenu,
  IconArrowRight,
  IconX,
  IconSun,
  IconMoon,
} from "./bits";
import {
  subscribeCart,
  getCartSnapshot,
  getServerCartSnapshot,
  cartCount,
} from "@/lib/cart";

const NAV = [
  { label: "Каталог", href: "#/catalog" },
  { label: "Линейки", href: "#/items" },
  { label: "Категории", href: "#/categories" },
  { label: "Заявки", href: "#/requests" },
  { label: "Сервисы", href: "#/services" },
];

function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-lg leading-none tracking-tight sm:text-xl ${className}`}>
      [НАЗВАНИЕ
      <span className="text-primary"> БРЕНДА]</span>
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const cart = useSyncExternalStore(subscribeCart, getCartSnapshot, getServerCartSnapshot);
  const count = cartCount(cart);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-foreground/10 bg-ink text-ink-foreground">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-4 sm:h-16 sm:px-6">
        <a className="flex shrink-0 items-center gap-2" href="#/">
          <Logo />
        </a>

        <nav className="ml-3 hidden items-center md:flex" aria-label="Primary">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="relative inline-flex h-9 items-center px-2.5 font-display text-sm uppercase tracking-[0.16em] transition-colors text-ink-foreground/70 hover:text-ink-foreground"
            >
              <span>{n.label}</span>
            </a>
          ))}
        </nav>

        <form
          className="hidden flex-1 lg:flex lg:max-w-xs"
          onSubmit={(e) => {
            e.preventDefault();
            const v = (e.currentTarget.elements.namedItem("q") as HTMLInputElement)?.value ?? "";
            window.location.hash = `#/catalog?q=${encodeURIComponent(v)}`;
          }}
        >
          <div className="flex flex-1 items-center gap-2 rounded-sm border-2 border-ink-foreground/30 bg-ink px-2.5 transition-colors focus-within:border-primary">
            <IconSearch className="h-3.5 w-3.5 shrink-0 text-ink-foreground/60" />
            <input
              type="search"
              name="q"
              placeholder="ПОИСК ТОВАРОВ…"
              className="h-8 w-full bg-transparent font-mono text-[0.75rem] uppercase tracking-[0.1em] text-ink-foreground outline-none placeholder:font-mono placeholder:text-[0.6875rem] placeholder:uppercase placeholder:tracking-[0.16em] placeholder:text-ink-foreground/60"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden items-center gap-1 md:flex">
            <a
              href="#/login"
              className="inline-flex h-9 items-center px-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink-foreground/70 transition-colors hover:text-ink-foreground"
            >
              Вход
            </a>
            <a
              href="#/signup"
              className="inline-flex h-9 items-center rounded-[var(--radius)] border-2 border-ink-foreground/40 px-2.5 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-ink-foreground transition-colors hover:bg-ink-foreground/10"
            >
              Регистрация
            </a>
            <ThemeToggle />
            <a
              href="#/cart"
              aria-label="Открыть корзину"
              className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] text-foreground transition-colors hover:bg-foreground/5"
            >
              <IconShoppingBag className="h-4 w-4" />
              {count > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 min-w-4 bg-primary px-1 text-center font-mono text-[0.5625rem] font-bold leading-4 text-primary-foreground tabular-nums">
                  {count > 9 ? "9+" : count}
                </span>
              ) : null}
            </a>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-label="Открыть меню"
              onClick={() => setOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius)] text-ink-foreground hover:bg-ink-foreground/10"
            >
              <IconMenu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* mobile sheet */}
      {open ? (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-ink/60"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 right-0 flex w-80 max-w-[85vw] flex-col border-l-2 border-foreground bg-card text-card-foreground shadow-xl">
            <div className="flex items-center justify-between border-b-2 border-dashed border-foreground/30 px-4 py-3">
              <Logo className="text-base" />
              <button
                type="button"
                aria-label="Закрыть меню"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-[2px] border-2 border-foreground/40 hover:border-foreground"
              >
                <IconX className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex flex-col px-4 py-4" aria-label="Mobile">
              {NAV.map((n, i) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-dashed border-foreground/20 py-3 font-display text-base uppercase tracking-[0.08em] last:border-b-0 hover:text-primary"
                >
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-[0.5625rem] font-bold tabular-nums text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {n.label}
                  </span>
                  <IconArrowRight className="h-3.5 w-3.5 text-primary" />
                </a>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-2 border-t-2 border-dashed border-foreground/30 px-4 py-4">
              <a
                href="#/login"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 items-center justify-center rounded-[var(--radius)] border-2 border-foreground/40 font-mono text-[0.75rem] font-bold uppercase tracking-[0.16em] hover:border-foreground"
              >
                Вход
              </a>
              <a
                href="#/signup"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 items-center justify-center rounded-[var(--radius)] border-2 border-primary bg-primary font-mono text-[0.75rem] font-bold uppercase tracking-[0.16em] text-primary-foreground"
              >
                Регистрация
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

/* ---------- theme toggle (как на референсе: иконка показывает целевую тему) ---------- */

type ThemeName = "dark" | "light";

const themeStore = {
  listeners: new Set<() => void>(),
  get(): ThemeName {
    return document.documentElement.dataset.theme === "light" ? "light" : "dark";
  },
  set(next: ThemeName) {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    themeStore.listeners.forEach((l) => l());
  },
  subscribe(l: () => void) {
    themeStore.listeners.add(l);
    return () => {
      themeStore.listeners.delete(l);
    };
  },
};

function ThemeToggle() {
  const theme = useSyncExternalStore(themeStore.subscribe, themeStore.get, () => "dark" as const);
  return (
    <button
      type="button"
      onClick={() => themeStore.set(theme === "dark" ? "light" : "dark")}
      aria-label={theme === "dark" ? "Переключить на светлую тему" : "Переключить на тёмную тему"}
      title={theme === "dark" ? "Светлая тема" : "Тёмная тема"}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius)] text-ink-foreground transition-colors hover:bg-ink-foreground/10"
    >
      {theme === "dark" ? <IconSun className="h-4 w-4" /> : <IconMoon className="h-4 w-4" />}
    </button>
  );
}

/* ---------- footer ---------- */

const FOOTER_COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Каталог",
    links: [
      { label: "Смотреть товары", href: "#/catalog" },
      { label: "По линейкам", href: "#/items" },
      { label: "Заявки покупателей", href: "#/requests" },
      { label: "Добавить товар", href: "#/submit" },
    ],
  },
  {
    title: "Сервисы",
    links: [
      { label: "Доставка и оплата", href: "#/simple/delivery" },
      { label: "Мои объявления", href: "#/services/listings" },
      { label: "Стать продавцом", href: "#/services/apply" },
      { label: "Мои заказы", href: "#/services/orders" },
    ],
  },
  {
    title: "Аккаунт",
    links: [
      { label: "Профиль", href: "#/profile" },
      { label: "Мои публикации", href: "#/my-submissions" },
      { label: "Избранное", href: "#/saved" },
      { label: "Вход", href: "#/login" },
    ],
  },
  {
    title: "Проект",
    links: [
      { label: "Контакты", href: "#/contact" },
      { label: "Условия", href: "#/terms" },
      { label: "Конфиденциальность", href: "#/privacy" },
    ],
  },
  {
    title: "Ещё",
    links: [{ label: "Обзор сети", href: "#/simple/network" }],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-foreground/30 bg-card/85">
      <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)] lg:gap-12">
          <div className="flex flex-col gap-3">
            <a href="#/" className="flex items-center gap-2">
              <span className="font-display text-base leading-none tracking-tight text-card-foreground">
                [НАЗВАНИЕ
                <span className="text-primary"> БРЕНДА]</span>
              </span>
            </a>
            <p className="max-w-[44ch] text-[0.875rem] leading-relaxed text-card-foreground/80">
              Структурный шаблон магазина физических товаров. Каждое название, цена и число —
              демо-значение — замените их своим содержимым.
            </p>
            <div className="flex flex-wrap gap-2 pt-1 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em]">
              <span className="rounded-[var(--radius)] border-2 border-card-foreground/30 px-2 py-0.5 text-card-foreground">
                Открытый шаблон
              </span>
              <span className="rounded-[var(--radius)] border-2 border-card-foreground/30 px-2 py-0.5 text-card-foreground">
                Свободное использование
              </span>
              <span className="rounded-[var(--radius)] bg-primary px-2 py-0.5 text-primary-foreground">
                Демо-данные
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 xl:grid-cols-5">
            {FOOTER_COLS.map((col) => (
              <nav key={col.title}>
                <div className="flex items-center gap-2">
                  <span className="font-display uppercase text-[0.6875rem] text-card-foreground/80">
                    {col.title}
                  </span>
                </div>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-card-foreground/80 underline-offset-4 transition-colors hover:text-card-foreground hover:underline"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t-2 border-dashed border-card-foreground/30 pt-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-card-foreground/80">
            © 2026 [Название бренда] ·{" "}
            <span className="text-card-foreground">Независимый шаблонный проект</span>
          </p>
          <p className="max-w-[80ch] font-mono text-[0.625rem] uppercase tracking-[0.16em] text-card-foreground/70">
            Демо-проект. Не связан с какой-либо компанией или товаром и никак их не
            представляет. Все названия, цены и изображения на этой странице — демо-значения.
          </p>
        </div>
      </div>
    </footer>
  );
}
