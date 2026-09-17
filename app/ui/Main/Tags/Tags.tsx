"use client";

import { SliderBar } from "./Slidebar/Slidebar";
import Tag from "./Tag/Tag";

type Props = {
  tags: { name: string }[];
};

export default function Tags({ tags }: Props) {
  return (
    <div className="sticky w-full top-[56px] z-2 px-6 py-1 pb-1 bg-bg/99 backdrop-blur-xl">
      <div className="relative w-full flex border-slate-300 border-solid h-[40px] my-1 select-none">
        <div className="relative flex w-full h-[40px] pb-0 overflow-x-hidden">
          <SliderBar controls={true}>
            {tags.map(({ name }) => {
              return (
                <Tag
                  key={name}
                  name={name}
                  isActive={name === "Lineage 2" ? true : false}
                />
              );
            })}
          </SliderBar>
        </div>
      </div>
    </div>
  );
}

const tagNames = [
  "Все",
  "Музыка",
  "Подкасты",
  "Russia Fishing 4",
  "Trovo Play",
  "Path of Exile 2",
  "Fortnite",
  "Trovo`s Battlegrounds",
  "ChitChat",
  "Raid: Shadow Legends",
  "Elder Ring",
  "Chill",
  "I`m only sleeping",
  "World of Tanks1",
  "Marvel`s Spider-Man Remastered1",
  "Russia Fishing 41",
  "Trovo Play1",
  "Path of Exile 21",
  "Fortnite1",
];
