"use client"

import type React from "react"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import styles from "./stalls.module.css"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Coffee, ShoppingBag, X, Info } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock data for stalls
const stallsData = [
  {
    id: 1,
    name: "Café Corner",
    category: "Food",
    location: "Block A, Ground Floor",
    description: "Coffee, tea, and light snacks",
    image: "/placeholder.svg?height=150&width=300",
    items: [
      { name: "Coffee", price: "₹30", description: "Freshly brewed coffee" },
      { name: "Tea", price: "₹20", description: "Assorted tea flavors" },
      { name: "Sandwich", price: "₹60", description: "Vegetable or chicken sandwich" },
      { name: "Cookies", price: "₹40", description: "Chocolate chip cookies" },
    ],
    coordinates: { x: 30, y: 40 },
  },
  {
    id: 2,
    name: "Tech Gadgets",
    category: "Merchandise",
    location: "Block B, First Floor",
    description: "College-branded tech accessories",
    image: "/placeholder.svg?height=150&width=300",
    items: [
      { name: "USB Drive", price: "₹350", description: "College-branded 16GB USB drive" },
      { name: "Phone Case", price: "₹250", description: "Phone cases with college logo" },
      { name: "Laptop Sleeve", price: "₹500", description: "Protective laptop sleeve" },
      { name: "Wireless Mouse", price: "₹600", description: "Ergonomic wireless mouse" },
    ],
    coordinates: { x: 70, y: 30 },
  },
  {
    id: 3,
    name: "Pizza Paradise",
    category: "Food",
    location: "Food Court",
    description: "Fresh pizzas with various toppings",
    image: "/placeholder.svg?height=150&width=300",
    items: [
      { name: "Margherita Pizza", price: "₹120", description: "Classic cheese pizza" },
      { name: "Veggie Supreme", price: "₹180", description: "Loaded with vegetables" },
      { name: "Chicken Pizza", price: "₹200", description: "Topped with grilled chicken" },
      { name: "Garlic Bread", price: "₹80", description: "Crispy garlic bread with cheese" },
    ],
    coordinates: { x: 50, y: 60 },
  },
  {
    id: 4,
    name: "College Apparel",
    category: "Merchandise",
    location: "Block C, Ground Floor",
    description: "T-shirts, hoodies, and other college merchandise",
    image: "/placeholder.svg?height=150&width=300",
    items: [
      { name: "College T-shirt", price: "₹350", description: "Cotton t-shirt with college logo" },
      { name: "Hoodie", price: "₹800", description: "Warm hoodie with college name" },
      { name: "Cap", price: "₹200", description: "Adjustable cap with embroidered logo" },
      { name: "Wristband", price: "₹100", description: "Silicone wristband with college motto" },
    ],
    coordinates: { x: 20, y: 70 },
  },
  {
    id: 5,
    name: "Juice Junction",
    category: "Food",
    location: "Food Court",
    description: "Fresh fruit juices and smoothies",
    image: "/placeholder.svg?height=150&width=300",
    items: [
      { name: "Orange Juice", price: "₹60", description: "Freshly squeezed orange juice" },
      { name: "Mixed Fruit Juice", price: "₹80", description: "Blend of seasonal fruits" },
      { name: "Mango Smoothie", price: "₹100", description: "Thick mango smoothie" },
      { name: "Watermelon Juice", price: "₹70", description: "Refreshing watermelon juice" },
    ],
    coordinates: { x: 60, y: 80 },
  },
  {
    id: 6,
    name: "Book Corner",
    category: "Merchandise",
    location: "Library Building",
    description: "Books, stationery, and academic supplies",
    image: "/placeholder.svg?height=150&width=300",
    items: [
      { name: "Notebooks", price: "₹80", description: "College-branded notebooks" },
      { name: "Pen Set", price: "₹150", description: "Set of premium pens" },
      { name: "Academic Planner", price: "₹200", description: "Annual academic planner" },
      { name: "Bookmarks", price: "₹50", description: "Decorative bookmarks with college logo" },
    ],
    coordinates: { x: 40, y: 20 },
  },
]

