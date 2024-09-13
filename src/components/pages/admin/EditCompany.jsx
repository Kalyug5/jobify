import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCompanies, updateCompany } from "./adminSlice";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is Requried for creation"),
  website: Yup.string().required("Wesite is required for creation"),
});

const EditCompany = ({ editCompany, seteditCompany }) => {
  const { updateComapny, updateComapnyLoading } = useSelector(
    (state) => state.admin
  );
  const dispatch = useDispatch();

  const { values, errors, handleChange, setValues } = useFormik({
    initialValues: {
      name: editCompany?.company?.name || "",
      description: editCompany?.company?.description || "",
      website: editCompany?.company?.website || "",
      location: editCompany?.company?.location || "",
      file: editCompany?.company?.logo || null,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    setValues({
      name: editCompany?.company?.name || "",
      description: editCompany?.company?.description || "",
      website: editCompany?.company?.website || "",
      location: editCompany?.company?.location || "",
      file: editCompany?.company?.logo || null,
    });
  }, [editCompany.company]);

  const fileChangeHandler = (e) => {
    values.file = e.target.files[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      console.log("here");

      console.log(values);
      console.log(errors);

      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("website", values.website);
        formData.append("location", values.location);
        if (values.file) formData.append("file", values.file);

        console.log("here2");

        const response = await dispatch(
          updateCompany({
            id: editCompany.company._id,
            company: formData,
          })
        ).unwrap();

        if (response.success) {
          toast.success(response.message || "updated");
        }
        await dispatch(getCompanies()).unwrap();
        seteditCompany((prev) => {
          return { ...prev, active: false };
        });
      } catch (error) {
        toast.error("Something went wrong in the updatation");
      }
    }
  };

  return (
    <div>
      <Dialog open={editCompany.active} onOpenChange={seteditCompany}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() =>
            seteditCompany((prev) => {
              return { ...prev, active: false };
            })
          }
        >
          <DialogHeader>
            <DialogTitle>Update Company</DialogTitle>
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
              {updateComapnyLoading ? (
                <Button className="w-full my-4">
                  {" "}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4 bg-[#3b4df1]">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditCompany;
