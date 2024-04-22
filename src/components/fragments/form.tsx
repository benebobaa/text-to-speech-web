"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"
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
import { useState } from "react"

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

  const [loading, setLoading] = useState(false); 

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true); // Set loading state to true
      
      toast("Submitted", {
        description: "Processing your request...",
        action: {
          label: "okay",
          onClick: () => console.log("okay"),
        },
      });
      // Make API call
      console.log(data.speech)
      const response = await fetch(`https://tts.beneboba.me/text-to-speech/${encodeURIComponent(data.speech)}`);
      console.log(response)
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setLoading(false); // Set loading state to false after API call
    } catch (error) {
      console.error("Error:", error);
      setLoading(false); // Set loading state to false on error
    }
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
        <div className="flex space-x-4">
        
          <Button disabled={loading} type="submit"> {/* Disable button when loading */}
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ""} {/* Show loader when loading */}
            Submit
          </Button>

        </div>
        
      </form>
    </Form>
  )
}
