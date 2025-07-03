export const FeatureColumns = () => {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
          <Feature animationDelay={0}>
            <FeatureTitle>Figma for Video Editing</FeatureTitle>
            <FeatureDescription>
              Love the speed of Figma? We miss that for browser-based video
              editors. An interface that doesn&apos;t get in your way and is
              made to make your work flow.
            </FeatureDescription>
          </Feature>

          <Feature animationDelay={0.2}>
            <FeatureTitle>AI-Enabled</FeatureTitle>
            <FeatureDescription>
              Bringing the abilities of Cursor to a video editor. Drag your
              clips in and OpenEdit trims, reorders, applies voice balancing,
              etc. OpenEdit makes it easy.
            </FeatureDescription>
          </Feature>

          <Feature animationDelay={0.4}>
            <FeatureTitle>Local First, Collaborative</FeatureTitle>
            <FeatureDescription>
              Collaborate on videos together with others. Just send over a link
              to invite editors, collaborators or reviewers. Your files live in
              the cloud
            </FeatureDescription>
          </Feature>
        </div>
      </div>
    </section>
  );
};

interface FeatureProps {
  children: React.ReactNode;
  animationDelay: number;
}

export const Feature = ({ children, animationDelay }: FeatureProps) => {
  return (
    <div
      className="group animate-fade-in"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      {/* Orange Bullet */}
      <div className="mb-6 h-4 w-4 rounded-full bg-orange-600 transition-transform duration-200 group-hover:scale-110" />

      {/* Feature Content */}
      {children}
    </div>
  );
};

export const FeatureTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <h3 className="mb-4 font-bold font-sans text-lg uppercase tracking-wide">
      {children}
    </h3>
  );
};

export const FeatureDescription = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <p className="font-mono text-sm leading-relaxed">{children}</p>;
};
