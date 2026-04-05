"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "~/app/_components/ui/catalyst/button";
import { Field, FieldGroup, Fieldset, Label } from "~/app/_components/ui/catalyst/fieldset";
import { Heading } from "~/app/_components/ui/catalyst/heading";
import { Input } from "~/app/_components/ui/catalyst/input";
import { Text, TextLink } from "~/app/_components/ui/catalyst/text";
import { authClient } from "~/server/better-auth/client";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: err } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });
    if (err) {
      setError(err.message ?? "Sign in failed");
      setLoading(false);
    } else {
      router.push("/");
    }
  }

  return (
    <main className="flex min-h-dvh flex-col">
      <div className="flex grow items-center justify-center lg:bg-white lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
        <div className="w-full max-w-sm">
          <Heading>Sign in</Heading>
          <Text className="mt-2">
            Don&apos;t have an account?{" "}
            <TextLink href="/sign-up">Sign up</TextLink>
          </Text>

          <form onSubmit={handleSubmit} className="mt-8">
            <Fieldset>
              <FieldGroup>
                <Field>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </Field>
                <Field>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </Field>
              </FieldGroup>
            </Fieldset>

            {error && (
              <p className="mt-4 text-sm text-red-600 dark:text-red-500">{error}</p>
            )}

            <Button type="submit" className="mt-6 w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative flex items-center">
              <div className="grow border-t border-zinc-950/10 dark:border-white/10" />
              <span className="mx-4 shrink-0 text-sm text-zinc-500 dark:text-zinc-400">or</span>
              <div className="grow border-t border-zinc-950/10 dark:border-white/10" />
            </div>
            <Button
              outline
              className="mt-4 w-full"
              onClick={() => void authClient.signIn.social({ provider: "github", callbackURL: "/" })}
            >
              Sign in with GitHub
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
