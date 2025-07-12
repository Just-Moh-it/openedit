import { Link } from "@tanstack/react-router";
import { OpenEditLogo } from "@/assets/logo";
import { Separator } from "@/components/ui/separator";

export function FeaturesSection() {
  return (
    <section className="pt-16 lg:pt-24">
      <div className="mx-auto flex max-w-[1536px] flex-col items-stretch gap-10 px-6">
        <h2 className="max-w-200 font-semibold text-4xl tracking-tight sm:text-5xl sm:tracking-[-0.96px] lg:text-6xl lg:tracking-[-1.2px]">
          Constantly pushing the limits of what's possible
        </h2>

        <Separator />

        <Link to="/">
          <OpenEditLogo />
        </Link>
      </div>
    </section>
  );
}
