use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
pub struct WorkItem {
    pub name: String,
    pub estimate_hours: f64,
    pub completed: bool,
}

#[derive(Debug, Deserialize)]
pub struct WorkPlan {
    pub title: String,
    pub team: String,
    pub items: Vec<WorkItem>,
}

#[derive(Debug, Serialize)]
pub struct WorkSummary {
    pub title: String,
    pub team: String,
    pub total_items: usize,
    pub completed_items: usize,
    pub completion_rate: f64,
    pub estimated_hours_remaining: f64,
}
