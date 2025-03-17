import { loadHeaderFooter, initHamburgerMenu } from "./utilities";

loadHeaderFooter();
initHamburgerMenu();

document.addEventListener("DOMContentLoaded", function () {
    const toggleButtons = document.querySelectorAll(".toggle-btn");

    toggleButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
            btn.classList.toggle("active");

            updateSelectedValues("dayOfWeek", "#selected-days");
            updateSelectedValues("timeOfDay", "#selected-times");
        });
    });

    function updateSelectedValues(type, hiddenInputSelector) {
        const selected = Array.from(document.querySelectorAll(`.toggle-btn.active[data-value]`))
            .filter(btn => btn.closest("fieldset").querySelector(`[name='${type}']`))
            .map(btn => btn.getAttribute("data-value"));

        document.querySelector(hiddenInputSelector).value = selected.join(", ");
    }
});

