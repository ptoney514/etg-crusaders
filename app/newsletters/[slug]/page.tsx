import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { getNewsletterBySlug, newsletterPosts } from "@/lib/newsletters";

type NewsletterDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function formatPublishedDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function generateStaticParams() {
  return newsletterPosts.map((post) => ({ slug: post.slug }));
}

export default async function NewsletterDetailPage({ params }: NewsletterDetailPageProps) {
  const { slug } = await params;
  const post = getNewsletterBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <SiteChrome>
      <section className="pt-30 pb-20 bg-[var(--surface-1)]">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/newsletters"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8"
            style={{ fontFamily: "var(--font-condensed)", letterSpacing: "0.08em" }}
          >
            Back to Newsletters
          </Link>

          <p className="section-label mb-3">{formatPublishedDate(post.publishedAt)}</p>
          <h1
            className="section-title text-white mb-3"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            {post.title}
          </h1>
          <p
            className="text-white/70 mb-10"
            style={{ fontFamily: "var(--font-body)", fontSize: "1.15rem", lineHeight: 1.7 }}
          >
            {post.subtitle}
          </p>

          <div className="rounded-xl overflow-hidden border border-white/10 bg-[var(--surface-3)] mb-10">
            <Image
              src={post.image}
              alt={`${post.title} ${post.subtitle}`}
              className="w-full h-auto"
              priority
            />
          </div>

          <div className="space-y-5">
            {post.content.map((paragraph) => (
              <p
                key={paragraph}
                className="text-white/70"
                style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.8 }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
