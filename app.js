// Wait until full load to avoid timing issues
window.addEventListener("load", () => {

    // Force random turbulence periodically
    setInterval(() => {
        if (window.splatStack) {
            window.splatStack.push(5);
        }
    }, 3000);

    // Stronger splats on scroll
    window.addEventListener("scroll", () => {
        if (window.splatStack) {
            window.splatStack.push(10);
        }
    });

});
