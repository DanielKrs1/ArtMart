const nameHolder = document.querySelector('#art-name');
const categoryHolder = document.querySelector("#category");
document.querySelector('#save-art').addEventListener("click", () => {
    const name = nameHolder.value;
    if (!name) {
        alert("Please choose a name!");
        return;
    }

    const category = categoryHolder.value;
    if (!category) {
        return alert("Please choose a category!");
    }

    fetch("/api/art", {
        body: JSON.stringify({
            name,
            category: parseInt(category),
            data: getArtDataString()
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    }).then(() => {
        location = "/app/gallery"
    })
});

