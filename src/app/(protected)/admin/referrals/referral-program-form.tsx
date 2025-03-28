"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { createReferralProgram, updateReferralProgram } from "../actions/referral-admin-actions"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  commissionType: z.enum(["PERCENTAGE", "FIXED_AMOUNT"]),
  commissionValue: z.coerce.number().positive({
    message: "Commission value must be positive.",
  }),
  minimumPayout: z.coerce.number().min(0, {
    message: "Minimum payout must be at least 0.",
  }),
  active: z.boolean().default(true),
})

type ReferralProgramFormValues = z.infer<typeof formSchema>

export function ReferralProgramForm({ program }: { program?: any }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultValues: Partial<ReferralProgramFormValues> = {
    name: program?.name || "",
    description: program?.description || "",
    commissionType: program?.commissionType || "PERCENTAGE",
    commissionValue: program?.commissionValue || 10,
    minimumPayout: program?.minimumPayout || 10,
    active: program?.active ?? true,
  }

  const form = useForm<ReferralProgramFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  async function onSubmit(values: ReferralProgramFormValues) {
    setIsSubmitting(true)
    try {
      if (program) {
        await updateReferralProgram(program.id, values)
        toast({
          title: "Success",
          description: "Referral program updated successfully",
        })
      } else {
        await createReferralProgram(values)
        toast({
          title: "Success",
          description: "Referral program created successfully",
        })
      }
      router.push("/admin/referrals")
    } catch (error) {
      console.error("Failed to save referral program:", error)
      toast({
        title: "Error",
        description: "Failed to save referral program. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 pt-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Standard Referral Program" {...field} />
                  </FormControl>
                  <FormDescription>A descriptive name for your referral program.</FormDescription>
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
                    <Textarea placeholder="Describe the referral program..." className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>Optional details about the program.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="commissionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commission Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select commission type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                        <SelectItem value="FIXED_AMOUNT">Fixed Amount</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>How the commission will be calculated.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="commissionValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commission Value</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type="number" step="0.01" {...field} />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          {form.watch("commissionType") === "PERCENTAGE" ? "%" : "$"}
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      {form.watch("commissionType") === "PERCENTAGE"
                        ? "Percentage of the purchase amount."
                        : "Fixed amount per referral."}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="minimumPayout"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Payout</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type="number" step="0.01" {...field} />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">$</div>
                    </div>
                  </FormControl>
                  <FormDescription>Minimum amount required before a user can request a payout.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active Status</FormLabel>
                    <FormDescription>Enable or disable this referral program.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/referrals")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : program ? "Update Program" : "Create Program"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

