import type { StaticImageData } from "next/image";
import august2025Cover from "@/assets/newsletters/august-2025-cover.png";
import december2025Cover from "@/assets/newsletters/december-2025-cover.png";
import february2026Cover from "@/assets/newsletters/february-2026-cover.png";

export type NewsletterPost = {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  publishedAt: string;
  image: string;
  content: string[];
  pdfUrl?: string;
};

export const newsletterPosts: NewsletterPost[] = [
  {
    slug: "february-2026-help-etg-build-tomorrows-leaders",
    title: "Everything To Gain",
    subtitle: "February 2026 - Alumni Spotlight and In-Season Reflections",
    excerpt:
      "Coach Woodard reflects on the season and highlights alumni journeys, including Kelsey Woodard (Davis) and Sam Griesel.",
    publishedAt: "2026-02-01",
    image: "/images/assets/ETG-newsletter-bg-16x9.png",
    pdfUrl: "/newsletters/etg-newsletter-february-2026.pdf",
    content: [
      "The February issue captures Coach Woodard's perspective as the 2025-2026 season enters its final stretch.",
      "Featured alumni spotlights reinforce how discipline and consistency during Crusader years translate to long-term growth.",
      "Families and supporters are encouraged to stay connected as players prepare for spring and summer competition opportunities.",
    ],
  },
  {
    slug: "december-2025-lessons-that-last-a-lifetime",
    title: "Everything To Gain",
    subtitle: "December 2025 - Lessons That Last a Lifetime",
    excerpt:
      "Holiday reflections from Coach Woodard and alumni updates showing how Crusader values continue shaping family and professional life.",
    publishedAt: "2025-12-06",
    image: "/images/assets/ETG-newsletter-bg-16x9.png",
    pdfUrl: "/newsletters/etg-newsletter-december-2025.pdf",
    content: [
      "This edition highlights the alumni network's breadth and the impact of lessons learned through Crusader competition and mentorship.",
      "Coach Woodard shares gratitude for families and supporters while encouraging alumni to stay engaged with current athletes.",
      "December closes with a strong emphasis on character, accountability, and giving back across generations.",
    ],
  },
  {
    slug: "august-2025-alumni-spotlight",
    title: "Everything To Gain",
    subtitle: "August 2025 - Summer Recap and Alumni Spotlights",
    excerpt:
      "An August update recapping summer team progress and featuring alumni spotlights from Andy King and Kelsey Newman (Schlitz).",
    publishedAt: "2025-08-01",
    image: "/images/assets/ETG-newsletter-bg-16x9.png",
    pdfUrl: "/newsletters/etg-newsletter-august-2025.pdf",
    content: [
      "The August issue opens with a recap of summer outcomes for both boys and girls ETG Crusader teams.",
      "Two alumni spotlight stories provide perspective on recruiting, leadership, and life after playing years.",
      "The newsletter invites continued alumni support to expand opportunities and resources for current athletes.",
    ],
  },
];

export function getNewsletterBySlug(slug: string) {
  return newsletterPosts.find((post) => post.slug === slug);
}
