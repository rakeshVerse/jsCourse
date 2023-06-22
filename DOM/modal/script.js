"use strict";

const modal = document.getElementById("md");
const overlay = document.getElementById("overlay");

const openModal = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// open modal on button click
const openBtnList = document.querySelectorAll(".show-modal-btn");
for (let i = 0; i < openBtnList.length; i++)
  openBtnList[i].addEventListener("click", openModal);

// close modal
const closeBtnList = document.querySelectorAll("#close-btn, #overlay");
for (let i = 0; i < closeBtnList.length; i++)
  closeBtnList[i].addEventListener("click", closeModal);

// close modal on keypress: ESC
// attach event to entire document
document.addEventListener("keydown", (e) => {
  e.key === "Escape" && !modal.classList.contains("hidden") ? closeModal() : "";
});
