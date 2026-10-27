/**
 * Демо-данные для шаблона каталога физических товаров.
 * Все названия, числа и даты ниже — условные значения: ничего не описывает реальный товар.
 */

export type Series = {
  name: string; // "Серия A1"
  years: string; // "1990—2000"
};

export type Group = {
  name: string; // "Линейка A"
  slug: string; // "group-a"
  years: string; // "1990—2026"
  series: Series[];
};

export type Category = {
  name: string; // "Категория A"
  slug: string; // "category-a"
  subs: string[]; // "Подкатегория A1"…
};

export type ItemStock = "stock" | "order";

export type Item = {
  id: number;
  num: string; // "0001"
  slug: string; // "product-001"
  title: string; // "Товар 001"
  desc: string;
  tags: string; // "Метка 01 · Метка 02"
  category: string; // "Категория A"
  group: string; // "Линейка A"
  series: string; // "Серия A1"
  years: string; // "2000—2010"
  price: number; // демо-цена, ₽
  stock: ItemStock; // в наличии / под заказ (демо-значение)
  sold: number;
  likes: number;
  comments: number;
  author: string; // "Продавец 01 (user01)"
  date: string; // "01 ЯНВ 2026"
};

export type Request = {
  id: number;
  num: string; // "0142"
  title: string; // "Request 001"
  desc: string;
  category: string;
  series: string;
  author: string;
  date: string;
};

const pad = (n: number, w: number) => String(n).padStart(w, "0");
export const pad4 = (n: number) => pad(n, 4);
export const pad3 = (n: number) => pad(n, 3);
export const pad2 = (n: number) => pad(n, 2);

const LETTERS = "ABCDEFGHIJKL".split("");

export const GROUPS: Group[] = LETTERS.map((letter, gi) => {
  const count = 2 + ((gi * 7) % 3); // 2..4 series per group
  const series: Series[] = Array.from({ length: count }, (_, si) => {
    const start = 1985 + ((gi * 5 + si * 9) % 30);
    const end = Math.min(2026, start + 6 + ((gi + si) % 12));
    return {
      name: `Серия ${letter}${si + 1}`,
      years: si === count - 1 ? `${start}—наст.` : `${start}—${end}`,
    };
  });
  return {
    name: `Линейка ${letter}`,
    slug: `group-${letter.toLowerCase()}`,
    years: `${series[0].years.slice(0, 4)}–2026`,
    series,
  };
});

export const SERIES_COUNT = GROUPS.reduce((acc, g) => acc + g.series.length, 0);

export const CATEGORIES: Category[] = [
  {
    name: "Категория A",
    slug: "category-a",
    subs: ["Подкатегория A1", "Подкатегория A2", "Подкатегория A3", "Подкатегория A4", "Подкатегория A5"],
  },
  {
    name: "Категория B",
    slug: "category-b",
    subs: ["Подкатегория B1", "Подкатегория B2", "Подкатегория B3", "Подкатегория B4"],
  },
  {
    name: "Категория C",
    slug: "category-c",
    subs: ["Подкатегория C1", "Подкатегория C2", "Подкатегория C3", "Подкатегория C4"],
  },
  {
    name: "Категория D",
    slug: "category-d",
    subs: ["Подкатегория D1", "Подкатегория D2", "Подкатегория D3"],
  },
];

const TAG_SETS = [
  "Метка 01 · Метка 02",
  "Метка 01 · Метка 03",
  "Метка 02 · Метка 04",
  "Метка 03 · Метка 05",
];

const DESCS = [
  "Текст-заполнитель для демо-записи. Реальные характеристики товара не указаны — замените этот текст фактическим описанием при наполнении каталога.",
  "Демо-запись. Здесь живёт краткое описание для карточки; все факты о товаре в шаблоне намеренно оставлены пустыми до появления реальных данных.",
  "Запись-образец. Название, метки и параметры ниже существуют только для вёрстки и не описывают реальный товар.",
  "Пример текста для предпросмотра вёрстки. Замените этот абзац реальным описанием после проверки и заполнения записи.",
];

const MONTHS = ["ЯНВ", "ФЕВ", "МАР", "АПР", "МАЙ", "ИЮН", "ИЮЛ", "АВГ", "СЕН", "ОКТ", "НОЯ", "ДЕК"];

export const ITEMS: Item[] = Array.from({ length: 120 }, (_, i) => {
  const group = GROUPS[i % GROUPS.length];
  const series = group.series[i % group.series.length];
  const category = CATEGORIES[i % CATEGORIES.length];
  const day = 1 + ((i * 11) % 28);
  const month = MONTHS[(i * 5) % 12];
  return {
    id: i,
    num: pad4(i + 1),
    slug: `product-${pad3(i + 1)}`,
    title: `Товар ${pad3(i + 1)}`,
    desc: DESCS[i % DESCS.length],
    tags: TAG_SETS[i % TAG_SETS.length],
    category: category.name,
    group: group.name,
    series: series.name,
    years: series.years,
    price: 990 + ((i * 137) % 97) * 100,
    stock: i % 4 === 3 ? "order" : "stock",
    sold: (i * 37) % 89,
    likes: (i * 13) % 6,
    comments: (i * 7) % 4,
    author: `Продавец ${pad2((i % 12) + 1)} (user${pad2((i % 12) + 1)})`,
    date: `${pad2(day)} ${month} 2026`,
  };
});

export const REQUESTS: Request[] = Array.from({ length: 6 }, (_, i) => {
  const category = CATEGORIES[(i + 1) % CATEGORIES.length];
  const group = GROUPS[(i + 3) % GROUPS.length];
  const series = group.series[0];
  const day = 2 + ((i * 9) % 27);
  return {
    id: i,
    num: pad4(200 + i),
    title: `Заявка ${pad3(i + 1)}`,
    desc: DESCS[(i + 2) % DESCS.length],
    category: category.name,
    series: series.name,
    author: `Продавец ${pad2(((i + 5) % 12) + 1)} (user${pad2(((i + 5) % 12) + 1)})`,
    date: `${pad2(day)} ${MONTHS[(i * 7) % 12]} 2026`,
  };
});

export const findItem = (slug: string) => ITEMS.find((it) => it.slug === slug);

/** Цена в формате «1 990 ₽» (демо-значение, не реальное предложение). */
export const fmtPrice = (n: number) => `${new Intl.NumberFormat("ru-RU").format(n)} ₽`;

export const STOCK_LABEL: Record<ItemStock, string> = { stock: "В наличии", order: "Под заказ" };

/** Русские формы слова: plural(3, ["товар", "товара", "товаров"]). */
export function plural(n: number, forms: [string, string, string]) {
  const a = Math.abs(n) % 100;
  const b = a % 10;
  if (a > 10 && a < 20) return forms[2];
  if (b > 1 && b < 5) return forms[1];
  if (b === 1) return forms[0];
  return forms[2];
}

export const stats = {
  items: ITEMS.length,
  groups: GROUPS.length,
  series: SERIES_COUNT,
  categories: CATEGORIES.length,
};

/** последние 18 товаров, «новые сверху» (демо-сортировка) */
export const LATEST: Item[] = [...ITEMS].reverse().slice(0, 18);

/** 6 самых продаваемых (демо-сортировка) */
export const MOST_VIEWED: Item[] = [...ITEMS]
  .sort((a, b) => b.sold - a.sold)
  .slice(0, 6);
