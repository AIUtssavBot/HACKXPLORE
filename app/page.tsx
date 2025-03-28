import Link from "next/link"
import styles from "./page.module.css"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <h1 className={styles.title}>College Event Management System</h1>
        <p className={styles.description}>
          An AI-powered platform for managing college events, registrations, and more
        </p>
        <div className={styles.buttonGroup}>
          <Link href="/login">
            <Button className={styles.button}>Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" className={styles.button}>
              Register
            </Button>
          </Link>
        </div>
      </div>

      <div className={styles.features}>
        <div className={styles.featureCard}>
          <h2>Event Registration</h2>
          <p>Register for upcoming events with a simple form</p>
        </div>
        <div className={styles.featureCard}>
          <h2>QR-Based Entry</h2>
          <p>Secure event access with QR code scanning</p>
        </div>
        <div className={styles.featureCard}>
          <h2>Interactive Stall Locator</h2>
          <p>Find food and merchandise stalls with ease</p>
        </div>
        <div className={styles.featureCard}>
          <h2>Live Quizzes</h2>
          <p>Participate in quizzes and win rewards</p>
        </div>
      </div>
    </main>
  )
}

