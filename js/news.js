/* Load All Categories API */
const loadAllCatories = async () =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;

    try{
        const res = await fetch(url);
        const categoryData = await res.json();
        displayCategory(categoryData.data.news_category);
    }
    catch(error){
        console.log(error);
    }
}


/* Display All Category */
const displayCategory = categories =>{
    // console.log(categories);
    const categoriesUl = document.getElementById('categories-ul');

    categories.forEach(category =>{
        // console.log(category);
        const categoryLi = document.createElement('li');

        categoryLi.innerHTML = `<button onclick="categoryNewsShow('${category.category_id}', '${category.category_name}')" type="button" class="btn category-btn">${category.category_name}</button>
        `;
        categoriesUl.appendChild(categoryLi);
    })
}


/* Show Categor Wise News */
const categoryNewsShow = async (categoryId, categoryName) =>{
    console.log(categoryId);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    try{
        const res = await fetch(url);
        const newsData = await res.json();
        // console.log(newsData.data);
        displayNews(newsData.data, categoryName)
    }
    catch(error){
        console.log(error);
    }

}

const displayNews = (categoriesNewsData, categoryName) =>{
    console.log(categoriesNewsData);

    const msgDiv = document.getElementById('found-msg-div');
    msgDiv.textContent = '';

    // How Many News Found Message
    if(categoriesNewsData.length > 0){
      const msgTag = document.createElement('h3');
      msgTag.innerText = `${categoriesNewsData.length} News Found From ${categoryName}`;
      msgDiv.appendChild(msgTag);
      const sortDiv = document.getElementById('sort-trending');
      sortDiv.classList.remove('d-none');
    }
    else{
      const msgTag = document.createElement('h3');
      msgTag.innerText = `!!! No News Found ${categoryName}`;
      msgDiv.appendChild(msgTag);
      const sortDiv = document.getElementById('sort-trending');
      sortDiv.classList.add('d-none');
    }

    const cardMainContainer = document.getElementById('card-container');
    cardMainContainer.textContent = '';

    categoriesNewsData.forEach(newsData =>{
        // console.log(newsData);
        const newsCardContainer = document.createElement('div');
        newsCardContainer.classList.add('col');

        newsCardContainer.innerHTML = `
        <div class="card h-100 d-flex flex-row p-2">
            <img src="${newsData.image_url ? newsData.image_url : "No Image Found"}" class="card-img-top w-50 h-75 my-auto" alt="img" />
            <div class="card-body d-flex flex-column align-items-stretch">
              <div>
                <h5 class="card-title card-heading">${newsData.title ? newsData.title : "No Title Found"}</h5>
                <p class="card-text">${newsData.details.slice(0, 210) ? newsData.details.slice(0, 210) : "No News Found"}  <span class="see-more">See More...</span></p>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="author-div">
                  <img class="w-25" src="${newsData.author.img ? newsData.author.img : "No Data"}" alt="Author Image" />
                  <p>${newsData.author.name ? newsData.author.name : "No Data"}</p>
                  <p>${newsData.author.published_date ? newsData.author.published_date.slice(0, 10): "No Data"}</p>
                </div>

                <div>
                <p><i class="fa-solid fa-eye"></i>${newsData.total_view ? newsData.total_view : "No Data"}</p>
                </div>

                <div>
                <p><i class="fa-solid fa-star"></i>${newsData.rating.number ? newsData.rating.number : "No Data"}</p>
                </div>

                <div>
                  <button class="details-btn">Details</button>
                </div>
              </div>
            </div>
          </div>
        `;
        cardMainContainer.appendChild(newsCardContainer);
    })    
}


categoryNewsShow('08', 'All News');

loadAllCatories();