import { getUser, updateUser } from "@/auth/authSlice";
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
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const UpdateProfile = ({ open, setOpen }) => {
  const { getUserData, updateUserDataLoading } = useSelector(
    (state) => state.user
  );
  console.log(getUserData);
  const dispatch = useDispatch();

  const { values, errors, handleChange, setValues } = useFormik({
    initialValues: {
      fullName: getUserData?.fullName || "",
      email: getUserData?.email || "",
      phone: getUserData?.phone || "",
      summary: getUserData?.profile?.summary || "",
      skills: getUserData?.profile?.skills.join(",") || "",
      file: getUserData?.profile?.resume || "",
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
    },
  });

  const fetchData = async () => {
    try {
      await dispatch(getUser()).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (getUserData) {
      setValues({
        fullName: getUserData?.fullName || "",
        email: getUserData?.email || "",
        phone: getUserData?.phone || "",
        summary: getUserData?.profile?.summary || "",
        skills: getUserData?.profile?.skills.join(",") || "",
        file: getUserData?.profile?.resume || "",
      });
    }
  }, [getUserData, setValues]);

  console.log(values);

  const fileChangeHandler = (e) => {
    values.file = e.target.files?.[0];
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      console.log(values);
      const formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("summary", values.summary);
      formData.append("skills", values.skills);
      if (values.file) {
        formData.append("file", values.file);
      }

      const reponse = await dispatch(updateUser(formData)).unwrap();
      if (reponse.success) {
        toast.success(reponse.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error("Something went wrong!!");
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
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="flex flex-col gap-3 py-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="fullName"
                  type="text"
                  value={values.fullName}
                  onChange={handleChange}
                  className="border-[#ccc] outline-none focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="number">Number</Label>
                <Input
                  id="number"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="bio">Summary</Label>
                <Textarea
                  id="bio"
                  name="summary"
                  className="resize-none"
                  value={values.summary}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="skills">Skills</Label>
                <Input
                  id="skills"
                  name="skills"
                  className="col-span-3"
                  value={values.skills}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="file">Resume</Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  className="col-span-3"
                  onChange={fileChangeHandler}
                />
              </div>
            </div>
            <DialogFooter>
              {updateUserDataLoading ? (
                <Button className="w-full my-4">
                  {" "}
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4 bg-[#8F00FF]">
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

export default UpdateProfile;
