import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.GITHUB_BRANCH ?? "main",
  clientId: process.env.TINA_CLIENT_ID ?? "",
  token: process.env.TINA_TOKEN ?? "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "author",
        label: "Author",
        path: "src/data",
        format: "json",
        ui: {
          allowedActions: { create: false, delete: false },
          global: true,
        },
        match: { include: "author" },
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            required: true,
          },
          {
            type: "string",
            name: "handle",
            label: "Handle",
            required: true,
          },
          {
            type: "object",
            name: "photo",
            label: "Photo",
            fields: [
              { type: "image", name: "src", label: "Image", description: "Recommended under 2MB. JPEG or PNG." },
              { type: "string", name: "alt", label: "Alt Text" },
            ],
          },
          {
            type: "string",
            name: "bio",
            label: "Bio",
            list: true,
            ui: { component: "textarea" },
          },
          {
            type: "object",
            name: "links",
            label: "Links",
            list: true,
            ui: {
              itemProps: (item: { label?: string }) => ({ label: item?.label }),
            },
            fields: [
              { type: "string", name: "label", label: "Label", required: true },
              { type: "string", name: "url", label: "URL", required: true },
            ],
          },
        ],
      },
      {
        name: "post",
        label: "Posts",
        path: "src/content/posts",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true,
          },
          {
            type: "string",
            name: "tag",
            label: "Tag",
            required: true,
            options: ["essay", "take", "note", "review", "fragment"],
          },
          {
            type: "string",
            name: "readTime",
            label: "Read Time",
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            ui: { component: "textarea" },
            required: true,
          },
          {
            type: "object",
            name: "image",
            label: "Image",
            fields: [
              {
                type: "image",
                name: "src",
                label: "File",
                description: "Recommended under 2MB. JPEG or PNG. Images over 2MB will be excluded from Bluesky posts.",
              },
              { type: "string", name: "alt", label: "Alt Text" },
            ],
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured",
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
          },
          {
            type: "string",
            name: "discussionUrl",
            label: "Discussion URL (Bluesky / Mastodon thread)",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
