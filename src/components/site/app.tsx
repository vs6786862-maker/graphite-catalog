"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Header, Footer } from "./chrome";
import { HomePage } from "./pages/home";
import { CatalogPage } from "./pages/catalog";
import { ItemPage } from "./pages/item";
import { ItemsPage, CategoriesPage, RequestsPage, ServicesPage } from "./pages/sections";
import { SubmitPage, AuthPage, SimplePage, NotFoundPage } from "./pages/misc";
import { CartPage } from "./pages/cart";

type Route =
  | { name: "home" }
  | { name: "catalog"; query: URLSearchParams }
  | { name: "item"; slug: string }
  | { name: "items" }
  | { name: "categories" }
  | { name: "requests" }
  | { name: "services" }
  | { name: "submit" }
  | { name: "cart" }
  | { name: "login" }
  | { name: "signup" }
  | { name: "simple"; key: string }
  | { name: "notfound" };

function parseHash(hash: string): Route {
  const raw = hash.replace(/^#/, "");
  const path = raw.split("?")[0].replace(/^\/|\/$/g, "");
  const query = new URLSearchParams(raw.split("?")[1] ?? "");

  if (path === "") return { name: "home" };
  if (path === "catalog") return { name: "catalog", query };
  if (path.startsWith("item/")) return { name: "item", slug: path.slice("item/".length) };
  if (path === "items") return { name: "items" };
  if (path === "categories") return { name: "categories" };
  if (path === "requests") return { name: "requests" };
  if (path === "services") return { name: "services" };
  if (path === "submit") return { name: "submit" };
  if (path === "cart") return { name: "cart" };
  if (path === "login") return { name: "login" };
  if (path === "signup") return { name: "signup" };
  if (path.startsWith("simple/")) return { name: "simple", key: path.slice("simple/".length) };
  if (["contact", "terms", "privacy", "saved", "profile", "my-submissions"].includes(path))
    return { name: "simple", key: path };
  if (["services/apply", "services/listings", "services/orders"].includes(path))
    return { name: "simple", key: path };
  return { name: "notfound" };
}

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

export function SiteApp() {
  // External store keeps SSR and hydration consistent: both render the server
  // snapshot ("") first, then React re-reads the real hash after mounting.
  const hash = useSyncExternalStore(
    subscribeToHash,
    () => window.location.hash,
    () => ""
  );
  const route = parseHash(hash);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [hash]);

  let page: React.ReactNode;
  switch (route.name) {
    case "home":
      page = <HomePage />;
      break;
    case "catalog":
      page = <CatalogPage query={route.query} />;
      break;
    case "item":
      page = <ItemPage slug={route.slug} />;
      break;
    case "items":
      page = <ItemsPage />;
      break;
    case "categories":
      page = <CategoriesPage />;
      break;
    case "requests":
      page = <RequestsPage />;
      break;
    case "services":
      page = <ServicesPage />;
      break;
    case "submit":
      page = <SubmitPage />;
      break;
    case "cart":
      page = <CartPage />;
      break;
    case "login":
      page = <AuthPage mode="login" />;
      break;
    case "signup":
      page = <AuthPage mode="signup" />;
      break;
    case "simple":
      page = <SimplePage keyName={route.key} />;
      break;
    default:
      page = <NotFoundPage />;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{page}</main>
      <Footer />
    </>
  );
}
