import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { getCompanies } from "./adminSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";
import { createJobs, getAdminJobs } from "./adminJobSlice";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  salary: Yup.number()
    .min(0, "Salary must be a positive number")
    .required("Salary is required"),
  location: Yup.string().required("Location is required"),
  requirements: Yup.array()
    .of(Yup.string())
    .required("Requirements are required"),
  experienceLevel: Yup.string().required("Experience level is required"),
  jobType: Yup.string().required("Job type is required"),
  position: Yup.number()
    .min(0, "Position must be a positive number")
    .required("Position is required"),
  companyId: Yup.string().required("Company  is required"),
});

const initialValue = {
  title: "",
  description: "",
  salary: 0,
  location: "",
  requirements: [],
  experienceLevel: "",
  jobType: "",
  position: 0,
  companyId: "",
};

const CreateJob = ({ open, setOpen }) => {
  const [skill, setSkill] = useState("");
  const dispatch = useDispatch();
  const { getCompanyDetails } = useSelector((state) => state.admin);
  const { createJobLoading } = useSelector((state) => state.adminJob);
  const { values, errors, handleChange, setFieldValue } = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0) {
      try {
        console.log("creating");

        const response = await dispatch(createJobs({ ...values })).unwrap();
        console.log("making");

        if (response.message.length > 0) {
          toast.success(response.message);
          await getAdminJobs().unwrap();
        }
      } catch (error) {
        toast.error("Error in creating jobs");
      }

      setOpen(false);
    }
  };

  useEffect(() => {
    const fetchCompany = async () => {
      await dispatch(getCompanies()).unwrap();
    };

    fetchCompany();
  }, [dispatch]);

  const handleCompany = (id) => {
    if (id) {
      console.log(values);
      setFieldValue("companyId", id);
    }
  };

  const handleRequirement = (e) => {
    setSkill(e.target.value);
  };

  const addReq = () => {
    if (skill.length > 0) {
      const data = skill.split(",");

      setFieldValue("requirements", [...values.requirements, ...data]);

      setSkill("");
    }
  };

  const closeReq = (value) => {
    if (values.requirements.length > 0) {
      const res = values.requirements.filter((item) => item !== value);
      setFieldValue("requirements", res);
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-[425px] lg:max-w-[600px] max-h-[600px] overflow-auto "
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Create Job</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 py-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Software Developer"
                  className="border-[#ccc] outline-none focus:outline-none"
                  onChange={handleChange}
                  value={values.title}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="experienceLevel">Experience Level</Label>
                <Input
                  id="experienceLevel"
                  name="experienceLevel"
                  type="text"
                  className="col-span-3"
                  onChange={handleChange}
                  value={values.experienceLevel}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  className="resize-none"
                  onChange={handleChange}
                  value={values.description}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="location">location</Label>
                <Input
                  id="location"
                  name="location"
                  onChange={handleChange}
                  value={values.location}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="jobType">JobType</Label>
                <Input
                  id="jobType"
                  name="jobType"
                  onChange={handleChange}
                  value={values.jobType}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="jobType">Position</Label>
                <Input
                  id="position"
                  name="position"
                  onChange={handleChange}
                  value={values.position}
                  type="Number"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="salary">salary</Label>
                <Input
                  id="salary"
                  name="salary"
                  onChange={handleChange}
                  value={values.salary}
                  type="Number"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="requirements">Requirements</Label>
                <div className="flex gap-2">
                  <Input
                    id="requirements"
                    name="requirements"
                    onChange={handleRequirement}
                    placeholder="Enter the required skills"
                    value={skill}
                  />
                  <Button variant="outline" type="button" onClick={addReq}>
                    save
                  </Button>
                </div>
                <div className="flex gap-1 flex-wrap">
                  {values.requirements &&
                    values.requirements.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-transparent text-slate-500 px-4 py-1 border border-[#ccd] rounded-full shadow-sm gap-2"
                      >
                        <span>{item}</span>
                        <IoClose
                          className=" text-blue-700 hover:text-blue-900 cursor-pointer"
                          onClick={() => closeReq(item)}
                        />
                      </div>
                    ))}
                </div>
              </div>
              <Select onValueChange={(value) => handleCompany(value)}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select Company" />
                </SelectTrigger>
                <SelectContent>
                  {getCompanyDetails?.map((item) => {
                    return (
                      <SelectItem
                        value={item._id}
                        className="text-[#4a5de7] cursor-pointer"
                      >
                        {item.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              {createJobLoading ? (
                <Button className="w-full my-4">
                  {" "}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4 bg-[#3b4df1]">
                  create
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateJob;
