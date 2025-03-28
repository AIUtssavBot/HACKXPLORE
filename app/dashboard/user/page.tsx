import DashboardLayout from "@/components/dashboard-layout"
import styles from "./user-dashboard.module.css"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Users, Award, Clock } from "lucide-react"

export default function UserDashboard() {
  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Symposium 2025",
      date: "March 15, 2025",
      location: "Main Auditorium",
      description: "Annual technology symposium featuring guest speakers and workshops.",
    },
    {
      id: 2,
      title: "Cultural Fest",
      date: "April 5, 2025",
      location: "College Grounds",
      description: "A celebration of art, music, and cultural performances.",
    },
    {
      id: 3,
      title: "Hackathon",
      date: "May 10, 2025",
      location: "Computer Science Block",
      description: "24-hour coding competition with exciting prizes.",
    },
  ]

  return (
    <DashboardLayout role="user">
      <div className={styles.dashboardGrid}>
        <div className={styles.statsSection}>
          <Card className={styles.statCard}>
            <CardContent className={styles.statContent}>
              <div className={styles.statIcon}>
                <CalendarDays size={24} />
              </div>
              <div className={styles.statInfo}>
                <p className={styles.statValue}>5</p>
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
                <p className={styles.statValue}>3</p>
                <p className={styles.statLabel}>Registered Events</p>
              </div>
            </CardContent>
          </Card>

          <Card className={styles.statCard}>
            <CardContent className={styles.statContent}>
              <div className={styles.statIcon}>
                <Award size={24} />
              </div>
              <div className={styles.statInfo}>
                <p className={styles.statValue}>2</p>
                <p className={styles.statLabel}>Rewards Earned</p>
              </div>
            </CardContent>
          </Card>

          <Card className={styles.statCard}>
            <CardContent className={styles.statContent}>
              <div className={styles.statIcon}>
                <Clock size={24} />
              </div>
              <div className={styles.statInfo}>
                <p className={styles.statValue}>8</p>
                <p className={styles.statLabel}>Hours Attended</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className={styles.eventsCard}>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Events you might be interested in</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={styles.eventsList}>
              {upcomingEvents.map((event) => (
                <div key={event.id} className={styles.eventItem}>
                  <div className={styles.eventDate}>
                    <CalendarDays size={16} />
                    <span>{event.date}</span>
                  </div>
                  <h3 className={styles.eventTitle}>{event.title}</h3>
                  <p className={styles.eventLocation}>{event.location}</p>
                  <p className={styles.eventDescription}>{event.description}</p>
                  <div className={styles.eventActions}>
                    <button className={styles.registerButton}>Register</button>
                    <button className={styles.detailsButton}>View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className={styles.qrCard}>
          <CardHeader>
            <CardTitle>Your Event QR Codes</CardTitle>
            <CardDescription>Scan these codes at event entry and exit</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={styles.qrContainer}>
              <div className={styles.qrCode}>
                <div className={styles.qrPlaceholder}>
                  <div className={styles.qrImage}></div>
                  <p>Entry QR Code</p>
                  <span>Tech Symposium 2025</span>
                </div>
              </div>
              <div className={styles.qrCode}>
                <div className={styles.qrPlaceholder}>
                  <div className={styles.qrImage}></div>
                  <p>Exit QR Code</p>
                  <span>Tech Symposium 2025</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

