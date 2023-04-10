// global common variables
let currentCamera = "user";
let link = "";
const mainContainer = document.getElementById("main-container");
const image = document.createElement("img"); // ?

// global variables for normal screen
const video = document.getElementById("video");
const btnPlay = document.querySelector("#btnPlay");
const btnPause = document.querySelector("#btnPause");
const btnReturn = document.querySelector("#btnReturn");
const switchBtn = document.getElementById("switch-btn");
const btnScreenshot = document.querySelector("#btnScreenshot");
const saveBtn = document.querySelector("#save-btn");
const shareBtn = document.querySelector("#share-btn");
const shareImageBtn = document.querySelectorAll(".share-btn");
const canvasContainer = document.getElementById("canvas-container");
const videoContainer = document.getElementById("video-container");
const canvas = document.createElement("canvas");

// global variables for fullscreen
const fullscreenBtn = document.getElementById("fullscreen-btn");
const fullscreenContainer = document.getElementById("fullscreen-container");
const fullscreenVideo = document.getElementById("fullscreen-video");
const fullscreenSwitchBtn = document.getElementById("fullscreen-switch-btn");
const fullscreenExitBtn = document.getElementById("fullscreen-exit-btn");
const fullscreenBtnScreenshot = document.getElementById(
  "fullscreen-btnScreenshot"
);
const fullscreenBtnReturn = document.getElementById("fullscreen-btnReturn");
const fullscreenBtnPlay = document.getElementById("fullscreen-btnPlay");
const fullscreenPause = document.getElementById("fullscreen-btnPause");
const fullscreenSaveBtn = document.getElementById("fullscreen-save-btn");
const fullscreenShareBtn = document.getElementById("fullscreen-share-btn");
const shareFullImageBtn = document.querySelectorAll(".full-share-btn");
const canvas2 = document.createElement("canvas");

// styles for canvas - normal screen
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.right = "0";
canvas.style.bottom = "0";
canvas.style.margin = "auto";
canvas.classList.add("canvas");
canvasContainer.appendChild(canvas);
canvasContainer.style.display = "none";
videoContainer.style.display = "none";
video.style.display = "none";
btnReturn.style.display = "none";
saveBtn.style.display = "none";
shareBtn.style.display = "none";

// styles for canvas - fullscreen
canvas2.style.position = "absolute";
document.body.appendChild(canvas2);
canvas2.classList.add("canvas2");
canvas2.style.display = "none";
fullscreenBtnReturn.style.display = "none";
fullscreenVideo.style.display = "none";


// start video stream
navigator.mediaDevices
  .getUserMedia({ audio: false, video: { facingMode: currentCamera } })
  .then((stream) => {
    video.srcObject = stream;
    video.play();
  })
  .catch((error) => {
    console.error(error);
  });


// draw canvas for normal screen
const ctx = canvas.getContext("2d");
const maskImage = new Image();
const waterMark = new Image();
const screenImage = document.createElement("img");
const waterMarkImage = document.createElement("img");

function openModal(url) {
  mainContainer.style.filter = "blur(10px)";
  canvas.width = canvasContainer.clientWidth;
  canvas.height = canvasContainer.clientHeight;
  maskImage.src = url;
  maskImage.onload = () => {
    waterMark.src = "../images/safety.png";
    setInterval(() => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        maskImage,
        canvas.width / 2 - 300 / 2,
        canvas.height / 2 - 200 / 2,
        300,
        200
      );
      ctx.drawImage(waterMark, canvas.width - 60, canvas.height - 60, 50, 50);
    }, 10);
  };
}

// play
btnPlay.addEventListener("click", function () {
  video.play();
  btnPlay.classList.add("is-hidden");
  btnPause.classList.remove("is-hidden");
});

// pause
btnPause.addEventListener("click", function () {
  video.pause();
  btnPause.classList.add("is-hidden");
  btnPlay.classList.remove("is-hidden");
});

// switch camera
switchBtn.addEventListener("click", () => {
  if (currentCamera === "user") {
    currentCamera = "environment";
  } else {
    currentCamera = "user";
  }
  navigator.mediaDevices
    .getUserMedia({ audio: false, video: { facingMode: currentCamera } })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })
    .catch((error) => {
      console.error(error);
    });
});

