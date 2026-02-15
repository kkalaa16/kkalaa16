window.addEventListener("load", () => {

    const canvas = document.getElementById("fluid-canvas");

    const fluid = new WebGLFluid(canvas, {
        SIM_RESOLUTION: 128,
        DYE_RESOLUTION: 1024,
        DENSITY_DISSIPATION: 0.98,
        VELOCITY_DISSIPATION: 0.99,
        PRESSURE: 0.8,
        CURL: 25,
        SPLAT_RADIUS: 0.2,
        SPLAT_FORCE: 6000,
        SHADING: true,
        COLORFUL: false,
        BACK_COLOR: { r: 0, g: 0, b: 0 },
        TRANSPARENT: true
    });

    // Continuous subtle splats
    setInterval(() => {
        const x = Math.random();
        const y = Math.random();
        const dx = (Math.random() - 0.5) * 20;
        const dy = (Math.random() - 0.5) * 20;

        fluid.splat(x, y, dx, dy, { r: 1, g: 0.3, b: 0 });
    }, 2500);

    // Stronger splats on scroll
    window.addEventListener("scroll", () => {
        fluid.splat(
            Math.random(),
            0.5,
            (Math.random() - 0.5) * 100,
            200,
            { r: 1, g: 0.2, b: 0 }
        );
    });

});
