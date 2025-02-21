import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export default function Loading() {
  return (
    <div className="container mx-auto py-8">
      <div className="space-y-6">
        <div>
          <Skeleton className="h-9 w-[300px]" />
          <Skeleton className="h-5 w-[200px] mt-2" />
        </div>

        <Separator />

        <div className="grid gap-8">
          {/* Post Scheduler Section */}
          <section>
            <Skeleton className="h-[600px] w-full max-w-2xl mx-auto" />
          </section>

          {/* Scheduled Posts Section */}
          <section className="space-y-4">
            <div>
              <Skeleton className="h-7 w-[200px]" />
              <Skeleton className="h-5 w-[250px] mt-2" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-[300px]" />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

