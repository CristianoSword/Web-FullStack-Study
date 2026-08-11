#[derive(Debug, Clone, Copy)]
pub enum FilterPreset {
    Grayscale,
    HighContrast,
    WarmTone,
}

impl FilterPreset {
    pub fn from_key(key: &str) -> Option<Self> {
        match key {
            "grayscale" => Some(Self::Grayscale),
            "contrast" => Some(Self::HighContrast),
            "warm" => Some(Self::WarmTone),
            _ => None,
        }
    }
}
