import { IoSearchOutline } from "react-icons/io5"
export default function SkipPageFiltersNoResults() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <IoSearchOutline className="text-8xl text-grey bg-light-grey p-5 rounded-full mb-4" />
      <h3>No skips found</h3>
      <p className="text-grey max-w-2xl">
        We couldn't find any skips matching your current filters. Try adjusting
        your search criteria to see more options.
      </p>
    </div>
  );
}