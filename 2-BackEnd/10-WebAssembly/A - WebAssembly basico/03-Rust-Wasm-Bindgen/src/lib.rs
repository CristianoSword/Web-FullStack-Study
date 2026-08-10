mod models;

use models::{AnalysisResult, ScoreInput};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn analyze_scores(input: JsValue) -> Result<JsValue, JsValue> {
    let datasets: Vec<ScoreInput> = serde_wasm_bindgen::from_value(input)
        .map_err(|error| JsValue::from_str(&error.to_string()))?;

    let results: Vec<AnalysisResult> = datasets
        .into_iter()
        .map(|dataset| AnalysisResult {
            label: dataset.label,
            total: dataset.values.iter().sum(),
            average: average(&dataset.values),
            peak: peak(&dataset.values),
        })
        .collect();

    serde_wasm_bindgen::to_value(&results).map_err(|error| JsValue::from_str(&error.to_string()))
}

#[wasm_bindgen]
pub fn scale_value(value: f64, factor: f64) -> f64 {
    value * factor
}

fn average(values: &[f64]) -> f64 {
    if values.is_empty() {
        return 0.0;
    }

    values.iter().sum::<f64>() / values.len() as f64
}

fn peak(values: &[f64]) -> f64 {
    values
        .iter()
        .copied()
        .fold(f64::MIN, |highest, current| highest.max(current))
}
