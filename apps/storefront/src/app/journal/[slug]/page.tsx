import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { getBlogPost, getBlogPosts } from "@/lib/data/blog";
import { blurDataURL } from "@/lib/image";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1758077223826-74f8ec22ebfd?q=80&w=2070&auto=format&fit=crop";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getBlogPost(slug), getBlogPosts()]);

  if (!post) notFound();

  const related = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric",
      })
    : null;

  return (
    <article className="flex flex-col border-b border-[var(--card-border)] bg-[var(--background)]">
      {/* Header */}
      <section className="flex flex-col lg:flex-row border-b border-[var(--card-border)]">
        <div className="w-full lg:w-1/3 px-6 md:px-12 lg:px-16 py-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[var(--card-border)]">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Back to Journal
          </Link>
          {post.category && (
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-4 block">
              {post.category}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-serif text-[var(--foreground)] mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-sm text-[var(--text-secondary)] font-light mb-8 flex-wrap">
            {date && <span>{date}</span>}
            {post.read_time && (
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>{post.read_time} read</span>
              </div>
            )}
          </div>
          {post.author && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--section-bg)] flex items-center justify-center text-[var(--foreground)] font-serif font-medium">
                {post.author[0]}
              </div>
              <p className="text-sm font-medium text-[var(--foreground)]">{post.author}</p>
            </div>
          )}
        </div>
        <div className="w-full lg:w-2/3 relative min-h-[400px] lg:min-h-[600px]">
          <Image
            src={post.cover_image ?? FALLBACK_IMAGE}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL={blurDataURL}
          />
        </div>
      </section>

      {/* Content */}
      <section className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/3 px-6 md:px-12 lg:px-16 py-12 lg:py-20 border-b lg:border-b-0 lg:border-r border-[var(--card-border)]">
          <div className="lg:sticky lg:top-32">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)] mb-6">Share Article</p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Share2].map((Icon, i) => (
                <button
                  key={i}
                  className="w-10 h-10 rounded-full border border-[var(--card-border)] flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/3 px-6 md:px-12 lg:px-16 py-12 lg:py-20">
          <div className="max-w-2xl">
            {post.excerpt && (
              <p className="text-xl md:text-2xl font-serif text-[var(--foreground)] italic mb-10 leading-relaxed border-l border-[var(--card-border)] pl-4 md:pl-6">
                {post.excerpt}
              </p>
            )}
            {post.body && (
              <div
                className="prose prose-lg max-w-none
                           prose-headings:font-serif prose-headings:text-[var(--foreground)]
                           prose-p:mt-0 prose-p:mb-6 prose-p:text-[var(--text-secondary)] prose-p:text-sm md:prose-p:text-base prose-p:leading-relaxed
                           prose-ul:mt-0 prose-ul:mb-6 prose-li:my-1.5
                           prose-a:text-[var(--foreground)]
                           prose-img:rounded-sm"
                dangerouslySetInnerHTML={{ __html: post.body }}
              />
            )}
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-[var(--card-border)]">
          <div className="px-6 md:px-12 lg:px-16 py-16">
            <h2 className="text-3xl font-serif text-[var(--foreground)] mb-12">More Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((item) => (
                <Link key={item.slug} href={`/journal/${item.slug}`} className="group block">
                  <div className="relative aspect-[4/3] mb-6 overflow-hidden bg-[var(--section-bg)]">
                    <Image
                      src={item.cover_image ?? FALLBACK_IMAGE}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      placeholder="blur"
                      blurDataURL={blurDataURL}
                    />
                  </div>
                  <h3 className="text-xl font-serif text-[var(--foreground)] mb-2 group-hover:italic transition-all">
                    {item.title}
                  </h3>
                  {item.category && (
                    <p className="text-xs uppercase tracking-[0.1em] text-[var(--text-secondary)]">
                      {item.category}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
