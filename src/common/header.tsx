"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Avatar from "@/components/ui/Avatar";
import NotificationDropdown from "@/components/ui/NotificationDropdown";
import Image from "next/image";
import { User } from "@/types";
import { useState } from "react";
import { Menu, User as UserIcon, Settings, HelpCircle, LogOut } from "lucide-react";

interface HeaderProps {
  user?: User;
  onToggleSidebar?: () => void;
}

const TopBar: React.FC<HeaderProps> = ({ user, onToggleSidebar }) => {
  const [semester, setSemester] = useState("semester-one");
  const [role, setRole] = useState("registrar");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const getSemesterLabel = (value: string) => {
    if (value === "semester-one") return "Semester One";
    if (value === "semester-two") return "Semester Two";
    return "Semester";
  };

  const getRoleLabel = (value: string) => {
    if (value === "registrar") return "Registrar";
    if (value === "secretary") return "Secretary";
    if (value === "admission") return "Admission";
    if (value === "academic") return "Academic";
    return "Role";
  };

  return (
    <div className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 h-16">
        {/* Left: Hamburger + Brand */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Hamburger Menu - Mobile/Tablet */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5 text-gray-900" />
          </button>

          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex items-center justify-center bg-white">
            <Image 
              src="/images/ur-logo.svg" 
              alt="UR Logo" 
              width={48} 
              height={48}
              className="object-cover"
            />
          </div>
          <div className="leading-tight">
            <h1 className="text-sm sm:text-base font-bold text-gray-900">SAMPS UR</h1>
            <p className="text-xs text-gray-500">Dashboard</p>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
          {/* Year Selector */}
          <Select defaultValue="2025-2026">
            <SelectTrigger className="flex w-20 sm:w-24 lg:w-32 h-9 bg-white border-gray-200 text-xs font-medium">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-md z-50">
              <SelectItem value="2024-2025">2024-2025</SelectItem>
              <SelectItem value="2025-2026">2025-2026</SelectItem>
              <SelectItem value="2026-2027">2026-2027</SelectItem>
            </SelectContent>
          </Select>

          {/* Semester Selector */}
          <Select value={semester} onValueChange={setSemester}>
            <SelectTrigger className="w-24 sm:w-40 h-9 bg-white border-gray-200 text-xs font-medium">
              <span>{getSemesterLabel(semester)}</span>
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-md z-50">
              <SelectItem value="semester-one">semester one</SelectItem>
              <SelectItem value="semester-two">semester two</SelectItem>
            </SelectContent>
          </Select>

          {/* Role Selector */}
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="w-24 sm:w-32 h-9 bg-white border-gray-200 text-xs font-medium">
              <span>{getRoleLabel(role)}</span>
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-md z-50">
              <SelectItem value="registrar">Registrar</SelectItem>
              <SelectItem value="secretary">Secretary</SelectItem>
              <SelectItem value="admission">Admission</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
            </SelectContent>
          </Select>

          {/* Notifications Dropdown */}
          <NotificationDropdown />

          {/* User Avatar */}
          <div className="relative flex items-center gap-2 pl-1 sm:pl-2">
            <div className="text-right hidden sm:block">
              <p className="text-xs sm:text-sm font-medium text-gray-900">{user?.name || 'Kunal'}</p>
              <p className="text-xs text-gray-500">{user?.role || 'Lecturer'}</p>
            </div>
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="focus:outline-none"
            >
              <Avatar name={user?.name || 'Kunal'} size="md" />
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <>
                <div 
                  className="fixed inset-0 z-30" 
                  onClick={() => setIsProfileOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-40 py-2">
                  {/* User Info Header */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{user?.name || 'Kunal'}</p>
                    <p className="text-xs text-gray-500">{user?.email || 'pbasalika@yahoo.fr'}</p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors">
                      <UserIcon className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">Profile</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors">
                      <Settings className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">Settings</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors">
                      <HelpCircle className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">Help</span>
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-100 my-1"></div>

                  {/* Log out */}
                  <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors">
                    <LogOut className="w-4 h-4 text-red-600" />
                    <span className="text-sm text-red-600 font-medium">Log out</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
