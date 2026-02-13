onload = () => {
  document.body.classList.remove("container");
};

window.addEventListener("DOMContentLoaded", () => {
  const gift = document.getElementById("gift");
  const textElement = document.getElementById("text");
  const messageBox = document.querySelector(".message");

  const message1 = "1 John 4:16";
  const message2 = `"And so we know and rely on the love God has for us. God is love. Whoever lives in love lives in God, and God in them."`;
  const message3 = "Happy Valentine’s Day, Brenda! 💌"; // teks baru setelah fade out

  function typeWriterFade(text, speed, fontSize, callback) {
    let i = 0;
    const fragment = document.createDocumentFragment();

    text.split("").forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.opacity = "0";
      span.style.transition = "opacity 0.6s ease";
      if (fontSize) span.style.fontSize = fontSize; // set font size per teks
      fragment.appendChild(span);

      setTimeout(() => {
        span.style.opacity = "1";
      }, index * speed);
    });

    textElement.appendChild(fragment);

    if (callback) {
      const totalDuration = text.length * speed + 200;
      setTimeout(callback, totalDuration);
    }
  }

  function fadeOutText(duration, callback) {
    textElement.style.transition = `opacity ${duration}ms ease`;
    textElement.style.opacity = "0";
    setTimeout(() => {
      textElement.innerHTML = "";
      textElement.style.opacity = "1"; // reset untuk teks baru
      if (callback) callback();
    }, duration);
  }
// main click handler
gift.addEventListener("click", () => {
  document.body.classList.add("play");
  gift.style.display = "none";

  // play music dari web
  bgMusic.play();

  setTimeout(() => {
    messageBox.style.opacity = "";
    messageBox.style.transform = "translate(-50%, 0)";

    textElement.innerHTML = "";

    typeWriterFade(message1, 60, () => {
      textElement.innerHTML += "<br>";
      typeWriterFade(message2, 60, () => {
        setTimeout(() => {
          messageBox.style.transition = "opacity 1s ease";
          messageBox.style.opacity = "0";
          textElement.innerHTML = "";
        }, 2000);
      }, false);
    }, true);

  }, 1000);
});

  gift.addEventListener("click", () => {
    document.body.classList.add("play");
    gift.style.display = "none";

    setTimeout(() => {
      messageBox.style.opacity = "1";
      messageBox.style.transform = "translate(-50%, 0)";

      textElement.innerHTML = "";

      // teks 1 lebih kecil
      typeWriterFade(message1, 60, "14px", () => {
        textElement.innerHTML += "<br style='line-height:1.2'>"; // jarak rapat
        typeWriterFade(message2, 60, "16px", () => {
          // fade out setelah teks muncul
          setTimeout(() => {
            fadeOutText(800, () => {
              // muncul teks baru setelah fade out
              typeWriterFade(message3, 60, "16px");
            });
          }, 1000); // delay sebelum fade out
        });
      });
    }, 4500);
  });
  
});
