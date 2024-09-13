import React from "react";
import { FaReact } from "react-icons/fa6";
import { FaNodeJs } from "react-icons/fa6";
import { SiOpenai } from "react-icons/si";
import { BiServer } from "react-icons/bi";
import { AiOutlineDeploymentUnit } from "react-icons/ai";
import { FiFigma } from "react-icons/fi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const category = [
  {
    id: 1,
    name: "FrontEnd Developer",
    icon: <FaReact className="text-[#5b92ea] text-3xl" />,
  },
  {
    id: 2,
    name: "BackEnd Developer",
    icon: <BiServer className="text-[#FF033E] text-3xl" />,
  },
  {
    id: 3,
    name: "FullStack Developer",
    icon: <FaNodeJs className="text-[#008080] text-3xl" />,
  },
  {
    id: 4,
    name: "DevOps Engineer",
    icon: <AiOutlineDeploymentUnit className="text-[#000080] text-3xl" />,
  },
  {
    id: 5,
    name: "UI/UX Designer",
    icon: <FiFigma className="text-[#7F00FF] text-3xl" />,
  },
  {
    id: 6,
    name: "AI/ML Engineer",
    icon: <SiOpenai className="font-semibold text-3xl" />,
  },
];

const CategoryCarousel = () => {
  return (
    <>
      <Carousel className=" w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((item, index) => (
            <CarouselItem className="md:basis-1/2 lg-basis-1/3">
              <div
                className="flex flex-col items-center justify-center h-full p-4 cursor-pointer "
                key={index}
              >
                {item.icon}
                <h2 className="text-lg font-bold">{item.name}</h2>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default CategoryCarousel;
