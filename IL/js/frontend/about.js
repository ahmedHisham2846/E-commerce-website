document.getElementsByTagName("body")[0].onscroll = () => {
  if (window.scrollY >= 250) {
    document.querySelector("body>i").classList.remove("d-none");
  } else {
    document.querySelector("body>i").classList.add("d-none");
  }
};

document.querySelector("body>i").onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
