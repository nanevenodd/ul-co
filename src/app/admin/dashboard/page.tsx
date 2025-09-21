"use client";

import { useState } from "react";
import { ChartBarIcon, PhotoIcon, UserIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

export default function AdminDashboard() {
  const [stats] = useState({
    collections: 0,
    faqs: 0,
    messages: 0,
    views: 0,
  });

  const quickActions = [
    {
      title: "Add New Collection",
      description: "Create a new portfolio collection",
      href: "/admin/dashboard/collections",
      icon: PhotoIcon,
      color: "bg-blue-500",
    },
    {
      title: "Update About Content",
      description: "Edit designer information",
      href: "/admin/dashboard/about",
      icon: UserIcon,
      color: "bg-green-500",
    },
    {
      title: "Manage FAQ",
      description: "Add or edit FAQ items",
      href: "/admin/dashboard/faq",
      icon: ChatBubbleLeftIcon,
      color: "bg-yellow-500",
    },
    {
      title: "Site Analytics",
      description: "View website statistics",
      href: "/admin/dashboard/settings",
      icon: ChartBarIcon,
      color: "bg-purple-500",
    },
  ];

  const recentActivity = [
    { action: "System initialized", time: "Just now", type: "info" },
    { action: "Admin login successful", time: "2 minutes ago", type: "success" },
    { action: "Dashboard accessed", time: "5 minutes ago", type: "info" },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome to UL.CO Content Management System</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <PhotoIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Collections</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.collections}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChatBubbleLeftIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">FAQ Items</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.faqs}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Contact Messages</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.messages}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChartBarIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Page Views</dt>
                  <dd className="text-lg font-medium text-gray-900">{stats.views.toLocaleString()}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions and recent activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Quick actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <a key={index} href={action.href} className="relative group bg-white p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-lg ${action.color} text-white`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900">{action.title}</h4>
                        <p className="text-sm text-gray-500">{action.description}</p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div className="flow-root">
              <ul className="-mb-8">
                {recentActivity.map((activity, index) => (
                  <li key={index}>
                    <div className="relative pb-8">
                      {index !== recentActivity.length - 1 && <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" />}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${activity.type === "success" ? "bg-green-500" : "bg-blue-500"}`}>
                            <div className="h-2 w-2 bg-white rounded-full" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">{activity.action}</p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">{activity.time}</div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* System status */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">System Status</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Website</p>
                <p className="text-sm text-gray-500">Online</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Authentication</p>
                <p className="text-sm text-gray-500">Active</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Database</p>
                <p className="text-sm text-gray-500">Setup Required</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
