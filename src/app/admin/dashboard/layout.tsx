"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { HomeIcon, PhotoIcon, UserIcon, QuestionMarkCircleIcon, PhoneIcon, CogIcon, Bars3Icon, XMarkIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: HomeIcon,
    description: "Overview and statistics",
  },
  {
    title: "Hero Section",
    href: "/admin/dashboard/hero",
    icon: PhotoIcon,
    description: "Homepage banner content",
  },
  {
    title: "Collections",
    href: "/admin/dashboard/collections",
    icon: PhotoIcon,
    description: "Portfolio collections",
  },
  {
    title: "About Content",
    href: "/admin/dashboard/about",
    icon: UserIcon,
    description: "About page management",
  },
  {
    title: "FAQ",
    href: "/admin/dashboard/faq",
    icon: QuestionMarkCircleIcon,
    description: "Frequently asked questions",
  },
  {
    title: "Contact",
    href: "/admin/dashboard/contact",
    icon: PhoneIcon,
    description: "Contact information & messages",
  },
  {
    title: "Footer",
    href: "/admin/dashboard/footer",
    icon: CogIcon,
    description: "Footer content management",
  },
  {
    title: "Settings",
    href: "/admin/dashboard/settings",
    icon: CogIcon,
    description: "Site configuration",
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#921e27]"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex lg:flex-col ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-[#921e27]">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-[#921e27] font-bold text-lg">UL</span>
              </div>
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-white">UL.CO Admin</h1>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded-md text-white hover:text-red-200">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4 flex-1 overflow-y-auto">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-start px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${isActive ? "bg-[#921e27] text-white shadow-lg" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"}`}
                  onClick={() => setSidebarOpen(false)}>
                  <Icon className={`mr-4 h-5 w-5 flex-shrink-0 mt-0.5 ${isActive ? "text-white" : "text-gray-400 group-hover:text-[#921e27]"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{item.title}</div>
                    <div className={`text-xs mt-0.5 ${isActive ? "text-red-100" : "text-gray-500"}`}>{item.description}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User info and logout */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center min-w-0 flex-1">
              <div className="w-10 h-10 bg-[#921e27] rounded-full flex items-center justify-center">
                <UserIcon className="h-5 w-5 text-white" />
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900 truncate">{session.user?.name || "Admin"}</p>
                <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
              </div>
            </div>
            <button onClick={handleSignOut} className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200 hover:bg-red-50 rounded-lg" title="Sign out">
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500">
              <Bars3Icon className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-gray-900">{menuItems.find((item) => item.href === pathname)?.title || "Admin Panel"}</h2>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">Welcome back, {session.user?.name || "Admin"}</div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
