let newsCategories = document.querySelectorAll('.news-category-container ul li');

document.addEventListener('DOMContentLoaded', async () => {
    let hash = window.location.hash;

    window.location.assign((hash || "#general"))
    console.log(hash);
    let news = await getNews((hash.replace("#","") || 'general'));
    console.log(news);
    setNewsToUI(news);
});

newsCategories.forEach((category) => {
    category.addEventListener('click', async (e) => {
        let category = e.target.innerText;
        let news = await getNews(category); 

        console.log(news);

        setNewsToUI(news);
    });
});

async function getNews(category) {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=0ae3e4fe6f594845b7b7ce2cb410045f`;

    let response = await fetch(url);

    let data = await response.json();

    return data;
}

function setNewsToUI(news) {
    let newsContainer = document.querySelector('.news-container');

    let newsHTML = '';

    news.articles.forEach((article) => {
        newsHTML += `
            <div class="news">
                <div class="news-title">
                        ${article.title}
                </div>`;
        if (article.urlToImage) {
            newsHTML += `<div class="news-theme-img">
                            <img src="${article.urlToImage}" alt="news-image">
                        </div>`;
        } else {
            newsHTML += `<div class="news-theme-img default">
                            <img src="./img/news-icon.jpg" alt="news-image">
                        </div>`;
        }

        if (article.description) {
            newsHTML += `<div class="news-desc">
                                ${article.description}
                            </div>`;
        } else {
            newsHTML += `<div class="news-desc">
                                No Description Available
                            </div>`;

        }

        newsHTML += `<div class="news-source">
                    <button><a href="${article.url}">Go to Source</a></button>
                </div>
            </div>
        `;
    });

    newsContainer.innerHTML = newsHTML;
}