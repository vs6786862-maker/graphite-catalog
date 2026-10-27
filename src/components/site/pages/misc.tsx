"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { CATEGORIES, GROUPS } from "@/lib/catalog";
import { PageHeader, IconArrowRight, IconImage } from "../bits";

const inputCls =
  "h-10 w-full rounded-sm border-2 border-foreground/40 bg-card/80 px-3 font-mono text-[0.8125rem] uppercase tracking-[0.08em] text-foreground outline-none transition-colors placeholder:font-mono placeholder:text-[0.75rem] placeholder:uppercase placeholder:tracking-[0.16em] placeholder:text-muted-foreground/70 focus:border-foreground";
const labelCls =
  "mb-1.5 block font-mono text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-card-foreground/80";

/* ============ /submit ============ */

export function SubmitPage() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <article className="mx-auto max-w-[1280px] px-4 py-8 lg:px-8 lg:py-12">
      <PageHeader
        badge="ДОБАВИТЬ"
        code="[НАЗВАНИЕ БРЕНДА] · ФОРМА ПРИЁМКИ"
        count="Черновик · сохраняется локально"
        title="Добавить товар"
        text="Форма приёмки шаблона. Все поля — условные: заполните и получите демо-подтверждение — ничего никуда не отправляется."
      />
      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <section className="rounded-sm border-2 border-foreground bg-card/85 p-5 sm:p-6">
          {sent ? (
            <div className="flex flex-col items-start gap-3 py-8">
              <span className="bg-primary px-2 py-1 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-primary-foreground">
                Принято
              </span>
              <h2 className="font-display text-2xl uppercase tracking-tight text-card-foreground">
                Заявка записана (демо)
              </h2>
              <p className="max-w-[52ch] text-[0.9375rem] leading-relaxed text-card-foreground/80">
                Это демо-подтверждение — данные не покинули браузер. В реальном магазине
                здесь был бы номер заявки и срок проверки.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-2 inline-flex items-center gap-2 rounded-sm border-2 border-foreground bg-card px-4 py-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] hover:bg-foreground hover:text-background"
              >
                Заполнить ещё раз
              </button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={onSubmit}>
              <div>
                <label className={labelCls} htmlFor="f-title">
                  Название товара
                </label>
                <input id="f-title" required placeholder="ТОВАР 000" className={inputCls} />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelCls} htmlFor="f-cat">
                    Категория
                  </label>
                  <select id="f-cat" className={`${inputCls} cursor-pointer`}>
                    {CATEGORIES.map((c) => (
                      <option key={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls} htmlFor="f-series">
                    Серия
                  </label>
                  <select id="f-series" className={`${inputCls} cursor-pointer`}>
                    {GROUPS.flatMap((g) => g.series).map((s) => (
                      <option key={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className={labelCls} htmlFor="f-desc">
                  Описание
                </label>
                <textarea
                  id="f-desc"
                  rows={5}
                  placeholder="ЗАМЕНИТЕ РЕАЛЬНЫМ ОПИСАНИЕМ…"
                  className="w-full resize-y rounded-sm border-2 border-foreground/40 bg-card/80 p-3 font-sans text-[0.9375rem] leading-relaxed text-foreground outline-none transition-colors placeholder:font-mono placeholder:text-[0.75rem] placeholder:uppercase placeholder:tracking-[0.16em] placeholder:text-muted-foreground/70 focus:border-foreground"
                />
              </div>
              <div>
                <span className={labelCls}>Фотографии</span>
                <div className="flex flex-col items-center justify-center gap-2 rounded-sm border-2 border-dashed border-foreground/40 bg-card/60 px-6 py-10 text-center">
                  <IconImage className="h-6 w-6 text-muted-foreground/60" />
                  <p className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-card-foreground/80">
                    Перетащите фото сюда · .jpg · .png
                  </p>
                  <p className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-muted-foreground">
                    Демо-зона — файлы никуда не загружаются
                  </p>
                </div>
              </div>
              <button
                type="submit"
                className="group inline-flex items-center gap-2 rounded-sm border-2 border-foreground bg-primary px-4 py-3 font-display text-[0.875rem] uppercase tracking-[0.2em] text-primary-foreground transition-transform active:translate-y-px"
              >
                Отправить на проверку
                <IconArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          )}
        </section>
        <aside className="space-y-4 self-start rounded-sm border-2 border-foreground/40 bg-card/70 p-5">
          <span className="font-display uppercase text-sm text-card-foreground">
            Перед публикацией
          </span>
          <ul className="space-y-2 font-mono text-[0.8125rem] leading-snug text-card-foreground/85">
            {[
              "Строка чек-листа — опишите здесь правила проверки.",
              "Строка чек-листа — упомяните требования к описанию товара.",
              "Строка чек-листа — отметьте, что делает карточку полной.",
            ].map((t, i) => (
              <li key={i} className="flex items-baseline gap-2 border-b border-dashed border-card-foreground/25 pb-2 last:border-b-0">
                <span className="rounded-[2px] bg-foreground px-1.5 py-0.5 text-[0.6rem] font-bold tabular-nums text-background">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {t}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </article>
  );
}

/* ============ /login + /signup ============ */

export function AuthPage({ mode }: { mode: "login" | "signup" }) {
  const isLogin = mode === "login";
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-sm border-2 border-foreground bg-card/85 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-card-foreground/80">
            <span className="bg-foreground px-1.5 py-0.5 text-background">
              {isLogin ? "Вход" : "Регистрация"}
            </span>
            <span>[НАЗВАНИЕ БРЕНДА] · АККАУНТ</span>
          </div>
          <h1 className="mt-3 font-display text-[clamp(1.6rem,3.2vw,2.2rem)] uppercase leading-[1] tracking-tight text-card-foreground">
            {isLogin ? "С возвращением." : "Создайте аккаунт."}
          </h1>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-card-foreground/80">
            Экран входа — демо: учётные данные никуда не отправляются.
          </p>
          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            {!isLogin ? (
              <div>
                <label className={labelCls} htmlFor="a-name">
                  Отображаемое имя
                </label>
                <input id="a-name" placeholder="USER01" className={inputCls} />
              </div>
            ) : null}
            <div>
              <label className={labelCls} htmlFor="a-email">
                Email
              </label>
              <input id="a-email" type="email" placeholder="ИМЯ@ПРИМЕР.РУ" className={inputCls} />
            </div>
            <div>
              <label className={labelCls} htmlFor="a-pass">
                Пароль
              </label>
              <input id="a-pass" type="password" placeholder="••••••••" className={inputCls} />
            </div>
            <button
              type="submit"
              className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-sm border-2 border-foreground bg-primary font-display text-[0.875rem] uppercase tracking-[0.2em] text-primary-foreground transition-transform active:translate-y-px"
            >
              {isLogin ? "Войти" : "Зарегистрироваться"}
              <IconArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
          <div className="mt-5 border-t-2 border-dashed border-card-foreground/30 pt-4 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-card-foreground/80">
            {isLogin ? (
              <>
                Ещё нет аккаунта?{" "}
                <a href="#/signup" className="font-bold text-primary hover:underline">
                  Регистрация
                </a>
              </>
            ) : (
              <>
                Уже зарегистрированы?{" "}
                <a href="#/login" className="font-bold text-primary hover:underline">
                  Войти
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

/* ============ simple stub pages ============ */

const SIMPLE_COPY: Record<string, { badge: string; title: string; text: string }> = {
  contact: {
    badge: "КОНТАКТЫ",
    title: "Контакты",
    text: "Демо-страница контактов. Замените реальной формой или адресами, когда шаблон будет наполнен.",
  },
  terms: {
    badge: "ПРОЕКТ",
    title: "Условия",
    text: "Демо-страница условий. В образце используется узкая колонка для юридического текста.",
  },
  privacy: {
    badge: "ПРОЕКТ",
    title: "Конфиденциальность",
    text: "Демо-страница. Опишите обработку данных, когда появится реальный текст.",
  },
  delivery: {
    badge: "СЕРВИСЫ",
    title: "Доставка и оплата",
    text: "Демо-страница доставки. Опишите здесь зоны, сроки и стоимость — карточка товара ссылается на этот раздел.",
  },
  saved: {
    badge: "АККАУНТ",
    title: "Избранное",
    text: "Демо-список. Здесь появлялись бы товары, добавленные в закладки из каталога.",
  },
  profile: {
    badge: "АККАУНТ",
    title: "Профиль",
    text: "Демо-профиль. Здесь были бы данные пользователя, активность и настройки.",
  },
  "my-submissions": {
    badge: "АККАУНТ",
    title: "Мои публикации",
    text: "Демо-очередь. Здесь отображались бы отправленные записи и их статус проверки.",
  },
  "services/apply": {
    badge: "СЕРВИСЫ",
    title: "Стать продавцом",
    text: "Демо-форма. Зеркало формы добавления товара, настроенное на партнёров площадки.",
  },
  "services/listings": {
    badge: "СЕРВИСЫ",
    title: "Мои объявления",
    text: "Демо-панель. Здесь были бы товары продавца, статусы и остатки.",
  },
  "services/orders": {
    badge: "СЕРВИСЫ",
    title: "Мои заказы",
    text: "Демо-журнал. Здесь отображались бы входящие заказы, статусы и выплаты.",
  },
  network: {
    badge: "СЕТЬ",
    title: "Общая сетевая запись",
    text: "Демо-блок для перекрёстной ссылки на общую запись каталога.",
  },
  source: {
    badge: "ЗАПИСЬ",
    title: "Первоисточник",
    text: "Демо-ссылка. В реальной карточке она ведёт на страницу автора записи.",
  },
};

export function SimplePage({ keyName }: { keyName: string }) {
  const copy = SIMPLE_COPY[keyName] ?? {
    badge: "СТРАНИЦА",
    title: "Демо-страница",
    text: "Эта страница есть в структуре образца; её содержимое — условное.",
  };
  return (
    <article className="mx-auto max-w-[1280px] px-4 py-8 lg:px-8 lg:py-12">
      <PageHeader
        badge={copy.badge}
        code="[НАЗВАНИЕ БРЕНДА] · ДЕМО"
        count="Демо"
        title={copy.title}
        text={copy.text}
      />
      <div className="mt-8 rounded-sm border-2 border-dashed border-foreground/40 bg-card/60 px-6 py-14 text-center">
        <p className="font-display text-xl uppercase tracking-[0.18em] text-card-foreground">
          Пока ничего нет
        </p>
        <p className="mx-auto mt-2 max-w-[44ch] font-mono text-[0.75rem] uppercase tracking-[0.18em] text-card-foreground">
          Это структурный демо-блок. Замените его реальным содержимым при наполнении шаблона.
        </p>
      </div>
    </article>
  );
}

export function NotFoundPage() {
  return (
    <main className="flex min-h-[calc(100vh-10rem)] flex-1 items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-sm border-2 border-foreground bg-card/85 p-6 text-center sm:p-8">
        <p className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-card-foreground/80">
          Ошибка 404 · Страница не найдена
        </p>
        <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[1] tracking-tight text-card-foreground">
          Мимо полок.
        </h1>
        <p className="mx-auto mt-2 max-w-[44ch] text-[0.9375rem] leading-relaxed text-card-foreground/80">
          Адрес не совпадает ни с одной страницей шаблона. Воспользуйтесь каталогом, чтобы
          найти демо-товары.
        </p>
        <a
          href="#/catalog"
          className="mt-5 inline-flex items-center gap-2 rounded-sm border-2 border-foreground bg-primary px-4 py-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-primary-foreground"
        >
          Открыть каталог <IconArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </main>
  );
}
