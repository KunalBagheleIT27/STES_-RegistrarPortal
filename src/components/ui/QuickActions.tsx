"use client";

import React from "react";
import Link from "next/link";
import { UserPlus, Upload, ClipboardCheck } from "lucide-react";

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  bgColor: string;
  textColor: string;
  iconColor: string;
}

const QuickActions: React.FC = () => {
  const actions: QuickAction[] = [
    {
      id: "add-student",
      label: "Add Student",
      icon: <UserPlus size={18} />,
      href: "/student-records/add",
      bgColor: "bg-[#026892]/5",
      textColor: "text-[#026892]",
      iconColor: "text-[#026892]",
    },
    {
      id: "import-students",
      label: "Import Students",
      icon: <Upload size={18} />,
      href: "/student-records/import",
      bgColor: "bg-[#026892]/5",
      textColor: "text-[#026892]",
      iconColor: "text-[#026892]",
    },
    {
      id: "admissions",
      label: "Admissions",
      icon: <ClipboardCheck size={18} />,
      href: "/admissions",
      bgColor: "bg-[#f59e0b]/10",
      textColor: "text-[#f59e0b]",
      iconColor: "text-[#f59e0b]",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 shadow-sm h-full flex flex-col">
      <div className="mb-2 sm:mb-3">
        <h2 className="text-base sm:text-lg font-bold text-gray-900">Quick Actions</h2>
      </div>

      <div className="space-y-2 flex flex-col">
        {actions.map((action) => {
          return (
            <Link key={action.id} href={action.href} className="block">
              <div
                role="button"
                tabIndex={0}
                className={`flex items-center gap-2 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg ${action.bgColor} border border-gray-200 hover:shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#026892]/20 group`}
              >
                <div className={`flex-shrink-0 ${action.iconColor} group-hover:text-gray-900`}>
                  <span className="[&>svg]:h-4 [&>svg]:w-4 sm:[&>svg]:h-4 sm:[&>svg]:w-4">{action.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold text-sm ${action.textColor} group-hover:text-gray-900`}>
                    {action.label}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
