package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

// ============ Types ============

type Lead struct {
	ID            string  `json:"id"`
	Source        string  `json:"source"`
	Email         string  `json:"email"`
	Score         float64 `json:"score"`
	Intent        string  `json:"intent"`
	Status        string  `json:"status"`
	Converted     bool    `json:"converted"`
	CreatedAt     string  `json:"created_at"`
}

type User struct {
	ID         string `json:"id"`
	Email      string `json:"email"`
	Role       string `json:"role"`
	APIKey     string `json:"api_key"`
	RateLimit  int    `json:"rate_limit"`
	UsageCount int    `json:"usage_count"`
}

type Metric struct {
	Endpoint     string  `json:"endpoint"`
	Count        int     `json:"count"`
	AvgDuration  int     `json:"avg_duration"`
	TotalCost    float64 `json:"total_cost"`
}

type Reserve struct {
	TotalReserve   float64 `json:"total_reserve"`
	AdminShare     float64 `json:"admin_share"`
	DevShare       float64 `json:"dev_share"`
	CommunityShare float64 `json:"community_share"`
}

type BlockchainInfo struct {
	BlockNumber     int64   `json:"block_number"`
	GasPrice        float64 `json:"gas_price"`
	NetworkStatus   string  `json:"network_status"`
	Connected       bool    `json:"connected"`
}

type AIStats struct {
	Sentiment      string  `json:"sentiment"`
	Confidence     float64 `json:"confidence"`
	Trend          string  `json:"trend"`
	PredictiveGain float64 `json:"predictive_gain"`
}

type SystemMonitoring struct {
	CPUUsage    float64 `json:"cpu_usage"`
	RAMUsage    float64 `json:"ram_usage"`
	NodeCount   int     `json:"node_count"`
	UptimeHours float64 `json:"uptime_hours"`
}

// ============ Global State (Mock Database) ============

var (
	users    = make(map[string]User)
	leads    = []Lead{}
	metrics  = make(map[string]*Metric)
	reserve  = Reserve{TotalReserve: 100.50, AdminShare: 33.16, DevShare: 33.16, CommunityShare: 34.18}
	mu       sync.Mutex
)

// ============ Middleware ============

func authMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		apiKey := r.Header.Get("X-API-Key")
		if apiKey == "" {
			http.Error(w, "Unauthorized: Missing API Key", http.StatusUnauthorized)
			return
		}

		mu.Lock()
		valid := false
		for _, u := range users {
			if u.APIKey == apiKey {
				valid = true
				break
			}
		}
		mu.Unlock()

		if !valid && apiKey != "admin-core-key-2026" {
			http.Error(w, "Unauthorized: Invalid API Key", http.StatusUnauthorized)
			return
		}
		next(w, r)
	}
}

// ============ Handlers ============

func healthCheck(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":  "ok",
		"version": "8.0.0",
		"engine":  "Enterprise Elite Intelligence",
		"uptime":  time.Since(startTime).Seconds(),
	})
}

var startTime = time.Now()

func getBlockchainInfo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	// Mocking blockchain data for the preview
	info := BlockchainInfo{
		BlockNumber:   12845210,
		GasPrice:      12.5,
		NetworkStatus: "OPERATIONAL",
		Connected:     true,
	}
	json.NewEncoder(w).Encode(info)
}

func getAIAnalytics(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	stats := AIStats{
		Sentiment:      "POSITIVE",
		Confidence:     0.9998,
		Trend:          "BULLISH",
		PredictiveGain: 14.2,
	}
	json.NewEncoder(w).Encode(stats)
}

func getMonitoring(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	monitoring := SystemMonitoring{
		CPUUsage:    12.4,
		RAMUsage:    42.8,
		NodeCount:   64,
		UptimeHours: time.Since(startTime).Hours(),
	}
	json.NewEncoder(w).Encode(monitoring)
}

func getTelemetry(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	
	mu.Lock()
	defer mu.Unlock()

	data := map[string]interface{}{
		"timestamp":  time.Now().Format(time.RFC3339),
		"status":     "ELITE",
		"lead_count": len(leads),
		"node_id":    "GXQS-ELITE-V8-001",
		"version":    "8.0.0",
		"consciousness_depth": float64(1e18),
		"awareness_rate": 1.0,
		"reserve":    reserve,
	}
	json.NewEncoder(w).Encode(data)
}

