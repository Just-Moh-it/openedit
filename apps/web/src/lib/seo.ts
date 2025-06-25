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

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@just_moh_it" },
    { name: "twitter:site:id", content: "1359002177390354432" },
    { name: "twitter:creator", content: "@just_moh_it" },
    { name: "twitter:creator:id", content: "1359002177390354432" },
    { name: "twitter:title", content: title?.substring(0, 70) }, // Max 70 chars
    { name: "twitter:description", content: description?.substring(0, 200) }, // Max 200 chars
    { name: "twitter:domain", content: url.replace(/^https?:\/\//, "") },
    { name: "twitter:url", content: url },

    // Image tags
    ...(image
      ? [
          { property: "og:image", content: `${url}${image}` },
          { name: "twitter:image", content: `${url}${image}` },
          { name: "twitter:image:alt", content: title }, // Alt text for accessibility
        ]
      : []),
  ];

  return tags;
};
