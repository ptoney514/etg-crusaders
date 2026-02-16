import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { getPlayerBySlug, players } from "@/lib/roster";

type PlayerDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return players.map((player) => ({ slug: player.slug }));
}

export default async function PlayerDetailPage({ params }: PlayerDetailPageProps) {
  const { slug } = await params;
  const player = getPlayerBySlug(slug);

  if (!player) {
    notFound();
  }

  return (
    <SiteChrome>
      <section className="pt-30 pb-20 bg-[var(--surface-1)]">
        <div className="max-w-6xl mx-auto px-6">
          <Link
            href="/roster"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8"
            style={{ fontFamily: "var(--font-condensed)", letterSpacing: "0.08em" }}
          >
            Back to Roster
          </Link>

          <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
            <div className="rounded-xl overflow-hidden border border-white/10 bg-black">
              <img src={player.headshot} alt={player.name} className="w-full h-full object-cover" />
            </div>

            <div>
              <p className="section-label mb-3">Class of {player.gradYear}</p>
              <h1
                className="section-title text-white mb-2"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                {player.name}
              </h1>
              <p
                className="text-white/65 mb-8"
                style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem" }}
              >
                {player.position} • {player.team}
              </p>

              <p
                className="text-white/65 mb-8"
                style={{ fontFamily: "var(--font-body)", fontSize: "1rem", lineHeight: 1.8 }}
              >
                {player.bio}
              </p>

              <div className="flex flex-wrap gap-3">
                {player.social.instagram ? (
                  <Link
                    href={player.social.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-md border border-white/15 text-white/75 hover:text-white hover:border-white/30"
                    style={{ fontFamily: "var(--font-condensed)", letterSpacing: "0.07em" }}
                  >
                    Instagram
                  </Link>
                ) : null}
                {player.social.twitter ? (
                  <Link
                    href={player.social.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-md border border-white/15 text-white/75 hover:text-white hover:border-white/30"
                    style={{ fontFamily: "var(--font-condensed)", letterSpacing: "0.07em" }}
                  >
                    Twitter / X
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
