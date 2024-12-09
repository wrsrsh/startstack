"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { authClient, signIn, updateUser } from "@/lib/auth/client";
import { signUpSchema } from "@/schemas/auth.schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function SignupForm() {
  const [githubLoading, setGithubLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [magicLinkLoading, setMagicLinkLoading] = useState(false);

  const loading = githubLoading || googleLoading || magicLinkLoading;

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const emailValue = form.watch("email");

  const router = useRouter();

  useEffect(() => {
    setMagicLinkLoading(false);
    setGoogleLoading(false);
    setGithubLoading(false);
  }, []);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setMagicLinkLoading(true);
    try {
      const { error } = await signIn.magicLink({
        email: data.email,
        callbackURL: "/",
      });
      if (error) {
        toast.error(error.message);
        return;
      }
      router.push("/signup/sent");
      // await updateUser({name: data.fullName});
    } catch (error) {
      toast.error(
        "Something went wrong. Contact support if the issue persists",
      );
    } finally {
      setMagicLinkLoading(false);
    }
  };

  const onGithubSubmit = async () => {
    setGithubLoading(true);
    try {
      await signIn.social({
        provider: "github",
        callbackURL: "/",
      });
    } catch (error) {
      toast.error(
        "Something went wrong. Contact support if the issue persists",
      );
    }
  };

  const onGoogleSubmit = async () => {
    setGoogleLoading(true);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (error) {
      toast.error(
        "Something went wrong. Contact support if the issue persists",
      );
    }
  };

  return (
    <Card className="min-w-md max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Create an account</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Just give us a name and an email to get started.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full space-y-3"
          >
            {/* <Button
                    type="button"
                    variant={"outline"}
                    disabled={loading}
                    onClick={onGoogleSubmit}
                  >
                    {googleLoading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="animate-spin size-4" />
                      </span>
                    ) : (
                      <>
                        <span className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M11.99 13.9v-3.72h9.36c.14.63.25 1.22.25 2.05c0 5.71-3.83 9.77-9.6 9.77c-5.52 0-10-4.48-10-10S6.48 2 12 2c2.7 0 4.96.99 6.69 2.61l-2.84 2.76c-.72-.68-1.98-1.48-3.85-1.48c-3.31 0-6.01 2.75-6.01 6.12s2.7 6.12 6.01 6.12c3.83 0 5.24-2.65 5.5-4.22h-5.51z"
                            ></path>
                          </svg>
                          Continue with Google
                        </span>
                      </>
                    )}
                  </Button> */}
            <Button
              type="button"
              variant={"outline"}
              disabled={loading}
              onClick={onGithubSubmit}
            >
              {githubLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                </span>
              ) : (
                <>
                  <span className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                      ></path>
                    </svg>
                    Continue with Github
                  </span>
                </>
              )}
            </Button>
            {/* <div className="py-1">
                    <p className="bg-input h-[0.5px] w-full" />
                  </div> */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="eg. Waris Reshi"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="eg. abc@example.com"
                      {...field}
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {magicLinkLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" />
                </span>
              ) : (
                <>
                  <span className="flex items-center gap-2">
                    Continue with Email
                  </span>
                </>
              )}
            </Button>
            <p className="pt-1 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <span
                className="cursor-pointer font-medium underline-offset-4 hover:text-primary hover:underline"
                onClick={() => router.push("/login")}
              >
                Login
              </span>
            </p>
          </form>
        </Form>
        <p className="max-w-64 pt-3 text-center text-xs text-muted-foreground/50">
          By signing up, you agree to our{" "}
          <span className="cursor-pointer font-medium underline-offset-4 hover:text-primary hover:underline">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="cursor-pointer font-medium underline-offset-4 hover:text-primary hover:underline">
            Privacy Policy
          </span>
          .
        </p>
      </CardContent>
    </Card>
  );
}
