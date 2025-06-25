import { OpenEditLogo } from "@/assets/logo";

export const HighlightSection = () => {
  return (
    <footer className="relative flex grow flex-col items-stretch justify-center overflow-hidden bg-primary">
      <div className="mx-auto flex w-full max-w-7xl grow flex-col justify-center px-6 text-center">
        <p className="font-mono text-primary-foreground text-xs uppercase tracking-wider">
          <OpenEditLogo className="h-30" />
        </p>
      </div>
    </footer>
  );
};
