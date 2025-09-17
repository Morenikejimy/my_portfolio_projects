// This ensures the JavaScript runs only after the whole HTML is loaded. 
// Without this, JS might try to find form elements before they exist in the DOM.
document.addEventListener("DOMContentLoaded", () => {
  
  // Get references to the form and inputs /select element
  const linkForm = document.getElementById("linkForm");       // The whole form
  const linkUrl = document.getElementById("linkUrl");         // URL input
  const linkTitle = document.getElementById("linkTitle");     // Title input
  const linkTags = document.getElementById("linkTags");       // Tags input
  const savedLinksList = document.getElementById("savedLinksList"); // UL for saved links

  // When the form is submitted, run this function
  linkForm.addEventListener("submit", (e) => {
    e.preventDefault(); // stop page reload

    // Collect values from inputs
    const url = linkUrl.value.trim();
    const title = linkTitle.value.trim() || url; // if no title, fallback to URL
    const tags = linkTags.value.trim();

    // Create a new <li> element (a list item) to hold the saved link
    const li = document.createElement("li");

    // Set the inner content of the new <li>
    li.innerHTML = `
      <span class="link-title">${title}</span> - 
      <a href="${url}" target="_blank">${url}</a>
      ${tags ? `<small>(${tags})</small>` : ""}
      <button class="delete-btn">x</button>
    `;

    // Append the new <li> into the list of saved links
    savedLinksList.appendChild(li);

    // Reset the form fields after saving
    linkForm.reset();
  });
});


// AUTHENTIFICATION FEATURES

document.addEventListener("DOMContentLoaded", () => {
  // Select  the DOM elements we'll work with
  const showLogin = document.getElementById("showLogin");   // optional tabs to switch mode
  const showSignup = document.getElementById("showSignup"); // optional tabs to switch mode
  const authEmail = document.getElementById("authEmail");
  const authPassword = document.getElementById("authPassword");
  const authMessage = document.getElementById("authMessage");
  const googleLoginBtn = document.getElementById("googleLoginBtn");

  // The two action buttons that actually submit login/signup
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");

  // Keep track of which UI mode is shown (optional)
  let isLoginMode = true;

  // Update UI depending on mode (shows message and hides the other action button)
  function updateAuthMode() {
    if (!authMessage || !loginBtn || !signupBtn) return;

    if (isLoginMode) {
      authMessage.textContent = "Enter your email & password to login.";
      loginBtn.classList.remove("hidden");
      signupBtn.classList.add("hidden");
    } else {
      authMessage.textContent = "Create a new account.";
      signupBtn.classList.remove("hidden");
      loginBtn.classList.add("hidden");
    }
  }

  // If you have "tabs" or links to toggle the mode, hook them up (optional)
  if (showLogin) {
    showLogin.addEventListener("click", () => {
      isLoginMode = true;
      updateAuthMode();
    });
  }
  if (showSignup) {
    showSignup.addEventListener("click", () => {
      isLoginMode = false;
      updateAuthMode();
    });
  }

  // Handle Login button click
  if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault(); // prevent page reload if inside a form

      const email = authEmail.value.trim();
      const password = authPassword.value.trim();

      if (!email || !password) {
        authMessage.textContent = "⚠️ Please enter email and password.";
        return;
      }

      // === PLACEHOLDER: Replace this with real authentication logic (Firebase / backend API) ===
      authMessage.textContent = `Logged in as ${email}`;
      // Example redirect to user profile — change to your real URL:
      window.location.href = "/profile.html";
    });
  }

  //  Handle Signup button click
  if (signupBtn) {
    signupBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const email = authEmail.value.trim();
      const password = authPassword.value.trim();

      if (!email || !password) {
        authMessage.textContent = "⚠️ Please enter email and password.";
        return;
      }

      authMessage.textContent = `Account created for ${email}`;
      // Example redirect after signup — change to your real URL:
      window.location.href = "/welcome.html";
    });
  }

  // Google login (placeholder)
  if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      authMessage.textContent = "Google login not implemented yet.";
    });
  }

  // Initialize UI when the page loads
  updateAuthMode();
});


// Saved Link Page
const savedLinksList = document.getElementById ("savedLinksList");
//  Add "click" listener to the whole list (event delegation)
savedLinksList .addEventListener ("click", (event) => {
    // Check if the click is a delete button
    if (event.target.classList && event.target.classList.contains("delete-btn")) {
     // event.target means “the exact element that was clicked.” Classlist

    const li = event.target.parentElement; // find the <li> that holds the link
    savedLinksList.removeChild(li); // remove it from the list
    };

});


//   <!-- Search and Filter - Visible only when logged in -->
const searchBar = document.getElementById("searchBar");
const sortBy = document.getElementById ("sortBy");

searchBar.addEventListener ("input", () => {
  // what the user input
  const query = searhBar.value.tolowercase (); 
  // To get all the link inside saved link
  const links = savedLinksList.getElementsByTagName ("li");

  // To loop/ go through all the link
  for (let link of links) {
    // If the link text includes what the user typed → show it
    if (text.includes(query)) {
    link.style.display = ""; // show
    } else {
      link.style.display = "none"; // hide
    }
  }
});

// To sort by Function eg date added
sortBy.addEventListener ("change",() => {
  const option = sortBy.value; // which option user chose
  const links = Array.from(savedLinksList.getElementsByTagName("li"));

  if (option === "titleAsc") {
    links.sort((a, b) =>
      a.querySelector(".link-title").innerText.localeCompare(
        b.querySelector(".link-title").innerText
      )
    );
  } else if (option === "titleDesc") {
    links.sort((a, b) =>
      b.querySelector(".link-title").innerText.localeCompare(
        a.querySelector(".link-title").innerText
      )
    );
  }

  // Clear old list & append sorted ones
  savedLinksList.innerHTML = "";
  links.forEach((li) => savedLinksList.appendChild(li));
} );


// User infomation after login and option to log out
const uploadInput = document.getElementById("uploadProfileImage");
const profileIcon = document.getElementById("profileIcon"); // parent div, not the <i>

uploadInput.addEventListener("change", function () {
  const file = uploadInput.files[0];
  if (file) {
    const reader = new FileReader();
   reader.onload = function (e) {
  profileIcon.innerHTML = `<img src="${e.target.result}" alt="Profile Image" width="100">`;
};
reader.readAsDataURL(file);
  }
});

