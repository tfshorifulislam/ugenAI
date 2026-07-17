// app/learn-ai/page.tsx

import Image from "next/image";
import Link from "next/link";
import { Clock3, ArrowRight, BookOpen } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Introduction to AI Prompting",
    description:
      "Learn the fundamentals of prompt engineering and communicate effectively with AI models.",
    category: "Prompt Engineering",
    level: "Beginner",
    duration: "15 min",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
    slug: "introduction-to-ai-prompting",
  },
  {
    id: 2,
    title: "Writing Better Image Prompts",
    description:
      "Create high-quality prompts for FLUX, Midjourney, and DALL·E with practical examples.",
    category: "Image Generation",
    level: "Beginner",
    duration: "20 min",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
    slug: "writing-better-image-prompts",
  },
  {
    id: 3,
    title: "Mastering ChatGPT Prompts",
    description:
      "Write structured prompts that generate accurate, detailed, and consistent responses.",
    category: "ChatGPT",
    level: "Intermediate",
    duration: "18 min",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
    slug: "mastering-chatgpt-prompts",
  },
  {
    id: 4,
    title: "Prompt Chaining Techniques",
    description:
      "Break complex tasks into smaller prompts for better reasoning and results.",
    category: "Advanced Prompting",
    level: "Advanced",
    duration: "25 min",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
    slug: "prompt-chaining-techniques",
  },
  {
    id: 5,
    title: "Creating Consistent AI Characters",
    description:
      "Learn reusable character prompt frameworks for anime, games, and storytelling.",
    category: "Character Design",
    level: "Intermediate",
    duration: "22 min",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200&q=80",
    slug: "creating-consistent-ai-characters",
  },
  {
    id: 6,
    title: "AI Workflow for Creators",
    description:
      "Build an efficient workflow using ChatGPT, FLUX, image editors, and automation.",
    category: "Productivity",
    level: "Advanced",
    duration: "35 min",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80",
    slug: "ai-workflow-for-creators",
  },
];

export default function LearnAIPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
            <BookOpen className="h-4 w-4" />
            Learn AI Faster
          </div>

          <h1 className="mt-6 text-5xl font-bold md:text-6xl">
            Learn AI & Prompt Engineering
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400">
            Master AI prompting, image generation, ChatGPT workflows, and creator
            productivity through practical guides.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <article
              key={course.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 transition hover:-translate-y-2 hover:border-violet-500"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="space-y-4 p-6">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-violet-600/20 px-3 py-1 text-xs text-violet-400">
                    {course.category}
                  </span>

                  <span className="text-xs text-zinc-500">
                    {course.level}
                  </span>
                </div>

                <h2 className="line-clamp-2 text-xl font-semibold">
                  {course.title}
                </h2>

                <p className="line-clamp-3 text-sm text-zinc-400">
                  {course.description}
                </p>

                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <Clock3 className="h-4 w-4" />
                    {course.duration}
                  </div>

                  <Link
                    href={`/learn-ai/${course.slug}`}
                    className="flex items-center gap-2 text-sm font-medium text-violet-400 transition hover:text-violet-300"
                  >
                    Read Article
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}