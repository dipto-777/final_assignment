const productContainer = document.getElementById("product-container");
document.getElementById("button").addEventListener('click', async (e) => {
    e.preventDefault();
    productContainer.innerHTML = "Fetching data...";

    let inputvalue = document.getElementById("inputName").value.trim();
    await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputvalue}`)
        .then(response => response.json())
        .then(data => {

            productContainer.innerHTML = "";
            if (data.drinks == null) {
                document.getElementById("msg").style.display = "block";
            }
            else {
                document.getElementById("msg").style.display = "none";
                data.drinks.forEach(element => {
                    const div = document.createElement("div");

                    div.classList.add("item-card");

                    div.innerHTML = `
                    <div class="card" style="width: 14rem;">
                    <img src="${element.strDrinkThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">Name : ${element.strDrink}</h5>
                    <h5 class="card-title">Category : ${element.strCategory}</h5>
                    <p class="card-text">Instruction : ${element.strInstructions.slice(0,15)}</p>
                    <div class = "cart">
                    <div class="cart">
                    <button onclick="total('${element.strDrinkThumb}', '${element.strDrink}',this)" class="btn btn-primary info-btn">Add to Cart</button>
                    <button class="btn details-btn btn-primary info-btn" type="button" onclick = "Details('${element.idDrink}')">Details</button>
                   
                    </div>

                    </div>
                    </div>
                    </div>
                    `
                    productContainer.appendChild(div);
                });

            }
        });

});


async function Details(Id) {
    let pop = document.getElementById("data-details");
    pop.style.display = "block"
    const div = document.createElement("div");
    pop.innerHTML = `<h3>Loading...</h3>`;

    await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${Id}`)
        .then(response => response.json())
        .then(data => {
            pop.innerHTML = "";
            div.innerHTML = `
            <h5 class="card-title">Glass : ${data.drinks[0].strGlass}</h5>
            <hr>
            <img src="${data.drinks[0].strDrinkThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">Details</h5>
            <h5 class="card-title">Category : ${data.drinks[0].strCategory}</h5>
            <h5 class="card-title">Alcoholic : ${data.drinks[0].strAlcoholic}</h5>
            <p class="card-text">${data.drinks[0].strInstructions}</p>
            </div>     
           `
            pop.appendChild(div);

            let myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
            myModal.show();

        })

}



let cartCount = 0;
    const totalCartElement = document.querySelector(".total");
    const cartContainer = document.querySelector(".selected");
    function total(image, name,button) {
        if(cartCount>=7){
            alert("You have reached the max limit!!!");
            return;
        }

        cartCount++;
        let div = document.createElement("div");
        div.classList.add("show");
        totalCartElement.textContent = cartCount;
        div.innerHTML = `
        <p>${cartCount}. </p>     
        <img class="img" src="${image}" alt="Drink Image">     
        <p class="nam">${name}</p>
    `;
    
    cartContainer.appendChild(div);
    button.textContent = "Already Selected";
    button.disabled = true;
    let hr = document.createElement("hr");
    cartContainer.appendChild(hr);
    }

    
    const default_drinks = async () => {
        await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=d`)
        .then(response => response.json())
        .then(data => {
            data.drinks.forEach(element => {
                const div = document.createElement("div");

                div.classList.add("item-card");

                div.innerHTML = `
                <div class="card" style="width: 14rem;">
                <img src="${element.strDrinkThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">Name : ${element.strDrink}</h5>
                <h5 class="card-title">Category : ${element.strCategory}</h5>
                <p class="card-text">Instruction : ${element.strInstructions.slice(0,15)}</p>
                <div class = "cart">
                <div class="cart">
                <button onclick="total('${element.strDrinkThumb}', '${element.strDrink}',this)" class="btn btn-primary info-btn">Add to Cart</button>
                <button class="btn details-btn btn-primary info-btn" type="button" onclick = "Details('${element.idDrink}')">Details</button>
               
                </div>

                </div>
                </div>
                </div>
                `
                productContainer.appendChild(div);
            });
        })
    }
    default_drinks();

//https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007