// return to video stream
btnReturn.addEventListener("click", function () {
  const shareBtns = document.querySelectorAll(".share-btn");
  shareBtns.forEach((item) => {
    item.style.display = "none";
  });
  shareBtn.classList.remove("show");
  canvas.style.display = "block";
  screenImage.remove();
  btnPlay.style.display = "block";
  btnPause.style.display = "block";
  switchBtn.style.display = "block";
  fullscreenBtn.style.display = "block";
  btnScreenshot.style.display = "block";
  saveBtn.style.display = "none";
  shareBtn.style.display = "none";
  video.play();
  btnReturn.style.display = "none";
});

// to make photo without object
btnScreenshot.addEventListener("click", (e) => {
  video.pause();
  video.style.display = "none";
  btnPlay.style.display = "none";
  btnPause.style.display = "none";
  switchBtn.style.display = "none";
  fullscreenBtn.style.display = "none";
  btnScreenshot.style.display = "none";
  saveBtn.style.display = "block";
  shareBtn.style.display = "flex";
  btnReturn.style.display = "block";
  clearInterval("1000");

  const pngUrl = canvas.toDataURL("image/png");

  // request to backend
  const obj = {
    user_id: "dfgdfg",
    image: pngUrl,
  };
  const data = JSON.stringify(obj);

  const options = {
    headers: {
      "Content-Type": "application/json",
      apikey: "test_apikey",
    },
  };
  e.preventDefault();
  axios
    .post("http://localhost:3000/img/removeobj", data, options)
    .then((response) => {
      link = response.data;
      screenImage.src = link.image;
      canvas.style.display = "none";
      videoContainer.appendChild(screenImage);
      screenImage.style.width = "100%";
      screenImage.style.height = "100%"; 
    });
});

// to download photo
saveBtn.addEventListener("click", () => {
  // the image received from the server by url parameter
  fetch("http://localhost:3000/images/result.png")
    .then((response) => response.blob())
    .then((blob) => {
      const imageUrlObjectURL = URL.createObjectURL(blob);
      const linkElement = document.createElement("a");
      linkElement.download = "image.jpg";
      linkElement.href = imageUrlObjectURL;
      document.body.appendChild(linkElement);
      linkElement.click();
      URL.revokeObjectURL(imageUrlObjectURL);
    });
});

// to share photo
shareBtn.addEventListener("click", (e) => {
  shareBtn.classList.toggle("show");
  screenImage.src = link.image;
  let eventName = e.target.dataset.name;
  shareImageBtn.forEach((item, i) => {
    if (shareBtn.classList.contains("show")) {
      item.style.display = "block";
      item.style.filter = "none";
    } else {
      let links = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${fullScreenImage.src}`,
        telegram: `https://telegram.me/share/url?url=${fullScreenImage.src}`,
        viber: `viber://forward?text=${fullScreenImage.src}`,
        twitter: `https://twitter.com/intent/tweet?url=${fullScreenImage.src}`,
      };
      if (eventName !== undefined) {
        const linkElement = document.createElement("a");
        linkElement.href = links[eventName];
        linkElement.target = "_blank";
        linkElement.click();
      }

      item.style.display = "none";
      item.style.filter = "none";
    }
  });
});


// FULLSCREEN

const fullScreenImage = document.createElement("img");
const fullScreenWaterMark = document.createElement("img");

// to open video stream for full screen
fullscreenBtn.addEventListener("click", () => {
  navigator.mediaDevices
    .getUserMedia({ audio: false, video: { facingMode: currentCamera } })
    .then((stream) => {
      fullscreenVideo.srcObject = stream;
      fullscreenVideo.play();
      openFullscreen();
    })
    .catch((error) => {
      console.error(error);
    });
  mainContainer.style.display = "none";
  canvas.style.display = "none";
  canvas2.style.display = "block";
  btnPlay.style.display = "none";
  btnPause.style.display = "none";
  switchBtn.style.display = "none";
  saveBtn.style.display = "none";
  shareBtn.style.display = "none";
  fullscreenBtn.style.display = "none";
  btnScreenshot.style.display = "none";
  btnReturn.style.display = "none";
  fullscreenBtnPlay.style.display = "block";
  fullscreenPause.style.display = "block";
  fullscreenSwitchBtn.style.display = "block";
  fullscreenBtnScreenshot.style.display = "block";
  fullscreenSaveBtn.style.display = "none";
  fullscreenShareBtn.style.display = "none";
  video.pause();
  fullscreenVideo.srcObject = video.srcObject;
  fullscreenContainer.style.display = "flex";
  document.documentElement.requestFullscreen();
});

