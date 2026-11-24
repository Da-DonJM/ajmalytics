
/* =====================================================
   AJMALYTICS ORGANIZATION
   GLOBAL WEBSITE JAVASCRIPT
   Version: 1.0
   ===================================================== */


/* =====================================================
   1. MOBILE NAVIGATION
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");

    if (navToggle && navMenu) {

        // Open and close mobile navigation
        navToggle.addEventListener("click", function () {

            const isOpen = navMenu.classList.toggle("active");

            navToggle.setAttribute("aria-expanded", isOpen);
            navToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

            navToggle.textContent = isOpen ? "✕" : "☰";

        });


        // Close menu when a navigation link is clicked
        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("active");

                navToggle.setAttribute("aria-expanded", "false");
                navToggle.setAttribute("aria-label", "Open navigation menu");

                navToggle.textContent = "☰";

            });

        });


        // Close menu when clicking outside
        document.addEventListener("click", function (event) {

            if (
                !navMenu.contains(event.target) &&
                !navToggle.contains(event.target)
            ) {

                navMenu.classList.remove("active");

                navToggle.setAttribute("aria-expanded", "false");
                navToggle.setAttribute("aria-label", "Open navigation menu");

                navToggle.textContent = "☰";

            }

        });


        // Close menu using Escape key
        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                navMenu.classList.remove("active");

                navToggle.setAttribute("aria-expanded", "false");
                navToggle.setAttribute("aria-label", "Open navigation menu");

                navToggle.textContent = "☰";

            }

        });

    }



    /* =================================================
       2. ACTIVE NAVIGATION LINKS
    ================================================= */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const allNavLinks = document.querySelectorAll(
        ".nav-menu a[href^='#']"
    );

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        const currentId = entry.target.id;

                        allNavLinks.forEach(function (link) {

                            link.classList.remove("active");

                            if (
                                link.getAttribute("href") ===
                                "#" + currentId
                            ) {

                                link.classList.add("active");

                            }

                        });

                    }

                });

            },

            {
                rootMargin: "-25% 0px -65% 0px",
                threshold: 0
            }

        );

        sections.forEach(function (section) {

            sectionObserver.observe(section);

        });

    }



    /* =================================================
       3. AUTOMATIC COPYRIGHT YEAR
    ================================================= */

    const yearElement = document.getElementById("currentYear");

    if (yearElement) {

        yearElement.textContent = new Date().getFullYear();

    }



    /* =================================================
       4. SELECT ALL BOOTCAMP MODULES
    ================================================= */

    const selectAll = document.getElementById(
        "selectAllModules"
    );

    const moduleCheckboxes = document.querySelectorAll(
        'input[name="modules"]'
    );


    // Select or deselect every module
    if (selectAll) {

        selectAll.addEventListener("change", function () {

            moduleCheckboxes.forEach(function (checkbox) {

                checkbox.checked = selectAll.checked;

            });

        });

    }


    // Keep Select All synchronized with individual checkboxes
    moduleCheckboxes.forEach(function (checkbox) {

        checkbox.addEventListener("change", function () {

            if (selectAll) {

                const totalModules = moduleCheckboxes.length;

                const selectedModules = document.querySelectorAll(
                    'input[name="modules"]:checked'
                ).length;

                selectAll.checked =
                    selectedModules === totalModules;

                selectAll.indeterminate =
                    selectedModules > 0 &&
                    selectedModules < totalModules;

            }

        });

    });



    /* =================================================
       5. WHATSAPP REGISTRATION FORM
    ================================================= */

    const registrationForm = document.getElementById(
        "registrationForm"
    );


    // AJMALYTICS registration receiving number
    const whatsappNumber = "254798009838";


    if (registrationForm) {

        registrationForm.addEventListener("submit", function (event) {

            event.preventDefault();


            // Collect registration details
            const fullName = document.getElementById(
                "fullName"
            ).value.trim();

            const phone = document.getElementById(
                "phone"
            ).value.trim();

            const email = document.getElementById(
                "email"
            ).value.trim();


            // Collect selected bootcamp modules
            const selectedModules = Array.from(
                document.querySelectorAll(
                    'input[name="modules"]:checked'
                )
            ).map(function (checkbox) {

                return checkbox.value;

            });


            // Validate name
            if (!fullName) {

                alert("Please enter your full name.");

                document.getElementById("fullName").focus();

                return;

            }


            // Validate phone number
            const phonePattern = /^[+]?[0-9\s()-]{9,16}$/;

            if (!phonePattern.test(phone)) {

                alert("Please enter a valid phone number.");

                document.getElementById("phone").focus();

                return;

            }


            // Validate email
            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                alert("Please enter a valid email address.");

                document.getElementById("email").focus();

                return;

            }


            // Require at least one module
            if (selectedModules.length === 0) {

                alert(
                    "Please select at least one bootcamp module."
                );

                document.getElementById("selectAllModules").focus();

                return;

            }



            /* =============================================
               6. GENERATE WHATSAPP MESSAGE
            ============================================= */

            const message =

`AJMALYTICS ORGANIZATION
BOOTCAMP REGISTRATION

Hello AJMALYTICS Team,

I would like to register for your training programme.

REGISTRATION DETAILS

Full Name: ${fullName}

Phone Number: ${phone}

Email Address: ${email}

SELECTED BOOTCAMP MODULES

${selectedModules.map(function (module, index) {
    return (index + 1) + ". " + module;
}).join("\n")}

Please share more information about the selected training modules and registration process.

Thank you.
${fullName}`;


            // Encode message for WhatsApp
            const encodedMessage = encodeURIComponent(message);

            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodedMessage;


            // Open WhatsApp in a new tab
            const whatsappWindow = window.open(
                whatsappURL,
                "_blank"
            );


            // Fallback if the browser blocks the popup
            if (!whatsappWindow) {

                window.location.href = whatsappURL;

            }

        });

    }



    /* =================================================
       7. GENERAL FORM FEEDBACK
    ================================================= */

    const formInputs = document.querySelectorAll(
        ".form-control"
    );

    formInputs.forEach(function (input) {

        input.addEventListener("input", function () {

            if (input.checkValidity()) {

                input.style.borderColor = "";

            }

        });

    });


    /* =================================================
       8. INITIALIZE WEBSITE
    ================================================= */

    console.log(
        "AJMALYTICS website initialized successfully."
    );

});
