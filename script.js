window.addEventListener("load", () => {

    console.log("Page loaded. Checking fluid...");

    // Force constant splats every 2 seconds
    setInterval(() => {
        if (window.splatStack) {
            console.log("Injecting splat");
            window.splatStack.push(15);
        } else {
            console.log("splatStack not found");
        }
    }, 2000);

});
