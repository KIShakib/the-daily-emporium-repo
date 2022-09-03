/* Load All Categories API */
const loadAllCatories = async () =>{
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/categories`;

    try{
        const res = await fetch(url);
        const categoryData = await res.json();
        displayCategory(categoryData.data.news_category);
    }
    catch(error){
        console.log(error);
    }
    // toggleSpinner(false);
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
    // console.log(categoryId);
    toggleSpinner(true);
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
    // console.log(categoriesNewsData);

    const msgDiv = document.getElementById('found-msg-div');
    msgDiv.textContent = '';

    // How Many News Found Message
    if(categoriesNewsData.length > 0){
      const msgTag = document.createElement('h5');
      msgTag.innerText = `${categoriesNewsData.length} News Found From ${categoryName}`;
      msgDiv.appendChild(msgTag);
      const sortDiv = document.getElementById('sort-trending');
      sortDiv.classList.remove('d-none');
    }
    else{
      const msgTag = document.createElement('h5');
      msgTag.innerText = `!!! No News Found From ${categoryName}`;
      msgDiv.appendChild(msgTag);
      const sortDiv = document.getElementById('sort-trending');
      sortDiv.classList.add('d-none');
    }

    const cardMainContainer = document.getElementById('card-container');
    cardMainContainer.textContent = '';

    categoriesNewsData.sort((news1, news2) =>(news2.total_view - news1.total_view)).forEach(newsData =>{
        // console.log(newsData._id);
        const newsCardContainer = document.createElement('div');
        newsCardContainer.classList.add('col');

        newsCardContainer.innerHTML = `
        <div class="card h-100 d-flex flex-lg-row flex-md-column flex-sm-column p-2">
        <img src="${newsData.image_url ? newsData.image_url : "No Image Found"}"
        class="card-img-top w-50 h-75 my-auto mx-auto" alt="img" />
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 class="card-title card-heading">${newsData.title ? newsData.title : "No Title Found"}</h5>
            <p class="card-text">${newsData.details.slice(0, 210) ? newsData.details.slice(0, 210) :"No News Found"} <span class="see-more">See More...</span>
            </p>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="author-div">
              <img class="w-25" src="${newsData.author.img ? newsData.author.img :"No Data"}" alt="Author Image" />
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
              <button type="button"onclick="showModal('${newsData._id}')" class="details-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
        `;
        cardMainContainer.appendChild(newsCardContainer);
      })    
      toggleSpinner(false);
}


/* Show Modal With Details Information */
    const showModal = async newsCardId =>{
      // console.log(newsCardId);
      const url = `https://openapi.programming-hero.com/api/news/${newsCardId}`;

      try{
        const res = await fetch(url);
        const newsDetails = await res.json();
        // console.log(newsDetails);
        displayModal(newsDetails.data[0])
      }
      catch(error){
        console.log(error);
      }
}


const displayModal = modalDetails =>{
  console.log(modalDetails);
  const modalMainDiv = document.getElementById('modal-main');
  modalMainDiv.textContent = '';
  const modalContentCard = document.createElement('div');
  modalContentCard.classList.add('modal-content');

  modalContentCard.innerHTML = `
      <div class="modal-header d-flex flex-column align-items-center">
        <div class="d-flex flex-row modal-top">
          <h5 class="modal-title text-center" id="exampleModalLabel">${modalDetails.title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div>
        <img class="h-50" src="${modalDetails.thumbnail_url}" alt="">
        </div>
      </div>

      <div class="modal-body">
      <p>${modalDetails.details}</p>
        <div class="d-flex gap-5 justify-content-evenly">
          <p><i class="fa-solid fa-eye"></i>${modalDetails.total_view ? modalDetails.total_view : "No Data"}</p>
          <p><i class="fa-solid fa-star"></i>${modalDetails.rating.number ? modalDetails.rating.number : "No Data"}</p>
          <p>${modalDetails.rating.number ? modalDetails.rating.badge : "No Data"}</p>
        </div>

        <div class="modal-author-div d-flex gap-5 justify-content-evenly align-items-center">
          <img class="author-img rounded-5" src="${modalDetails.author.img?modalDetails.author.img: "No Data"}" alt="">
          <h5>Author: ${modalDetails.author.name?modalDetails.author.name: "No Data"}</h5>
          <h5>Date: ${modalDetails.published_date?modalDetails.published_date.slice(0, 10): "No Data"}</h5>
        </div>
      </div>

      <div class="modal-footer modal-btn">
        <button type="button" class="btn" data-bs-dismiss="modal">Close</button>
      </div>
  `;
  modalMainDiv.appendChild(modalContentCard);
}




/* Spinner */
const toggleSpinner = isLoading => {
  const spinnerContainer = document.getElementById('spinner-div');
  if(isLoading){
      spinnerContainer.classList.remove('d-none');
  }
  else{
      spinnerContainer.classList.add('d-none');
  }
}





categoryNewsShow('08', 'All News');

loadAllCatories();