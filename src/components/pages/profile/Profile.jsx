import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Contact, Mail, Pen } from "lucide-react";
import React, { useState } from "react";
import AppliedJobs from "../application/AppliedJobs";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";

const skills = ["python", "node", "go", "react"];

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { getUserData } = useSelector((state) => state.user);
  return (
    <div>
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={
                  getUserData?.profile?.profilePhoto
                    ? getUserData?.profile?.profilePhoto
                    : "https://github.com/shadcn.png"
                }
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{getUserData.fullName}</h1>
              <p>
                {getUserData?.profile?.summary ||
                  "Your summary should come here"}
              </p>
            </div>
          </div>
          <Button
            className="text-right"
            variant="outline"
            onClick={() => setOpen(true)}
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{getUserData?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{getUserData?.phone}</span>
          </div>
        </div>
        <div className="my-5">
          <h1 className="font-semibold text-xl my-1">Skills</h1>
          <div className="flex items-center gap-1">
            {getUserData?.profile?.skills.length !== 0 ? (
              getUserData?.profile?.skills.map((item, index) => (
                <Badge
                  key={index}
                  className={index % 2 === 0 ? "bg-[#0fd186]" : "bg-[#2687e7]"}
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {getUserData?.profile?.resumeOriginalName ? (
            <a
              target="blank"
              href={getUserData?.profile?.resume}
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              {getUserData?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Your Recent Applications</h1>
        <AppliedJobs />
      </div>
      <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
