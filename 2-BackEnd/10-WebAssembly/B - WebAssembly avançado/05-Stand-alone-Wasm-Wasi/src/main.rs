mod models;

use models::{WorkPlan, WorkSummary};
use std::env;
use std::fs;
use std::process;

fn main() {
    if let Err(error) = run() {
        eprintln!("error: {error}");
        process::exit(1);
    }
}

fn run() -> Result<(), String> {
    let args: Vec<String> = env::args().collect();

    if args.len() < 2 {
        return Err("usage: standalone_wasm_wasi <input-json> [output-json]".to_string());
    }

    let input_path = &args[1];
    let payload = fs::read_to_string(input_path).map_err(|error| error.to_string())?;
    let plan: WorkPlan = serde_json::from_str(&payload).map_err(|error| error.to_string())?;
    let summary = summarize(plan);
    let output = serde_json::to_string_pretty(&summary).map_err(|error| error.to_string())?;

    if let Some(output_path) = args.get(2) {
        fs::write(output_path, &output).map_err(|error| error.to_string())?;
        println!("summary written to {output_path}");
    } else {
        println!("{output}");
    }

    Ok(())
}

fn summarize(plan: WorkPlan) -> WorkSummary {
    let total_items = plan.items.len();
    let completed_items = plan.items.iter().filter(|item| item.completed).count();
    let remaining_hours: f64 = plan
        .items
        .iter()
        .filter(|item| !item.completed)
        .map(|item| item.estimate_hours)
        .sum();

    let completion_rate = if total_items == 0 {
        0.0
    } else {
        (completed_items as f64 / total_items as f64) * 100.0
    };

    WorkSummary {
        title: plan.title,
        team: plan.team,
        total_items,
        completed_items,
        completion_rate,
        estimated_hours_remaining: remaining_hours,
    }
}
