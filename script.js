window.addEventListener("load", () => {

    // Add periodic turbulence
    setInterval(() => {
        if (window.splatStack) {
            window.splatStack.push(5);
        }
    }, 3000);

    // Strong splat on scroll
    window.addEventListener("scroll", () => {
        if (window.splatStack) {
            window.splatStack.push(10);
        }
    });

});
