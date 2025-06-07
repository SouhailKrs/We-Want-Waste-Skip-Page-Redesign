import { useEffect, useState } from "react";
import Button from "../components/button/Button";
import Skeleton from "../components/skeleton/Skeleton";
import SkipCard from "../components/skip-card/SkipCard";
import SkipDetailsPanel from "../components/skip-details-panel/SkipDetailsPanel";
import SkipPageDisclaimer from "../components/skip-page-disclamer/SkipPageDisclaimer";
import type { SkipModel } from "../model/Skip";
import SkipPageError from "../components/skip-page-error/SkipPageError";

export default function SelectSkipPage() {
  const [skips, setSkips] = useState<SkipModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSkips, setSelectedSkips] = useState<SkipModel[]>([]);
  useEffect(() => {
    async function fetchSkips() {
      try {
        const res = await fetch(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=LE10&area=Hinckley"
        );
        if (!res.ok) throw new Error("Failed to fetch skip data");
        const data = await res.json();
        setSkips(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSkips();
  }, []);

  const handleSkipSelection = (skip: SkipModel) => {
    setSelectedSkips(
      selectedSkips.some((s) => s.id === skip.id)
        ? selectedSkips.filter((s) => s.id !== skip.id)
        : [...selectedSkips, skip]
    );
  };

  const handleSkipRemove = (id: number) => {
    setSelectedSkips(selectedSkips.filter((s) => s.id !== id));
  };

  if (loading)
    return (
       <SkipPageSkeleton />
    );
  if (error) return <SkipPageError />;

  return (
    <div className="flex flex-col gap-16 text-center  w-full items-center mb-24">
      <div className="flex-col flex gap-2">
        <h2 className="font-bold ">Choose Your Skip Size</h2>
        <p className="text-grey desktop:max-w-md ">
          Select the perfect skip size for your garden waste
        </p>
      </div>
      <div className="grid gap-8  w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {
          skips.map((skip) => {
            const isSelected = selectedSkips.some((s) => s.id === skip.id);
            const imageUrl = `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${skip.size}-yarder-skip.jpg`;
            return (
              <SkipCard
                onSkipSelect={handleSkipSelection}
                skip={skip}
                isSelected={isSelected}
                imgUrl={imageUrl}
                key={skip.id}
              />
            );
          })
        }
        <SkipDetailsPanel
          selectedSkips={selectedSkips}
          onSkipRemove={handleSkipRemove}
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <p> Need help choosing the right skip size? </p>
        <Button href="https://wewantwaste.co.uk" shouldOpenHrefInNewTab>
          Contact Our Experts
        </Button>
      </div>
      <SkipPageDisclaimer />
    </div>
  );
}

const SkipPageSkeleton = () => {
  return (
    <div className="grid gap-8 w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
      {Array.from({ length: 6 }).map((_, index: number) => (
        <Skeleton key={index} height="h-52" />
      ))}
    </div>
  );
};