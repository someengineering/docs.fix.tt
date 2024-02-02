export const openGraph = ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}): string => {
  const ogTitle = title ? encodeURIComponent(title.trim()) : undefined;
  const ogMetadata = description
    ? encodeURIComponent(description.trim())
    : undefined;

  return `https://og.some.engineering/api/image?theme=fix${
    ogTitle ? `&title=${ogTitle}` : ''
  }${ogMetadata ? `&metadata=${ogMetadata}` : ''}`;
};
