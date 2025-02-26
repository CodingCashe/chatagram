import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="container mx-auto py-4 px-4 sm:py-8">
        <div className="space-y-8">
          {/* Header Section */}
          <div className="relative">
            <div className="relative bg-gray-900/50 rounded-lg p-4 sm:p-6 border border-gray-800">
              <Skeleton className="h-9 w-[300px]" />
              <Skeleton className="h-5 w-[500px] mt-2" />
              <div className="mt-4 flex flex-wrap gap-3">
                <Skeleton className="h-6 w-[150px]" />
                <Skeleton className="h-6 w-[150px]" />
              </div>
            </div>
          </div>

          {/* Scheduler Section */}
          <section className="max-w-3xl mx-auto w-full">
            <Skeleton className="h-[600px] w-full rounded-lg" />
          </section>

          {/* Posts List Section */}
          <section className="w-full">
            <div className="space-y-4">
              <div className="relative">
                <div className="relative bg-gray-900/50 rounded-lg p-3 sm:p-4 border border-gray-800">
                  <Skeleton className="h-7 w-[200px]" />
                  <Skeleton className="h-5 w-[250px] mt-2" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-[300px] rounded-lg" />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

