Core Features of the Link Saver App
1. User Authentication

Sign up / Log in (via email & password, Google, GitHub, etc.)

Guest mode (optional, but saves only locally)

2. Save Links

Add a link with:

Title (auto-fetch title from the website if possible)

URL

Tags (e.g., "work," "learning," "recipe")

Notes/Description (optional)

Smart validation (e.g., check if it’s a real URL)

EXPLANATIONS OF SOME TERMS

.parentElement

HTML elements are like a family tree.
Example:

<li>
  <span>OpenAI</span>
  <button class="delete-btn">x</button>
</li>


Here:

The <button> is the child.

The <li> is the parent.

So event.target.parentElement means:
👉 “Go one level up from the button and find the <li> that contains it.”

🟢 4. removeChild()

The <ol> (ordered list) has many <li> children.

To remove one, we use:

savedLinksList.removeChild(li);





3. Organize Links

Categories/Tags for sorting (e.g., "Work," "Personal," "Read Later")

Favorites (star/heart important links)

Collections (like folders, e.g., "Frontend Dev," "Recipes," etc.)

4. Search & Filter

Full-text search (title, tags, description)

Filter by tags, date added, or collection

Sort by newest, oldest, alphabetical

5. Display Links

Grid view (cards with favicon, title, description, and preview)

List view (compact version with text only)

6. Share & Export

Share a link or collection with others

Export saved links (CSV, JSON, or even Markdown list)




🔎 Rule of Thumb for Beginners

When deciding which elements to pick in JS:

✅ Pick elements that the user interacts with → input, button, select, checkbox, etc.

✅ Pick elements that you need to change dynamically → lists (<ul>/<ol>), sections, cards.

❌ Don’t pick “layout-only” containers (like <div class="search-flex">) unless you really need to show/hide the whole container.


WHAT DETERMINES WHICH ELEMENT TO USE ADDEVENTLISTNER
Think of it like.

👉 “Whose behavior am I watching?”
👉 “When the user does something, which element should notify me?”

🔹 Common cases

1. Inputs (like searchBar)

searchBar.addEventListener("input", () => {
  console.log("User is typing…");
});


We listen to input because we care about what the user types.

2. Select / Dropdown (like sortBy)

sortBy.addEventListener("change", () => {
  console.log("User picked a new sort option");
});


We listen to change because we care about which option is selected.

3. Buttons

deleteBtn.addEventListener("click", () => {
  console.log("User clicked delete");
});


We listen to click because that’s how the user triggers an action.

4. Forms

form.addEventListener("submit", (e) => {
  e.preventDefault(); // stop page refresh
  console.log("Form submitted");
});


We listen to submit because we care when the whole form is sent.

5. Lists / Containers (event delegation)
Sometimes, instead of attaching listeners to every single child, we attach one to the parent and use event.target inside:

 savedLinksList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    console.log("User clicked a delete button inside the list");
  }
});


Here we chose the container <ol> because new <li> and <button> elements will be added dynamically.

This way, one listener can handle them all.

🔎 Golden Rule

We use addEventListener on the element that:

The user interacts with directly (typing, clicking, selecting).

OR contains elements that we want to watch indirectly (like a list or table for delegation).

👉 So:

1. searchBar → user types → listen for input.

2. sortBy → user changes option → listen for change.

3. savedLinksList → user clicks inside it → listen for click.

4. We didn’t add it to search-flex because it’s just a styling container, not an interactive element.

<!--  -->
1. Queryselector : Finds the first element in your HTML that matches a CSS selector. eg
<span class="link-title">YouTube</span>
<span class="link-title">FreeCodeCamp</span>
querySelector(".link-title") → gets YouTube only (the first one).

2. document.getElementsByTagName()

What it does: Finds all elements with a specific HTML tag (like li, p, div).

Example:

const items = document.getElementsByTagName("li");

3..innerText

What it does: Gets (or sets) the text inside an element (ignores HTML tags).

4. .localeCompare()

What it does: Compares two strings (words) in “alphabetical order” style.

Why we use it: When sorting links by title A–Z or Z–A.

Example:

const result = "Apple".localeCompare("Banana");
console.log(result); // -1 (Apple comes before Banana)