// switch camera on fullscreen
fullscreenSwitchBtn.addEventListener("click", () => {
  if (currentCamera === "user") {
    currentCamera = "environment";
  } else {
    currentCamera = "user";
  }
  navigator.mediaDevices
    .getUserMedia({ audio: false, video: { facingMode: currentCamera } })
    .then((stream) => {
      fullscreenVideo.srcObject = stream;
      fullscreenVideo.play();
    })
    .catch((error) => {
      console.error(error);
    });
});

// play
fullscreenBtnPlay.addEventListener("click", function () {
  fullscreenVideo.play();
  fullscreenBtnPlay.classList.add("is-hidden");
  fullscreenPause.classList.remove("is-hidden");
});

// pause
fullscreenPause.addEventListener("click", function () {
  fullscreenVideo.pause();
  fullscreenPause.classList.add("is-hidden");
  fullscreenBtnPlay.classList.remove("is-hidden");
});

// return to video stream on fullscreen
fullscreenBtnReturn.addEventListener("click", function () {
  const shareBtns = document.querySelectorAll(".full-share-btn");
  shareBtns.forEach((item) => {
    item.style.display = "none";
  });
  fullscreenShareBtn.classList.remove("show");
  canvas2.style.display = "block";
  fullScreenImage.remove();
  fullscreenBtnPlay.style.display = "block";
  fullscreenPause.style.display = "block";
  fullscreenSwitchBtn.style.display = "block";
  fullscreenBtnScreenshot.style.display = "block";
  fullscreenSaveBtn.style.display = "none";
  fullscreenShareBtn.style.display = "none";
  fullscreenVideo.play();
  fullscreenBtnReturn.style.display = "none";
});

window.addEventListener("resize", openFullscreen);

// to track fullscreen sizes
const drawImageScaled = () => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight - 40;
  canvas2.style.width = viewportWidth + "px";
  canvas2.style.height = viewportHeight + "px";
  canvas2.width = window.innerWidth;
  canvas2.height = window.innerHeight - 40;
};

// // draw canvas for fullscreen
const ctx2 = canvas2.getContext("2d");
const maskImage2 = new Image();

window.addEventListener("orientationchange", () => {
  openFullscreen();
});

function openFullscreen() {
  drawImageScaled();
  waterMark.src = "../images/safety.png";
  maskImage2.src = "../images/mixer_kitchen.png";
  maskImage2.onload = () => {
    setInterval(() => {
      ctx2.drawImage(fullscreenVideo, 0, 0, canvas2.width, canvas2.height);
      ctx2.drawImage(
        maskImage2,
        canvas2.width / 2 - 250,
        canvas2.height / 2 - 150,
        500,
        300
      );
      ctx2.drawImage(
        waterMark,
        canvas2.width - 150,
        canvas2.height - 130,
        100,
        100
      );
    }, 10);
  };
}

// return to normal screen
fullscreenExitBtn.addEventListener("click", () => {
  navigator.mediaDevices
    .getUserMedia({ audio: false, video: { facingMode: currentCamera } })
    .then((stream) => {
      video.srcObject = stream;
      video.play();
    })
    .catch((error) => {
      console.error(error);
    });
  mainContainer.style.display = "block";
  canvas.style.display = "block";
  canvas2.style.display = "none";
  btnPlay.style.display = "block";
  btnPause.style.display = "block";
  switchBtn.style.display = "block";
  fullscreenBtn.style.display = "block";
  btnScreenshot.style.display = "block";
  fullscreenVideo.pause();
  fullscreenContainer.style.display = "none";
  document.exitFullscreen();
});

// return to normal screen by Escape button
document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement === null) {
    mainContainer.style.display = "block";
    canvas.style.display = "block";
    canvas2.style.display = "none";
    btnPlay.style.display = "block";
    btnPause.style.display = "block";
    switchBtn.style.display = "block";
    fullscreenBtn.style.display = "block";
    btnScreenshot.style.display = "block";
    fullscreenVideo.pause();
    fullscreenContainer.style.display = "none";
    video.play();
  }
});

