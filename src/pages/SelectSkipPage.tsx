import { useEffect, useState } from "react";
import Button from "../components/button/Button";
import Skeleton from "../components/skeleton/Skeleton";
import SkipCard from "../components/skip-card/SkipCard";
import SkipDetailsPanel from "../components/skip-details-panel/SkipDetailsPanel";
import SkipPageDisclaimer from "../components/skip-page-disclamer/SkipPageDisclaimer";
import SkipPageError from "../components/skip-page-error/SkipPageError";
import type {
  SkipModel,
  SkipPageFilters as SkipPageFiltersType,
} from "../model/Skip";
import SkipPageFilters from "../components/skip-page-filters/SkipPageFilters";
import SkipPageFiltersNoResults from "../components/skip-page-filters/SkipPageFiltersNoResults";
import { useFetch } from "../hooks/useFetch";

export default function SelectSkipPage() {
  const [selectedSkips, setSelectedSkips] = useState<SkipModel[]>([]);
  const [filteredSkips, setFilteredSkips] = useState<SkipModel[]>([]);
  const [filters, setFilters] = useState<SkipPageFiltersType>({
    size: [],
    location: [],
    duration: "",
    price: "",
  });

  function hasFilters(filters: SkipPageFiltersType): boolean {
    const sizeFilterApplied = filters.size.length > 0;
    const locationFilterApplied = filters.location.length > 0;
    const durationFilterApplied = filters.duration !== "";
    const priceFilterApplied = filters.price !== "";

    return (
      sizeFilterApplied ||
      locationFilterApplied ||
      durationFilterApplied ||
      priceFilterApplied
    );
  }

  const {
    data: skips,
    loading,
    error,
  } = useFetch<SkipModel[]>(
    "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
  );

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

  useEffect(() => {
    if (!skips) return;
    const skipsWithImages = (skips ?? []).map((skip) => ({
      ...skip,
      image: `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${skip.size}-yarder-skip.jpg`,
    }));

    let filtered = skipsWithImages;

    if (filters.size.length > 0) {
      filtered = filtered.filter((s) =>
        filters.size.includes(`${s.size} Yard`)
      );
    }

    if (filters.location.length > 0) {
      filtered = filtered.filter((s) => filters.location.includes(s.area));
    }

    if (filters.duration) {
      filtered = filtered.filter(
        (s) => String(s.hire_period_days) === filters.duration
      );
    }

    if (filters.price) {
      filtered = filtered.filter((s) => {
        const price = s.price_before_vat;
        switch (filters.price) {
          case "under-300":
            return price < 300;
          case "300-600":
            return price >= 300 && price <= 600;
          case "over-600":
            return price > 600;
          default:
            return true;
        }
      });
    }

    setFilteredSkips(filtered);
  }, [filters, skips]);

  if (loading) return <SkipPageSkeleton />;

  if (error) return <SkipPageError />;

  return (
    <div className="flex flex-col gap-16 text-center  w-full items-center mb-24">
       <meta
        name="description"
        content="Find and book the perfect skip for you or renovation project in Lowestoft. Choose from various sizes and prices."
      />
      <meta name="robots" content="index, follow" />
      <meta
        property="og:title"
        content="Skip Hire in Lowestoft | We Want Waste"
      />
      <meta
        property="og:description"
        content="Need a skip in Lowestoft? Compare sizes, durations, and prices easily and book online."
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content="https://wewantwaste.co.uk"
      />
      <meta
        property="og:image"
        content="https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg"
      />
      <div className="flex-col flex gap-2">
        <h2 className="font-bold ">Choose Your Skip Size</h2>
        <p className="text-grey desktop:max-w-md ">
          Select the perfect skip size for your garden waste
        </p>
      </div>
      <SkipPageFilters
        skips={skips ?? []}
        onFilterChange={(newFilters) => setFilters(newFilters)}
      />

      <div className="grid gap-8 w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {filteredSkips.length === 0 && hasFilters(filters) ? (
          <SkipPageFiltersNoResults />
        ) : (
          filteredSkips.map((skip) => {
            const isSelected = selectedSkips.some((s) => s.id === skip.id);
            return (
              <SkipCard
                onSkipSelect={handleSkipSelection}
                skip={skip}
                isSelected={isSelected}
                key={skip.id}
              />
            );
          })
        )}

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