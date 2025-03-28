"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import styles from "./quizzes.module.css"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Clock, CheckCircle } from "lucide-react"

// Mock data for quizzes
const quizzesData = [
  {
    id: 1,
    title: "Tech Trivia",
    description: "Test your knowledge of technology and computer science",
    eventName: "Tech Symposium 2025",
    timeLimit: "10 minutes",
    questions: 15,
    rewards: "Tech gadget vouchers",
    status: "available",
  },
  {
    id: 2,
    title: "Cultural Quiz",
    description: "Questions about art, music, and cultural history",
    eventName: "Cultural Fest",
    timeLimit: "15 minutes",
    questions: 20,
    rewards: "Free event passes",
    status: "available",
  },
  {
    id: 3,
    title: "Sports Challenge",
    description: "Test your knowledge of sports and athletics",
    eventName: "Sports Tournament",
    timeLimit: "8 minutes",
    questions: 12,
    rewards: "Sports merchandise",
    status: "completed",
    score: "8/12",
  },
]

// Mock data for quiz questions
const mockQuizQuestions = [
  {
    id: 1,
    question: "What does CPU stand for?",
    options: [
      "Central Processing Unit",
      "Computer Personal Unit",
      "Central Process Utility",
      "Central Processor Undertaking",
    ],
    correctAnswer: "Central Processing Unit",
  },
  {
    id: 2,
    question: 'Which programming language is known as the "mother of all languages"?',
    options: ["Java", "C", "Python", "Assembly"],
    correctAnswer: "C",
  },
  {
    id: 3,
    question: "What year was the first iPhone released?",
    options: ["2005", "2006", "2007", "2008"],
    correctAnswer: "2007",
  },
  {
    id: 4,
    question: "Which company developed the first commercially available quantum computer?",
    options: ["IBM", "Google", "Microsoft", "D-Wave"],
    correctAnswer: "D-Wave",
  },
  {
    id: 5,
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Language",
      "Hyper Text Modern Links",
    ],
    correctAnswer: "Hyper Text Markup Language",
  },
]

export default function QuizzesPage() {
  const [activeQuiz, setActiveQuiz] = useState<null | (typeof quizzesData)[0]>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({})
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds

  const startQuiz = (quiz: (typeof quizzesData)[0]) => {
    setActiveQuiz(quiz)
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setQuizCompleted(false)
    setScore(0)
    setTimeLeft(600) // Reset timer
  }

  const selectAnswer = (questionId: number, answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer,
    })
  }

  const nextQuestion = () => {
    if (currentQuestion < mockQuizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate score
      let correctAnswers = 0
      mockQuizQuestions.forEach((question) => {
        if (selectedAnswers[question.id] === question.correctAnswer) {
          correctAnswers++
        }
      })
      setScore(correctAnswers)
      setQuizCompleted(true)
    }
  }

  const exitQuiz = () => {
    setActiveQuiz(null)
    setQuizCompleted(false)
  }

  return (
    <DashboardLayout role="user">
      <div className={styles.quizzesContainer}>
        {!activeQuiz ? (
          <>
            <h2 className={styles.quizzesTitle}>Live Quizzes & Rewards</h2>
            <p className={styles.quizzesDescription}>Participate in quizzes during events to win exciting rewards!</p>

            <div className={styles.quizzesGrid}>
              {quizzesData.map((quiz) => (
                <Card key={quiz.id} className={styles.quizCard}>
                  <CardHeader className={styles.quizCardHeader}>
                    <CardTitle className={styles.quizTitle}>{quiz.title}</CardTitle>
                    <span className={styles.eventName}>{quiz.eventName}</span>
                  </CardHeader>
                  <CardContent className={styles.quizCardContent}>
                    <p className={styles.quizDescription}>{quiz.description}</p>

                    <div className={styles.quizDetails}>
                      <div className={styles.quizDetail}>
                        <Clock size={16} />
                        <span>{quiz.timeLimit}</span>
                      </div>
                      <div className={styles.quizDetail}>
                        <span>Questions: {quiz.questions}</span>
                      </div>
                    </div>

                    <div className={styles.quizRewards}>
                      <Award size={16} />
                      <span>Rewards: {quiz.rewards}</span>
                    </div>

                    {quiz.status === "available" ? (
                      <Button className={styles.startQuizButton} onClick={() => startQuiz(quiz)}>
                        Start Quiz
                      </Button>
                    ) : (
                      <div className={styles.completedQuiz}>
                        <div className={styles.completedStatus}>
                          <CheckCircle size={16} />
                          <span>Completed</span>
                        </div>
                        <div className={styles.quizScore}>Score: {quiz.score}</div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.activeQuizContainer}>
            {!quizCompleted ? (
              <>
                <div className={styles.quizHeader}>
                  <h2 className={styles.activeQuizTitle}>{activeQuiz.title}</h2>
                  <div className={styles.quizProgress}>
                    <span>
                      Question {currentQuestion + 1} of {mockQuizQuestions.length}
                    </span>
                    <div className={styles.progressBar}>
                      <div
                        className={styles.progressFill}
                        style={{ width: `${((currentQuestion + 1) / mockQuizQuestions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className={styles.quizTimer}>
                    <Clock size={16} />
                    <span>
                      {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <Card className={styles.questionCard}>
                  <CardContent className={styles.questionContent}>
                    <h3 className={styles.questionText}>{mockQuizQuestions[currentQuestion].question}</h3>

                    <div className={styles.answerOptions}>
                      {mockQuizQuestions[currentQuestion].options.map((option, index) => (
                        <div
                          key={index}
                          className={`${styles.answerOption} ${selectedAnswers[mockQuizQuestions[currentQuestion].id] === option ? styles.selectedAnswer : ""}`}
                          onClick={() => selectAnswer(mockQuizQuestions[currentQuestion].id, option)}
                        >
                          <span className={styles.optionLetter}>{String.fromCharCode(65 + index)}</span>
                          <span className={styles.optionText}>{option}</span>
                        </div>
                      ))}
                    </div>

                    <div className={styles.questionActions}>
                      <Button variant="outline" className={styles.exitButton} onClick={exitQuiz}>
                        Exit Quiz
                      </Button>
                      <Button
                        className={styles.nextButton}
                        onClick={nextQuestion}
                        disabled={!selectedAnswers[mockQuizQuestions[currentQuestion].id]}
                      >
                        {currentQuestion < mockQuizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className={styles.quizResults}>
                <Card className={styles.resultsCard}>
                  <CardHeader className={styles.resultsHeader}>
                    <CardTitle className={styles.resultsTitle}>Quiz Completed!</CardTitle>
                  </CardHeader>
                  <CardContent className={styles.resultsContent}>
                    <div className={styles.scoreCircle}>
                      <span className={styles.scoreValue}>{score}</span>
                      <span className={styles.scoreTotal}>/{mockQuizQuestions.length}</span>
                    </div>

                    <p className={styles.scoreMessage}>
                      {score === mockQuizQuestions.length
                        ? "Perfect score! Congratulations!"
                        : score >= mockQuizQuestions.length / 2
                          ? "Good job! You passed the quiz."
                          : "Better luck next time!"}
                    </p>

                    <div className={styles.rewardMessage}>
                      {score >= mockQuizQuestions.length / 2 && (
                        <>
                          <Award size={20} className={styles.rewardIcon} />
                          <p>You've earned: {activeQuiz.rewards}</p>
                        </>
                      )}
                    </div>

                    <Button className={styles.finishButton} onClick={exitQuiz}>
                      Back to Quizzes
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

