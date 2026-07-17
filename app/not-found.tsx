import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="text-center">
        <Link href="/" className="absolute top-8 left-8 text-xl font-bold">
          ugen<span className="text-purple-500">AI</span>
        </Link>

        <Sparkles className="mx-auto mb-6 h-8 w-8 text-purple-400" />

        <h1 className="text-7xl font-bold">404</h1>

        <h2 className="mt-4 text-2xl">
          Page Not Found
        </h2>

        <p className="mt-2 text-gray-400">
          The page you are looking for doesn't exist.
        </p>

        <Link
          href="/"
          className="inline-block mt-8 rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-gray-200"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}