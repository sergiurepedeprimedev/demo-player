import { VideoList } from "@/components/VideoList";

export default function Home() {
  return (
    <main className="min-h-screen p-8 pb-24 dark:bg-black bg-zinc-50">
      <header className="mb-8">
        <h1 className="text-4xl font-bold dark:text-white text-zinc-900 mb-2">
          Live Streams
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Select a stream to start watching
        </p>
      </header>
      <VideoList />
    </main>
  );
}
