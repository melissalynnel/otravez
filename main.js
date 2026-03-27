const SIGNUP_ENDPOINT = "https://script.google.com/macros/s/AKfycbwqbfcsavC8-ZZagbqjf46R_HWluOkwY_oQ_y-PIlRWWHacYhhUuiNstVPdQOSUkICM/exec";

const signupForm = document.querySelector("#signup-form");
const signupInput = document.querySelector("#email");
const signupStatus = document.querySelector("#signup-status");

if (signupForm && signupInput && signupStatus) {
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = signupInput.value.trim();
    if (!email) {
      signupStatus.textContent = "Enter your email first.";
      signupStatus.dataset.state = "error";
      return;
    }

    if (!SIGNUP_ENDPOINT) {
      signupStatus.textContent = "Signup endpoint still needs to be connected.";
      signupStatus.dataset.state = "error";
      return;
    }

    signupStatus.textContent = "Submitting...";
    signupStatus.dataset.state = "pending";

    try {
      const response = await fetch(SIGNUP_ENDPOINT, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          email,
          source: "otravez-onceagain.com",
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`);
      }

      signupForm.reset();
      signupStatus.textContent = "Thanks. You're on the list.";
      signupStatus.dataset.state = "success";
    } catch (error) {
      signupStatus.textContent = "That didn't go through. Please try again.";
      signupStatus.dataset.state = "error";
    }
  });
}
