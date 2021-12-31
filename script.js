const factsList = document.querySelector("#facts_list");
const button = document.querySelector("#btn");
let clickCount = 0;

// Display Popup on page load
window.onload = function () {
  const value = document.cookie.split("=")[1]; // retrieve value from cookie

  setTimeout(function () {
    // If cookie value is true, then hide popup as long as cookie exists
    if (value === "true" && document.cookie !== "") {
      document.querySelector(".popup").remove();
    } else {
      document.querySelector(".popup").style.display = "block";
      document.querySelector(".popup").classList.add("show");
    }
  }, 3000);
};

// Close the modal
document.querySelector("#close-i").addEventListener("click", function () {
  // Hide popup after 1 second
  setTimeout(function () {
    document.querySelector(".popup").classList.add("hide");
  }, 1000);

  clickCount++; // increment count every time user clicks

  if (clickCount >= 2) {
    let date = new Date();
    date.setTime(date.getTime() + 30 * 1000); // expire after 30 seconds
    var expires = "; expires=" + date.toGMTString();

    // add cookie to store value
    document.cookie = "removePopup=true" + expires + "; path=/";
  }
});

// Fetch data from Cats API
const fetchFacts = async () => {
  const facts = [];
  try {
    let res = await fetch("https://cat-fact.herokuapp.com/facts");
    let data = await res.json();
    console.log(data);

    data.map((fact) => {
      facts.push(fact.text);
    });
  } catch (error) {
    console.error(error);
  }

  return facts;
};

// displaying fetched images to the UI
const displayFacts = (data) => {
  for (let i = 0; i < data.length; i++) {
    // creating slide elements
    let fact = document.createElement("li");
    fact.innerHTML = `${data[i]}`;
    fact.classList = "fact_item";
    factsList.appendChild(fact);
  }
};

btn.addEventListener("click", async function () {
  const facts = await fetchFacts();
  displayFacts(facts);
  button.disabled = true;
  button.style.cursor = "default";
});