export default function StallsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStall, setSelectedStall] = useState<null | (typeof stallsData)[0]>(null)
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({})

  // Filter stalls based on search term and category
  const filteredStalls = stallsData.filter((stall) => {
    const matchesSearch =
      stall.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stall.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || stall.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleStallClick = (stall: (typeof stallsData)[0]) => {
    setSelectedStall(stall)
  }

  const closeStallDetails = () => {
    setSelectedStall(null)
  }

  const toggleCardFlip = (stallId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setFlippedCards({
      ...flippedCards,
      [stallId]: !flippedCards[stallId],
    })
  }

  return (
    <DashboardLayout role="user">
      <div className={styles.stallsContainer}>
        <div className={styles.stallsHeader}>
          <h2 className={styles.stallsTitle}>Stall Locator</h2>
          <div className={styles.viewToggle}>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              onClick={() => setViewMode("list")}
              className={styles.viewButton}
            >
              List View
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              onClick={() => setViewMode("map")}
              className={styles.viewButton}
            >
              Map View
            </Button>
          </div>
        </div>

        <div className={styles.stallsFilters}>
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} size={18} />
            <Input
              type="text"
              placeholder="Search stalls..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.categoryFilters}>
            <Button
              variant={selectedCategory === "All" ? "default" : "outline"}
              onClick={() => setSelectedCategory("All")}
              className={styles.categoryButton}
            >
              All
            </Button>
            <Button
              variant={selectedCategory === "Food" ? "default" : "outline"}
              onClick={() => setSelectedCategory("Food")}
              className={styles.categoryButton}
            >
              <Coffee size={16} className={styles.categoryIcon} />
              Food
            </Button>
            <Button
              variant={selectedCategory === "Merchandise" ? "default" : "outline"}
              onClick={() => setSelectedCategory("Merchandise")}
              className={styles.categoryButton}
            >
              <ShoppingBag size={16} className={styles.categoryIcon} />
              Merchandise
            </Button>
          </div>
        </div>

        {viewMode === "list" ? (
          <div className={styles.stallsGrid}>
            {filteredStalls.map((stall) => (
              <div
                key={stall.id}
                className={`${styles.flipCardContainer} ${flippedCards[stall.id] ? styles.flipped : ""}`}
              >
                <div className={styles.flipCard}>
                  {/* Front of card */}
                  <div className={styles.flipCardFront}>
                    <Card className={styles.stallCard}>
                      <div className={styles.stallImageContainer}>
                        <img src={stall.image || "/placeholder.svg"} alt={stall.name} className={styles.stallImage} />
                        <span className={styles.stallCategory}>{stall.category}</span>
                      </div>
                      <CardContent className={styles.stallContent}>
                        <h3 className={styles.stallName}>{stall.name}</h3>
                        <div className={styles.stallLocation}>
                          <MapPin size={16} />
                          <span>{stall.location}</span>
                        </div>
                        <p className={styles.stallDescription}>{stall.description}</p>
                        <Button className={styles.viewItemsButton} onClick={(e) => toggleCardFlip(stall.id, e)}>
                          <Info size={16} className={styles.buttonIcon} />
                          View Items
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Back of card */}
                  <div className={styles.flipCardBack}>
                    <Card className={styles.stallCard}>
                      <CardContent className={styles.stallBackContent}>
                        <h3 className={styles.stallName}>{stall.name} - Available Items</h3>
                        <div className={styles.itemsList}>
                          {stall.items.map((item, index) => (
                            <div key={index} className={styles.itemCard}>
                              <div className={styles.itemInfo}>
                                <h4 className={styles.itemName}>{item.name}</h4>
                                <p className={styles.itemDescription}>{item.description}</p>
                              </div>
                              {/* Price is hidden as requested */}
                            </div>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          className={styles.flipBackButton}
                          onClick={(e) => toggleCardFlip(stall.id, e)}
                        >
                          Back to Stall
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.mapContainer}>
            <div className={styles.map}>
              {/* Simple visual representation of a map */}
              <div className={styles.mapBackground}>
                {/* Buildings */}
                <div className={styles.building} style={{ top: "10%", left: "20%", width: "25%", height: "30%" }}>
                  <span>Block A</span>
                </div>
                <div className={styles.building} style={{ top: "15%", left: "60%", width: "25%", height: "25%" }}>
                  <span>Block B</span>
                </div>
                <div className={styles.building} style={{ top: "50%", left: "15%", width: "20%", height: "35%" }}>
                  <span>Block C</span>
                </div>
                <div className={styles.building} style={{ top: "55%", left: "50%", width: "35%", height: "30%" }}>
                  <span>Food Court</span>
                </div>
                <div className={styles.building} style={{ top: "10%", left: "40%", width: "15%", height: "20%" }}>
                  <span>Library</span>
                </div>

                {/* Stall markers */}
                {filteredStalls.map((stall) => (
                  <div
                    key={stall.id}
                    className={styles.stallMarker}
                    style={{
                      top: `${stall.coordinates.y}%`,
                      left: `${stall.coordinates.x}%`,
                    }}
                    onClick={() => handleStallClick(stall)}
                  >
                    {stall.category === "Food" ? <Coffee size={16} /> : <ShoppingBag size={16} />}
                    <span className={styles.markerTooltip}>{stall.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.mapLegend}>
              <div className={styles.legendItem}>
                <div className={styles.legendMarker}>
                  <Coffee size={14} />
                </div>
                <span>Food Stall</span>
              </div>
              <div className={styles.legendItem}>
                <div className={styles.legendMarker}>
                  <ShoppingBag size={14} />
                </div>
                <span>Merchandise Stall</span>
              </div>
            </div>
          </div>
        )}

        {/* Stall Details Modal */}
        {selectedStall && (
          <div className={styles.stallModal}>
            <div className={styles.stallModalContent}>
              <button className={styles.closeButton} onClick={closeStallDetails} aria-label="Close">
                <X size={20} />
              </button>

              <div className={styles.stallModalHeader}>
                <img
                  src={selectedStall.image || "/placeholder.svg"}
                  alt={selectedStall.name}
                  className={styles.stallModalImage}
                />
                <div className={styles.stallModalInfo}>
                  <h2 className={styles.stallModalName}>{selectedStall.name}</h2>
                  <div className={styles.stallModalCategory}>
                    {selectedStall.category === "Food" ? <Coffee size={16} /> : <ShoppingBag size={16} />}
                    <span>{selectedStall.category}</span>
                  </div>
                  <div className={styles.stallModalLocation}>
                    <MapPin size={16} />
                    <span>{selectedStall.location}</span>
                  </div>
                  <p className={styles.stallModalDescription}>{selectedStall.description}</p>
                </div>
              </div>

              <div className={styles.stallModalItems}>
                <h3 className={styles.itemsTitle}>Available Items</h3>
                <div className={styles.itemsList}>
                  {selectedStall.items.map((item, index) => (
                    <div key={index} className={styles.itemCard}>
                      <div className={styles.itemInfo}>
                        <h4 className={styles.itemName}>{item.name}</h4>
                        <p className={styles.itemDescription}>{item.description}</p>
                      </div>
                      {/* Price is hidden as requested */}
                      <div className={styles.itemPriceHidden}>
                        <span>Ask at counter</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

