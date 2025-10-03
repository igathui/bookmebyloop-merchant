import Image from "next/image";
import logoImg from "@/assets/images/logo.png";

import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeroProps {
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
}

export default function Hero({
  buttons = {
    primary: {
      text: "Sign Up",
      url: "/signup",
    },
    secondary: {
      text: "Log In",
      url: "/login",
    },
  },
}: HeroProps) {
  return (
    <section className="py-32">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="max-h-96 w-full items-center justify-items-center rounded-md object-cover">
            <Image
              src={logoImg}
              alt="hero image"
              className="h-72 w-72 opacity-50"
            />
          </div>
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Badge variant="outline">
              💼 Client Management
              <ArrowUpRight className="ml-2 size-4" />
            </Badge>
            <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">
              <span className="text-orange-600 lg:text-5xl">
                BookMe! by Loop{" "}
              </span>
              <br />
              for Businesses
            </h1>
            <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
              A Web Application Concept for a Mini-App for the Loop Merchant
              Platform.
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/signup">Sign Up</Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href="/login">
                  Log In
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
