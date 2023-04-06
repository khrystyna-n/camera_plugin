let currentCamera = "user";
let link = "";
const video = document.getElementById("video");
const btnPlay = document.querySelector("#btnPlay");
const btnPause = document.querySelector("#btnPause");
const btnReturn = document.querySelector("#btnReturn");
const switchBtn = document.getElementById("switch-btn");
const btnScreenshot = document.querySelector("#btnScreenshot");
const saveBtn = document.querySelector("#save-btn");
const shareBtn = document.querySelector("#share-btn");
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
const canvasContainer = document.getElementById("canvas-container");
const mainContainer = document.getElementById("main-container");
const videoContainer = document.getElementById("video-container");

const canvas = document.createElement("canvas");
const canvas2 = document.createElement("canvas");
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.right = "0";
canvas.style.bottom = "0";
canvas.style.margin = "auto";

canvas2.style.position = "absolute";

canvasContainer.appendChild(canvas);
document.body.appendChild(canvas2);

canvas.classList.add("canvas");
canvas2.classList.add("canvas2");

// canvasContainer.style.display = "none";
video.style.display = "none";
canvas2.style.display = "none";
btnReturn.style.display = "none";
saveBtn.style.display = "none";
shareBtn.style.display = "none";
fullscreenBtnReturn.style.display = "none";
fullscreenVideo.style.display = "none";

const image = document.createElement("img");


navigator.mediaDevices
  .getUserMedia({ audio: false, video: { facingMode: currentCamera } })
  .then((stream) => {
    video.srcObject = stream;
    video.play();
  })
  .catch((error) => {
    console.error(error);
  });

const ctx = canvas.getContext("2d");
const maskImage = new Image();

// function openModal(url) {

  mainContainer.style.filter = "blur(10px)";
  // Загружаем изображение
  // maskImage.src = url;
  maskImage.src = "images/mixer_kitchen.png";
  maskImage.onload = () => {
    setInterval(() => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        maskImage,
        canvas.width / 2 - 200 / 2,
        canvas.height / 2 - 100 / 2,
        200,
        100
      ); // размер и положение изображения на canvas
    }, 10);
  };
// }

//play
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

