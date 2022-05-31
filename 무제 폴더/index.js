const myRequest = new Request('product.json')
let counter = 4;

fetch(myRequest).then(response => response.json()).then(function(json) {
    let products = json;
    initialize(products);
})
    .catch(console.error);

function initialize(products) {
    const category = document.getElementById('category')
    const searchTerm = document.getElementById('search');
    const searchBtn = document.getElementById('searchButton');
    const main = document.querySelector('main');

    let lastCategory = category.value;
    let lastSearch = '';

    let categoryGroup;
    let finalGroup;

    finalGroup = products;
    updateDisplay();

    categoryGroup = [];
    finalGroup = [];

    searchBtn.onclick = selectCategory;

    function selectCategory(e) {
        e.preventDefault();

        categoryGroup = [];
        finalGroup = [];

        if(category.value === lastCategory && searchTerm.value.trim() === lastSearch) {
            return;
        } else {
            lastCategory = category.value;
            lastSearch = searchTerm.value.trim();

            if(category.value === 'All Products') {
                categoryGroup = products;
                selectProducts();
            } else {
                let lowerCaseType = category.value.toLowerCase();
                for(let i = 0; i < products.length; i++){
                    if(products[i].type === lowerCaseType) {
                        categoryGroup.push(products[i]);
                    }
                }

                selectProducts();
            }
        }
    }

    function selectProducts() {
        if(searchTerm.value.trim() === '') {
            finalGroup = categoryGroup;
            updateDisplay();
        } else {
            let lowerCaseSearchTerm = searchTerm.value.trim().toLowerCase();
    
            for(let i = 0; i < categoryGroup.length; i++) {
                if(categoryGroup[i].name.toLowerCase().includes(lowerCaseSearchTerm)) {
                    finalGroup.push(categoryGroup[i]);
                }
            }
    
            updateDisplay();
        }
    }
    
    function updateDisplay() {
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }
    
        if(finalGroup.length === 0) {
            const para = document.createElement('p');
            para.textContent = 'No results to display!';
            main.appendChild(para);
        } else {
            for(let i = 0; i < 4; i++) {
                fetchImg(finalGroup[i], i);
            }
        }
    }
    
    function fetchImg(product, i) {
        let url = './img/' + product.image;
        showProduct(url, product, i);
    }
    
    function showProduct(objURL, product, i) {
        const section = document.createElement('div');
        const container = document.createElement('div');
        const img = document.createElement('img');
        const info = document.createElement('p');
        const price = document.createElement('p');


        section.setAttribute('class', 'itemBox');
        container.setAttribute('class', 'imageBox');
        info.setAttribute('class', 'product');
        price.setAttribute('class', 'price');

        container.setAttribute('class', 'clickable');

        container.id = i;
        container.style.opacity = "0";
        container.onclick = function(){
            var x = document.getElementById(this.id);
            if(x.style.opacity === "0"){
                x.style.opacity = "1";
            } else if(x.style.opacity === "1"){
                x.style.opacity = "0";
            } else {
                x.style.opacity = "0";
            }
        }

        info.textContent = product.name;
        price.textContent = '$' + product.price;
            
        img.src = objURL;
        img.alt = product.name;

        main.appendChild(section);
        section.appendChild(container);
        container.appendChild(img);
        section.appendChild(price);
        section.appendChild(img);
    }
}



function load() {
    const main = document.querySelector('main');

    var start = counter;
    var end = start + 3;
    counter = end;

    fetch(myRequest).then(response => response.json()).then(function(json) {
        let products = json;
        for(start; start < end; start++) {
            const section = document.createElement('div');
            const container = documnet.createElement('div');
            const img = document.createElement('img');
            const info = document.createElement('p');
            const price = document.createElement('p');

            let url = '../public/img/' + products[start].img;

            section.setAttribute('class', 'itemBox');
            container.setAttribute('class', 'imageBox');
            info.setAttribute('class', 'product');
            price.setAttribute('class', 'price');

            container.setAttribute('class', 'clickable');

            container.id = start;
            container.style.opacity = "0";
            container.onclick = function(){
                var x = document.getElementById(this.id);
                if(x.style.opacity === "0"){
                    x.style.opacity = "1";
                } else if(x.style.opacity === "1"){
                    x.style.opacity = "0";
                } else {
                    x.style.opacity = "0";
                }
            }

            prompt.textContent = "Click to see more";

            info.textContent = products[start].name;
            price.textContent = '$' + products[start].price;
            
            img.src = url;
            img.alt = products[start].name;

    
            main.appendChild(section);
            section.appendChild(container);
            container.appendChild(img);
            section.appendChild(price);
            section.appendChild(img);
        }
    })
        .catch(console.error);
};

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if(clientHeight + scrollTop >= scrollHeight - 3) {
        load();
    }
});