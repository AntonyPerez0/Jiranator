// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Import the HTTP plugin
use tauri_plugin_http::init as init_http;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(init_http()) // Add this line to initialize the HTTP plugin
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}