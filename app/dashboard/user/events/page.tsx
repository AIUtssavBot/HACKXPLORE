"use client"

import type React from "react"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import styles from "./events.module.css"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin, Clock, Users, X } from "lucide-react"

export default function EventsPage() {
  // Mock data for events
  const events = [
    {
      id: 1,
      title: "Tech Symposium 2025",
      date: "March 15, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Main Auditorium",
      organizer: "Computer Science Department",
      description:
        "Annual technology symposium featuring guest speakers and workshops on AI, blockchain, and cybersecurity.",
      image: "/placeholder.svg?height=200&width=400",
      registered: false,
      category: "Technical",
    },
    {
      id: 2,
      title: "Cultural Fest",
      date: "April 5, 2025",
      time: "10:00 AM - 8:00 PM",
      location: "College Grounds",
      organizer: "Cultural Committee",
      description: "A celebration of art, music, and cultural performances from students across departments.",
      image: "/placeholder.svg?height=200&width=400",
      registered: true,
      category: "Cultural",
    },
    {
      id: 3,
      title: "Hackathon",
      date: "May 10, 2025",
      time: "9:00 AM (24 hours)",
      location: "Computer Science Block",
      organizer: "Tech Club",
      description: "24-hour coding competition with exciting prizes for innovative solutions to real-world problems.",
      image: "/placeholder.svg?height=200&width=400",
      registered: false,
      category: "Technical",
    },
    {
      id: 4,
      title: "Sports Tournament",
      date: "June 1, 2025",
      time: "8:00 AM - 6:00 PM",
      location: "Sports Complex",
      organizer: "Sports Committee",
      description: "Inter-college sports tournament featuring cricket, football, basketball, and athletics.",
      image: "/placeholder.svg?height=200&width=400",
      registered: false,
      category: "Sports",
    },
    {
      id: 5,
      title: "Alumni Meet",
      date: "July 15, 2025",
      time: "5:00 PM - 9:00 PM",
      location: "College Auditorium",
      organizer: "Alumni Association",
      description: "Annual alumni gathering to reconnect with former classmates and network with professionals.",
      image: "/placeholder.svg?height=200&width=400",
      registered: false,
      category: "Networking",
    },
  ]

  const [selectedEvent, setSelectedEvent] = useState<null | (typeof events)[0]>(null)
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([2]) // Event ID 2 is pre-registered
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    year: "",
  })

  const handleRegister = (eventId: number) => {
    if (registeredEvents.includes(eventId)) return

    const event = events.find((e) => e.id === eventId)
    if (event) {
      setSelectedEvent(event)
      setShowRegistrationForm(true)
    }
  }

  const handleViewDetails = (eventId: number) => {
    const event = events.find((e) => e.id === eventId)
    if (event) {
      setSelectedEvent(event)
      setShowRegistrationForm(false)
    }
  }

  const handleCloseModal = () => {
    setSelectedEvent(null)
    setShowRegistrationForm(false)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedEvent) {
      setRegisteredEvents([...registeredEvents, selectedEvent.id])
      setSelectedEvent(null)
      setShowRegistrationForm(false)

      // Reset form data
      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
        year: "",
      })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  return (
    <DashboardLayout role="user">
      <div className={styles.eventsContainer}>
        <div className={styles.eventsHeader}>
          <h2 className={styles.eventsTitle}>Upcoming Events</h2>
          <div className={styles.eventsFilters}>
            <select className={styles.filterSelect}>
              <option value="all">All Categories</option>
              <option value="technical">Technical</option>
              <option value="cultural">Cultural</option>
              <option value="sports">Sports</option>
              <option value="networking">Networking</option>
            </select>
            <select className={styles.filterSelect}>
              <option value="all">All Events</option>
              <option value="registered">Registered</option>
              <option value="not-registered">Not Registered</option>
            </select>
          </div>
        </div>

        <div className={styles.eventsGrid}>
          {events.map((event) => {
            const isRegistered = registeredEvents.includes(event.id)
            return (
              <Card key={event.id} className={styles.eventCard}>
                <div className={styles.eventImageContainer}>
                  <img src={event.image || "/placeholder.svg"} alt={event.title} className={styles.eventImage} />
                  <span className={styles.eventCategory}>{event.category}</span>
                  {isRegistered && <span className={styles.registeredBadge}>Registered</span>}
                </div>
                <CardContent className={styles.eventContent}>
                  <h3 className={styles.eventTitle}>{event.title}</h3>

                  <div className={styles.eventDetails}>
                    <div className={styles.eventDetail}>
                      <CalendarDays size={16} />
                      <span>{event.date}</span>
                    </div>
                    <div className={styles.eventDetail}>
                      <Clock size={16} />
                      <span>{event.time}</span>
                    </div>
                    <div className={styles.eventDetail}>
                      <MapPin size={16} />
                      <span>{event.location}</span>
                    </div>
                    <div className={styles.eventDetail}>
                      <Users size={16} />
                      <span>{event.organizer}</span>
                    </div>
                  </div>

                  <p className={styles.eventDescription}>{event.description}</p>

                  <div className={styles.eventActions}>
                    {isRegistered ? (
                      <Button variant="outline" className={styles.viewQrButton}>
                        View QR Code
                      </Button>
                    ) : (
                      <Button className={styles.registerButton} onClick={() => handleRegister(event.id)}>
                        Register Now
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className={styles.detailsButton}
                      onClick={() => handleViewDetails(event.id)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Event Details Modal */}
        {selectedEvent && !showRegistrationForm && (
          <div className={styles.eventModal}>
            <div className={styles.modalContent}>
              <button className={styles.closeButton} onClick={handleCloseModal}>
                <X size={20} />
              </button>

              <div className={styles.modalHeader}>
                <img
                  src={selectedEvent.image || "/placeholder.svg"}
                  alt={selectedEvent.title}
                  className={styles.modalImage}
                />
                <div className={styles.modalHeaderContent}>
                  <h2 className={styles.modalTitle}>{selectedEvent.title}</h2>
                  <span className={styles.modalCategory}>{selectedEvent.category}</span>
                </div>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.modalDetails}>
                  <div className={styles.modalDetail}>
                    <CalendarDays size={18} />
                    <div>
                      <h4>Date</h4>
                      <p>{selectedEvent.date}</p>
                    </div>
                  </div>

                  <div className={styles.modalDetail}>
                    <Clock size={18} />
                    <div>
                      <h4>Time</h4>
                      <p>{selectedEvent.time}</p>
                    </div>
                  </div>

                  <div className={styles.modalDetail}>
                    <MapPin size={18} />
                    <div>
                      <h4>Location</h4>
                      <p>{selectedEvent.location}</p>
                    </div>
                  </div>

                  <div className={styles.modalDetail}>
                    <Users size={18} />
                    <div>
                      <h4>Organizer</h4>
                      <p>{selectedEvent.organizer}</p>
                    </div>
                  </div>
                </div>

                <div className={styles.modalDescription}>
                  <h3>Event Description</h3>
                  <p>{selectedEvent.description}</p>
                </div>

                <div className={styles.modalActions}>
                  {registeredEvents.includes(selectedEvent.id) ? (
                    <Button className={styles.modalQrButton}>View QR Code</Button>
                  ) : (
                    <Button className={styles.modalRegisterButton} onClick={() => setShowRegistrationForm(true)}>
                      Register for this Event
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Registration Form Modal */}
        {selectedEvent && showRegistrationForm && (
          <div className={styles.eventModal}>
            <div className={styles.modalContent}>
              <button className={styles.closeButton} onClick={handleCloseModal}>
                <X size={20} />
              </button>

              <div className={styles.formHeader}>
                <h2>Register for {selectedEvent.title}</h2>
                <p>Please fill out the form below to complete your registration</p>
              </div>

              <form onSubmit={handleFormSubmit} className={styles.registrationForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="department">Department</label>
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      required
                      className={styles.formSelect}
                    >
                      <option value="">Select Department</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Electrical">Electrical Engineering</option>
                      <option value="Mechanical">Mechanical Engineering</option>
                      <option value="Civil">Civil Engineering</option>
                      <option value="Business">Business Administration</option>
                      <option value="Arts">Arts & Humanities</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="year">Year of Study</label>
                  <select
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    className={styles.formSelect}
                  >
                    <option value="">Select Year</option>
                    <option value="1">First Year</option>
                    <option value="2">Second Year</option>
                    <option value="3">Third Year</option>
                    <option value="4">Fourth Year</option>
                    <option value="5">Fifth Year</option>
                    <option value="alumni">Alumni</option>
                  </select>
                </div>

                <div className={styles.formActions}>
                  <Button type="button" variant="outline" onClick={handleCloseModal} className={styles.cancelButton}>
                    Cancel
                  </Button>
                  <Button type="submit" className={styles.submitButton}>
                    Complete Registration
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

