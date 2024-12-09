"use client";
import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardContent,
  CardFooter,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "@/schemas/onboarding.schema";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { authClient } from "@/lib/auth/client";

export function CreateWorkspaceForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof onboardingSchema>) => {
    setLoading(true);
    try {
      const { error } = await authClient.organization.create({
        name: data.name,
        slug: data.slug,
      });
      if (error) {
        toast.error(error.message);
        return;
      }
      router.push("/app/home");
    } catch (error) {
      toast.error(
        "Something went wrong. Contact support if the issue persists",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="min-w-md max-w-md">
      <div className="">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">
            Create a workspace
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Choose a name and slug for your workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid space-y-3"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="eg. Startstack"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="eg. start-stack"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" />
                  </span>
                ) : (
                  <>
                    <span className="flex items-center gap-2">
                      Create Workspace
                    </span>
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </div>
    </Card>
  );
}
