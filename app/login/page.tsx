"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import styles from "./login.module.css"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("user")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would validate credentials here
    // For demo purposes, we'll just redirect based on role
    switch (role) {
      case "user":
        router.push("/dashboard/user")
        break
      case "committee":
        router.push("/dashboard/committee")
        break
      case "admin":
        router.push("/dashboard/admin")
        break
      case "hod":
        router.push("/dashboard/hod")
        break
      default:
        router.push("/dashboard/user")
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Login</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="role">Login As</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)} className={styles.select}>
              <option value="user">Student/Attendee</option>
              <option value="committee">Committee Member</option>
              <option value="admin">CP/VCP</option>
              <option value="hod">HOD (Super Admin)</option>
            </select>
          </div>

          <Button type="submit" className={styles.button}>
            Login
          </Button>
        </form>

        <p className={styles.registerText}>
          Don't have an account?{" "}
          <Link href="/register" className={styles.link}>
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

