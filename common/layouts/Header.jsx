"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { blogSubnavGroups, headerValueBlog } from "../constant/headerValue";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { IconChevronRight, IconMenu2, IconHome, IconHeartPlus, IconNews, IconDeviceDesktopAnalytics, IconBuildingCommunity, IconBriefcase, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import UserMenu from "./UserMenu";

const mobileNavItems = [
  { title: "Beranda", url: "/", icon: IconHome },
  {
    title: "Informasi Kesehatan",
    icon: IconHeartPlus,
    matchPrefixes: ["/informasi-kesehatan"],
    items: [
      { title: "Informasi Obat", url: "/informasi-kesehatan/informasi-obat" },
      { title: "Informasi Menu Diet", url: "/informasi-kesehatan/informasi-menu-diet" },
      { title: "Informasi RS dan Klinik", url: "/informasi-kesehatan/informasi-rs-dan-klinik" },
    ],
  },
  { title: "Artikel", url: "/blog", icon: IconNews },
  { title: "Interaktif", url: "/interaktif", icon: IconDeviceDesktopAnalytics },
  { title: "Sistem Faskes", url: "/sistem-faskes", icon: IconBuildingCommunity },
  {
    title: "Alat Kesehatan",
    icon: IconBriefcase,
    matchPrefixes: ["/alat-kesehatan"],
    items: [
      { title: "Kalkulator BMI", url: "/alat-kesehatan/kalkulator-bmi" },
      { title: "Pengingat Minum Obat", url: "/alat-kesehatan/pengingat-minum-obat" },
      { title: "Rencana Diet", url: "/alat-kesehatan/rencana-diet" },
      { title: "Personal Health Record", url: "/alat-kesehatan/personal-health-record" },
    ],
  },
];