// to make photo without object on fullscreen
fullscreenBtnScreenshot.addEventListener("click", () => {
  fullscreenVideo.pause();
  fullscreenVideo.style.display = "none";
  fullscreenBtnPlay.style.display = "none";
  fullscreenPause.style.display = "none";
  fullscreenSwitchBtn.style.display = "none";
  fullscreenBtnScreenshot.style.display = "none";
  fullscreenSaveBtn.style.display = "block";
  fullscreenShareBtn.style.display = "flex";
  fullscreenBtnReturn.style.display = "block";
  clearInterval("1000");

  const pngUrl = canvas2.toDataURL("image/png");
  // request to backend
  const obj = {
    user_id: "dfgdfg",
    image: pngUrl,
  };
  const data = JSON.stringify(obj);

  const options = {
    headers: {
      "Content-Type": "application/json",
      apikey: "test_apikey",
    },
  };

  axios
    .post("http://localhost:3000/img/removeobj", data, options)
    .then((response) => {
      link = response.data;
      fullScreenImage.src = link.image;
      canvas2.style.display = "none";
      fullscreenContainer.appendChild(fullScreenImage);
      fullScreenImage.style.width = "100%";
      fullScreenImage.style.height = "100%";
      fullScreenImage.style.objectFit = "cover";
    });
});

// to download photo on full screen
fullscreenSaveBtn.addEventListener("click", (e) => {
  // the image received from the server by url parameter
  fetch("http://localhost:3000/images/result2.png")
    .then((response) => response.blob())
    .then((blob) => {
      const imageUrlObjectURL = URL.createObjectURL(blob);
      const linkElement = document.createElement("a");
      linkElement.download = "image.png";
      linkElement.href = imageUrlObjectURL;
      document.body.appendChild(linkElement);
      linkElement.click();
      URL.revokeObjectURL(imageUrlObjectURL);
    });
});

// to share photo on full screen
fullscreenShareBtn.addEventListener("click", (e) => {
  fullscreenShareBtn.classList.toggle("show");
  fullScreenImage.src = link.image;
  let eventName = e.target.dataset.name;
  shareFullImageBtn.forEach((item, i) => {
    if (fullscreenShareBtn.classList.contains("show")) {
      item.style.display = "block";
      item.style.filter = "invert(1)";
    } else {
      let links = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${fullScreenImage.src}`,
        telegram: `https://t.me/share/url?url=${fullScreenImage.src}`,
        viber: `viber://forward?text=${fullScreenImage.src}`,
        twitter: `https://twitter.com/intent/tweet?url=${fullScreenImage.src}`,
      };
      if (eventName !== undefined) {
        const linkElement = document.createElement("a");
        linkElement.href = links[eventName];
        linkElement.target = "_blank";
        linkElement.click();
      }
      item.style.display = "none";
      item.style.filter = "none";
    }
  });
});


// to send by img/removebg
const send = async (url) => {
  // Данные, которые мы отправляем
  const obj = {
    user_id: "dfgdfg",
    image: url,
  };
  const data = JSON.stringify(obj);
  // Опции запроса
  const options = {
    headers: {
      "Content-Type": "application/json",
      apikey: "test_apikey",
    },
  };
  // Отправляем POST-запрос на сервер
  try {
    const res = await axios.post(
      "http://localhost:3000/img/removebg",
      data,
      options
    );
    link = res.data.image;
    openModal(link);
  } catch (err) {
    console.log(err.message);
  }
};

// global variables on webpage
const doc = document,
  searchBtn = document.querySelector("#search-btn"),
  manualSearchBtn = document.querySelector("#manual-search-btn"),
  modeSelector = document.querySelector("#mode-selector"),
  sendToServer = document.querySelector("#apply-btn"),
  wrapper = document.querySelector(".preview-image");
let toggler = false;
let modeToggle = false;

