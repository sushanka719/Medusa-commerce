import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { blurDataURL } from "@/lib/image";
import { getBlogPosts } from "@/lib/data/blog";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1758077223826-74f8ec22ebfd?q=80&w=2070&auto=format&fit=crop";

export default async function JournalPage() {
  const posts = await getBlogPosts();
  const featuredPost = posts.find((p) => p.featured) ?? posts[0];
  const regularPosts = posts.filter((p) => p.id !== featuredPost?.id);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="flex flex-col lg:flex-row border-b border-[var(--card-border)]">
        <div className="w-full lg:w-1/3 px-6 md:px-12 lg:px-16 py-16 lg:py-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--card-border)]">
          <p className="text-xs uppercase tracking-[0.3em] mb-6 text-[var(--text-secondary)]">Our Journal</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-[var(--foreground)] mb-6 leading-none">
            Stories & <span className="italic block mt-2">Insights</span>
          </h1>
          <p className="text-[var(--text-secondary)] font-light leading-relaxed max-w-sm">
            Explore the world of luxury candle rituals and home fragrance through our curated stories.
          </p>
        </div>
        <div className="hidden lg:block w-full lg:w-2/3 relative min-h-[400px]">
          <Image
            src={FALLBACK_IMAGE}
            alt="Aluna candle journal scene"
            fill
            sizes="66vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="flex flex-col lg:flex-row border-b border-[var(--card-border)]">
          <div className="w-full lg:w-1/3 px-6 md:px-12 lg:px-16 py-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--card-border)]">
            <Link href={`/journal/${featuredPost.slug}`} className="group block">
              <div className="flex items-center gap-4 mb-6">
                {featuredPost.category && (
                  <>
                    <span className="text-[var(--text-secondary)] text-xs uppercase tracking-[0.2em]">
                      {featuredPost.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[var(--card-border)]" />
                  </>
                )}
                {featuredPost.read_time && (
                  <span className="flex items-center gap-1 text-[var(--text-secondary)] text-xs uppercase tracking-[0.2em]">
                    <Clock size={12} />
                    {featuredPost.read_time} read
                  </span>
                )}
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[var(--foreground)] mb-6 group-hover:opacity-70 transition-opacity leading-tight">
                {featuredPost.title}
              </h2>
              {featuredPost.excerpt && (
                <p className="text-[var(--text-secondary)] mb-8 text-base font-light leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>
              )}
              <div className="flex items-center gap-2 text-[var(--foreground)] text-sm uppercase tracking-[0.2em] font-medium group-hover:gap-4 transition-all">
                Read Article <ArrowRight size={16} />
              </div>
            </Link>
          </div>
          <div className="w-full lg:w-2/3 relative min-h-[500px]">
            <Image
              src={featuredPost.cover_image ?? FALLBACK_IMAGE}
              alt={featuredPost.title}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL={blurDataURL}
            />
          </div>
        </section>
      )}

      {/* Grid */}
      {regularPosts.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--card-border)] border-b border-[var(--card-border)]">
          {regularPosts.map((post) => (
            <article key={post.slug} className="group relative h-full flex flex-col">
              <Link href={`/journal/${post.slug}`} className="flex flex-col h-full">
                <div className="relative aspect-[4/3] overflow-hidden border-b border-[var(--card-border)]">
                  <Image
                    src={post.cover_image ?? FALLBACK_IMAGE}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    {post.category && (
                      <span className="text-[var(--text-secondary)] text-xs uppercase tracking-[0.2em]">
                        {post.category}
                      </span>
                    )}
                    {post.category && post.read_time && (
                      <span className="w-1 h-1 rounded-full bg-[var(--card-border)]" />
                    )}
                    {post.read_time && (
                      <span className="flex items-center gap-1 text-[var(--text-secondary)] text-xs uppercase tracking-[0.2em]">
                        <Clock size={12} />
                        {post.read_time}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-[var(--foreground)] mb-3 group-hover:opacity-70 transition-opacity leading-tight">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6 flex-1 font-light line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-[var(--foreground)] text-xs uppercase tracking-[0.2em] font-medium mt-auto group-hover:gap-3 transition-all">
                    Read More <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </section>
      ) : posts.length === 0 ? (
        <div className="px-6 md:px-12 lg:px-16 py-24 text-center">
          <p className="font-serif text-2xl text-[var(--foreground)] mb-3">No posts yet</p>
          <p className="text-sm text-[var(--text-secondary)] font-light">
            Create a &quot;blog&quot; collection in the admin and publish your first post.
          </p>
        </div>
      ) : null}
    </div>
  );
}
