import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useState } from "react";

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    fitlerType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Devops Engineer",
      "LLM Engineer",
      "UI/UX Designer",
    ],
  },
  {
    fitlerType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterJobs = () => {
  const [filterOption, setFilterOption] = useState({
    location: "",
    domain: [],
    salary: "",
  });

  const handleFilterChange = (type, value) => {
    setFilterOption((prevFilters) => {
      if (type === "domain") {
        return {
          ...prevFilters,
          domain: prevFilters.domain.includes(value)
            ? prevFilters.domain.filter((item) => item !== value)
            : [...prevFilters.domain, value],
        };
      } else if (type === "location") {
        return {
          ...prevFilters,
          location: value,
        };
      } else if (type === "salary") {
        return {
          ...prevFilters,
          salary: value,
        };
      }
      return prevFilters;
    });
  };
  return (
    <div className="bg-white rounded-md shadow-sm p-4">
      <h2 className="text-lg font-bold mb-4">Filters</h2>
      <Accordion type="single" collapsible>
        <AccordionItem value="domain">
          <AccordionTrigger className="text-base font-medium">
            Your Domain
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-4">
              {fitlerData[1].array.map((item, index) => (
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox
                    checked={filterOption.domain.includes(item)}
                    onCheckedChange={() => handleFilterChange("domain", item)}
                  />
                  {item}
                </Label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="location">
          <AccordionTrigger className="text-base font-medium">
            Your Location
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-4">
              {fitlerData[0].array.map((item, index) => (
                <Label className="flex items-center gap-2 font-normal">
                  <RadioGroup
                    value={filterOption.location}
                    onValueChange={(value) =>
                      handleFilterChange("location", value)
                    }
                  >
                    <RadioGroupItem value={item} />
                  </RadioGroup>
                  {item}
                </Label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="salary">
          <AccordionTrigger className="text-base font-medium">
            salary range
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-4">
              {fitlerData[2].array.map((item, index) => (
                <Label className="flex items-center gap-2 font-normal">
                  <RadioGroup
                    value={filterOption.salary}
                    onValueChange={(value) =>
                      handleFilterChange("salary", value)
                    }
                  >
                    <RadioGroupItem value={item} />
                  </RadioGroup>
                  {item}
                </Label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FilterJobs;
