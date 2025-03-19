const loadBtn = ()=>{
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then(res=>res.json())
    .then(data=>displayCategories(data.categories));
}

const displayCategories = (pets) =>{
const btnContainer = document.getElementById('btn-container')
pets.forEach(pet => {
    

    const div = document.createElement('div')
    div.innerHTML = `
    <button  onclick ="showpets('${pet.category}')" class =" flex gap-2 items-center p-10  btn btn-wide hover:bg-[#0E7A8110] hover:rounded-full"> 
     <img src="${pet.category_icon} class =" w-16 h-16"" > ${pet.category} </button>
  
    `
    btnContainer.appendChild(div);

});
}




// pet card

const showpets = (categoryPet)=>{

   
   
 const url = `https://openapi.programming-hero.com/api/peddy/category/${categoryPet}`;
 
 fetch(url)
 
 .then(res=>res.json())
 .then(data=>showPets(data.data))

}

const showPets = (petCard) =>{
 
  
    const error = document.getElementById('error')
    error.classList.add('hidden');
   
   
   const cardContainer = document.getElementById('card-container');
   if(petCard.length<1){
        cardContainer.innerHTML = `  
          <div
            class="col-span-3 bg-[#13131310] rounded-md text-center p-24 space-y-3" id="error"
          >
            <img src="images/error.webp" class="w-40 mx-auto" alt="" />
            <h1 class="font-bold text-3xl">
              No information found <br />
              choose another one
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Laboriosam voluptates corporis
            </p>
          </div>`
          return;
   }
   cardContainer.innerHTML = " ";
   
   petCard.forEach(item=>{
    
const div = document.createElement('div');
div.innerHTML = `
   <div class="card bg-base-100 h-full shadow-sm">
              <figure class="p-5">
                <img
                  src="${item.image}"
                  alt="Shoes"
                />
              </figure>
              <div class="card-body">
                <h2 class="card-title font-bold text-2xl">${item.pet_name}</h2>
                <div class="border-b-2 p-3 border-[#13131310] space-y-2">
                  <p>
                    <i class="fa-solid fa-border-all"></i> Breed: ${item.breed}
                    
                  </p>
                  <p><i class="fa-solid fa-calendar-days"></i> Birth: ${item.date_of_birth}</p>
                  <p><i class="fa-solid fa-mercury"></i> Gender: ${item.gender}</p>
                  <p><i class="fa-solid fa-dollar-sign"></i> Price : ${item.price}</p>
                </div>
                <div class="card-actions justify-between">
                  <button onclick ="showLikedPet(${item.petId})" class="btn">
                    <i class="fa-regular fa-thumbs-up"></i>
                  </button>
                  <button  class="btn text-[#0E7A81]">Adopt</button>
                  <button onclick = "showPetDetails(${item.petId})" id="details-btn" class="btn text-[#0E7A81]">Details</button>
                </div>
              </div>
            </div>


`
cardContainer.appendChild(div);

   })

}
// likedPet
const showLikedPet = async(likedPet)=>{
  const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${likedPet}`

  )
  const data = await response.json();
 displayLikedPet(data.petData);
}


const displayLikedPet = (selected) =>{
const thamnailContainer = document.getElementById('thamnail-container')
const div = document.createElement('div');
document.getElementById('preImg').classList.add('hidden');
div.innerHTML = `

 <img class ="h-[124px] rounded-md" src="${selected.image}"alt="Shoes"/>

`
thamnailContainer.appendChild(div);

}




// pet details

const showPetDetails = async (details)=>{
  const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${details}`

  )
  const data = await response.json();
  displayPetDetails(data.petData);
}

const displayPetDetails = (petData)=>{


 const modalContainer = document.getElementById('modalContainer');
 modalContainer.innerHTML = " ";
 const section = document.createElement('section');
 section.innerHTML = `
 


<dialog id="modalBtn" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <div class="card bg-base-100  shadow-sm">
      <figure class="p-5">
        <img class=""
          src="${petData.image}"
          alt="Shoes"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title font-bold text-2xl">${petData.pet_name}</h2>
        <div class="space-y-2">
          <span class="flex justify-evenly">
            <p>
              <i class="fa-solid fa-border-all"></i> Breed: ${petData.breed}
            
            </p>
            <p><i class="fa-solid fa-calendar-days"></i> Birth: ${petData.date_of_birth}</p>
          </span>
          <span class="flex justify-evenly">
            <p><i class="fa-solid fa-mercury"></i> Gender:  ${petData.gender} </p>
            <p><i class="fa-solid fa-dollar-sign"></i> Price : ${petData.price}</p>
          </span>
          <p><i class="fa-solid fa-mercury"></i> Vaccinated status:  ${petData.vaccinated_status}</p>
          
          <div class="border-t-2 p-3 border-[#13131310] ">
            <h1 class="font-bold text-3xl">Details Information</h1>
            <p>${petData.pet_details} </p>
           
          </div>
        </div>
        
       
      </div>
    </div>

    <div class="modal-action" >
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-block">close</button>
      </form>
    </div>
  </div>
</dialog>

 
 
 `
 modalContainer.appendChild(section);
 document.getElementById('modalBtn').showModal();

}


loadBtn();
// petData": {
//   "petId": 1,
//   "breed": "Golden Retriever",
//   "category": "Dog",
//   "date_of_birth": "2023-01-15",
//   "price": 1200,
//   "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
//   "gender": "Male",
//   "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
//   "vaccinated_status": "Fully",
//   "pet_name": "Sunny"
//   }





