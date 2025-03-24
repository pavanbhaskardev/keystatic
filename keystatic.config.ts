import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: "pavanbhaskardev/keystatic",
    pathPrefix: "prod",
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        content: fields.markdoc({
          label: "Content",
          options: {
            image: {
              directory: "src/assets/images/posts",
              publicPath: "../../assets/images/posts/",
            },
          },
        }),
        author: fields.relationship({
          label: "Author",
          collection: "authors",
          validation: {
            isRequired: true,
          },
        }),
      },
    }),
    authors: collection({
      label: "Authors",
      slugField: "name",
      path: "src/content/authors/*",
      format: { data: "yaml", contentField: "markdoc" },
      schema: {
        markdoc: fields.emptyContent({
          extension: "mdoc",
        }),
        name: fields.slug({ name: { label: "Name" } }),
        bio: fields.text({ label: "Bio" }),
        avatar: fields.image({
          label: "Avatar",
          directory: "public/images/authors",
          publicPath: "/images/authors",
        }),
      },
    }),
  },
});
