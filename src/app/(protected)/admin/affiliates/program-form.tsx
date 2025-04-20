"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { createAffiliateProgram, updateAffiliateProgram } from "../actions/affiliate-admin-actions"

const formSchema = z.object({
  name: z.string().min(3, { message: "Program name must be at least 3 characters" }),
  description: z.string().optional(),
  commissionRate: z.coerce
    .number()
    .min(0, { message: "Commission rate must be greater than or equal to 0" })
    .max(100, { message: "Commission rate cannot exceed 100%" }),
  cookieDuration: z.coerce
    .number()
    .min(1, { message: "Cookie duration must be at least 1 day" })
    .max(365, { message: "Cookie duration cannot exceed 365 days" }),
  minimumPayout: z.coerce.number().min(1, { message: "Minimum payout must be at least $1" }),
  status: z.enum(["active", "paused", "inactive"]),
  termsAndConditions: z.string().optional(),
})

type ProgramFormValues = z.infer<typeof formSchema>

interface ProgramFormProps {
  program?: {
    id: string
    name: string
    description: string | null
    commissionRate: number
    cookieDuration: number
    minimumPayout: number
    status: string
    termsAndConditions: string | null
  }
  isEditing?: boolean
}

export default function ProgramForm({ program, isEditing = false }: ProgramFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const defaultValues: Partial<ProgramFormValues> = program
    ? {
        name: program.name,
        description: program.description || "",
        commissionRate: program.commissionRate,
        cookieDuration: program.cookieDuration,
        minimumPayout: program.minimumPayout,
        status: program.status as "active" | "paused" | "inactive",
        termsAndConditions: program.termsAndConditions || "",
      }
    : {
        name: "",
        description: "",
        commissionRate: 10,
        cookieDuration: 30,
        minimumPayout: 50,
        status: "active",
        termsAndConditions: "",
      }

  const form = useForm<ProgramFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: ProgramFormValues) => {
    setIsSubmitting(true)

    try {
      if (isEditing && program) {
        const result = await updateAffiliateProgram(program.id, data)

        if (result.success) {
          toast({
            title: "Program Updated",
            description: "Affiliate program has been updated successfully",
          })
          router.push("/admin/affiliates")
          router.refresh()
        } else {
          toast({
            title: "Error",
            description: result.message || "Failed to update program",
            variant: "destructive",
          })
        }
      } else {
        const result = await createAffiliateProgram(data)

        if (result.success) {
          toast({
            title: "Program Created",
            description: "New affiliate program has been created successfully",
          })
          router.push("/admin/affiliates")
          router.refresh()
        } else {
          toast({
            title: "Error",
            description: result.message || "Failed to create program",
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      console.error("Error submitting program form:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program Name</FormLabel>
              <FormControl>
                <Input placeholder="Standard Affiliate Program" {...field} />
              </FormControl>
              <FormDescription>The name of your affiliate program that will be visible to affiliates</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your affiliate program and its benefits..."
                  className="min-h-20"
                  {...field}
                />
              </FormControl>
              <FormDescription>Provide details about your program to attract potential affiliates</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-3">
          <FormField
            control={form.control}
            name="commissionRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Commission Rate (%)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" max="100" step="0.1" {...field} />
                </FormControl>
                <FormDescription>Percentage of sale amount paid to affiliates</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cookieDuration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cookie Duration (Days)</FormLabel>
                <FormControl>
                  <Input type="number" min="1" max="365" {...field} />
                </FormControl>
                <FormDescription>How long referral tracking lasts</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="minimumPayout"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Payout ($)</FormLabel>
                <FormControl>
                  <Input type="number" min="1" step="0.01" {...field} />
                </FormControl>
                <FormDescription>Minimum balance for payout requests</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Controls whether affiliates can join and earn commissions</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="termsAndConditions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Terms and Conditions</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Outline the terms and conditions for your affiliate program..."
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormDescription>Legal terms that affiliates must agree to when joining</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/affiliates")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : isEditing ? "Update Program" : "Create Program"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

