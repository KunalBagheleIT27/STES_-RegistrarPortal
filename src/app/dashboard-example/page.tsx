"use client";

import React from "react";
import StatCard from "@/components/ui/StatCard";
import QuickActions from "@/components/ui/QuickActions";
import { Users, BookOpen, CheckCircle, TrendingUp } from "lucide-react";

export default function DashboardExample() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="heading-lg mb-2">Dashboard Overview</h1>
          <p className="body-text">Welcome to your lecturer dashboard</p>
        </div>

        {/* Statistics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Students"
            value="2,847"
            icon={<Users />}
            iconColor="blue"
            change={{
              text: "+12% from last semester",
              variant: "positive"
            }}
          />
          
          <StatCard
            title="Active Modules"
            value="24"
            icon={<BookOpen />}
            iconColor="green"
            change={{
              text: "8 modules this semester",
              variant: "neutral"
            }}
          />
          
          <StatCard
            title="Pending Approvals"
            value="156"
            icon={<CheckCircle />}
            iconColor="orange"
            change={{
              text: "Action required",
              variant: "warning"
            }}
          />
          
          <StatCard
            title="Completion Rate"
            value="94.2%"
            icon={<TrendingUp />}
            iconColor="purple"
            change={{
              text: "+5.3% improvement",
              variant: "positive"
            }}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
          
          {/* Additional content area */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <h2 className="heading-md mb-4">Recent Activity</h2>
            <p className="body-text text-gray-500">Your recent activities will appear here...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
