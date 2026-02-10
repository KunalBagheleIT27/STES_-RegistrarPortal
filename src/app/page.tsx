"use client";

import React, { useState } from "react";
import { TopBar, Footer, Sidebar } from "@/common";
import { StatCard, QuickActions, TodaySchedule, CurrentEnrollment, StudentStatistics, EnrollmentAnalytics } from "@/components/ui";
import { Users, Users2, ClipboardList, BookMarked } from "lucide-react";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dummy user data
  const user = {
    name: "Dr. Kunal Singh",
    email: "kunal.singh@university.edu",
    role: "Senior Lecturer"
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <TopBar 
        user={user} 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
      />

      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />

      {/* Main Content */}
      <main className="flex-1 pt-16 lg:pl-64 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="heading-lg mb-2">Welcome back, {user.name}!</h1>
            <p className="body-text">Here's your academic overview.</p>
          </div>

          {/* Statistics Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Total Students"
              value="12,347"
              icon={<Users />}
              iconColor="blue"
              change={{
                text: "+5% from last year",
                variant: "positive"
              }}
            />
            
            <StatCard
              title="Total Faculty Members"
              value="789"
              icon={<Users2 />}
              iconColor="green"
              change={{
                text: "+3% from last year",
                variant: "positive"
              }}
            />
            
            <StatCard
              title="Pending Tasks"
              value="27"
              icon={<ClipboardList />}
              iconColor="orange"
              change={{
                text: "",
                variant: "warning"
              }}
            />
            
            <StatCard
              title="Active Courses"
              value="1,247"
              icon={<BookMarked />}
              iconColor="purple"
              change={{
                text: "Current semester",
                variant: "neutral"
              }}
            />
          </div>

          {/* Main Grid - Quick Actions, Today's Schedule, and Current Enrollment */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Quick Actions */}
            <div>
              <QuickActions />
            </div>

            {/* Today's Schedule */}
            <div>
              <TodaySchedule />
            </div>

            {/* Current Enrollment */}
            <div>
              <CurrentEnrollment />
            </div>
          </div>

          {/* Student Statistics and Enrollment Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Student Statistics */}
            <div>
              <StudentStatistics />
            </div>

            {/* Enrollment Analytics */}
            <div>
              <EnrollmentAnalytics />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