export default function Header() {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const router = usePathname();

  const getAutoExpandedGroup = (pathname) => {
    const matched = mobileNavItems.find(
      (item) => item.items && item.matchPrefixes?.some((p) => pathname.startsWith(p))
    );
    return matched?.title || null;
  };

  const [expandedGroup, setExpandedGroup] = useState(() => getAutoExpandedGroup(router));
  const [user, setUser] = useState(null);

  useEffect(() => {
    setExpandedGroup(getAutoExpandedGroup(router));
  }, [router]);

  const readUser = () => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const raw = localStorage.getItem("user");
      setUser(raw ? JSON.parse(raw) : {});
    } catch {
      setUser({});
    }
  };

  // Refresh auth state on mount, on route change (e.g. after login redirect),
  // and when localStorage is updated in another tab.
  useEffect(() => {
    readUser();
    window.addEventListener("storage", readUser);
    return () => window.removeEventListener("storage", readUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const isExternalUrl = (url) =>
    typeof url === "string" &&
    (url.startsWith("http://") || url.startsWith("https://"));

  const handleClose = () => {
    setSheetOpen(false);
  };

  const blogNavLinkClassName = (isActive) =>
    isActive
      ? "whitespace-nowrap text-sm md:text-lg text-green font-semibold transition-all duration-300 ease-in-out"
      : "whitespace-nowrap text-sm md:text-lg text-gray-700 hover:text-green transition-all duration-300 ease-in-out";

  const subNavLinkClassName = (isActive) =>
    isActive
      ? "flex items-center text-sm md:text-lg text-green font-semibold border-b-2 border-green px-1 h-[85px]"
      : "flex items-center text-sm md:text-lg text-gray-800 hover:text-green transition-all px-1 h-[85px] border-b-2 border-transparent";

  const activeBlogGroup = blogSubnavGroups?.find((g) => g.matchPrefixes?.some((p) => router.startsWith(p))) || null;

  const matchedSection =
    activeBlogGroup?.sections?.find((s) =>
      s.matchPrefixes?.some((p) => router.startsWith(p))
    ) || null;

  // Jika group pakai sections dan belum ada yang match (mis. user sedang di `/sistem-faskes`),
  // tampilkan section pertama agar submenu tidak kosong.
  const activeBlogSection =
    matchedSection || activeBlogGroup?.sections?.[0] || null;

  const activeSubnavItems =
    activeBlogSection?.items?.length
      ? activeBlogSection.items
      : activeBlogGroup?.items || [];

  return (
    <div className="w-full">
      <header className="bg-white w-full h-[85px] px-5 md:px-12 flex items-center justify-between border-b border-black/5">
        <Link href="/" title="beranda">
          <Image src={"/images/logo.webp"} alt="logo" width={50} height={50} priority={true} quality={90} decoding="sync" />
        </Link>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-16">
          <div className="flex gap-6 xl:gap-16">
            {headerValueBlog?.map((item, index) => {
              const isActive = item.url === "/" ? router === "/" : router === item.url || router.startsWith(`${item.url}/`);
              return (
                <Link href={item.url} key={index} itemProp="button">
                  <h2 className={blogNavLinkClassName(isActive)}>{item.title}</h2>
                </Link>
              );
            })}
          </div>
          {user ? (
            <UserMenu user={user} onLogout={() => setUser(null)} />
          ) : (
            <Link href="/signin">
              <Button className="bg-green hover:bg-green/90 text-white text-base font-semibold px-6 py-6 rounded-lg">
                Masuk
              </Button>
            </Link>
          )}
        </nav>

        <div className="flex lg:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <button aria-label="Menu">
                <IconMenu2 className="w-8 h-8 text-green" role="button" />
              </button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link title="Rawat.ID" href="/" onClick={handleClose} className={"flex items-center gap-1 px-1 mt-7"}>
                <Image src={"/images/logo.webp"} alt="logo" width={50} height={50} priority={false} quality={90} />
                <SheetTitle className="text-green text-xl">Rawat.ID</SheetTitle>
              </Link>
              <nav className="mt-8">
                <ul className="flex flex-col">
                  {mobileNavItems.map((item) => {
                    const Icon = item.icon;
                    const isExpanded = expandedGroup === item.title;

                    if (item.items) {
                      return (
                        <li key={item.title}>
                          <button
                            onClick={() => setExpandedGroup(isExpanded ? null : item.title)}
                            className={`w-full flex items-center justify-between px-4 py-4 text-base font-medium text-left transition-colors ${isExpanded ? "bg-[#EBF6F9] text-green" : "text-gray-800 hover:text-green"}`}
                          >
                            <span className="flex items-center gap-3">
                              <Icon size={22} className={isExpanded ? "text-green" : "text-gray-500"} />
                              {item.title}
                            </span>
                            {isExpanded ? <IconChevronUp size={18} className="text-green" /> : <IconChevronDown size={18} className="text-gray-400" />}
                          </button>
                          {isExpanded && (
                            <ul className="bg-[#EBF6F9] pb-2">
                              {item.items.map((sub) => {
                                const isActive = router === sub.url || router.startsWith(`${sub.url}/`);
                                return (
                                  <li key={sub.url}>
                                    <Link
                                      href={sub.url}
                                      onClick={handleClose}
                                      className={`flex items-center pl-[52px] pr-4 py-3 text-base transition-colors ${isActive ? "text-green font-semibold border-l-[3px] border-green" : "text-gray-700 hover:text-green border-l-[3px] border-transparent"}`}
                                    >
                                      {sub.title}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      );
                    }

                    const isActive = item.url === "/" ? router === "/" : router === item.url || router.startsWith(`${item.url}/`);
                    return (
                      <li key={item.title}>
                        <Link
                          href={item.url}
                          onClick={handleClose}
                          className={`flex items-center gap-3 px-4 py-4 text-base font-medium transition-colors ${isActive ? "text-green font-semibold" : "text-gray-800 hover:text-green"}`}
                        >
                          <Icon size={22} className={isActive ? "text-green" : "text-gray-500"} />
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {activeBlogGroup ? (
        <div className="hidden lg:block w-full bg-[#EBF6F9] border-b border-black/5 h-[85px]">
          <div className="px-5 md:px-12 flex items-center gap-6 h-full">
            <div className="hidden md:flex items-center gap-3 min-w-[16rem]">
              <Link href={activeBlogGroup.groupUrl} className="text-sm md:text-lg text-gray-800 font-semibold hover:text-green transition-all">
                {activeBlogGroup.groupTitle}
              </Link>
              <IconChevronRight className="w-7 h-6 text-gray-500" aria-hidden="true" suppressHydrationWarning />
              {activeBlogSection?.sectionTitle ? (
                <>
                  <Link href={activeBlogSection.sectionUrl} className="text-sm md:text-lg text-gray-800 font-semibold hover:text-green transition-all">
                    {activeBlogSection.sectionTitle}
                  </Link>
                  <IconChevronRight className="w-7 h-6 text-gray-500" aria-hidden="true" suppressHydrationWarning />
                </>
              ) : null}
            </div>

            <nav className="flex items-stretch gap-8 md:gap-10 overflow-x-auto whitespace-nowrap">
              {activeSubnavItems.map((it) => {
                const isActive = router === it.url || router.startsWith(`${it.url}/`);
                return (
                  <Link
                    key={it.url}
                    href={it.url}
                    target={isExternalUrl(it.url) ? "_blank" : undefined}
                    rel={isExternalUrl(it.url) ? "noopener noreferrer" : undefined}
                  >
                    <div
                      className={subNavLinkClassName(isActive)}
                    >
                      {it.title}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}
