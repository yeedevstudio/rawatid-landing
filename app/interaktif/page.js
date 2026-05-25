"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Breadcrumbs from "@/common/components/Breadcrumbs";
import { INTERAKTIF_CONTENTS } from "@/common/constant/interaktifValue";

export default function InteraktifPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return INTERAKTIF_CONTENTS;
    return INTERAKTIF_CONTENTS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="w-full">
      <div className="px-5 md:px-12 pt-6">
        <Breadcrumbs
          items={[
            { label: "Beranda", href: "/" },
            { label: "Interaktif", href: "/interaktif" },
          ]}
        />
      </div>

      <main className="w-full px-5 md:px-12 pb-16 pt-10">
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-4xl font-semibold text-[#038F7A]">
            Temukan Artikel Interaktif
          </h1>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-stretch">
            <div className="w-11 flex items-center justify-center rounded-l-md bg-[#038F7A] text-white border border-[#038F7A]">
              <Search className="w-4 h-4" />
            </div>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari artikel interaktif..."
              className="rounded-l-none border-l-0 h-11"
            />
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <Link
                key={item.slug}
                href={item.url}
                className="group rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow p-4"
              >
                <div className="rounded-xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={450}
                    className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="pt-4 pb-1 text-center">
                  <h2 className="font-semibold text-gray-900 text-base md:text-lg leading-snug">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm md:text-base text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            Tidak ada artikel yang cocok dengan pencarian &quot;{query}&quot;
          </div>
        )}
      </main>
    </div>
  );
}
