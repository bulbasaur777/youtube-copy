import ru from "@/locales/ru/ru.json";
import ua from "@/locales/ua/ua.json";
import en from "@/locales/en/en.json";
import { Lang } from "@/types/language";

import { Subscription } from "@/types/subscriptions";
import SubscriptionBtn from "./SubscriptionBtn/SubscriptionBtn";
import SubscriptionItem from "./SubscriptionItem/SubscriptionItem";
import ShowMoreBtn from "../ShowMoreBtn/ShowMoreBtn";
import { useState } from "react";

import CompactSubscriptionBtn from "./SubscriptionBtn/CompactSubscriptionBtn";
import SubscriptionsCompactMenu from "./SubscriptionsCompactMenu/SubscriptionsCompactMenu";
import { LuChevronDown } from "react-icons/lu";
import { useWindowSize } from "@/hooks/useWindowSize";

type Props = {
  subscriptions: Subscription[];
  lang: Lang;
  isNavbarOpen: boolean;
};

export default function SubscriptionSection({
  subscriptions,
  lang,
  isNavbarOpen,
}: Props) {
  const [showAll, setShowAll] = useState(false);

  const { windowSize } = useWindowSize();

  const translations = { ru, ua, en } as const;
  const t = translations[lang as keyof typeof translations];

  return isNavbarOpen && (windowSize! > 1024 || windowSize! < 640) ? (
    <div className="px-3 border-b-1 border-gray-5 py-3">
      <SubscriptionBtn title={t.Navigation.Subscriptions} />

      {subscriptions
        .slice(0, showAll ? subscriptions.length : 7)
        .map(({ title, imgSrc }) => {
          return <SubscriptionItem key={title} title={title} imgSrc={imgSrc} />;
        })}

      <ShowMoreBtn
        title={showAll ? "Show less" : "Show more"}
        isNavbarOpen={isNavbarOpen}
        onClick={() => setShowAll((prev) => !prev)}
      />
    </div>
  ) : (
    <div className="relative">
      <SubscriptionsCompactMenu
        trigger={
          <CompactSubscriptionBtn
            title={t.Navigation.Subscriptions}
            isActive={false}
          />
        }
      >
        <div className="">
          <div className="ml-3.5 mb-2 mt-1 text-text font-semibold text-[1.12rem]">
            Subscriptions
          </div>
          {subscriptions.slice(0, 7).map(({ title, imgSrc }) => {
            return (
              <SubscriptionItem
                key={title}
                title={title}
                imgSrc={imgSrc}
                compactMode={true}
              />
            );
          })}
          <div
            className={`group flex items-center pl-3 py-2 hover:bg-gray-10 cursor-pointer`}
          >
            <LuChevronDown className="size-6 mt-[2px] mr-2" />
            <div className={`ml-1 mt-[2px] text-text text-sm`}>Show more</div>
          </div>
        </div>
      </SubscriptionsCompactMenu>
    </div>
  );
}
