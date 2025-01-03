import InstagramPostScheduler from './instascheduler/InstagramPostScheduler'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Instagram Post Scheduler</h1>
      <InstagramPostScheduler />
    </main>
  )
}

