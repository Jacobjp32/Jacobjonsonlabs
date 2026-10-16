type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  level?: "h1" | "h2";
  titleId?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  level = "h2",
  titleId,
}: SectionHeadingProps) {
  const Title = level;
  return (
    <div className="max-w-4xl">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
      ) : null}
      <Title id={titleId} className="mt-4 text-balance text-4xl leading-tight sm:text-6xl">
        {title}
      </Title>
      {description ? (
        <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
