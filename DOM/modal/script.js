"use strict";

const openBtnList = document.querySelectorAll(".show-modal-btn");

// open modal on button click
for (let i = 0; i < openBtnList.length; i++) {
  openBtnList[i].addEventListener("click", () => {
    // show modal & show overlay
    document.getElementById("md").classList.remove("hidden");
    document.getElementById("overlay").classList.remove("hidden");
  });
}

const closeModal = () => {
  document.getElementById("md").classList.add("hidden");
  document.getElementById("overlay").classList.add("hidden");
};

// close modal
const closeBtnList = document.querySelectorAll("#close-btn, #overlay");
for (let i = 0; i < closeBtnList.length; i++) {
  closeBtnList[i].addEventListener("click", () => {
    closeModal();
  });
}

// close modal on keypress: ESC
document.querySelector("html").addEventListener("keydown", (e) => {
  e.key === "Escape" ? closeModal() : "";
});
