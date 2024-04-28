"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  }

  return (
    <div className="items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-5 w-5 flex-shrink-0" />
        <p className="ml-2 text-[16px]">Continue with Google</p>
      </Button>
      <Button
        size="lg"
        className="w-full mt-3"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <FaGithub className="h-5 w-5 flex-shrink-0" />
        <p className="ml-2 text-[16px]">Continue with Github</p>
      </Button>
    </div>
  );
};
