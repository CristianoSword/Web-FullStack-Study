mod models;

use models::{Envelope, SynthConfig};
use std::f32::consts::PI;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn generate_tone(config: JsValue) -> Result<Vec<f32>, JsValue> {
    let config: SynthConfig =
        serde_wasm_bindgen::from_value(config).map_err(|error| JsValue::from_str(&error.to_string()))?;
    validate_config(&config)?;

    let envelope = Envelope {
        attack: 0.08,
        decay: 0.18,
        sustain: 0.74,
        release: 0.22,
    };

    let sample_count = (config.duration * config.sample_rate as f32) as usize;
    let mut samples = Vec::with_capacity(sample_count);

    for index in 0..sample_count {
        let time = index as f32 / config.sample_rate as f32;
        let phase = 2.0 * PI * config.frequency * time;
        let fundamental = phase.sin();
        let overtone = (phase * 2.0).sin() * 0.35;
        let brightness = (phase * 0.5).sin() * 0.18;
        let amplitude = adsr(time, config.duration, &envelope) * config.gain;
        samples.push((fundamental + overtone + brightness) * amplitude);
    }

    Ok(samples)
}

fn adsr(time: f32, duration: f32, envelope: &Envelope) -> f32 {
    if time < envelope.attack {
        return time / envelope.attack.max(0.0001);
    }

    if time < envelope.attack + envelope.decay {
        let decay_progress = (time - envelope.attack) / envelope.decay.max(0.0001);
        return 1.0 - ((1.0 - envelope.sustain) * decay_progress);
    }

    if time < duration - envelope.release {
        return envelope.sustain;
    }

    let release_start = (duration - envelope.release).max(0.0);
    let release_progress = (time - release_start) / envelope.release.max(0.0001);
    envelope.sustain * (1.0 - release_progress).max(0.0)
}

fn validate_config(config: &SynthConfig) -> Result<(), JsValue> {
    if config.frequency <= 0.0 || config.duration <= 0.0 || config.sample_rate == 0 {
        return Err(JsValue::from_str("frequency, duration and sample rate must be positive"));
    }

    if config.gain <= 0.0 || config.gain > 1.0 {
        return Err(JsValue::from_str("gain must stay between 0 and 1"));
    }

    Ok(())
}
