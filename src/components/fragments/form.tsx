"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
// import { toast } from "@/components/ui/use-toast"
import { toast } from "sonner"

const FormSchema = z.object({
  speech: z
    .string()
    .min(1, {
      message: "Speech must be at least 1 characters.",
    }),
    // .max(160, {
    //   message: "Bio must not be longer than 30 characters.",
    // }),
})

export function TextareaForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(_data: z.infer<typeof FormSchema>) {
    toast("Submitted", {
        description: "Processing your request...",
        action: {
          label: "okay",
          onClick: () => console.log("okay"),
        },
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="speech"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Speech</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your speech here..."
                  className="h-32"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>
                You can <span>@mention</span> other users and organizations.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
