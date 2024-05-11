document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});
