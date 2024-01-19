const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const mainCont  = document.querySelector('.maincontainer');
const recipeDetails = document.querySelector('.recipeDetails');
const recipeWholeDetails = document.querySelector('.recipeWholeDetails');


searchBtn.addEventListener('click', (e)=>{
    e.preventDefault(); // stops from auto refresh

    fetchRecipe(searchBox.value.trim());
    console.log("clicked");
    searchBox.value="";

    
})

async function  fetchRecipe(query){

    if(!query){
        mainCont.innerHTML="<h3 class='heading'>Please! Enter recipe name in the search box<span style='font-size:30px;'>&#128522;</span></h3>";
    }
    else{
        document.querySelector(".maincontainer").innerHTML="<h3 class='heading'>Fetching...<span style='font-size:30px;'>&#128522;</span></h3>";
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        console.log(response);
        document.querySelector(".maincontainer").innerHTML="";
    

        if(response.meals == null){
            
            document.querySelector(".maincontainer").innerHTML="<h3 class='heading'>Sorry no match found.<span style='font-size:100px;'>&#128542;</span></h3>";

        }

        response.meals.forEach(element => {

            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
            <img src="${element.strMealThumb}">
            <h3>${element.strMeal} </h3>
            <p>${element.strArea} Food</p>
            <p>${element.strCategory}</p>
            `;
            
            const recipeBtn = document.createElement('button');
            recipeBtn.classList.add('recipeBtn');
            recipeBtn.textContent = "View Recipe";
            card.appendChild(recipeBtn);

            //Recepi Button PopUp
            
        
            recipeBtn.addEventListener('click', () => {
                
                console.log(element.strMeal);
                recipePopUp(element);
            });
            
            mainCont.appendChild(card);

        });
    }

    
}

//PopUp Fuction for recipe details

function recipePopUp(element){     

    recipeDetails.style.display = 'block';
    // recipeWholeDetails.style.display = 'block';

    recipeDetails.innerHTML = `
        <div class="recipeDetailsSticky">
        <span class="crossIcon">&#10006;</span>
        <h2 class="recipeName">${element.strMeal}</h2>
        </div>
        <h3>Ingredients:</h3>
    `;

    const unlist = document.createElement('ul');
    unlist.classList = 'listofItems';

    let instructionsHead = document.createElement('h2');
    instructionsHead.classList = "instructionHead";

    let instructions = document.createElement('p');
    instructions.classList = 'instructions';

    let ingredientsList = "";

    for(let i = 1; i<21; i++){

        measuresIngredient = element[`strMeasure${i}`] + " " + element[`strIngredient${i}`];
        if(measuresIngredient != " "){
            ingredientsList = ingredientsList + `<li>${measuresIngredient}</li>`;
            
        }else{
            break;
        }
        
    }


    unlist.innerHTML = ingredientsList;

    instructions.innerText = element['strInstructions'];
    

    instructionsHead.innerText = "Instructions:";
    
    recipeDetails.appendChild(unlist);
    recipeDetails.appendChild(instructionsHead);
    recipeDetails.appendChild(instructions);
    
    const crossIcon = document.querySelector('.crossIcon');
    crossIcon.addEventListener('click', ()=>{
        // alert("hai");
        recipeDetails.style.display = 'none';
        // recipeWholeDetails.style.display = 'none';

    })
    // const link = element.strYoutube;
    const link = document.createElement('a');
    link.classList = 'youtube';
    link.innerHTML = "Link: <span>Watch On Youtube</span>"
    
    link.href = element.strYoutube;
    link.setAttribute('target', '_blank');
    recipeDetails.appendChild(link);


}





// const t = document.querySelector('.time')

// setInterval(()=>{
//         const time = new Date();
//         let h = time.getHours();
//         let m = time.getMinutes();
//         const s = time.getSeconds();
//         console.log(h, m, s)
//         t.innerHTML = `${h}:${m}:${s}`;
// }, 1000)
