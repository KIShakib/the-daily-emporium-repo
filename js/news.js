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
    const categorisUl = document.getElementById('categories-ul');

    categories.forEach(category =>{
        // console.log(category);
        const categoryLi = document.createElement('li');

        categoryLi.innerHTML = `<button onclick="categoryNewsShow('${category.category_id}')" type="button" class="btn category-btn">${category.category_name}</button>
        `;
        categorisUl.appendChild(categoryLi);
    })
}


/* Show Categor Wise News */
const categoryNewsShow = async (categoryId) =>{
    // console.log(categoryId);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    try{
        const res = await fetch(url);
        const newsData = await res.json();
        console.log(newsData.data);
    }
    catch(error){
        console.log(error);
    }

}

const displayNews = categoriesNewsData =>{
    console.log(categoriesNewsData);
}



loadAllCatories();