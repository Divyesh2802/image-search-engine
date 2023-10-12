const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchBtn = document.getElementById('search-btn');
const searchResult = document.getElementById('search-result');
const showMore = document.getElementById('show-more');

const accessKey = "KBvurGd78rrDyhuaOBLNXAT0EEGz-Hf5R6fbUL-gjkA";

let keyword = "";
let page = 1;

async function searchImages() {
  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  if (page === 1) {
    searchResult.innerHTML = '';
  }

  const results = data.results;

  results.map((result) => {
    const image = document.createElement('img');
    image.src = result.urls.small;

    const imageLink = document.createElement('a');
    imageLink.href = result.links.html;
    imageLink.target = "_blank";

    imageLink.appendChild(image);
    searchResult.appendChild(imageLink);
  });

  showMore.style.display = "block";
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (searchBox.value === '') {
    searchResult.innerHTML = "<p>Warning: Please search anything to display images!</p>";
  }
  else {
    page = 1;
    searchImages();
  }
});

searchBtn.addEventListener('click', (e) => {
  if (searchBox.value === '') {
    searchResult.innerHTML = "<p>Warning: Please search anything to display images!</p>";
  }
  else {
    page = 1;
    searchImages();
  }
});

showMore.addEventListener('click', () => {
  page++;
  searchImages();
});
