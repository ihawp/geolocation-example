// API Key for harvard art museum
const apiKey = "7cad05e6-2d24-47b5-b848-2726dc6b19e9";

// Grabbing elements from the page
const display = document.getElementById("artworks");
const loading = document.getElementById("loading");
const searchInput = document.getElementById("search");

// Array containing and tracking art objects on the page
let pageObjects = [];

// Function that gets and parses json data from the harvard art museum API
async function getData(search) {
  loading.style.display = "block";
  let page = 1;
  pageObjects = [];
  display.innerHTML = "<h2>Harvard Art Museum</h2>";

  // While loop that will continue until the page has at least 10 art objects
  // with images.
  while (pageObjects.length < 10) {
    let url = `https://api.harvardartmuseums.org/object?hasImage=1&apikey=${apiKey}&page=${page}&keyword=${search}&size=100`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const artRecords = (await response.json()).records;
      artRecords.forEach((artwork) => {
        if (
          artwork.primaryimageurl &&
          !pageObjects.includes(artwork) &&
          pageObjects.length < 10
        ) {
          pageObjects.push(artwork);

          let article = document.createElement('article');
          article.classList.add('item');

          let img = document.createElement('img');
          img.classList.add('item-image');
          img.src = `${artwork.primaryimageurl}`;
          img.alt = `${artwork.division}`;
          article.appendChild(img);

          let desc = document.createElement('div');
          desc.classList.add('item-description');

          let title = document.createElement('h3');
          title.innerHTML = `${artwork.title.replace(/[\[\]]/g, "")}`;
          desc.appendChild(title);

          let artist = document.createElement('p');
          artist.innerHTML = `Artist/Related Person: ${artwork.people ? artwork.people[0].displayname
                                                                      : "No people listed"
          }`;
          desc.appendChild(artist);

          let classification = document.createElement('p');
          classification.innerHTML = `Classification: ${artwork.classigication}`;
          desc.appendChild(classification);

          let technique = document.createElement('p');
          technique.innerHTML = `Technique: ${artwork.technique ? artwork.technique
                                                                : "Not recorded"
          }`;
          desc.appendChild(technique);

          let link = document.createElement('a');
          link.href = `${artwork.url}`;
          link.innerHTML = 'Link to Page';
          desc.appendChild(link);

          article.appendChild(desc);

          img.addEventListener('load', function() {
            display.appendChild(article);
          })
        }
      });
    } catch (error) {
      console.error(error.message);
    }
    page++;
  }
  loading.style.display = "none";
}

// Searches as the user types on the search bar
searchInput.addEventListener("keyup", function (event) {
  getData(searchInput.value);
});

// Initial Search
getData("");

/* 

0: {
    title: "APIs",
    content: {
        0: {
            title: "What is an API?",
            content: ["Application Programming Interface", "Allows easy communication between applications", "Many uses, but we will go over only a couple of them"]
        }
    },
    image: "confused.jpg",
    video: ""
},

1: {
    title: "API Fetch",
    content: {
        0: {
            title: "What is Fetch?",
            content: ["Retrieve data using API", "Returns data in JSON format", "An easy way to access information from an API"]
        }
    },
    image: "json.jpg",
    video: ""
},

2: {
    title: "API Fetch",
    content: {
        0: {
            title: "Public APIs to use",
            content: ["https://github.com/public-apis/public-apis", "Detailed documentation and how to use instructions", "API Keys", "HTTPS and CORS", "JSON Formatter Extention"]
        }
    },
    image: "server.jpg",
    video: ""
},

3: {
    title: "API Fetch",
    content: {
        0: {
            title: "Code Along and Demo!",
            content: ["https://api.nasa.gov/EPIC/archive/natural/2019/05/30/png/epic_1b_20190530011359.png?api_key=DEMO_KEY", "Feel free to follow allong or just watch", "Using API Fetch to grab an image of the earth"]
        }
    },
    image: "earth.png",
    video: ""
},


*/
