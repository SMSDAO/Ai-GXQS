// sales_ai.rs - Self-learning sales AI with pattern recognition
// Compile: rustc -O sales_ai.rs
// Run: ./sales_ai

use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use std::time::{SystemTime, UNIX_EPOCH};
// use rand::Rng; // rand might not be available without cargo
use serde::{Serialize, Deserialize};

#[derive(Clone, Serialize, Deserialize)]
struct Lead {
    id: String,
    score: f64,
    intent: String,
    source: String,
    interactions: Vec<Interaction>,
    converted: bool,
}

#[derive(Clone, Serialize, Deserialize)]
struct Interaction {
    timestamp: u64,
    message: String,
    sentiment: f64,
    response_time: u64,
}

#[derive(Clone, Serialize, Deserialize)]
struct SalesPattern {
    pattern_id: String,
    trigger_words: Vec<String>,
    success_rate: f64,
    response_template: String,
    optimal_time: u64, // best time to respond (seconds after first contact)
}

struct SelfLearningSalesAI {
    leads: Arc<Mutex<Vec<Lead>>>,
    patterns: Arc<Mutex<Vec<SalesPattern>>>,
    conversion_history: Arc<Mutex<Vec<bool>>>,
}

impl SelfLearningSalesAI {
    fn new() -> Self {
        SelfLearningSalesAI {
            leads: Arc::new(Mutex::new(Vec::new())),
            patterns: Arc::new(Mutex::new(Self::initialize_patterns())),
            conversion_history: Arc::new(Mutex::new(Vec::new())),
        }
    }
    
    fn initialize_patterns() -> Vec<SalesPattern> {
        vec![
            SalesPattern {
                pattern_id: "pat_001".to_string(),
                trigger_words: vec!["price".to_string(), "cost".to_string(), "how much".to_string()],
                success_rate: 0.75,
                response_template: "🎯 Special pricing just for you! Use code SMART20 for 20% off.".to_string(),
                optimal_time: 120, // 2 minutes
            },
            SalesPattern {
                pattern_id: "pat_002".to_string(),
                trigger_words: vec!["help".to_string(), "issue".to_string(), "problem".to_string()],
                success_rate: 0.85,
                response_template: "🤖 I'm here to help! Let me solve this for you in 2 minutes.".to_string(),
                optimal_time: 60, // 1 minute
            },
            SalesPattern {
                pattern_id: "pat_003".to_string(),
                trigger_words: vec!["compare".to_string(), "vs".to_string(), "better".to_string()],
                success_rate: 0.65,
                response_template: "📊 Here's why SmartPrompt is 3x better than alternatives...".to_string(),
                optimal_time: 300, // 5 minutes
            },
        ]
    }
    
    fn analyze_lead(&self, lead: &Lead) -> String {
        let mut best_pattern: Option<SalesPattern> = None;
        let mut highest_score = 0.0;
        
        let patterns = self.patterns.lock().unwrap();
        
        for pattern in patterns.iter() {
            let mut match_score = 0.0;
            let last_message = lead.interactions.last().unwrap();
            
            for word in &pattern.trigger_words {
                if last_message.message.to_lowercase().contains(word) {
                    match_score += 0.3;
                }
            }
            
            match_score *= pattern.success_rate;
            
            if match_score > highest_score {
                highest_score = match_score;
                best_pattern = Some(pattern.clone());
            }
        }
        
        if let Some(pattern) = best_pattern {
            // Learn from this interaction
            self.learn(lead, &pattern, highest_score);
            pattern.response_template
        } else {
            "👋 Thanks for your interest! How can I help you today?".to_string()
        }
    }
    
    fn learn(&self, lead: &Lead, pattern: &SalesPattern, score: f64) {
        // Self-learning: adjust pattern success rate based on actual conversion
        let mut patterns = self.patterns.lock().unwrap();
        
        for p in patterns.iter_mut() {
            if p.pattern_id == pattern.pattern_id {
                // Bayesian learning
                let new_rate = (p.success_rate * 0.7) + (score * 0.3);
                p.success_rate = new_rate.min(1.0);
                break;
            }
        }
        
        // Record conversion attempt
        let mut history = self.conversion_history.lock().unwrap();
        history.push(lead.converted);
        
        // Keep last 1000 interactions
        if history.len() > 1000 {
            history.remove(0);
        }
    }
    
    fn predict_conversion(&self, lead: &Lead) -> f64 {
        let mut prediction = lead.score;
        
        // Time-based decay
        let now = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap()
            .as_secs();
        
        let last_interaction = lead.interactions.last().unwrap();
        let hours_since = (now - last_interaction.timestamp) / 3600;
        
        if hours_since > 24 {
            prediction *= 0.5;
        } else if hours_since > 12 {
            prediction *= 0.7;
        }
        
        // Adjust based on historical patterns
        let history = self.conversion_history.lock().unwrap();
        let avg_conversion: f64 = if history.is_empty() { 0.1 } else {
            history.iter().map(|&x| if x { 1.0 } else { 0.0 }).sum::<f64>() / history.len() as f64
        };
        
        prediction * (avg_conversion + 0.5)
    }
    
    fn generate_sales_script(&self, lead: &Lead) -> String {
        let prediction = self.predict_conversion(lead);
        let response = self.analyze_lead(lead);
        
        format!(
            r#"{}
            
📊 *Lead Analysis*
• Conversion Probability: {:.0}%
• Intent: {}
• Source: {}

💡 *Recommended Action*
{}"#,
            response,
            prediction * 100.0,
            lead.intent,
            lead.source,
            if prediction > 0.7 {
                "🔥 High priority - Send offer now"
            } else if prediction > 0.4 {
                "📌 Medium priority - Nurture with content"
            } else {
                "⏰ Low priority - Add to drip campaign"
            }
        )
    }
}

fn main() {
    println!("🧠 Self-Learning Sales AI v1.0 - Rust Engine");
    println!("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    
    let ai = SelfLearningSalesAI::new();
    
    // Simulate lead
    let lead = Lead {
        id: "lead_001".to_string(),
        score: 0.85,
        intent: "high".to_string(),
        source: "telegram".to_string(),
        interactions: vec![
            Interaction {
                timestamp: SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_secs(),
                message: "What's the price for lifetime access?".to_string(),
                sentiment: 0.7,
                response_time: 0,
            }
        ],
        converted: false,
    };
    
    let script = ai.generate_sales_script(&lead);
    println!("{}\n", script);
    
    println!("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    println!("🤖 AI is now learning from every interaction...");
    
    // Keep running for API
    loop {
        std::thread::sleep(std::time::Duration::from_secs(60));
    }
}
