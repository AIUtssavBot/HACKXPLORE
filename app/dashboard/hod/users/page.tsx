"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import styles from "./users.module.css"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Plus, Edit, Trash2, Shield, User, UserCog, UserCheck, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock data for users
const usersData = [
  {
    id: 1,
    name: "Jane Smith",
    email: "jane.smith@college.edu",
    role: "Committee Member",
    department: "Computer Science",
    committee: "Tech Symposium",
    status: "active",
  },
  {
    id: 2,
    name: "Mike Johnson",
    email: "mike.johnson@college.edu",
    role: "CP",
    department: "Computer Science",
    committee: "Tech Symposium",
    status: "active",
  },
  {
    id: 3,
    name: "Sarah Williams",
    email: "sarah.williams@college.edu",
    role: "VCP",
    department: "Electrical Engineering",
    committee: "Cultural Fest",
    status: "active",
  },
  {
    id: 4,
    name: "David Brown",
    email: "david.brown@college.edu",
    role: "Committee Member",
    department: "Mechanical Engineering",
    committee: "Sports Tournament",
    status: "inactive",
  },
  {
    id: 5,
    name: "Emily Davis",
    email: "emily.davis@college.edu",
    role: "Committee Member",
    department: "Civil Engineering",
    committee: "Hackathon",
    status: "active",
  },
  {
    id: 6,
    name: "Robert Wilson",
    email: "robert.wilson@college.edu",
    role: "CP",
    department: "Business Administration",
    committee: "Alumni Meet",
    status: "active",
  },
  {
    id: 7,
    name: "Jennifer Lee",
    email: "jennifer.lee@college.edu",
    role: "Committee Member",
    department: "Computer Science",
    committee: "Hackathon",
    status: "active",
  },
  {
    id: 8,
    name: "Michael Chen",
    email: "michael.chen@college.edu",
    role: "Committee Member",
    department: "Electrical Engineering",
    committee: "Tech Symposium",
    status: "inactive",
  },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("All")
  const [selectedDepartment, setSelectedDepartment] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [showAddUser, setShowAddUser] = useState(false)
  const [editingUser, setEditingUser] = useState<null | (typeof usersData)[0]>(null)

  // Filter users based on search term and filters
  const filteredUsers = usersData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.committee.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = selectedRole === "All" || user.role === selectedRole
    const matchesDepartment = selectedDepartment === "All" || user.department === selectedDepartment
    const matchesStatus = selectedStatus === "All" || user.status === selectedStatus

    return matchesSearch && matchesRole && matchesDepartment && matchesStatus
  })

  const handleAddUser = () => {
    setEditingUser(null)
    setShowAddUser(true)
  }

  const handleEditUser = (user: (typeof usersData)[0]) => {
    setEditingUser(user)
    setShowAddUser(true)
  }

  const handleCloseModal = () => {
    setShowAddUser(false)
    setEditingUser(null)
  }

  // Get unique departments for filter
  const departments = ["All", ...new Set(usersData.map((user) => user.department))]

  // Get unique roles for filter
  const roles = ["All", ...new Set(usersData.map((user) => user.role))]

  return (
    <DashboardLayout role="hod">
      <div className={styles.usersContainer}>
        <div className={styles.usersHeader}>
          <h2 className={styles.usersTitle}>User Management</h2>
          <Button onClick={handleAddUser} className={styles.addButton}>
            <Plus size={16} />
            <span>Add User</span>
          </Button>
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
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className={styles.filterSelect}
              >
                {departments.map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <Filter size={16} className={styles.filterIcon} />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="All">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <Card className={styles.usersCard}>
          <CardHeader>
            <CardTitle>Users ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.usersTable}>
              <div className={styles.tableHeader}>
                <div className={styles.tableCell}>Name</div>
                <div className={styles.tableCell}>Email</div>
                <div className={styles.tableCell}>Role</div>
                <div className={styles.tableCell}>Department</div>
                <div className={styles.tableCell}>Committee</div>
                <div className={styles.tableCell}>Status</div>
                <div className={styles.tableCell}>Actions</div>
              </div>

              <div className={styles.tableBody}>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <div key={user.id} className={styles.tableRow}>
                      <div className={styles.tableCell}>
                        <div className={styles.userInfo}>
                          <div className={styles.userAvatar}>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <span>{user.name}</span>
                        </div>
                      </div>
                      <div className={styles.tableCell}>{user.email}</div>
                      <div className={styles.tableCell}>
                        <div className={styles.roleTag}>
                          {user.role === "CP" && <UserCog size={14} />}
                          {user.role === "VCP" && <UserCheck size={14} />}
                          {user.role === "Committee Member" && <User size={14} />}
                          <span>{user.role}</span>
                        </div>
                      </div>
                      <div className={styles.tableCell}>{user.department}</div>
                      <div className={styles.tableCell}>{user.committee}</div>
                      <div className={styles.tableCell}>
                        <span className={`${styles.statusTag} ${styles[user.status]}`}>{user.status}</span>
                      </div>
                      <div className={styles.tableCell}>
                        <div className={styles.actionButtons}>
                          <button className={styles.editButton} onClick={() => handleEditUser(user)}>
                            <Edit size={16} />
                          </button>
                          <button className={styles.deleteButton}>
                            <Trash2 size={16} />
                          </button>
                          <button className={styles.permissionsButton}>
                            <Shield size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.noResults}>
                    <p>No users found matching your filters.</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add/Edit User Modal */}
        {showAddUser && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2 className={styles.modalTitle}>{editingUser ? "Edit User" : "Add New User"}</h2>

              <form className={styles.userForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" defaultValue={editingUser?.name || ""} className={styles.formInput} />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" defaultValue={editingUser?.email || ""} className={styles.formInput} />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="role">Role</label>
                    <select
                      id="role"
                      defaultValue={editingUser?.role || "Committee Member"}
                      className={styles.formSelect}
                    >
                      <option value="Committee Member">Committee Member</option>
                      <option value="CP">CP</option>
                      <option value="VCP">VCP</option>
                      <option value="HOD">HOD</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="department">Department</label>
                    <select id="department" defaultValue={editingUser?.department || ""} className={styles.formSelect}>
                      <option value="">Select Department</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Electrical Engineering">Electrical Engineering</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                      <option value="Civil Engineering">Civil Engineering</option>
                      <option value="Business Administration">Business Administration</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="committee">Committee</label>
                    <select id="committee" defaultValue={editingUser?.committee || ""} className={styles.formSelect}>
                      <option value="">Select Committee</option>
                      <option value="Tech Symposium">Tech Symposium</option>
                      <option value="Cultural Fest">Cultural Fest</option>
                      <option value="Hackathon">Hackathon</option>
                      <option value="Sports Tournament">Sports Tournament</option>
                      <option value="Alumni Meet">Alumni Meet</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="status">Status</label>
                    <select id="status" defaultValue={editingUser?.status || "active"} className={styles.formSelect}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="password">
                    {editingUser ? "New Password (leave blank to keep current)" : "Password"}
                  </label>
                  <input type="password" id="password" className={styles.formInput} />
                </div>

                <div className={styles.formActions}>
                  <Button type="button" variant="outline" onClick={handleCloseModal} className={styles.cancelButton}>
                    Cancel
                  </Button>
                  <Button type="button" onClick={handleCloseModal} className={styles.saveButton}>
                    {editingUser ? "Update User" : "Add User"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

