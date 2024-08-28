(function() {
    const headings = document.querySelectorAll(".accordion__title");

    headings.forEach((heading) => {
        let btn = heading.querySelector("button");

        heading.addEventListener("click", () => {
            let expanded = btn.getAttribute("aria-expanded") === "true";
            btn.setAttribute("aria-expanded", !expanded);
            // let target = heading.parentNode.querySelector(".accordion__content");
            let target = heading.querySelector(".accordion__content");
            target.hidden = expanded;
        });
    });
})();