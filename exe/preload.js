// preload.js
const { contextBridge, ipcRenderer } = require("electron");

// Kita expose API yang aman ke window
contextBridge.exposeInMainWorld("electronAPI", {
  sendMessage: (msg) => ipcRenderer.send("message", msg),
  onMessage: (callback) => ipcRenderer.on("message", (event, data) => callback(data))
});