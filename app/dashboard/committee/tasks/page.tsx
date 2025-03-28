"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import styles from "./tasks.module.css"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, User } from "lucide-react"

// Mock data for tasks
const initialTasks = [
  {
    id: 1,
    title: "Finalize venue arrangements",
    description: "Confirm booking and setup requirements with the venue management",
    assignee: "Sarah Williams",
    dueDate: "2025-03-01",
    status: "completed",
    priority: "high",
    event: "Tech Symposium 2025",
  },
  {
    id: 2,
    title: "Design event posters",
    description: "Create digital and print posters for event promotion",
    assignee: "Mike Johnson",
    dueDate: "2025-02-15",
    status: "in-progress",
    priority: "medium",
    event: "Tech Symposium 2025",
  },
  {
    id: 3,
    title: "Coordinate with speakers",
    description: "Confirm availability and requirements of guest speakers",
    assignee: "Jane Smith",
    dueDate: "2025-02-20",
    status: "pending",
    priority: "high",
    event: "Tech Symposium 2025",
  },
  {
    id: 4,
    title: "Arrange catering services",
    description: "Book catering for lunch and refreshments",
    assignee: "David Brown",
    dueDate: "2025-02-25",
    status: "in-progress",
    priority: "medium",
    event: "Tech Symposium 2025",
  },
  {
    id: 5,
    title: "Prepare registration system",
    description: "Set up online registration form and QR code generation",
    assignee: "Jane Smith",
    dueDate: "2025-02-10",
    status: "completed",
    priority: "high",
    event: "Tech Symposium 2025",
  },
  {
    id: 6,
    title: "Organize cultural performances",
    description: "Schedule and coordinate performances for the cultural fest",
    assignee: "Sarah Williams",
    dueDate: "2025-03-15",
    status: "pending",
    priority: "high",
    event: "Cultural Fest",
  },
  {
    id: 7,
    title: "Arrange sound system",
    description: "Book sound equipment and technicians",
    assignee: "David Brown",
    dueDate: "2025-03-20",
    status: "pending",
    priority: "medium",
    event: "Cultural Fest",
  },
]

