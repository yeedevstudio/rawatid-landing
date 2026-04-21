import Script from "next/script";
import Link from "next/link";

export default function Breadcrumbs({ items }) {
  const safeItems = Array.isArray(items) ? items.filter(Boolean) : [];
  if (!safeItems.length) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: safeItems.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.label,
      item: it.href,
    })),
  };

  return (
    <>
      <Script
        id="breadcrumbs-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="text-sm md:text-base">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-gray-500">
          {safeItems.map((it, idx) => {
            const isLast = idx === safeItems.length - 1;
            return (
              <li key={`${it.href}-${idx}`} className="flex items-center gap-2">
                {idx !== 0 ? <span className="text-gray-400">{">"}</span> : null}
                {isLast ? (
                  <span className="text-green font-semibold">{it.label}</span>
                ) : (
                  <Link
                    href={it.href}
                    className="hover:text-green transition-colors"
                  >
                    {it.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

