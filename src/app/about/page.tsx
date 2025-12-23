export default function About() {
  return (
    <main className="min-h-screen p-8 dark:bg-black bg-zinc-50">
      <h1 className="text-4xl font-bold dark:text-white text-zinc-900 mb-4">
        About This Demo
      </h1>
      <p className="max-w-prose text-zinc-600 dark:text-zinc-300">
        This demo showcases a persistent mini-player functionality using Next.js
        App Router, Zustand for state management, and Framer Motion for
        animations.
      </p>
      <div className="mt-8 p-6 bg-zinc-100 dark:bg-zinc-900 rounded-xl">
        <h2 className="text-xl font-bold mb-2">Instructions</h2>
        <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300">
          <li>Go to Home and click on a video to play it.</li>
          <li>The player will open in full-screen mode.</li>
          <li>Click the minimize button (top-right) to shrink it.</li>
          <li>Drag the minimized player around the screen.</li>
          <li>Release to see it snap to the nearest corner.</li>
          <li>Navigate to this About page - the player should persist!</li>
        </ul>
      </div>
    </main>
  );
}
