"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Home, Calendar, Users, Settings, LogOut, Bell } from "lucide-react"
import styles from "./dashboard-layout.module.css"
import { Button } from "@/components/ui/button"

interface DashboardLayoutProps {
  children: React.ReactNode
  role: "user" | "committee" | "admin" | "hod"
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  const navItems = {
    user: [
      { name: "Dashboard", href: "/dashboard/user", icon: Home },
      { name: "Events", href: "/dashboard/user/events", icon: Calendar },
      { name: "Stall Locator", href: "/dashboard/user/stalls", icon: Users },
      { name: "Quizzes", href: "/dashboard/user/quizzes", icon: Users },
      { name: "Settings", href: "/dashboard/user/settings", icon: Settings },
    ],
    committee: [
      { name: "Dashboard", href: "/dashboard/committee", icon: Home },
      { name: "Event Management", href: "/dashboard/committee/events", icon: Calendar },
      { name: "Committee Members", href: "/dashboard/committee/members", icon: Users },
      { name: "Task Allocation", href: "/dashboard/committee/tasks", icon: Users },
      { name: "Settings", href: "/dashboard/committee/settings", icon: Settings },
    ],
    admin: [
      { name: "Dashboard", href: "/dashboard/admin", icon: Home },
      { name: "Committee Access", href: "/dashboard/admin/committees", icon: Users },
      { name: "Permissions", href: "/dashboard/admin/permissions", icon: Settings },
      { name: "AI Suggestions", href: "/dashboard/admin/ai-suggestions", icon: Users },
      { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
    ],
    hod: [
      { name: "Dashboard", href: "/dashboard/hod", icon: Home },
      { name: "All Events", href: "/dashboard/hod/events", icon: Calendar },
      { name: "User Management", href: "/dashboard/hod/users", icon: Users },
      { name: "Permissions", href: "/dashboard/hod/permissions", icon: Settings },
      { name: "Settings", href: "/dashboard/hod/settings", icon: Settings },
    ],
  }

  const currentNavItems = navItems[role]
  const roleTitles = {
    user: "Student Dashboard",
    committee: "Committee Dashboard",
    admin: "CP & VCP Dashboard",
    hod: "HOD Dashboard",
  }

  return (
    <div className={styles.dashboardContainer}>
      {/* Mobile sidebar toggle */}
      <button className={styles.sidebarToggle} onClick={toggleSidebar} aria-label="Toggle sidebar">
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>{roleTitles[role]}</h2>
          <button className={styles.closeSidebar} onClick={closeSidebar} aria-label="Close sidebar">
            <X size={24} />
          </button>
        </div>

        <nav className={styles.sidebarNav}>
          <ul className={styles.navList}>
            {currentNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                    onClick={closeSidebar}
                  >
                    <item.icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className={styles.sidebarFooter}>
          <Link href="/login" className={styles.logoutButton}>
            <LogOut size={20} />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <h1>{roleTitles[role]}</h1>
          </div>
          <div className={styles.headerActions}>
            <Button variant="ghost" size="icon" className={styles.notificationButton}>
              <Bell size={20} />
            </Button>
            <div className={styles.userProfile}>
              <div className={styles.userAvatar}>
                <span>JD</span>
              </div>
              <span className={styles.userName}>John Doe</span>
            </div>
          </div>
        </header>

        <div className={styles.content}>{children}</div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className={styles.overlay} onClick={closeSidebar} />}
    </div>
  )
}