btnReturn.addEventListener("click", function () {
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

btnScreenshot.addEventListener("click", () => {
  // Останавливаем видеопоток и скрываем его
  video.pause();
  video.style.display = "none";
  btnPlay.style.display = "none";
  btnPause.style.display = "none";
  switchBtn.style.display = "none";
  fullscreenBtn.style.display = "none";
  btnScreenshot.style.display = "none";
  saveBtn.style.display = "block";
  shareBtn.style.display = "block";
  btnReturn.style.display = "block";
  // Останавливаем отображение видеопотока на canvas
  clearInterval("1000");
  // Отображаем нарисованный видеопоток и изображение на canvas
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(maskImage, 0, 0, canvas.width, canvas.height);
  // Отображаем фото на странице
  const imgData = canvas.toDataURL("image/png");
  image.src = imgData;
  image.style.display = "block";
  // Отправляем фото на сервер
  fetch("/upload", {
    method: "POST",
    body: imgData,
  })
    .then((response) => {
      console.log("Фото успешно отправлено на сервер");
    })
    .catch((error) => {
      console.error("Ошибка отправки фото на сервер", error);
    });
});

// FULLSCREEN

fullscreenBtn.addEventListener("click", () => {
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
  fullscreenVideo.play();
  fullscreenContainer.style.display = "flex";
  document.documentElement.requestFullscreen();
});

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
// "https://e7.pngegg.com/pngimages/289/91/png-clipart-dragon-free-content-funny-dragon-pics-dragon-grass-thumbnail.png";
//play
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

fullscreenBtnReturn.addEventListener("click", function () {
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

const drawImageScaled = () => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight - 40;
  canvas2.style.width = viewportWidth + "px";
  canvas2.style.height = viewportHeight + "px";
  canvas2.width = window.innerWidth;
  canvas2.height = window.innerHeight - 40;
};

const ctx2 = canvas2.getContext("2d");
const maskImage2 = new Image();

function openFullscreen() {
  drawImageScaled();
  // Загружаем изображение
  maskImage2.src = "images/mixer_kitchen.png";
  maskImage2.onload = () => {
    // Отображаем видеопоток на canvas с добавлением изображения
    setInterval(() => {
      ctx2.drawImage(fullscreenVideo, 0, 0, canvas2.width, canvas2.height);
      ctx2.drawImage(
        maskImage2,
        canvas2.width / 2 - 250,
        canvas2.height / 2 - 150,
        500,
        300
      ); // размер и положение изображения на canvas
    }, 10);
  };
}

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

fullscreenBtnScreenshot.addEventListener("click", () => {
  // Останавливаем видеопоток и скрываем его
  fullscreenVideo.pause();
  fullscreenVideo.style.display = "none";
  fullscreenBtnPlay.style.display = "none";
  fullscreenPause.style.display = "none";
  fullscreenSwitchBtn.style.display = "none";
  fullscreenBtnScreenshot.style.display = "none";
  fullscreenSaveBtn.style.display = "block";
  fullscreenShareBtn.style.display = "block";
  fullscreenBtnReturn.style.display = "block";
  // Останавливаем отображение видеопотока на canvas
  clearInterval("1000");
  // Отображаем нарисованный видеопоток и изображение на canvas
  ctx2.drawImage(fullscreenVideo, 0, 0, canvas2.width, canvas2.height);
  ctx2.drawImage(maskImage2, 0, 0, canvas2.width, canvas2.height);
  // Отображаем фото на странице
  const imgData = canvas.toDataURL("image/png");
  image.src = imgData;
  image.style.display = "block";
  // Отправляем фото на сервер
  fetch("/upload", {
    method: "POST",
    body: imgData,
  })
    .then((response) => {
      console.log("Фото успешно отправлено на сервер");
    })
    .catch((error) => {
      console.error("Ошибка отправки фото на сервер", error);
    });
});

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

const doc = document,
  searchBtn = document.querySelector("#search-btn"),
  manualSearchBtn = document.querySelector("#manual-search-btn"),
  modeSelector = document.querySelector("#mode-selector"),
  sendToServer = document.querySelector("#apply-btn"),
  wrapper = document.querySelector(".preview-image");
let toggler = false;
let modeToggle = false;

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
  console.log(
    `The image with the largest size (${maxSize} pixels) is located at ${maxUrl}`
  );
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

const sendData = () => {
  const link = wrapper.childNodes[0].src;
  send(link);
  // canvasContainer.style.display = "block";
};

searchBtn.addEventListener("click", search);
manualSearchBtn.addEventListener("click", toggle);
modeSelector.addEventListener("click", mode);
sendToServer.addEventListener("click", sendData);

const dropdownBtn = document.querySelector(".dropdown-list"),
  iconWrapper = document.querySelector(".icon-wrapper");
dropdownBtn.addEventListener("click", (event) => {
  if (dropdownBtn.dataset.status !== "active") {
    dropdownBtn.dataset.status = "active";
    iconWrapper.style.display = "flex";
  } else {
    dropdownBtn.dataset.status = "hidden";
    iconWrapper.style.display = "none";
  }
});

function addWatermarkToImage(imageUrl, watermarkUrl, positionX, positionY) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const image = new Image();
  const watermark = new Image();
  image.crossOrigin = "anonymous";
  watermark.crossOrigin = "anonymous";

  image.onload = function () {
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);
    
    watermark.onload = function () {
      context.globalAlpha = 0.5;
      context.drawImage(watermark, positionX, positionY);
      const watermarkedImageUrl = canvas.toDataURL("image/jpeg");
      console.log(watermarkedImageUrl);
    };
    watermark.src = watermarkUrl;
  };

  image.src = imageUrl;
}
