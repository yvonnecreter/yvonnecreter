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

document.querySelectorAll('.trigger').forEach(buttonEle => {
    buttonEle.addEventListener("click", (event) => {
        modalEle.classList.remove("hidden");
    });

    closeButtonEle.addEventListener("click", (event) => {
        modalEle.classList.add("hidden");
    });
});