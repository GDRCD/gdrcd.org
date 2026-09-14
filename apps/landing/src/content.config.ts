import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { file } from "astro/loaders";

const links = defineCollection({
  loader: file("src/contents/links.json"),
  schema: z.object({
    id: z.string(),
    label: z.string(),
    href: z.string(),
    ariaLabel: z.string().optional(),
    icon: z.enum(["github", "discord"]).optional(),
    order: z.number().default(0),
  }),
});

export const collections = {
  links,
};