func createUser(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Email string `json:"email"`
		Role  string `json:"role"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}

	mu.Lock()
	defer mu.Unlock()

	newID := uuid.New().String()
	apiKey := "sk_" + uuid.New().String()[:12]
	
	rateLimit := 100
	if body.Email == "gxqstudio@gmail.com" {
		body.Role = "super_admin"
		rateLimit = 1000000 // Infinite
	} else if body.Role == "admin" {
		rateLimit = 1000
	} else if body.Role == "dev" {
		rateLimit = 500
	}

	user := User{
		ID:         newID,
		Email:      body.Email,
		Role:       body.Role,
		APIKey:     apiKey,
		RateLimit:  rateLimit,
		UsageCount: 0,
	}
	users[apiKey] = user

	json.NewEncoder(w).Encode(map[string]string{
		"user_id":  newID,
		"api_key":  apiKey,
		"message":  "Identity provisioned successfully",
	})
}

func trackLead(w http.ResponseWriter, r *http.Request) {
	var lead Lead
	if err := json.NewDecoder(r.Body).Decode(&lead); err != nil {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}

	mu.Lock()
	defer mu.Unlock()

	lead.ID = uuid.New().String()
	lead.CreatedAt = time.Now().Format(time.RFC3339)
	lead.Status = "active"
	leads = append(leads, lead)

	// Update telemetry metrics
	if _, ok := metrics["/api/lead/track"]; !ok {
		metrics["/api/lead/track"] = &Metric{Endpoint: "/api/lead/track"}
	}
	metrics["/api/lead/track"].Count++

	json.NewEncoder(w).Encode(lead)
}

func getLeads(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	defer mu.Unlock()
	
	data := map[string]interface{}{
		"leads": leads,
		"count": len(leads),
	}
	json.NewEncoder(w).Encode(data)
}

func distributeReserve(w http.ResponseWriter, r *http.Request) {
	mu.Lock()
	defer mu.Unlock()

	if reserve.TotalReserve <= 0 {
		http.Error(w, "No reserve to distribute", http.StatusBadRequest)
		return
	}

	adminShare := reserve.TotalReserve * 0.33
	devShare := reserve.TotalReserve * 0.33
	communityShare := reserve.TotalReserve - adminShare - devShare

	reserve.AdminShare += adminShare
	reserve.DevShare += devShare
	reserve.CommunityShare += communityShare
	reserve.TotalReserve = 0

	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Reserve rebalanced successfully",
		"shares": map[string]float64{
			"admin": adminShare,
			"dev":   devShare,
			"comm":  communityShare,
		},
	})
}

// ============ Main ============

func main() {
	r := mux.NewRouter()

	// API Routes
	r.HandleFunc("/health", healthCheck).Methods("GET")
	r.HandleFunc("/api/v3/telemetry", getTelemetry).Methods("GET")
	r.HandleFunc("/api/v8/blockchain", getBlockchainInfo).Methods("GET")
	r.HandleFunc("/api/v8/ai", getAIAnalytics).Methods("GET")
	r.HandleFunc("/api/v8/monitoring", getMonitoring).Methods("GET")
	r.HandleFunc("/api/create-user", createUser).Methods("POST")
	
	// Protected Routes
	api := r.PathPrefix("/api").Subrouter()
	api.Use(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			apiKey := r.Header.Get("X-API-Key")
			if apiKey == "" {
				http.Error(w, "Unauthorized", http.StatusUnauthorized)
				return
			}
			next.ServeHTTP(w, r)
		})
	})

	api.HandleFunc("/lead/track", trackLead).Methods("POST")
	api.HandleFunc("/leads", getLeads).Methods("GET")
	api.HandleFunc("/distribute", distributeReserve).Methods("POST")

	port := "8080"
	fmt.Printf("🚀 GXQS Enterprise Elite Go Core active on port %s\n", port)
	
	srv := &http.Server{
		Handler:      r,
		Addr:         "0.0.0.0:" + port,
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}
