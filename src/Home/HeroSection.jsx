import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React from "react";

const HeroSection = () => {
  return (
    <div>
      <section className="w-full pt-12 md:pt-18 lg:pt-12">
        <div className="container space-y-10 xl:space-y-16">
          <div className="grid gap-4 px-10 md:grid-cols-2 md:gap-16">
            <div>
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                The complete platform for{" "}
                <span className="text-[#085de6]">building your career</span>
              </h1>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <p className="mx-auto max-w-[700px] md:text-xl font-medium lg:text-xl">
                Jobify is your gateway to the latest job opportunities in the
                market.
                <span className="text-[#008080]">
                  Find, Apply, Succeed – All in One Place!
                </span>
              </p>
              <div className="space-x-4">
                <div className="flex w-[100%]  border border-gray-300  rounded-sm items-center gap-4 mx-auto">
                  <Button className="rounded-l-sm rounded-r-none bg-[#000080]">
                    <Search className="h-5 w-5" />
                  </Button>
                  <input
                    type="text"
                    placeholder="Find your dream jobs"
                    className="outline-none border-none w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
