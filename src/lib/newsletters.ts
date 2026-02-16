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
    slug: "february-2026-help-etg-build-tomorrows-leaders",
    title: "Everything To Gain",
    subtitle: "February 2026 - Help ETG Build Tomorrow's Leaders",
    excerpt:
      "The February edition highlights spring and summer team plans and outlines how donor support helps fund flights, hotels, vans, and meals for athletes.",
    publishedAt: "2026-02-20",
    image: newsletterPreview,
    pdfUrl:
      "https://cdn.prod.website-files.com/63e1902437bdfc4cd77ce3f6/67b7ca1006fa159777965674_Everything%20to%20Gain%20February%20Newsletter.pdf",
    content: [
      "ETG's mission is to create opportunities for local high school athletes to compete at a high level and gain scholarship exposure.",
      "This issue explains how transportation, lodging, and meal support directly impact players and their families during the season.",
      "Supporters are invited to participate in spring fundraising efforts that sustain boys and girls programming across all age groups.",
    ],
  },
  {
    slug: "december-2025-lessons-that-last-a-lifetime",
    title: "Everything To Gain",
    subtitle: "December 2025 - Lessons That Last a Lifetime",
    excerpt:
      "Holiday reflections from Coach Woodard and stories from alumni showing how Crusader values translate into meaningful careers.",
    publishedAt: "2025-12-06",
    image: newsletterPreview,
    pdfUrl:
      "https://cdn.prod.website-files.com/63e1902437bdfc4cd77ce3f6/675233ed30df1f66f7088ded_Everything%20to%20Gain%20December%20Newsletter.pdf",
    content: [
      "The December issue celebrates alumni progress and the long-term outcomes created by accountability, teamwork, and discipline.",
      "Featured stories highlight former players serving in business, medicine, and nonprofit leadership roles across the region.",
      "The program closes the year by emphasizing gratitude and mentorship for the next generation of ETG athletes.",
    ],
  },
  {
    slug: "october-2025-where-champions-go-next",
    title: "Everything To Gain",
    subtitle: "October 2025 - Where Champions Go Next",
    excerpt:
      "Fall update on ETG's inaugural youth tournament and alumni who continue to set the standard after their playing careers.",
    publishedAt: "2025-10-11",
    image: newsletterPreview,
    pdfUrl:
      "https://cdn.prod.website-files.com/63e1902437bdfc4cd77ce3f6/6709f56f13f8438275f16f6b_Everything%20to%20Gain%20October%20Newsletter.pdf",
    content: [
      "October spotlights athletes competing for scholarships and performing on bigger stages during the fall cycle.",
      "The newsletter introduces ETG's December youth event at Iowa West Fieldhouse.",
      "Alumni stories continue to reinforce the program's core belief that growth extends well beyond basketball.",
    ],
  },
  {
    slug: "august-2025-alumni-spotlight",
    title: "Everything To Gain",
    subtitle: "August 2025 - ETG Crusaders Alumni Newsletter",
    excerpt:
      "Late-summer recap featuring alumni achievements and updates on program momentum heading into the fall.",
    publishedAt: "2025-08-07",
    image: newsletterPreview,
    pdfUrl:
      "https://cdn.prod.website-files.com/63e1902437bdfc4cd77ce3f6/6894f26ca06ec73ca0f0ce07_Everything%20to%20Gain%20August%20Newsletter.pdf",
    content: [
      "The August edition captures offseason growth, donor impact, and preparation priorities for the next competition cycle.",
      "ETG leadership shares updates on operations and continued investment in athlete development pathways.",
      "Families and alumni are encouraged to stay involved as teams transition into fall training windows.",
    ],
  },
  {
    slug: "june-2025-etg-crusaders-alumni-newsletter",
    title: "Everything To Gain",
    subtitle: "June 2025 - ETG Crusaders Alumni Newsletter",
    excerpt:
      "Program anniversary updates, summer camp announcements, and a look at the Crusaders mission since 1993.",
    publishedAt: "2025-06-13",
    image: newsletterPreview,
    pdfUrl:
      "https://cdn.prod.website-files.com/63e1902437bdfc4cd77ce3f6/684c4e8dbdd22d6ec4bfba86_Everything%20to%20Gain%20June%20Newsletter.pdf",
    content: [
      "June reflects on the Omaha Crusaders foundation and the program's evolution into ETG Midwest.",
      "The issue includes summer camp updates and progress from both boys and girls teams.",
      "Alumni support remains central to funding travel and competitive opportunities for current players.",
    ],
  },
  {
    slug: "april-2025-etg-crusaders-alumni-newsletter",
    title: "Everything To Gain",
    subtitle: "April 2025 - ETG Crusaders Alumni Newsletter",
    excerpt:
      "Schedule release for boys and girls teams plus spring fundraising events supporting the annual program budget.",
    publishedAt: "2025-04-17",
    image: newsletterPreview,
    pdfUrl:
      "https://cdn.prod.website-files.com/63e1902437bdfc4cd77ce3f6/6801351c233f1ff52ee88cc8_Everything%20to%20Gain%20April%20Newsletter.pdf",
    content: [
      "April's issue outlines a full travel and tournament plan needed for shoe-circuit-level competition.",
      "The newsletter promotes key fundraising events, including the Dinner Bash and community support initiatives.",
      "ETG emphasizes that donor participation directly expands access and exposure for student-athletes.",
    ],
  },
];

export function getNewsletterBySlug(slug: string) {
  return newsletterPosts.find((post) => post.slug === slug);
}
