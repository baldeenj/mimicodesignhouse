// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.CF_PAGES_BRANCH || process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main",
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "article",
        label: "Articles",
        path: "src/content/articles",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "tag",
            label: "Category",
            required: true,
            options: [
              "Security",
              "Artificial Intelligence",
              "HCI",
              "Theory",
              "UX Research",
              "Strategy",
              "Design"
            ]
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero Image (optional)"
          },
          {
            type: "string",
            name: "summary",
            label: "Summary (shown in listings)",
            ui: { component: "textarea" }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      },
      {
        name: "vlog",
        label: "Vlogs",
        path: "src/content/vlogs",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "number",
            name: "episode",
            label: "Episode Number",
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
            required: true
          },
          {
            type: "string",
            name: "videoUrl",
            label: "Video URL (YouTube watch or embed URL)",
            required: true
          },
          {
            type: "string",
            name: "thumbnailUrl",
            label: "Thumbnail URL (optional)"
          },
          {
            type: "string",
            name: "summary",
            label: "Summary",
            ui: { component: "textarea" }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Show Notes",
            isBody: true
          }
        ]
      },
      {
        name: "portfolio",
        label: "Portfolio",
        path: "src/content/portfolio",
        format: "md",
        fields: [
          {
            type: "string",
            name: "client",
            label: "Client Name",
            required: true
          },
          {
            type: "string",
            name: "title",
            label: "Project Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Short Description (shown in listings)",
            ui: { component: "textarea" },
            required: true
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true
          },
          {
            type: "image",
            name: "imageUrl",
            label: "Cover Image"
          },
          {
            type: "boolean",
            name: "featured",
            label: "Show on Homepage"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Case Study",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
