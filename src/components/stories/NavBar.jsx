import React, { useEffect } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "@/auth/authSlice";
import { toast } from "sonner";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userDetails, getUserData } = useSelector((state) => state.user);
  console.log(userDetails, getUserData);

  const fetchUser = async () => {
    try {
      const response = await dispatch(getUser()).unwrap();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await dispatch(logout()).unwrap();
      if (response.success) {
        toast.success(response.message);
        fetchUser();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [dispatch]);

  return (
    <>
      <div className="bg-white px-2">
        <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
          <div>
            <h1
              className="text-2xl font-bold cursor-pointer"
              onClick={() => navigate("/")}
            >
              Job<span className="text-[#1F75FE]">ify</span>
            </h1>
          </div>
          <div className="flex items-center gap-12">
            <ul className="flex font-medium items-center gap-5">
              {getUserData && getUserData.role === "recruiter" ? (
                <>
                  <li>
                    <Link to="/admin/companies">Companies</Link>
                  </li>
                  <li>
                    <Link to="/admin/jobs">Jobs</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/jobs">Jobs</Link>
                  </li>
                  <li>
                    <Link to="/browse">Browse</Link>
                  </li>
                </>
              )}
            </ul>
            {Object.keys(getUserData).length === 0 ? (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>

                <Link to="/signup">
                  {" "}
                  <Button
                    variant="outline"
                    className="text-[#1F75FE] hover:text-[#1F75FF]"
                  >
                    Signup
                  </Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={
                        getUserData?.profile?.profilePhoto
                          ? getUserData?.profile?.profilePhoto
                          : "https://github.com/shadcn.png"
                      }
                      alt="@shadcn"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="">
                    <div className="flex gap-2 space-y-2">
                      <Avatar className="cursor-pointer">
                        <AvatarImage
                          src={
                            getUserData?.profile?.profilePhoto
                              ? getUserData?.profile?.profilePhoto
                              : "https://github.com/shadcn.png"
                          }
                          alt="@shadcn"
                        />
                      </Avatar>
                      <div>
                        <h4 className="font-bold text-xl">
                          {getUserData.fullName}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {getUserData?.profile?.summary}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col my-2 text-gray-600">
                      {getUserData && getUserData.role === "employee" && (
                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                          <User2 />
                          <Button
                            variant="link"
                            onClick={() => navigate("/profile")}
                          >
                            {" "}
                            View Profile
                          </Button>
                        </div>
                      )}

                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <LogOut />
                        <Button variant="link" onClick={handleLogout}>
                          Logout
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
