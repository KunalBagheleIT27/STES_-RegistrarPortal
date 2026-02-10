"use client";

import React from "react";

interface EnrollmentItem {
  label: string;
  value: string | number;
  badgeColor?: string;
}

const CurrentEnrollment: React.FC = () => {
  const enrollmentData: EnrollmentItem[] = [
    {
      label: "Total Enrolled",
      value: "12,347",
    },
    {
      label: "Pending Applications",
      value: "5",
      badgeColor: "bg-red-50 text-red-600",
    },
    {
      label: "Capacity Alerts",
      value: "2",
      badgeColor: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 shadow-sm h-full flex flex-col">
      <div className="mb-3 sm:mb-4">
        <h2 className="text-base sm:text-lg font-bold text-gray-900">Current Enrollment</h2>
      </div>

      <div className="space-y-4 flex flex-col">
        {enrollmentData.map((item, index) => {
          const isTotal = index === 0;
          
          return (
            <div
              key={item.label}
              className="flex items-center justify-between gap-3"
            >
              <span className="text-sm text-gray-700 font-medium">
                {item.label}
              </span>
              
              {isTotal ? (
                <span className="text-2xl font-bold text-gray-900">
                  {item.value}
                </span>
              ) : (
                <span
                  className={`inline-flex items-center justify-center min-w-[32px] h-7 px-2.5 rounded-full text-sm font-semibold ${item.badgeColor}`}
                >
                  {item.value}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CurrentEnrollment;
