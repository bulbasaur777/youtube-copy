import { getAllTags } from "@/libs/data/tags";
import Spacer from "./Spacer/Spacer";
import Streams from "./Streams/Streams";
import Tags from "./Tags/Tags";

export default async function Main() {
  const tags = await getAllTags();

  console.log(tags);

  const regularStreams = [
    {
      title: "Another STREAM!",
      streamer: "Streamer MONGOGO",
      time: 222,
      game: "Lineage II",
      lang: "English",
      color: "red",
    },
    {
      title: "Another STREAM!",
      streamer: "Streamer MONGOGO",
      time: 222,
      game: "Lineage II",
      lang: "English",
      color: "blue",
    },
    {
      title: "Another STREAM!",
      streamer: "Streamer Sora",
      time: 222,
      game: "Lineage II",
      lang: "English",
      color: "pink",
    },
    {
      title: "Another STREAM!",
      streamer: "Streamer AnyAnyWay",
      time: 222,
      game: "Lineage II",
      lang: "English",
      color: "gray",
    },
    {
      title: "Another STREAM!",
      streamer: "Streamer KOSmo",
      time: 222,
      game: "Lineage II",
      lang: "English",
      color: "green",
    },
    {
      title: "Another STREAM!",
      streamer: "Streamer inter",
      time: 222,
      game: "Lineage II",
      lang: "English",
      color: "brown",
    },
    {
      title: "Another STREAM!",
      streamer: "Streamer WAKANDA",
      time: 222,
      game: "Lineage II",
      lang: "English",
      color: "yellow",
    },
    {
      title: "Another STREAM!",
      streamer: "Streamer MONGOGO",
      time: 222,
      game: "Lineage II",
      lang: "English",
      color: "red",
    },
    {
      title: "Another STREAM!",
      streamer: "Streamer Sora",
      time: 222,
      game: "Lineage II",
      lang: "English",
      color: "red",
    },
    {
      title: "Another STREAM!",
      streamer: "Streamer AnyAnyWay",
      time: 222,
      game: "Lineage II",
      lang: "English",
      color: "red",
    },
    {
      title: "Another STREAM!",
      streamer: "Streamer KOSmo",
      time: 222,
      game: "Lineage II",
      lang: "English",
      color: "red",
    },
    {
      title: "Another STREAM!",
      streamer: "Streamer inter",
      time: 222,
      game: "Lineage II",
      lang: "English",
      color: "red",
    },
    {
      title: "Another STREAM!",
      streamer: "Streamer WAKANDA",
      time: 222,
      game: "Lineage II",
      lang: "English",
      color: "red",
    },
    {
      title: "Another STREAM!",
      streamer: "Streamer MONGOGO",
      time: 222,
      game: "Lineage II",
      lang: "English",
      color: "red",
    },
    {
      title: "Another STREAM!",
      streamer: "Streamer Sora",
      time: 222,
      game: "Lineage II",
      lang: "English",
      color: "red",
    },
    {
      title: "Another STREAM!",
      streamer: "Streamer AnyAnyWay",
      time: 222,
      game: "Lineage II",
      lang: "English",
      color: "red",
    },
    {
      title: "Another STREAM!",
      streamer: "Streamer KOSmo",
      time: 222,
      game: "Lineage II",
      lang: "English",
      color: "red",
    },
    {
      title: "Another STREAM!",
      streamer: "Streamer inter",
      time: 222,
      game: "Lineage II",
      lang: "English",
      color: "red",
    },
    {
      title: "Another STREAM!",
      streamer: "Streamer Sora",
      time: 222,
      game: "Lineage II",
      lang: "English",
      color: "red",
    },
    {
      title: "Another STREAM!",
      streamer: "Streamer AnyAnyWay",
      time: 222,
      game: "Lineage II",
      lang: "English",
      color: "red",
    },
    {
      title: "Another STREAM!",
      streamer: "Streamer KOSmo",
      time: 222,
      game: "Lineage II",
      lang: "English",
      color: "red",
    },
    {
      title: "Another STREAM!",
      streamer: "Streamer inter",
      time: 222,
      game: "Lineage II",
      lang: "English",
      color: "red",
    },
    {
      title: "Another STREAM!",
      streamer: "Streamer WAKANDA",
      time: 222,
      game: "Lineage II",
      lang: "English",
      color: "red",
    },
  ];

  return (
    <div className="absolute w-full flex top-[56px] right-0">
      <Spacer />
      <main className="relative w-full flex-1 px-1 pb-1 bg-bg text-text rounded-tl-xl">
        <Tags />
        <Streams regularStreams={regularStreams} />
      </main>
    </div>
  );
}
