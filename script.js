const apiKey = '622156bfd0634d048c13e5aa0e8a9307';
const pageSize = 10;
let currentPage = 1;

document.getElementById('searchBtn').addEventListener('click', () => {
    currentPage = 1;
    fetchNews();
});

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchNews();
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    currentPage++;
    fetchNews();
});

async function fetchNews() {
    const query = document.getElementById('searchInput').value;
    const country = document.getElementById('countrySelect').value;
    const category = document.getElementById('categorySelect').value;
    const url = `https://newsapi.org/v2/top-headlines?q=${query}&country=${country}&category=${category}&pageSize=${pageSize}&page=${currentPage}&apiKey=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
        document.getElementById('newsContainer').innerHTML = '<p>Loading news... Please try again later.</p>';
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = '';
    
    if (articles.length === 0) {
        newsContainer.innerHTML = '<p>No news found.</p>';
        return;
    }
    
    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('news-item');
        newsItem.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description || 'No description available.'}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(newsItem);
    });
}


fetchNews();