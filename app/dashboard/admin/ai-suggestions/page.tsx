"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import styles from "./ai-suggestions.module.css"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, Copy, Check, RefreshCw, Send } from "lucide-react"

export default function AiSuggestionsPage() {
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({})
  const [prompt, setPrompt] = useState("")

  // Mock AI-generated suggestions
  const suggestions = [
    {
      id: "suggestion-1",
      title: "Event Marketing Strategy",
      content: `
1. Create a dedicated Instagram filter for the Tech Symposium
2. Launch a countdown timer on the college website
3. Organize a pre-event teaser workshop
4. Partner with local tech companies for sponsorship
5. Create event-specific hashtags for social media promotion
      `,
      category: "marketing",
    },
    {
      id: "suggestion-2",
      title: "Engagement Activities",
      content: `
1. Interactive polling during presentations
2. Live Q&A sessions with industry experts
3. Tech demo booths with hands-on experiences
4. Networking sessions with structured ice-breakers
5. Digital scavenger hunt using QR codes around the venue
      `,
      category: "engagement",
    },
    {
      id: "suggestion-3",
      title: "Post-Event Follow-up",
      content: `
1. Send personalized thank you emails with event highlights
2. Share presentation slides and resources with attendees
3. Create a highlight reel video for social media
4. Collect structured feedback through a digital form
5. Announce early-bird registration for next year's event
      `,
      category: "follow-up",
    },
  ]

  // Mock email templates
  const emailTemplates = [
    {
      id: "email-1",
      title: "Event Reminder",
      subject: "Don't Miss Out: Tech Symposium 2025 is Just 3 Days Away!",
      content: `
Dear [Participant Name],

We're excited to remind you that the Tech Symposium 2025 is just 3 days away! 

Event Details:
- Date: March 15, 2025
- Time: 9:00 AM - 5:00 PM
- Venue: Main Auditorium, College Campus

Your registration is confirmed, and we've attached your entry QR code to this email. Please have it ready for scanning at the entrance.

The event will feature keynote speeches from industry leaders, interactive workshops, and networking opportunities. Don't forget to bring your laptop for the hands-on sessions!

We look forward to seeing you there!

Best regards,
The Organizing Committee
Tech Symposium 2025
      `,
    },
    {
      id: "email-2",
      title: "Post-Event Thank You",
      subject: "Thank You for Attending Tech Symposium 2025!",
      content: `
Dear [Participant Name],

Thank you for attending the Tech Symposium 2025! Your participation helped make the event a great success.

We hope you found the sessions informative and had the opportunity to connect with fellow tech enthusiasts and industry professionals.

Event Highlights:
- Over 500 attendees from 20 different colleges
- 15 expert speakers sharing insights on cutting-edge technologies
- 8 interactive workshops with hands-on experience
- Networking sessions with industry representatives

We've attached the presentation slides and resources from the sessions you attended. You can also access them through our event portal using your registration credentials.

Please take a moment to fill out our feedback form [Link] to help us improve future events.

Stay connected with us on social media for updates on upcoming events and opportunities!

Best regards,
The Organizing Committee
Tech Symposium 2025
      `,
    },
  ]

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopied({ ...copied, [id]: true })

    setTimeout(() => {
      setCopied({ ...copied, [id]: false })
    }, 2000)
  }

  const handleGenerateSuggestion = () => {
    if (!prompt) return

    setLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      setLoading(false)
      setPrompt("")
      // In a real app, this would add a new suggestion to the list
    }, 2000)
  }

  return (
    <DashboardLayout role="admin">
      <div className={styles.aiContainer}>
        <h2 className={styles.pageTitle}>AI-Powered Content Suggestions</h2>
        <p className={styles.pageDescription}>
          Get intelligent recommendations for event marketing, engagement, and communication
        </p>

        <div className={styles.promptSection}>
          <Card className={styles.promptCard}>
            <CardHeader>
              <CardTitle>Generate Custom Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={styles.promptForm}>
                <textarea
                  className={styles.promptInput}
                  placeholder="Describe what you need help with (e.g., 'Generate ideas for tech symposium workshops' or 'Create an email template for event cancellation')"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                ></textarea>
                <Button
                  onClick={handleGenerateSuggestion}
                  disabled={loading || !prompt}
                  className={styles.generateButton}
                >
                  {loading ? (
                    <>
                      <RefreshCw size={16} className={styles.spinIcon} />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Generate</span>
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className={styles.suggestionsSection}>
          <h3 className={styles.sectionTitle}>Event Strategy Suggestions</h3>
          <div className={styles.suggestionsGrid}>
            {suggestions.map((suggestion) => (
              <Card key={suggestion.id} className={styles.suggestionCard}>
                <CardHeader className={styles.suggestionHeader}>
                  <div className={styles.suggestionIcon}>
                    <Lightbulb size={18} />
                  </div>
                  <CardTitle className={styles.suggestionTitle}>{suggestion.title}</CardTitle>
                </CardHeader>
                <CardContent className={styles.suggestionContent}>
                  <pre className={styles.suggestionText}>{suggestion.content}</pre>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(suggestion.id, suggestion.content)}
                    className={styles.copyButton}
                  >
                    {copied[suggestion.id] ? (
                      <>
                        <Check size={14} />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy</span>
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className={styles.emailTemplatesSection}>
          <h3 className={styles.sectionTitle}>Email Templates</h3>
          <div className={styles.emailGrid}>
            {emailTemplates.map((template) => (
              <Card key={template.id} className={styles.emailCard}>
                <CardHeader>
                  <CardTitle className={styles.emailTitle}>{template.title}</CardTitle>
                  <div className={styles.emailSubject}>
                    <span className={styles.subjectLabel}>Subject:</span>
                    <span className={styles.subjectText}>{template.subject}</span>
                  </div>
                </CardHeader>
                <CardContent className={styles.emailContent}>
                  <pre className={styles.emailText}>{template.content}</pre>
                  <div className={styles.emailActions}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(template.id, template.content)}
                      className={styles.actionButton}
                    >
                      {copied[template.id] ? (
                        <>
                          <Check size={14} />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Copy</span>
                        </>
                      )}
                    </Button>
                    <Button size="sm" className={styles.actionButton}>
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

