import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  type JoinWaitlistInputSchema,
  joinWaitlistInputSchema,
} from "@/features/waitlist/validation";
import { joinWaitlistServerFn } from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function WaitlistForm() {
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<JoinWaitlistInputSchema>({
    resolver: zodResolver(joinWaitlistInputSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (values: JoinWaitlistInputSchema) =>
      joinWaitlistServerFn({ data: { email: values.email } }),
    onSuccess: () => {
      toast.success("Successfully joined the waitlist! 🎉");
      form.reset();
      // Invalidate and refetch waitlist count
      queryClient.invalidateQueries({ queryKey: ["waitlist-count"] });
    },
    onError: (error: Error) => {
      // Handle specific error messages
      const message = error.message;
      if (message.includes("already on the waitlist")) {
        toast.error("You're already on the waitlist!");
      } else if (message.includes("Too many requests")) {
        toast.error("Too many requests. Please try again later.");
      } else {
        toast.error(message || "Something went wrong. Please try again.");
      }
    },
  });

  function onSubmit(values: JoinWaitlistInputSchema) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-md items-start gap-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  disabled={mutation.isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Joining..." : "Join waitlist"}
        </Button>
      </form>
    </Form>
  );
}
