// const buttonEle = document.getElementById("trigger")
// const closeButtonEle = document.getElementById("close")
// const modalEle = document.getElementById("popup")

// buttonEle.addEventListener("click", (event) => {
//     modalEle.classList.toggle("hidden")
// })
// closeButtonEle.addEventListener("click", (event) => {
//     modalEle.classList.toggle("hidden")
// })

const closeButtonEle = document.getElementById("close")
const modalEle = document.getElementById("popup")
const contentAnchor = document.getElementById("popup-content")

document.querySelectorAll('.trigger').forEach(buttonEle => {
    buttonEle.addEventListener("click", (event) => {
        modalEle.classList.remove("hidden");

        Array.from(buttonEle.children).forEach(child => {
            const clone = child.cloneNode(true);
            if (clone.classList.contains('video-container')) {
                clone.querySelector('.my-video').play();
            }
            contentAnchor.appendChild(clone);
        });
    });

    closeButtonEle.addEventListener("click", (event) => {
        modalEle.classList.add("hidden");
        Array.from(contentAnchor.children).forEach(child => {
            child.remove();
        });
    });
});

const videoContainers = document.querySelectorAll('.video-container');

videoContainers.forEach((container) => {
    const video = container.querySelector('.my-video');
    container.addEventListener('mouseover', () => {
        video.play();
    });
    container.addEventListener('mouseout', () => {
        video.pause();
    });
});