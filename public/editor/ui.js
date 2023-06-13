const nameHolder = document.querySelector('#art-name');

document.querySelector('#save-art').addEventListener("click", () => {
    if (!nameHolder.value) {
        alert("Please choose a name!");
        return;
    }

    const name = nameHolder.value;
});

