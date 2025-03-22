import type React from "react"
export default function CustomerEngagementLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-background dark radial--gradient">{children}</div>
}

