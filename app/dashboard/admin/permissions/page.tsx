"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import styles from "./permissions.module.css"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Shield, Check, X, Save, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock data for users and permissions
const usersData = [
  {
    id: 1,
    name: "Jane Smith",
    email: "jane.smith@college.edu",
    role: "Committee Member",
    department: "Computer Science",
    committee: "Tech Symposium",
    permissions: {
      eventManagement: false,
      userManagement: false,
      budgetManagement: false,
      emailSystem: true,
      taskAllocation: true,
      contentCreation: true,
    },
  },
  {
    id: 2,
    name: "Mike Johnson",
    email: "mike.johnson@college.edu",
    role: "CP",
    department: "Computer Science",
    committee: "Tech Symposium",
    permissions: {
      eventManagement: true,
      userManagement: true,
      budgetManagement: true,
      emailSystem: true,
      taskAllocation: true,
      contentCreation: true,
    },
  },
  {
    id: 3,
    name: "Sarah Williams",
    email: "sarah.williams@college.edu",
    role: "VCP",
    department: "Electrical Engineering",
    committee: "Cultural Fest",
    permissions: {
      eventManagement: true,
      userManagement: true,
      budgetManagement: true,
      emailSystem: true,
      taskAllocation: true,
      contentCreation: true,
    },
  },
  {
    id: 4,
    name: "David Brown",
    email: "david.brown@college.edu",
    role: "Committee Member",
    department: "Mechanical Engineering",
    committee: "Sports Tournament",
    permissions: {
      eventManagement: false,
      userManagement: false,
      budgetManagement: false,
      emailSystem: true,
      taskAllocation: true,
      contentCreation: true,
    },
  },
]

export default function PermissionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("All")
  const [selectedCommittee, setSelectedCommittee] = useState("All")
  const [users, setUsers] = useState(usersData)
  const [editMode, setEditMode] = useState(false)
  const [editedUsers, setEditedUsers] = useState<typeof usersData>([...usersData])

  // Filter users based on search term and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = selectedRole === "All" || user.role === selectedRole
    const matchesCommittee = selectedCommittee === "All" || user.committee === selectedCommittee

    return matchesSearch && matchesRole && matchesCommittee
  })

  // Get unique committees for filter
  const committees = ["All", ...new Set(users.map((user) => user.committee))]

  // Get unique roles for filter
  const roles = ["All", ...new Set(users.map((user) => user.role))]

  const handleTogglePermission = (userId: number, permission: string) => {
    if (!editMode) return

    setEditedUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              permissions: {
                ...user.permissions,
                [permission]: !user.permissions[permission as keyof typeof user.permissions],
              },
            }
          : user,
      ),
    )
  }

  const handleSaveChanges = () => {
    setUsers([...editedUsers])
    setEditMode(false)
  }

  const handleCancelChanges = () => {
    setEditedUsers([...users])
    setEditMode(false)
  }

  return (
    <DashboardLayout role="admin">
      <div className={styles.permissionsContainer}>
        <div className={styles.permissionsHeader}>
          <h2 className={styles.permissionsTitle}>Permissions Management</h2>
          {editMode ? (
            <div className={styles.editActions}>
              <Button variant="outline" onClick={handleCancelChanges} className={styles.cancelButton}>
                <X size={16} />
                <span>Cancel</span>
              </Button>
              <Button onClick={handleSaveChanges} className={styles.saveButton}>
                <Save size={16} />
                <span>Save Changes</span>
              </Button>
            </div>
          ) : (
            <Button onClick={() => setEditMode(true)} className={styles.editButton}>
              <Shield size={16} />
              <span>Edit Permissions</span>
            </Button>
          )}
        </div>

        <div className={styles.filtersSection}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} size={18} />
            <Input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <Filter size={16} className={styles.filterIcon} />
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className={styles.filterSelect}
              >
                {roles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <Filter size={16} className={styles.filterIcon} />
              <select
                value={selectedCommittee}
                onChange={(e) => setSelectedCommittee(e.target.value)}
                className={styles.filterSelect}
              >
                {committees.map((committee, index) => (
                  <option key={index} value={committee}>
                    {committee}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <Card className={styles.permissionsCard}>
          <CardHeader>
            <CardTitle>User Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.permissionsTable}>
              <div className={styles.tableHeader}>
                <div className={styles.tableCell}>User</div>
                <div className={styles.tableCell}>Event Management</div>
                <div className={styles.tableCell}>User Management</div>
                <div className={styles.tableCell}>Budget Management</div>
                <div className={styles.tableCell}>Email System</div>
                <div className={styles.tableCell}>Task Allocation</div>
                <div className={styles.tableCell}>Content Creation</div>
              </div>

              <div className={styles.tableBody}>
                {filteredUsers.map((user) => {
                  const editedUser = editedUsers.find((u) => u.id === user.id) || user

                  return (
                    <div key={user.id} className={styles.tableRow}>
                      <div className={styles.tableCell}>
                        <div className={styles.userInfo}>
                          <div className={styles.userAvatar}>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div className={styles.userDetails}>
                            <span className={styles.userName}>{user.name}</span>
                            <span className={styles.userRole}>{user.role}</span>
                          </div>
                        </div>
                      </div>

                      {Object.entries(editedUser.permissions).map(([permission, value]) => (
                        <div
                          key={permission}
                          className={`${styles.tableCell} ${styles.permissionCell} ${editMode ? styles.editable : ""}`}
                          onClick={() => handleTogglePermission(user.id, permission)}
                        >
                          <div className={`${styles.permissionStatus} ${value ? styles.granted : styles.denied}`}>
                            {value ? <Check size={16} /> : <X size={16} />}
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className={styles.permissionLegend}>
          <div className={styles.legendItem}>
            <div className={`${styles.permissionStatus} ${styles.granted}`}>
              <Check size={16} />
            </div>
            <span>Permission Granted</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.permissionStatus} ${styles.denied}`}>
              <X size={16} />
            </div>
            <span>Permission Denied</span>
          </div>
          {editMode && (
            <div className={styles.legendItem}>
              <span className={styles.editModeText}>Click on a permission to toggle it</span>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

