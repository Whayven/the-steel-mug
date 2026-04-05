"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "~/app/_components/ui/catalyst/button";
import { Field, FieldGroup, Fieldset, Label } from "~/app/_components/ui/catalyst/fieldset";
import { Input } from "~/app/_components/ui/catalyst/input";
import { authClient } from "~/server/better-auth/client";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: err } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: "/",
    });
    if (err) {
      setError(err.message ?? "Sign up failed");
      setLoading(false);
    } else {
      toast.success("Account created! Welcome to The Steel Mug.", {
        position: "top-center",
      });
      router.push("/");
      router.refresh();
    }
  }

  return (
    <main className="flex min-h-dvh flex-col bg-cream-100 dark:bg-zinc-950">
      <div className="flex grow items-center justify-center px-4">
        <div className="grain relative w-full max-w-sm rounded-2xl border border-cream-300/60 bg-cream-50 p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-400">
            Join the community
          </p>
          <h1 className="font-serif text-3xl font-bold text-zinc-900 dark:text-cream-50">
            Create an account
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="font-medium text-brand-600 underline decoration-brand-300 underline-offset-2 hover:text-brand-700 dark:text-brand-400 dark:decoration-brand-600 dark:hover:text-brand-300"
            >
              Sign in
            </a>
          </p>

          <form onSubmit={handleSubmit} className="mt-8">
            <Fieldset>
              <FieldGroup>
                <Field>
                  <Label>Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                  />
                </Field>
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
                    autoComplete="new-password"
                  />
                </Field>
              </FieldGroup>
            </Fieldset>

            {error && (
              <p className="mt-4 text-sm text-red-600 dark:text-red-500">{error}</p>
            )}

            <Button type="submit" className="mt-6 w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="mt-6">
            <div className="bk-divider text-xs text-zinc-400 dark:text-zinc-600">
              <span>or</span>
            </div>
            <Button
              outline
              className="mt-4 w-full"
              onClick={() => void authClient.signIn.social({ provider: "github", callbackURL: "/" })}
            >
              Sign up with GitHub
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
