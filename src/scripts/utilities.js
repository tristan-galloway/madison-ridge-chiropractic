export function loadHeaderFooter() {
    const header = document.getElementById('header-section');
    const footer = document.getElementById('footer-section');
    const year = getYear();

    header.innerHTML = `
        <a id="logo" href=""><img src="/images/madison-ridge-chiropractic.png" alt="Logo"></a>
        <button class="hamburger" aria-label="Toggle Menu">
            &#9776;
        </button>
        <nav>
            <ul>
                <li class="active"><a href="/">Home</a></li>
                <li><a href="/review_us/">Review Us</a></li>
                <li><a href="/contact/">Contact</a></li>
                <li><a href="/schedule/">Schedule</a></li>
            </ul>
        </nav>
    `;

    footer.innerHTML = `
        <section class="business-info">
            <h4>Contact</h4>
            <p>Madison Ridge Chiropractic &copy; ${year}</p>
            <a href="https://maps.app.goo.gl/ujfzJB1CZYS4EbCu9" target="_blank">1096 Erikson Drive Rexburg, ID 83440</a>
            <p>Phone: (208) 656-3205</p>
        </section>
        <section class="social-media">
            <a href="https://www.facebook.com/madisonridgechiro/" target="_blank"><img src="/images/gray-facebook-icon.svg" alt="Facebook Icon"></a>
            <a href="https://x.com/Madison_Ridge" target="_blank"><img src="/images/gray-twitter-icon.svg" alt="Twitter Icon"></a>
        </section>
        <section class="hours">
            <h4>Hours</h4>
            <p>Monday-Friday: 8:00am-5:00pm</p>
            <p>Saturday: By Appointment</p>
            <p>Sunday: Closed</p>
        </section>
    `;

    // Call function after header loads
    setActiveNav();
}

function setActiveNav() {
    const currentPath = window.location.pathname.replace(/\/$/, ""); // Remove trailing slash
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href").replace(/\/$/, ""); // Remove trailing slash from href

        if (linkPath === currentPath) {
            link.parentElement.classList.add("active");
        } else {
            link.parentElement.classList.remove("active");
        }
    });
}

export function initHamburgerMenu() {
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector("nav");
    
    console.log("Hamburger button Init")

    if (hamburger && nav) {
        hamburger.addEventListener("click", () => {
            nav.classList.toggle("open");
            console.log("Hamburger button pressed")
        });
    }
}

function getYear() {
    return new Date().getFullYear();
}

// Function to load a JSON file from a given path
export async function loadJSON(path) {
    try {
      const response = await fetch(path);
      if (!response.ok) throw new Error(`Failed to load ${path}: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error('Error loading JSON:', error);
      return null;
    }
  }