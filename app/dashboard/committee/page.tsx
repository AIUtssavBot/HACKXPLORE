import DashboardLayout from "@/components/dashboard-layout"
import styles from "./committee-dashboard.module.css"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, CheckSquare, Mail } from "lucide-react"

export default function CommitteeDashboard() {
  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Symposium 2025",
      date: "March 15, 2025",
      registrations: 120,
      tasks: 15,
      completedTasks: 8,
    },
    {
      id: 2,
      title: "Cultural Fest",
      date: "April 5, 2025",
      registrations: 85,
      tasks: 20,
      completedTasks: 5,
    },
  ]

  // Mock data for committee members
  const committeeMembers = [
    { id: 1, name: "Jane Smith", role: "Technical Lead", tasks: 5 },
    { id: 2, name: "Mike Johnson", role: "PR Coordinator", tasks: 4 },
    { id: 3, name: "Sarah Williams", role: "Event Manager", tasks: 6 },
    { id: 4, name: "David Brown", role: "Logistics Head", tasks: 3 },
  ]

  return (
    <DashboardLayout role="committee">
      <div className={styles.dashboardGrid}>
        <div className={styles.statsSection}>
          <Card className={styles.statCard}>
            <CardContent className={styles.statContent}>
              <div className={styles.statIcon}>
                <Calendar size={24} />
              </div>
              <div className={styles.statInfo}>
                <p className={styles.statValue}>2</p>
                <p className={styles.statLabel}>Upcoming Events</p>
              </div>
            </CardContent>
          </Card>

          <Card className={styles.statCard}>
            <CardContent className={styles.statContent}>
              <div className={styles.statIcon}>
                <Users size={24} />
              </div>
              <div className={styles.statInfo}>
                <p className={styles.statValue}>205</p>
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
                <p className={styles.statValue}>13/35</p>
                <p className={styles.statLabel}>Tasks Completed</p>
              </div>
            </CardContent>
          </Card>

          <Card className={styles.statCard}>
            <CardContent className={styles.statContent}>
              <div className={styles.statIcon}>
                <Mail size={24} />
              </div>
              <div className={styles.statInfo}>
                <p className={styles.statValue}>45</p>
                <p className={styles.statLabel}>Emails Sent</p>
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
                      <p className={styles.eventDate}>{event.date}</p>
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
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className={styles.membersCard}>
            <CardHeader>
              <CardTitle>Committee Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={styles.membersList}>
                {committeeMembers.map((member) => (
                  <div key={member.id} className={styles.memberItem}>
                    <div className={styles.memberAvatar}>
                      <span>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className={styles.memberInfo}>
                      <h3 className={styles.memberName}>{member.name}</h3>
                      <p className={styles.memberRole}>{member.role}</p>
                    </div>
                    <div className={styles.memberTasks}>
                      <span>{member.tasks} Tasks</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className={styles.emailCard}>
          <CardHeader>
            <CardTitle>Quick Email</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={styles.emailForm}>
              <div className={styles.formGroup}>
                <label htmlFor="emailType">Email Type</label>
                <select id="emailType" className={styles.select}>
                  <option value="reminder">Event Reminder</option>
                  <option value="update">Event Update</option>
                  <option value="task">Task Assignment</option>
                  <option value="custom">Custom Message</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="recipients">Recipients</label>
                <select id="recipients" className={styles.select}>
                  <option value="all">All Registered Participants</option>
                  <option value="committee">Committee Members</option>
                  <option value="volunteers">Volunteers</option>
                  <option value="custom">Custom Selection</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" className={styles.input} placeholder="Email subject" />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  className={styles.textarea}
                  rows={4}
                  placeholder="Type your message here..."
                ></textarea>
              </div>

              <button className={styles.sendButton}>
                <Mail size={16} />
                <span>Send Email</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

