"use client";

import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ModeToggle } from "@/app/dashboard/components/theme/darkbtn";
import { LogOut, Store, User, User2 } from "lucide-react";
import Image from "next/image";

const Userbtn = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="cursor-pointer hover:opacity-90 transition">
          <AvatarImage
            width={30}
            height={30}
            src={user?.image || "/avatar.avif"}
            alt="/avatar.avif"
            className="rounded-md"
          />
          <AvatarFallback>
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="font-semibold">{user?.name || "User"}</span>
            <span className="text-xs text-gray-500">{user?.email}</span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Profile */}
        <Link href="/dashboard/profile">
          <DropdownMenuItem className="cursor-pointer flex items-center gap-2 hover:bg-accent hover:text-accent-foreground">
            <User className="w-5 h-5" />
            Profile
          </DropdownMenuItem>
        </Link>

        {/* Store */}
        <Link href="/dashboard/yourstore">
          <DropdownMenuItem className="cursor-pointer flex items-center gap-2 hover:bg-accent hover:text-accent-foreground">
            <Store className="w-5 h-5" />
            Store
          </DropdownMenuItem>
        </Link>

        {/* Theme Toggle */}
        <ModeToggle />

        <Link href={"/dashboard/communitystore/Addcommunitystore"}>
          <DropdownMenuItem className="cursor-pointer flex items-center gap-2 hover:bg-accent hover:text-accent-foreground">
            <User2 className="w-5 h-5" />
            Add As Owner
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          onClick={() => signOut()}
          className="cursor-pointer flex items-center gap-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900"
        >
          <LogOut className="w-5 h-5 text-red-500" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Userbtn;
