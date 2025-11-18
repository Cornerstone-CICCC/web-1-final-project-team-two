window.addEventListener("DOMContentLoaded", function () {
  const eventTypeBtns = document.querySelectorAll(".event-type-btn");
  eventTypeBtns[0].querySelector("img").style.display = "block";
  eventTypeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      eventTypeBtns.forEach((b) => {
        b.classList.remove("active");
        b.querySelector("img").style.display = "none";
      });
      btn.classList.add("active");
      btn.querySelector("img").style.display = "block";
    });
  });

  document.getElementById("dateNotDecided").addEventListener("change", (e) => {
    document.getElementById("eventDate").disabled = e.target.checked;
  });

  document.getElementById("timeNotDecided").addEventListener("change", (e) => {
    document.getElementById("eventTime").disabled = e.target.checked;
  });

  const contactRadios = document.querySelectorAll('input[name="contact"]');
  const phoneInputGroup = document.querySelector(".phone-input-group");

  const emailInputGroup = document.createElement("div");
  emailInputGroup.className = "email-input-group";
  emailInputGroup.style.display = "none";
  emailInputGroup.innerHTML = `
    <input type="email" id="emailAddress" placeholder="Your email address" />
  `;

  phoneInputGroup.parentNode.insertBefore(
    emailInputGroup,
    phoneInputGroup.nextSibling
  );

  contactRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      if (e.target.value === "email") {
        phoneInputGroup.style.display = "none";
        emailInputGroup.style.display = "block";
      } else {
        phoneInputGroup.style.display = "flex";
        emailInputGroup.style.display = "none";
      }
    });
  });

  emailjs.init("5ga8WShZVxFCaSls9");

  document
    .getElementById("contactForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const selectedEventType = document.querySelector(
        ".event-type-btn.active"
      );
      const eventType = selectedEventType
        ? selectedEventType.getAttribute("data-type")
        : "Not specified";

      const eventDate = document.getElementById("dateNotDecided").checked
        ? "Not decided"
        : document.getElementById("eventDate").value || "Not specified";

      const eventTime = document.getElementById("timeNotDecided").checked
        ? "Not decided"
        : document.getElementById("eventTime").value || "Not specified";

      const name = document.getElementById("name").value;

      const selectedContact = document.querySelector(
        'input[name="contact"]:checked'
      ).value;
      let contactInfo = "";

      if (selectedContact === "email") {
        contactInfo = document.getElementById("emailAddress").value;
      } else {
        const countryCode = document.querySelector(".country-code").value;
        const phoneNumber = document.getElementById("phoneNumber").value;
        contactInfo = `${countryCode} ${phoneNumber}`;
      }

      const templateParams = {
        event_type: eventType,
        event_date: eventDate,
        event_time: eventTime,
        name: name,
        contact_method: selectedContact,
        contact_info: contactInfo,
        message: `New booking request from ${name} for a ${eventType} event.`,
      };

      emailjs
        .send("service_zev6s9w", "template_sdrwudr", templateParams)
        .then((response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert(
            "Your request has been sent successfully! We will contact you soon."
          );
          document.getElementById("contactForm").reset();

          eventTypeBtns.forEach((b) => {
            b.classList.remove("active");
            b.querySelector("img").style.display = "none";
          });
          eventTypeBtns[0].classList.add("active");
          eventTypeBtns[0].querySelector("img").style.display = "block";

          phoneInputGroup.style.display = "flex";
          emailInputGroup.style.display = "none";
        })
        .catch((error) => {
          console.log("FAILED...", error);
          alert(
            "Something went wrong. Please try again or contact us directly."
          );
        });
    });
});
