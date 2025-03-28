import DashboardLayout from "@/components/dashboard-layout"
import styles from "./hod-dashboard.module.css"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, CheckSquare, BarChart, Settings, Shield, Award } from "lucide-react"

export default function HodDashboard() {
  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Symposium 2025",
      date: "March 15, 2025",
      registrations: 120,
      tasks: 15,
      completedTasks: 8,
      committee: "Computer Science Department",
    },
    {
      id: 2,
      title: "Cultural Fest",
      date: "April 5, 2025",
      registrations: 85,
      tasks: 20,
      completedTasks: 5,
      committee: "Cultural Committee",
    },
    {
      id: 3,
      title: "Hackathon",
      date: "May 10, 2025",
      registrations: 45,
      tasks: 12,
      completedTasks: 3,
      committee: "Tech Club",
    },
  ]

  // Mock data for department stats
  const departmentStats = [
    { name: "Computer Science", events: 3, members: 45, budget: "₹150,000" },
    { name: "Electrical Engineering", events: 2, members: 32, budget: "₹120,000" },
    { name: "Mechanical Engineering", events: 1, members: 28, budget: "₹100,000" },
    { name: "Civil Engineering", events: 1, members: 25, budget: "₹90,000" },
    { name: "Business Administration", events: 2, members: 30, budget: "₹110,000" },
  ]

  return (
    <DashboardLayout role="hod">
      <div className={styles.dashboardContainer}>
        <div className={styles.welcomeSection}>
          <div className={styles.welcomeContent}>
            <h1 className={styles.welcomeTitle}>Welcome, Dr. Johnson</h1>
            <p className={styles.welcomeSubtitle}>Head of Department Dashboard</p>
          </div>
          <div className={styles.quickActions}>
            <Button className={styles.actionButton}>
              <Settings size={16} />
              <span>System Settings</span>
            </Button>
            <Button className={styles.actionButton}>
              <Shield size={16} />
              <span>Permissions</span>
            </Button>
            <Button className={styles.actionButton}>
              <Award size={16} />
              <span>Approvals</span>
            </Button>
          </div>
        </div>

        <div className={styles.statsSection}>
          <Card className={styles.statCard}>
            <CardContent className={styles.statContent}>
              <div className={styles.statIcon}>
                <Calendar size={24} />
              </div>
              <div className={styles.statInfo}>
                <p className={styles.statValue}>5</p>
                <p className={styles.statLabel}>Total Events</p>
              </div>
            </CardContent>
          </Card>

          <Card className={styles.statCard}>
            <CardContent className={styles.statContent}>
              <div className={styles.statIcon}>
                <Users size={24} />
              </div>
              <div className={styles.statInfo}>
                <p className={styles.statValue}>250</p>
                <p className={styles.statLabel}>Total Registrations</p>
              </div>
            </CardContent>
          </Card>

          <Card className={styles.statCard}>
            <CardContent className={styles.statContent}>
              <div className={styles.statIcon}>
                <CheckSquare size={24} />
              </div>
              <div className={styles.statInfo}>
                <p className={styles.statValue}>16/47</p>
                <p className={styles.statLabel}>Tasks Completed</p>
              </div>
            </CardContent>
          </Card>

          <Card className={styles.statCard}>
            <CardContent className={styles.statContent}>
              <div className={styles.statIcon}>
                <BarChart size={24} />
              </div>
              <div className={styles.statInfo}>
                <p className={styles.statValue}>₹570K</p>
                <p className={styles.statLabel}>Total Budget</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className={styles.mainSection}>
          <Card className={styles.eventsCard}>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={styles.eventsList}>
                {upcomingEvents.map((event) => (
                  <div key={event.id} className={styles.eventItem}>
                    <div className={styles.eventInfo}>
                      <h3 className={styles.eventTitle}>{event.title}</h3>
                      <div className={styles.eventMeta}>
                        <span className={styles.eventDate}>{event.date}</span>
                        <span className={styles.eventCommittee}>{event.committee}</span>
                      </div>
                    </div>
                    <div className={styles.eventStats}>
                      <div className={styles.eventStat}>
                        <span className={styles.statLabel}>Registrations</span>
                        <span className={styles.statValue}>{event.registrations}</span>
                      </div>
                      <div className={styles.eventStat}>
                        <span className={styles.statLabel}>Tasks</span>
                        <span className={styles.statValue}>
                          {event.completedTasks}/{event.tasks}
                        </span>
                      </div>
                    </div>
                    <div className={styles.eventProgress}>
                      <div className={styles.progressLabel}>
                        <span>Task Progress</span>
                        <span>{Math.round((event.completedTasks / event.tasks) * 100)}%</span>
                      </div>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{ width: `${(event.completedTasks / event.tasks) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className={styles.eventActions}>
                      <Button variant="outline" size="sm" className={styles.eventButton}>
                        View Details
                      </Button>
                      <Button size="sm" className={styles.eventButton}>
                        Manage Event
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className={styles.sideSection}>
            <Card className={styles.departmentsCard}>
              <CardHeader>
                <CardTitle>Department Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={styles.departmentsList}>
                  {departmentStats.map((dept, index) => (
                    <div key={index} className={styles.departmentItem}>
                      <div className={styles.departmentInfo}>
                        <h3 className={styles.departmentName}>{dept.name}</h3>
                      </div>
                      <div className={styles.departmentStats}>
                        <div className={styles.departmentStat}>
                          <span className={styles.statLabel}>Events</span>
                          <span className={styles.statValue}>{dept.events}</span>
                        </div>
                        <div className={styles.departmentStat}>
                          <span className={styles.statLabel}>Members</span>
                          <span className={styles.statValue}>{dept.members}</span>
                        </div>
                        <div className={styles.departmentStat}>
                          <span className={styles.statLabel}>Budget</span>
                          <span className={styles.statValue}>{dept.budget}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className={styles.approvalCard}>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={styles.approvalsList}>
                  <div className={styles.approvalItem}>
                    <div className={styles.approvalInfo}>
                      <h3 className={styles.approvalTitle}>Budget Increase Request</h3>
                      <p className={styles.approvalMeta}>Tech Symposium 2025</p>
                    </div>
                    <div className={styles.approvalActions}>
                      <Button variant="outline" size="sm" className={styles.rejectButton}>
                        Reject
                      </Button>
                      <Button size="sm" className={styles.approveButton}>
                        Approve
                      </Button>
                    </div>
                  </div>

                  <div className={styles.approvalItem}>
                    <div className={styles.approvalInfo}>
                      <h3 className={styles.approvalTitle}>New Committee Formation</h3>
                      <p className={styles.approvalMeta}>Robotics Club</p>
                    </div>
                    <div className={styles.approvalActions}>
                      <Button variant="outline" size="sm" className={styles.rejectButton}>
                        Reject
                      </Button>
                      <Button size="sm" className={styles.approveButton}>
                        Approve
                      </Button>
                    </div>
                  </div>

                  <div className={styles.approvalItem}>
                    <div className={styles.approvalInfo}>
                      <h3 className={styles.approvalTitle}>External Speaker Invitation</h3>
                      <p className={styles.approvalMeta}>Hackathon</p>
                    </div>
                    <div className={styles.approvalActions}>
                      <Button variant="outline" size="sm" className={styles.rejectButton}>
                        Reject
                      </Button>
                      <Button size="sm" className={styles.approveButton}>
                        Approve
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

