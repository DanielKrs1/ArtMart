const drawArt = (art, canvas) => {
    const ctx = canvas.getContext('2d');
    ctx.save();
    ctx.scale(16 / canvas.width, 16 / canvas.height);

    for (let i = 0; i < COLORS.length; ++i) {
        ctx.fillStyle = COLORS[i];
        for (let j = 0; j < art.length; ++j) {
            if (i === parseInt(art[j], 36)) {

                ctx.fillRect(j % 16, Math.floor(j / 16), 1, 1);
            }
        }
    }

    ctx.restore();
}