"use client";

import ru from "@/locales/ru/ru.json";
import ua from "@/locales/ua/ua.json";
import en from "@/locales/en/en.json";
import { Lang } from "@/types/language";

import HomeSection from "../HomeSection/HomeSection";
import SubscriptionSection from "../SubscriptionSection/SubscriptionSection";
import YouSection from "../YouSection/YouSection";
import MoreFromYoutubeSection from "../MoreFromYoutubeSection/MoreFromYoutubeSection";
import ExploreSection from "../ExploreSection/ExploreSection";
import ReportSection from "../ReportSection/ReportSection";
import FooterSection from "../FooterSection/FooterSection";
import { Portal } from "@radix-ui/react-portal";
import YouTubeIconGroup from "../../Header/YouTubeIconGroup/YouTubeIconGroup";
import { AnimatePresence, motion } from "motion/react";
import { useModalNavbar } from "@/contexts/ModalNavbarContext";

type Props = {
  lang: Lang;
  forceModal: boolean;
};

export default function ModalNavigation({ lang, forceModal }: Props) {
  const { isModalNavbarOpen, changeModalNavbar } = useModalNavbar();

  const translations = { ru, ua, en } as const;
  const t = translations[lang as keyof typeof translations];

  return (
    <Portal>
      <AnimatePresence>
        {isModalNavbarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className={`absolute top-0 left-0 w-full h-full ${forceModal ? "" : "sm:hidden"} bg-black/30 z-10`}
              onClick={changeModalNavbar}
            />

            <motion.nav
              initial={{ opacity: 1, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 1, x: -200 }}
              transition={{ duration: 0.15 }}
              className={`fixed top-0 left-0 block z-10 ${forceModal ? "" : "sm:hidden"} w-[240px] min-h-[100vh] max-h-[100vh] overflow-y-auto overflow-x-hidden bg-bg text-text py-1 scrollbar-nav-custom overscroll-contain`}
            >
              <YouTubeIconGroup isNavigation />

              <HomeSection
                lang={lang}
                isNavbarOpen={true}
                isModal={forceModal}
              />

              <SubscriptionSection
                subscriptions={subscriptions}
                lang={lang}
                isNavbarOpen={true}
                isModal={forceModal}
              />

              <YouSection
                lang={lang}
                isNavbarOpen={true}
                isModal={forceModal}
              />

              <MoreFromYoutubeSection
                lang={lang}
                isNavbarOpen={true}
                isModal={forceModal}
              />

              <ExploreSection
                lang={lang}
                isNavbarOpen={true}
                isModal={forceModal}
              />

              <ReportSection
                lang={lang}
                isNavbarOpen={true}
                isModal={forceModal}
              />

              <FooterSection
                lang={lang}
                isNavbarOpen={true}
                isModal={forceModal}
              />
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </Portal>
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
