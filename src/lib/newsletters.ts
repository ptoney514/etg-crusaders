import type { StaticImageData } from "next/image";
import newsletterPreview from "@/assets/newsletter-preview.png";

export type NewsletterPost = {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  publishedAt: string;
  image: StaticImageData;
  content: string[];
  pdfUrl?: string;
};

export const newsletterPosts: NewsletterPost[] = [
  {
    slug: "october-2024-fall-highlights",
    title: "Everything To Gain",
    subtitle: "Fall Season Highlights & Championship Updates",
    excerpt:
      "Catch up on fall season achievements, player spotlights, and upcoming tournament schedules.",
    publishedAt: "2024-10-01",
    image: newsletterPreview,
    content: [
      "The Crusaders wrapped up a strong fall run with growth across every age group and notable wins in regional tournament play.",
      "This issue highlights player development milestones, upcoming showcase dates, and coaching notes focused on defensive consistency.",
      "Families can review November travel plans and registration windows in the events section of the printed release.",
    ],
  },
  {
    slug: "september-2024-season-kickoff",
    title: "Everything To Gain",
    subtitle: "Season Kickoff & New Roster",
    excerpt:
      "Meet the new roster, review training camp highlights, and get a first look at the season calendar.",
    publishedAt: "2024-09-01",
    image: newsletterPreview,
    content: [
      "September introduced new athletes at every level with an emphasis on skill progression and game IQ.",
      "Coaches outlined standards for accountability, practice attendance, and game-film review expectations.",
    ],
  },
  {
    slug: "august-2024-summer-recap",
    title: "Everything To Gain",
    subtitle: "Summer Recap & Alumni Spotlights",
    excerpt:
      "A recap of summer development programs, alumni updates, and preseason preparation priorities.",
    publishedAt: "2024-08-01",
    image: newsletterPreview,
    content: [
      "Summer sessions focused on footwork, transition reads, and strength foundations that carry into fall competition.",
      "Alumni highlights include college commitments and offseason leadership in local camps.",
    ],
  },
  {
    slug: "july-2024-training-programs",
    title: "Everything To Gain",
    subtitle: "Summer Training Programs",
    excerpt:
      "Inside the intensive July training block and the performance benchmarks used by our staff.",
    publishedAt: "2024-07-01",
    image: newsletterPreview,
    content: [
      "July programming emphasized decision-making under pressure and finishing through contact.",
      "Players tracked weekly skill metrics to guide personal training priorities.",
    ],
  },
  {
    slug: "june-2024-awards-and-wrapup",
    title: "Everything To Gain",
    subtitle: "End of Season Awards & Celebrations",
    excerpt:
      "Team achievements, award winners, and plans heading into the next cycle.",
    publishedAt: "2024-06-01",
    image: newsletterPreview,
    content: [
      "The June edition celebrates team milestones and individual growth across all programs.",
      "Families also receive updated timelines for summer camps and roster evaluations.",
    ],
  },
  {
    slug: "may-2024-playoff-push",
    title: "Everything To Gain",
    subtitle: "Playoff Push & Tournament Preview",
    excerpt:
      "Key tournament matchups, preparation notes, and playoff mindset from the coaching staff.",
    publishedAt: "2024-05-01",
    image: newsletterPreview,
    content: [
      "May focused on playoff execution and late-clock situational reps.",
      "The staff shared opponent scouting frameworks and communication priorities.",
    ],
  },
  {
    slug: "april-2024-mid-season-report",
    title: "Everything To Gain",
    subtitle: "Mid-Season Report & Player Spotlights",
    excerpt:
      "Mid-season metrics, standings snapshots, and featured athlete development stories.",
    publishedAt: "2024-04-01",
    image: newsletterPreview,
    content: [
      "April tracked progress in pace control, rebounding margins, and shot quality.",
      "Spotlights recognized athletes leading by example both on and off the floor.",
    ],
  },
  {
    slug: "march-2024-spring-break-camp",
    title: "Everything To Gain",
    subtitle: "Spring Break Training Camp",
    excerpt:
      "Camp recap, guest trainers, and takeaways players are bringing into league play.",
    publishedAt: "2024-03-01",
    image: newsletterPreview,
    content: [
      "Spring break camp sessions targeted acceleration, agility, and spacing reads.",
      "Players left with individualized training checkpoints for the remainder of spring.",
    ],
  },
];

export function getNewsletterBySlug(slug: string) {
  return newsletterPosts.find((post) => post.slug === slug);
}
