mod models;

use models::{Body, WorldConfig};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn simulate_step(config: JsValue, bodies: JsValue) -> Result<JsValue, JsValue> {
    let config: WorldConfig =
        serde_wasm_bindgen::from_value(config).map_err(|error| JsValue::from_str(&error.to_string()))?;
    let mut bodies: Vec<Body> =
        serde_wasm_bindgen::from_value(bodies).map_err(|error| JsValue::from_str(&error.to_string()))?;

    validate_config(&config)?;
    validate_bodies(&bodies)?;

    for body in bodies.iter_mut() {
        body.vy += config.gravity * config.dt;
        body.vx *= config.damping;
        body.vy *= config.damping;

        body.x += body.vx * config.dt;
        body.y += body.vy * config.dt;

        collide_with_bounds(&config, body);
    }

    resolve_collisions(&mut bodies);

    serde_wasm_bindgen::to_value(&bodies).map_err(|error| JsValue::from_str(&error.to_string()))
}

fn collide_with_bounds(config: &WorldConfig, body: &mut Body) {
    if body.x - body.radius < 0.0 {
        body.x = body.radius;
        body.vx *= -0.92;
    }

    if body.x + body.radius > config.width {
        body.x = config.width - body.radius;
        body.vx *= -0.92;
    }

    if body.y - body.radius < 0.0 {
        body.y = body.radius;
        body.vy *= -0.92;
    }

    if body.y + body.radius > config.height {
        body.y = config.height - body.radius;
        body.vy *= -0.82;
    }
}

fn resolve_collisions(bodies: &mut [Body]) {
    let len = bodies.len();

    for left_index in 0..len {
        for right_index in (left_index + 1)..len {
            let (left, right) = split_two_mut(bodies, left_index, right_index);
            let dx = right.x - left.x;
            let dy = right.y - left.y;
            let distance_sq = (dx * dx) + (dy * dy);
            let min_distance = left.radius + right.radius;

            if distance_sq > 0.0 && distance_sq < min_distance * min_distance {
                let distance = distance_sq.sqrt();
                let overlap = min_distance - distance;
                let normal_x = dx / distance;
                let normal_y = dy / distance;

                left.x -= normal_x * overlap * 0.5;
                left.y -= normal_y * overlap * 0.5;
                right.x += normal_x * overlap * 0.5;
                right.y += normal_y * overlap * 0.5;

                let impulse = 0.88;
                left.vx -= normal_x * impulse * right.mass;
                left.vy -= normal_y * impulse * right.mass;
                right.vx += normal_x * impulse * left.mass;
                right.vy += normal_y * impulse * left.mass;
            }
        }
    }
}

fn split_two_mut(bodies: &mut [Body], left_index: usize, right_index: usize) -> (&mut Body, &mut Body) {
    let (left_slice, right_slice) = bodies.split_at_mut(right_index);
    (&mut left_slice[left_index], &mut right_slice[0])
}

fn validate_config(config: &WorldConfig) -> Result<(), JsValue> {
    if config.width <= 0.0 || config.height <= 0.0 || config.dt <= 0.0 {
        return Err(JsValue::from_str("invalid world dimensions or timestep"));
    }

    Ok(())
}

fn validate_bodies(bodies: &[Body]) -> Result<(), JsValue> {
    if bodies.is_empty() {
        return Err(JsValue::from_str("at least one body is required"));
    }

    for body in bodies {
        if body.radius <= 0.0 || body.mass <= 0.0 {
            return Err(JsValue::from_str("body radius and mass must be positive"));
        }
    }

    Ok(())
}
