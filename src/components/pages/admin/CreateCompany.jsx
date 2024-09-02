import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { createCompany, getCompanies } from "./adminSlice";
import { toast } from "sonner";

const initialValues = {
  name: "",
  description: "",
  website: "",
  location: "",
  file: null,
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is Requried for creation"),
  website: Yup.string().required("Wesite is required for creation"),
});

const CreateCompany = ({ open, setOpen }) => {
  let loader = false;
  const dispatch = useDispatch();
  const { values, errors, handleChange } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const fileChangeHandler = (e) => {
    values.file = e.target.files[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0) {
      try {
        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("website", values.website);
        formData.append("location", values.location);
        if (values.file) formData.append("file", values.file);
        loader = true;
        const response = await dispatch(createCompany(formData)).unwrap();

        if (response.success) {
          toast.success("Company Registered successfully");
        }
        await dispatch(getCompanies()).unwrap();
        setOpen(false);
      } catch (error) {
        toast.error("Something went wrong in creation of company");
      }
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Create Company</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 py-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Xyz corporation"
                  className="border-[#ccc] outline-none focus:outline-none"
                  onChange={handleChange}
                  value={values.name}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="website">website</Label>
                <Input
                  id="website"
                  name="website"
                  type="text"
                  placeholder="www.xyz.com"
                  className="col-span-3"
                  onChange={handleChange}
                  value={values.website}
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
                <Label htmlFor="file">Logo</Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="image/*"
                  className="col-span-3"
                  onChange={fileChangeHandler}
                />
              </div>
            </div>
            <DialogFooter>
              {loader ? (
                <Button className="w-full my-4">
                  {" "}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4 bg-[#8F00FF]">
                  Create
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateCompany;