// manual selection of image by click
function getImageOnClick(event) {
  const clickedElement = event.target,
    url = event.target.src,
    w = event.target.offsetWidth,
    h = event.target.offsetHeight;
  const regex = /^(.*?)url\(["']?(.*?)["']?\)(.*?)$/;
  const link = window
    .getComputedStyle(clickedElement)
    .getPropertyValue("background")
    .match(regex);
  if (!modeToggle) {
    if (link !== null) {
      const clearUrl = link[2];
      result(clearUrl, w, h);
    }
    if (clickedElement.tagName.toLowerCase() === "img") {
      result(url, w, h);
    }
  } else {
    if (link !== null) {
      const clearUrl = link[2];
      let img = new Image();
      img.onload = function () {
        result(clearUrl, this.width, this.height);
      };
      img.src = clearUrl;
    }

    if (clickedElement.tagName.toLowerCase() === "img") {
      let img = new Image();
      img.onload = function () {
        result(url, this.width, this.height);
      };
      img.src = url;
    }
  }
}

// switch between real and client image size
const mode = () => {
  if (!modeToggle) {
    modeSelector.textContent = "";
    modeSelector.textContent = "real size";
    modeSelector.classList.remove("client-size");
    modeSelector.classList.add("real-size");
    modeToggle = !modeToggle;
  } else {
    modeSelector.textContent = "";
    modeSelector.classList.add("client-size");
    modeSelector.textContent = "client size";
    modeSelector.classList.remove("real-size");
    modeToggle = !modeToggle;
  }
};

// to add and remove event listeners by click
const toggle = () => {
  if (!toggler) {
    toggler = !toggler;
    document.body.style.border = "5px solid #9acd31";
    manualSearchBtn.classList.add("active");
    doc.addEventListener("click", getImageOnClick);
    doc.addEventListener("touchstart", getImageOnClick);
  } else {
    document.body.style.border = "none";
    manualSearchBtn.classList.remove("active");
    doc.removeEventListener("click", getImageOnClick);
    doc.removeEventListener("touchstart", getImageOnClick);
    toggler = !toggler;
  }
};

// 
const getImgUrl = () => {
  return new Promise((resolve, reject) => {
    const allImg = document.querySelectorAll("img");
    let arr = new Array();
    if (allImg.length > 0) {
      let loadedCount = 0;
      allImg.forEach((item, i) => {
        let url = item.src;
        let img = new Image();
        img.onload = function () {
          arr.push([url, this.width, this.height]);
          loadedCount++;
          if (loadedCount === allImg.length) {
            resolve(arr);
          }
        };
        img.src = url;
      });
    } else {
      reject("No images found");
    }
  });
};

const getBgUrl = () => {
  return new Promise((resolve, reject) => {
    const elements = document.getElementsByTagName("*");
    let arr = new Array();
    if (elements.length > 0) {
      let loadedCount = 0;
      for (let i = 0; i < elements.length; i++) {
        const styles = window.getComputedStyle(elements[i]);
        if (styles.backgroundImage !== "none") {
          let url = styles.backgroundImage.replace(
            /url\(['"]?(.*?)['"]?\)/i,
            "$1"
          );
          let img = new Image();
          img.onload = function () {
            arr.push([url, this.width, this.height]);
            loadedCount++;
            if (loadedCount === arr.length) {
              resolve(arr);
            }
          };
          img.src = url;
        }
      }
    }
  });
};

const findMaxSize = async (data) => {
  let w = 0;
  let h = 0;
  let maxSize = 0;
  let maxUrl = "";
  for (let i = 0; i < data.length; i++) {
    const [url, width, height] = data[i];
    const size = width * height;
    if (size > maxSize) {
      w = width;
      h = height;
      maxSize = size;
      maxUrl = url;
    }
  }
  result(maxUrl, w, h);
};

const result = (url, w, h) => {
  const imgTag = document.createElement("img"),
    textP = document.createElement("p");

  wrapper.innerHTML = "";
  if (url) {
    imgTag.src = url;
    textP.classList.add("size-info");
    textP.textContent = `${w} x ${h}`;
    wrapper.appendChild(imgTag);
    wrapper.appendChild(textP);
  } else {
    textP.textContent = "not mach results";
    wrapper.appendChild(textP);
  }
};

const search = () => {
  Promise.all([getImgUrl(), getBgUrl()])
    .then((data) => findMaxSize(data.flat()))
    .catch((error) => console.log(error));
};

// sent to server button
const sendData = () => {
  const link = wrapper.childNodes[0].src;
  if (link !== undefined) {
    send(link);
    canvasContainer.style.display = "block";
    videoContainer.style.display = "block";
  }
};

searchBtn.addEventListener("click", search);
manualSearchBtn.addEventListener("click", toggle);
modeSelector.addEventListener("click", mode);
sendToServer.addEventListener("click", sendData);
