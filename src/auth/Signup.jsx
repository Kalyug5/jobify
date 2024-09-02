import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signUp } from "./authSlice";
import { toast } from "sonner";

const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  role: "",
  file: "",
};

const validationSchema = Yup.object({
  fullName: Yup.string().required(),
  email: Yup.string().email().required(),
  phone: Yup.string().required(),
  password: Yup.string()
    .min(5, "Password must be greater than 5 digits")
    .required(),
  role: Yup.string().required(),
});

const Signup = () => {
  const { userSignupLoding } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, errors, handleChange, handleBlur } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, errors) => {
      e.preventDefault();
      console.log(values);
      console.log(errors);
    },
  });

  const chnageFileHandler = (e) => {
    values.file = e.target.files[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      const formData = new FormData();
      console.log(values);

      formData.append("fullName", values.fullName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("password", values.password);
      formData.append("role", values.role);
      if (values.file) formData.append("file", values.file);

      console.log(formData);

      try {
        const response = await dispatch(signUp(formData)).unwrap();
        if (response.success) {
          navigate("/login");
          toast.success(response.message);
        }
      } catch (error) {
        toast.error("Account with this email already exist");
      }
    }
  };
  console.log(values);
  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto">
      <form
        className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-2xl mb-5">Sign Up</h1>
        <div className="my-2 flex flex-col gap-2">
          <Label>Full Name</Label>
          <Input
            type="text"
            value={values.fullName}
            name="fullName"
            onChange={handleChange}
            placeholder="Jone Joe"
          />
        </div>
        <div className="my-2 flex flex-col gap-2">
          <Label>Email</Label>
          <Input
            type="email"
            value={values.email}
            name="email"
            onChange={handleChange}
            placeholder="joe@gmail.com"
          />
        </div>
        <div className="my-2 flex flex-col gap-2">
          <Label>Phone Number</Label>
          <Input
            type="text"
            value={values.phone}
            name="phone"
            onChange={handleChange}
            placeholder="8080808080"
          />
        </div>
        <div className="my-2 flex flex-col gap-2">
          <Label>Password</Label>
          <Input
            type="password"
            value={values.password}
            name="password"
            onChange={handleChange}
            placeholder="Your Password"
          />
        </div>
        <div className="flex items-center justify-between">
          <RadioGroup className="flex items-center gap-4 my-5">
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="employee"
                checked={values.role === "employee"}
                onChange={handleChange}
                className="cursor-pointer"
              />
              <Label htmlFor="role">Employee</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={values.role === "recruiter"}
                onChange={handleChange}
                className="cursor-pointer"
              />
              <Label htmlFor="role">Recruiter</Label>
            </div>
          </RadioGroup>
          <div className="flex items-center gap-2 mx-4">
            <Label className="font-bold">Profile</Label>
            <Input
              accept="image/*"
              type="file"
              onChange={chnageFileHandler}
              className="cursor-pointer"
            />
          </div>
        </div>
        {userSignupLoding ? (
          <Button className="w-full my-4">
            {" "}
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full mx-auto my-4 block bg-[#1F75FF] hover:bg-[#1F75EE]"
          >
            Signup
          </Button>
        )}
        <span className="text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
