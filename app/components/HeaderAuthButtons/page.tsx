"use client";

import Link from "next/link";
import { Avatar, Button } from "flowbite-react";
import { useAuth } from "@/context/AuthContext";

const HeaderAuthButtons = () => {
  const { isLoggedIn, isCheckingAuth } = useAuth();

  if (isCheckingAuth) {
    return null;
  }

  return (
    <div className="ml-auto place-items-center flex items-center gap-5">
      {isLoggedIn ? (
        <Link href="/UserProfilePage">
          <Avatar rounded />
        </Link>
      ) : (
        <>
          <Link href="/LoginUser">
            <Button color={"#484848"} className="bg-[#484848]">
              Log in
            </Button>
          </Link>

          <Link href="/CreateUserAccount">
            <Button color={"#C95A23"} className="bg-[#C95A23]">
              Sign Up
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default HeaderAuthButtons;