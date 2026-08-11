mod preset;

use preset::FilterPreset;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn apply_filter(mut pixels: Vec<u8>, preset_key: &str) -> Result<Vec<u8>, JsValue> {
    if pixels.is_empty() || pixels.len() % 4 != 0 {
        return Err(JsValue::from_str("pixel buffer must contain RGBA values"));
    }

    let preset = FilterPreset::from_key(preset_key)
        .ok_or_else(|| JsValue::from_str("unknown filter preset"))?;

    for chunk in pixels.chunks_exact_mut(4) {
        let red = chunk[0] as f32;
        let green = chunk[1] as f32;
        let blue = chunk[2] as f32;

        match preset {
            FilterPreset::Grayscale => {
                let luminance = ((red * 0.2126) + (green * 0.7152) + (blue * 0.0722)) as u8;
                chunk[0] = luminance;
                chunk[1] = luminance;
                chunk[2] = luminance;
            }
            FilterPreset::HighContrast => {
                chunk[0] = contrast(red);
                chunk[1] = contrast(green);
                chunk[2] = contrast(blue);
            }
            FilterPreset::WarmTone => {
                chunk[0] = clamp_channel(red + 20.0);
                chunk[1] = clamp_channel(green + 6.0);
                chunk[2] = clamp_channel(blue - 12.0);
            }
        }
    }

    Ok(pixels)
}

fn contrast(value: f32) -> u8 {
    let centered = ((value - 128.0) * 1.25) + 128.0;
    clamp_channel(centered)
}

fn clamp_channel(value: f32) -> u8 {
    value.clamp(0.0, 255.0) as u8
}
