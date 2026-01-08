export function path(slug: string): string {
  const cleanSlug = slug.startsWith("/") ? slug.slice(1) : slug;
  const base = import.meta.env.BASE_URL;

  if (base === "/") {
    return slug;
  }
  return `${base}/${cleanSlug}`;
}
