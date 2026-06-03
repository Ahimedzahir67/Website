function showMessage() {
    alert("Thank you! We will contact you soon.");
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Your message has been sent successfully.");
            form.reset();
        });
    }

    const yearSpan = document.querySelector(".year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const playAudioBtn = document.querySelector("#playAudioBtn");
    if (playAudioBtn) {
        playAudioBtn.addEventListener("click", function () {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) {
                alert("This feature is not supported in your browser.");
                return;
            }
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(440, ctx.currentTime);
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 1.2);
        });
    }

    // Updated array with new product file names (paths for pages/gallery.html)
    const galleryImages = [
        "../images/ebook-guide.png",
        "../images/starter-kit.png"
    ];
    let currentIndex = 0;

    const previewImage = document.querySelector("#previewImage");
    const prevImageBtn = document.querySelector("#prevImageBtn");
    const nextImageBtn = document.querySelector("#nextImageBtn");

    function updatePreview() {
        if (previewImage) {
            previewImage.src = galleryImages[currentIndex];
        }
    }

    if (previewImage && prevImageBtn && nextImageBtn) {
        // Set the first image on page load instead of the old one
        updatePreview();

        prevImageBtn.addEventListener("click", function () {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            updatePreview();
        });

        nextImageBtn.addEventListener("click", function () {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            updatePreview();
        });
    }
});