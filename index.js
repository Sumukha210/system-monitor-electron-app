const free_mem = document.getElementById("free_mem"),
  CPU = document.getElementById("cpu"),
  total_mem = document.getElementById("total_mem");

const { ipcRenderer } = require("electron");

ipcRenderer.on("sys__info", (e, { tot_memory, cpu, memory }) => {
  free_mem.innerHTML = memory.toFixed(2);
  total_mem.innerHTML = tot_memory.toFixed(2);
  CPU.innerHTML = cpu.toFixed(2);
});
