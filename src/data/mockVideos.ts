import { Video } from "@/store/usePlayerStore";

export const MOCK_VIDEOS: Video[] = [
  {
    id: "1",
    title: "Big Buck Bunny",
    description:
      "A large and lovable rabbit deals with three tiny bullies, led by a flying squirrel, who are determined to squelch his happiness.",
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Big_Buck_Bunny_thumbnail_vlc.png/1200px-Big_Buck_Bunny_thumbnail_vlc.png",
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: "2",
    title: "Elephant Dream",
    description: "The first open movie from Blender Foundation.",
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Elephants_Dream_poster.jpg/1200px-Elephants_Dream_poster.jpg",
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: "3",
    title: "For Bigger Blazes",
    description:
      "HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV.",
    thumbnail:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/1200px-Big_buck_bunny_poster_big.jpg", // Placeholder
    src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
];
