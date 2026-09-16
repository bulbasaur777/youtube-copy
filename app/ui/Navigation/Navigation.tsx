"use client";

import ru from "@/locales/ru/ru.json";
import ua from "@/locales/ua/ua.json";
import en from "@/locales/en/en.json";
import { Lang } from "@/types/language";

import { useNavbar } from "@/contexts/NavbarContext";

import HomeSection from "./HomeSection/HomeSection";
import SubscriptionSection from "./SubscriptionSection/SubscriptionSection";
import YouSection from "./YouSection/YouSection";
import MoreFromYoutubeSection from "./MoreFromYoutubeSection/MoreFromYoutubeSection";
import ExploreSection from "./ExploreSection/ExploreSection";
import ReportSection from "./ReportSection/ReportSection";
import FooterSection from "./FooterSection/FooterSection";
import { Portal } from "@radix-ui/react-portal";
import YouTubeIconGroup from "../Header/YouTubeIconGroup/YouTubeIconGroup";
import { AnimatePresence, motion } from "motion/react";

export default function Navigation({ lang }: { lang: Lang }) {
  const { isNavbarOpen, changeNavbar } = useNavbar();

  const translations = { ru, ua, en } as const;
  const t = translations[lang as keyof typeof translations];

  return (
    <>
      <nav
        className={`fixed top-[56px] w-[72px] hidden sm:block ${isNavbarOpen ? "lg:w-[240px]" : "lg:w-[72px]"} max-h-[calc(100vh-60px)] overflow-y-auto bg-bg text-text py-1 z-20 scrollbar-nav-custom overscroll-contain`}
      >
        <HomeSection lang={lang} isNavbarOpen={isNavbarOpen} />

        <SubscriptionSection
          subscriptions={subscriptions}
          lang={lang}
          isNavbarOpen={isNavbarOpen}
        />

        <YouSection lang={lang} isNavbarOpen={isNavbarOpen} />

        <MoreFromYoutubeSection lang={lang} isNavbarOpen={isNavbarOpen} />

        <ExploreSection lang={lang} isNavbarOpen={isNavbarOpen} />

        <ReportSection lang={lang} isNavbarOpen={isNavbarOpen} />

        <FooterSection lang={lang} isNavbarOpen={isNavbarOpen} />
      </nav>

      <Portal>
        <AnimatePresence>
          {isNavbarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute top-0 left-0 w-full h-full sm:hidden bg-black/30 z-10"
                onClick={changeNavbar}
              />
              <motion.nav
                initial={{ opacity: 1, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 1, x: -200 }}
                transition={{ duration: 0.15 }}
                className={`fixed top-0 left-0 block z-10 sm:hidden w-[240px] max-h-[100vh] overflow-y-auto overflow-x-hidden bg-bg text-text py-1 scrollbar-nav-custom overscroll-contain`}
              >
                <YouTubeIconGroup isNavigation />
                <HomeSection lang={lang} isNavbarOpen={true} />

                <SubscriptionSection
                  subscriptions={subscriptions}
                  lang={lang}
                  isNavbarOpen={true}
                />

                <YouSection lang={lang} isNavbarOpen={true} />

                <MoreFromYoutubeSection lang={lang} isNavbarOpen={true} />

                <ExploreSection lang={lang} isNavbarOpen={true} />

                <ReportSection lang={lang} isNavbarOpen={true} />

                <FooterSection lang={lang} isNavbarOpen={true} />
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}

const subscriptions = [
  { title: "Заповедник", imgSrc: "avatar.png" },
  { title: "My Chemical Romance", imgSrc: "/pictures/picture-1.jpg" },
  { title: "Euronews по-русски", imgSrc: "/pictures/picture-3.jpg" },
  { title: "Шеф Василий Емельяненко", imgSrc: "/pictures/picture-1.jpg" },
  { title: "Saturday Night Live", imgSrc: "/pictures/picture-2.jpg" },
  {
    title: "AVS. Сервис экспертной поддержки бухгалтера",
    imgSrc: "/pictures/picture-3.jpg",
  },
  { title: "Dave Hax", imgSrc: "/pictures/picture-1.jpg" },
  { title: "ГОЛОВАНОВ", imgSrc: "/pictures/picture-2.jpg" },
  { title: "Sum 41", imgSrc: "/pictures/picture-3.jpg" },
  { title: "LOUTRE", imgSrc: "/pictures/picture-1.jpg" },
  { title: "Viva La Dirt League", imgSrc: "/pictures/picture-2.jpg" },
  { title: "Fallow", imgSrc: "/pictures/picture-3.jpg" },
  { title: "Накормите Васю", imgSrc: "/pictures/picture-1.jpg" },
  { title: "Rockstar Games", imgSrc: "/pictures/picture-2.jpg" },
  { title: "Игорь Иванович", imgSrc: "/pictures/picture-3.jpg" },
  { title: "Владилен Минин", imgSrc: "/pictures/picture-1.jpg" },
];
