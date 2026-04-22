import { Skeleton } from "@/components/ui/skeleton";

export default function GlobalRouteSkeleton() {
  return (
    <div className="w-full">
      <div className="px-5 md:px-12 py-8 md:py-10">
        <div className="max-w-5xl">
          <Skeleton className="h-8 w-56" />
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-full max-w-[42rem]" />
            <Skeleton className="h-4 w-full max-w-[36rem]" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="border rounded-[20px] p-2">
              <Skeleton className="w-full min-h-[12rem] rounded-2xl" />
              <div className="mt-3">
                <Skeleton className="h-5 w-28 rounded-md" />
                <Skeleton className="h-5 w-full mt-3" />
                <Skeleton className="h-5 w-4/5 mt-2" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  );
}

