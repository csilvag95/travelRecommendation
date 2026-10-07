const url = './travel_recommendation_api.json';
const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
btnSearch.addEventListener('click', showSearchDestination);
btnClear.addEventListener('click', clearSearchDestination);
const searchDestination = document.getElementById('searchDestination');
const main_body = document.getElementById('main-body');
const search_body = document.getElementById('search-body');
const search_result = document.getElementById('search-result');

function showSearchDestination(){
    var result = [];
    main_body.style.display = 'none';
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        if(searchDestination.value.toLowerCase().includes('beach')){
            result = data.beaches;
        } else if(searchDestination.value.toLowerCase().includes('temple')){
            result = data.temples;                
        } else if(searchDestination.value.toLowerCase().includes('countr')){
            data.countries.forEach(element => {
                element.cities.forEach(elem => {
                    result.push(elem);
                });
            });
        }

        if(result.length > 0){
            result.forEach(element => {
                search_result.innerHTML += `<div class="search-card">
                                                <img src="images/${element.imageUrl}">
                                                <h3>${element.name}</h3>
                                                <p>${element.description}</p>
                                            </div>`; 
            });
            search_body.style.display = 'block';
        } else {
            main_body.style.display = 'block';
            alert('No result found');
        }
    });    
}

function clearSearchDestination(){
    searchDestination.value = '';
    search_result.innerHTML = '';
    search_body.style.display = 'none';
    main_body.style.display = 'block';
}

