"use client";

import Link from "next/link";
import {
  LayoutGrid,
  Users,
  UserPlus,
  GraduationCap,
  School,
  FileText,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  active?: boolean;
  href?: string;
  hasSubmenu?: boolean;
}

const navItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutGrid,
    active: true,
    href: "/",
  },
  {
    id: "student-records",
    label: "Student Records",
    icon: Users,
    hasSubmenu: true,
    href: "/student-records",
  },
  {
    id: "admissions",
    label: "Admissions",
    icon: UserPlus,
    hasSubmenu: true,
    href: "/admissions",
  },
  {
    id: "academic-administration",
    label: "Academic Administration",
    icon: School,
    hasSubmenu: true,
    href: "/academic-administration",
  },
  {
    id: "graduation",
    label: "Graduation",
    icon: GraduationCap,
    hasSubmenu: true,
    href: "/graduation",
  },
  {
    id: "documents",
    label: "Documents",
    icon: FileText,
    hasSubmenu: true,
    href: "/documents",
  },
  {
    id: "reports",
    label: "Reports",
    icon: BarChart3,
    href: "/reports",
  },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 z-40 transition-transform duration-300 lg:translate-x-0 overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.id}
                href={item.href || "/"}
                onClick={() => onToggle()}
                className={cn(
                  "group w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200",
                  item.active
                    ? "text-[#026892] bg-[#026892]/10"
                    : "text-gray-800 hover:bg-[#026892]/10 hover:text-[#026892]"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 flex-shrink-0 transition-colors duration-200",
                  item.active ? "text-[#026892]" : "text-gray-600 group-hover:text-[#026892]"
                )} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.hasSubmenu && (
                  <ChevronRight className={cn(
                    "w-4 h-4 flex-shrink-0 transition-colors duration-200",
                    item.active ? "text-[#026892]" : "text-gray-400 group-hover:text-[#026892]"
                  )} />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
