// SAFE SPLAT INJECTION SCRIPT
window.addEventListener("load", function () {

    console.log("Page loaded");

    // Wait until fluid engine exposes splatStack
    const waitForFluid = setInterval(function () {

        if (typeof window.splatStack !== "undefined") {

            console.log("Fluid engine detected");

            clearInterval(waitForFluid);

            // Continuous subtle motion
            setInterval(function () {
                window.splatStack.push(8);
            }, 2500);

            // Stronger splat on scroll
            window.addEventListener("scroll", function () {
                window.splatStack.push(12);
            });

        }

    }, 200);

});
