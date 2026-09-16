"use server";

type Stream = {
  title: string;
  streamer: string;
  time: number;
  game: string;
  lang: string;
  color: string;
};

export async function getStreams(page: number): Promise<Stream[]> {
  if (page === 2) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(regularStreams2);
      }, 1111);
    });
  }

  if (page === 3) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(regularStreams3);
      }, 1111);
    });
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 1111);
  });
}

const regularStreams2 = [
  {
    title: "Not Another STREAM!",
    streamer: "Streamer MONGOGO",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM!",
    streamer: "Streamer MONGOGO",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "blue",
  },
  {
    title: "Not Another STREAM!",
    streamer: "Streamer Sora",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "pink",
  },
  {
    title: "Not Another STREAM!",
    streamer: "Streamer AnyAnyWay",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "gray",
  },
  {
    title: "Not Another STREAM!",
    streamer: "Streamer KOSmo",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "green",
  },
  {
    title: "Not Another STREAM!",
    streamer: "Streamer inter",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "brown",
  },
  {
    title: "Not Another STREAM!",
    streamer: "Streamer WAKANDA",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "yellow",
  },
  {
    title: "Not Another STREAM!",
    streamer: "Streamer MONGOGO",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM!",
    streamer: "Streamer Sora",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM!",
    streamer: "Streamer AnyAnyWay",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM!",
    streamer: "Streamer KOSmo",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM!",
    streamer: "Streamer inter",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM!",
    streamer: "Streamer WAKANDA",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM!",
    streamer: "Streamer MONGOGO",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM!",
    streamer: "Streamer Sora",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM!",
    streamer: "Streamer AnyAnyWay",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM!",
    streamer: "Streamer KOSmo",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM!",
    streamer: "Streamer inter",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM!",
    streamer: "Streamer Sora",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM!",
    streamer: "Streamer AnyAnyWay",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM!",
    streamer: "Streamer KOSmo",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM!",
    streamer: "Streamer inter",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM!",
    streamer: "Streamer WAKANDA",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
];

const regularStreams3 = [
  {
    title: "Not Another STREAM 3!",
    streamer: "Streamer MONGOGO",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM 3!",
    streamer: "Streamer MONGOGO",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM 3!",
    streamer: "Streamer Sora",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM 3!",
    streamer: "Streamer AnyAnyWay",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM 3!",
    streamer: "Streamer KOSmo",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM 3!",
    streamer: "Streamer inter",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM 3!",
    streamer: "Streamer WAKANDA",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM 3!",
    streamer: "Streamer MONGOGO",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM 3!",
    streamer: "Streamer Sora",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM 3!",
    streamer: "Streamer AnyAnyWay",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM 3!",
    streamer: "Streamer KOSmo",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM 3!",
    streamer: "Streamer inter",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM 3!",
    streamer: "Streamer WAKANDA",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM 3!",
    streamer: "Streamer MONGOGO",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM 3!",
    streamer: "Streamer Sora",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM 3!",
    streamer: "Streamer AnyAnyWay",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM 3!",
    streamer: "Streamer KOSmo",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM 3!",
    streamer: "Streamer inter",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM 3!",
    streamer: "Streamer Sora",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM 3!",
    streamer: "Streamer AnyAnyWay",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM 3!",
    streamer: "Streamer KOSmo",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM 3!",
    streamer: "Streamer inter",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
  {
    title: "Not Another STREAM 3!",
    streamer: "Streamer WAKANDA",
    time: 222,
    game: "Lineage II",
    lang: "English",
    color: "red",
  },
];
