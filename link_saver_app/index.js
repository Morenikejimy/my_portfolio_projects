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


// Authentification Feature
document.addEventListener ("DOMContentLoaded", () => {
// select elements
const showLogin = document.getElementById("showLogin");
const showSignup = document.getElementById ("showSignup");
const authEmail = document.getElementById("authEmail");
const authPassword = document.getElementById("authPassword");
const emailAuthBtn = document.getElementById ("emailAuthBtn");   
const authMessage = document.getElementById("authMessage");
const googleLoginBtn = document.getElementById("googleLoginBtn");
});

// Track mode
  let isLoginMode = true;
 // Function to update UI based on mode

 function updateAuthMode () {
    if (isLoginMode) {
       emailAuthBtn.textcontent = "Login";
        authMessage.textcontent = "Enter your email & password to login.";
    } else {
      emailAuthBtn.textContent = "Sign Up";
      authMessage.textContent = "Create a new account.";
    }
 }

//  Toggle Button
showLogin.addEventListener("click", () => {
    isLoginMode = true;
    updateAuthMode();
  });

  showSignup.addEventListener("click", () => {
    isLoginMode = false;
    updateAuthMode();
  });

//  Handle form submission
emailAuthBtn.addEventListener ("click", (e) => {
    e.preventDefault();
    const email = authEmail.value .trim ();
    const password = authPassword.value .trim();

    if (!email || !password) {
        authMessage.textContent = "⚠️ Please enter email and password.";
        return;
    }

    // Fake login/signup logic 
    if (isLoginMode) {
      authMessage.textContent = "Logged in as ${email}";
    } else {
      authMessage.textContent = "Account created for ${email}";
    }

    // Clear inputs
    authEmail.value = "";
    authPassword.value = "";
  });

//   Google login button/ placeholder
googleLoginBtn.addEventListener ("click", (e) => {
    authMessage.textContent = "Google login not implemented yet."

    // Initialise UI
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

