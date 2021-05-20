#![allow(non_snake_case)]

use wasm_bindgen::prelude::*;
extern crate console_error_panic_hook;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// Called when the wasm module is instantiated
#[wasm_bindgen(start)]
pub fn main() -> Result<(), JsValue> {
    init_panic_hook();
    Ok(())
}

// Don't judge, ok? I hate JavaScript

#[wasm_bindgen]
pub fn load_game(config: &JsValue) -> JsValue {
    let state = cyoa::State::new(&config.as_string().unwrap());
    JsValue::from_serde(&state).unwrap()
}

#[wasm_bindgen]
pub fn get_name(config: &JsValue) -> JsValue {
    let state: cyoa::State = config.into_serde().unwrap();
    JsValue::from_str(state.config.get_name())
}

#[wasm_bindgen]
pub fn get_author(config: &JsValue) -> JsValue {
    let state: cyoa::State = config.into_serde().unwrap();
    JsValue::from_str(state.config.get_author())
}

#[wasm_bindgen]
pub fn get_slug(config: &JsValue) -> JsValue {
    let state: cyoa::State = config.into_serde().unwrap();

    JsValue::from_str(state.config.get_slug())
}

#[wasm_bindgen]
pub fn check_path(config: &JsValue, path: &JsValue) -> JsValue {
    let state: cyoa::State = config.into_serde().unwrap();

    let path_id = path.as_f64().unwrap();
    JsValue::from_bool(state.config.check_path(&(path_id as usize)))
}

#[wasm_bindgen]
pub fn jump(config: JsValue, path: usize) -> JsValue {
    let mut state: cyoa::State = config.into_serde().unwrap();
    state.jump(path);
    JsValue::from_serde(&state).unwrap()
}

#[wasm_bindgen]
pub fn get_path(config: &JsValue) -> JsValue {
    let state: cyoa::State = config.into_serde().unwrap();
    JsValue::from_serde(state.get_path()).unwrap()
}

#[wasm_bindgen]
pub fn get_path_id(config: &JsValue) -> JsValue {
    let state: cyoa::State = config.into_serde().unwrap();
    JsValue::from_f64(state.get_path_id() as f64)
}

#[wasm_bindgen]
pub fn path_get_text(path: &JsValue) -> JsValue {
    let path: cyoa::datastruct::Path = path.into_serde().unwrap();
    JsValue::from_str(path.get_text())
}

#[wasm_bindgen]
pub fn path_get_option_len(path: &JsValue) -> JsValue {
    let path: cyoa::datastruct::Path = path.into_serde().unwrap();
    JsValue::from_f64(path.get_options().len() as f64)
}

#[wasm_bindgen]
pub fn path_get_option(path: &JsValue, item: usize) -> JsValue {
    let path: cyoa::datastruct::Path = path.into_serde().unwrap();
    JsValue::from_serde(&path.get_options().get(item)).unwrap()
}

#[wasm_bindgen]
pub fn option_get_text(option: &JsValue) -> JsValue {
    let option: cyoa::datastruct::PathOpt = option.into_serde().unwrap();
    JsValue::from_str(option.get_text())
}

#[wasm_bindgen]
pub fn option_get_jump(option: &JsValue) -> JsValue {
    let option: cyoa::datastruct::PathOpt = option.into_serde().unwrap();
    JsValue::from_f64(option.get_jump() as f64)
}

#[wasm_bindgen]
pub fn get_path_len(config: &JsValue) -> JsValue {
    let state: cyoa::State = config.into_serde().unwrap();
    JsValue::from_f64(state.config.get_path_len() as f64)
}

#[wasm_bindgen]
pub fn export_history(config: &JsValue) -> JsValue {
    let state: cyoa::State = config.into_serde().unwrap();
    JsValue::from_str(state.export_save().as_str())
}

#[wasm_bindgen]
pub fn import_history(config: &JsValue, history_v: &JsValue) -> JsValue {
    let mut state: cyoa::State = config.into_serde().unwrap();
    let history = history_v.as_string().unwrap();
    state.import_save(&history);
    JsValue::from_serde(&state).unwrap()
}

#[wasm_bindgen]
pub fn init_panic_hook() {
    console_error_panic_hook::set_once();
}
