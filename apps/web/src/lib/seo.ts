export const seo = ({
  title,
  description,
  keywords,
  image,
  url = "https://openeditapp.com",
}: {
  title: string;
  description?: string;
  image?: string;
  keywords?: string;
  url?: string;
}) => {
  const tags = [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },

    // Facebook/OpenGraph tags
    { property: "og:url", content: url },
    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },

    // Twitter tags
    { name: "twitter:card", content: "summary_large_image" },
    { property: "twitter:domain", content: url.replace("https://", "") },
    { property: "twitter:url", content: url },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: "@just_moh_it" },
    { name: "twitter:site", content: "@just_moh_it" },

    // Image tags
    ...(image
      ? [
          { property: "og:image", content: `${url}${image}` },
          { name: "twitter:image", content: `${url}${image}` },
        ]
      : []),
  ];

  return tags;
};