// Mock data for committee members
const committeeMembers = [
  { id: 1, name: "Jane Smith", role: "Technical Lead" },
  { id: 2, name: "Mike Johnson", role: "PR Coordinator" },
  { id: 3, name: "Sarah Williams", role: "Event Manager" },
  { id: 4, name: "David Brown", role: "Logistics Head" },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState("all")
  const [showAddTask, setShowAddTask] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignee: "",
    dueDate: "",
    priority: "medium",
    event: "Tech Symposium 2025",
  })

  // Filter tasks based on status
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true
    return task.status === filter
  })

  // Group tasks by status for drag-and-drop board
  const tasksByStatus = {
    pending: filteredTasks.filter((task) => task.status === "pending"),
    "in-progress": filteredTasks.filter((task) => task.status === "in-progress"),
    completed: filteredTasks.filter((task) => task.status === "completed"),
  }

  const handleStatusChange = (taskId: number, newStatus: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
  }

  const handleAddTask = () => {
    const newTaskWithId = {
      ...newTask,
      id: Math.max(...tasks.map((t) => t.id)) + 1,
      status: "pending",
    }

    setTasks([...tasks, newTaskWithId])
    setNewTask({
      title: "",
      description: "",
      assignee: "",
      dueDate: "",
      priority: "medium",
      event: "Tech Symposium 2025",
    })
    setShowAddTask(false)
  }

  return (
    <DashboardLayout role="committee">
      <div className={styles.tasksContainer}>
        <div className={styles.tasksHeader}>
          <h2 className={styles.tasksTitle}>Task Allocation & Management</h2>
          <div className={styles.tasksActions}>
            <div className={styles.filterButtons}>
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className={styles.filterButton}
              >
                All Tasks
              </Button>
              <Button
                variant={filter === "pending" ? "default" : "outline"}
                onClick={() => setFilter("pending")}
                className={styles.filterButton}
              >
                Pending
              </Button>
              <Button
                variant={filter === "in-progress" ? "default" : "outline"}
                onClick={() => setFilter("in-progress")}
                className={styles.filterButton}
              >
                In Progress
              </Button>
              <Button
                variant={filter === "completed" ? "default" : "outline"}
                onClick={() => setFilter("completed")}
                className={styles.filterButton}
              >
                Completed
              </Button>
            </div>
            <Button onClick={() => setShowAddTask(true)} className={styles.addButton}>
              <Plus size={16} />
              <span>Add Task</span>
            </Button>
          </div>
        </div>

        <div className={styles.taskBoard}>
          <div className={styles.taskColumn}>
            <div className={styles.columnHeader}>
              <h3 className={styles.columnTitle}>Pending</h3>
              <span className={styles.taskCount}>{tasksByStatus.pending.length}</span>
            </div>
            <div className={styles.columnContent}>
              {tasksByStatus.pending.map((task) => (
                <Card key={task.id} className={styles.taskCard}>
                  <CardContent className={styles.taskContent}>
                    <div className={`${styles.priorityIndicator} ${styles[task.priority]}`}></div>
                    <h4 className={styles.taskTitle}>{task.title}</h4>
                    <p className={styles.taskDescription}>{task.description}</p>

                    <div className={styles.taskDetails}>
                      <div className={styles.taskDetail}>
                        <User size={14} />
                        <span>{task.assignee}</span>
                      </div>
                      <div className={styles.taskDetail}>
                        <Calendar size={14} />
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className={styles.taskEvent}>{task.event}</div>

                    <div className={styles.taskActions}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(task.id, "in-progress")}
                        className={styles.actionButton}
                      >
                        Start
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className={styles.taskColumn}>
            <div className={styles.columnHeader}>
              <h3 className={styles.columnTitle}>In Progress</h3>
              <span className={styles.taskCount}>{tasksByStatus["in-progress"].length}</span>
            </div>
            <div className={styles.columnContent}>
              {tasksByStatus["in-progress"].map((task) => (
                <Card key={task.id} className={styles.taskCard}>
                  <CardContent className={styles.taskContent}>
                    <div className={`${styles.priorityIndicator} ${styles[task.priority]}`}></div>
                    <h4 className={styles.taskTitle}>{task.title}</h4>
                    <p className={styles.taskDescription}>{task.description}</p>

                    <div className={styles.taskDetails}>
                      <div className={styles.taskDetail}>
                        <User size={14} />
                        <span>{task.assignee}</span>
                      </div>
                      <div className={styles.taskDetail}>
                        <Calendar size={14} />
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className={styles.taskEvent}>{task.event}</div>

                    <div className={styles.taskActions}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(task.id, "pending")}
                        className={styles.actionButton}
                      >
                        Move Back
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleStatusChange(task.id, "completed")}
                        className={styles.actionButton}
                      >
                        Complete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className={styles.taskColumn}>
            <div className={styles.columnHeader}>
              <h3 className={styles.columnTitle}>Completed</h3>
              <span className={styles.taskCount}>{tasksByStatus.completed.length}</span>
            </div>
            <div className={styles.columnContent}>
              {tasksByStatus.completed.map((task) => (
                <Card key={task.id} className={styles.taskCard}>
                  <CardContent className={styles.taskContent}>
                    <div className={`${styles.priorityIndicator} ${styles[task.priority]}`}></div>
                    <h4 className={styles.taskTitle}>{task.title}</h4>
                    <p className={styles.taskDescription}>{task.description}</p>

                    <div className={styles.taskDetails}>
                      <div className={styles.taskDetail}>
                        <User size={14} />
                        <span>{task.assignee}</span>
                      </div>
                      <div className={styles.taskDetail}>
                        <Calendar size={14} />
                        <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className={styles.taskEvent}>{task.event}</div>

                    <div className={styles.taskActions}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(task.id, "in-progress")}
                        className={styles.actionButton}
                      >
                        Reopen
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Add Task Modal */}
        {showAddTask && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2 className={styles.modalTitle}>Add New Task</h2>

              <div className={styles.formGroup}>
                <label htmlFor="title">Task Title</label>
                <input
                  type="text"
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className={styles.input}
                  placeholder="Enter task title"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className={styles.textarea}
                  placeholder="Enter task description"
                  rows={3}
                ></textarea>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="assignee">Assignee</label>
                  <select
                    id="assignee"
                    value={newTask.assignee}
                    onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                    className={styles.select}
                  >
                    <option value="">Select Assignee</option>
                    {committeeMembers.map((member) => (
                      <option key={member.id} value={member.name}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="dueDate">Due Date</label>
                  <input
                    type="date"
                    id="dueDate"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="priority">Priority</label>
                  <select
                    id="priority"
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className={styles.select}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="event">Event</label>
                  <select
                    id="event"
                    value={newTask.event}
                    onChange={(e) => setNewTask({ ...newTask, event: e.target.value })}
                    className={styles.select}
                  >
                    <option value="Tech Symposium 2025">Tech Symposium 2025</option>
                    <option value="Cultural Fest">Cultural Fest</option>
                  </select>
                </div>
              </div>

              <div className={styles.modalActions}>
                <Button variant="outline" onClick={() => setShowAddTask(false)} className={styles.cancelButton}>
                  Cancel
                </Button>
                <Button
                  onClick={handleAddTask}
                  disabled={!newTask.title || !newTask.assignee || !newTask.dueDate}
                  className={styles.saveButton}
                >
                  Add Task
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

