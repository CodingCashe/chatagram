"use client"

import type React from "react"

import { useState } from "react"
import { AccountRecognition } from "@/components/global/my-account"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function DemoPage() {
  const [email, setEmail] = useState("")
  const [showRecognition, setShowRecognition] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate checking if email exists
    if (email.includes("@")) {
      setShowRecognition(true)
    }
  }

  const handleLoginInstead = () => {
    setShowRecognition(false)
    setIsLoggingIn(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {showRecognition && (
        <AccountRecognition
          email={email}
          onLoginInstead={handleLoginInstead}
          onClose={() => setShowRecognition(false)}
        />
      )}

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isLoggingIn ? "Log in" : "Create an account"}</CardTitle>
          <CardDescription>
            {isLoggingIn
              ? "Welcome back! Enter your credentials to access your account."
              : "Enter your details to create a new account."}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              {isLoggingIn ? "Log in" : "Sign up"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
