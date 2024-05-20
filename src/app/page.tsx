import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your marketplace for high quality {' '}
            <span className="text-blue-600">
              digtal assets .
            </span>
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">Welcome to DigitalHippo</p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href={'/product'} className={buttonVariants()}>Browse Trending</Link>
            <Button variant={'ghost'}>Our quality promise &rarr;</Button>
          </div>
        </div>

        {/* TODO: List products */}
      </MaxWidthWrapper>
      <MaxWidthWrapper>
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0"></div>
      </MaxWidthWrapper>
    </>
  );
}
