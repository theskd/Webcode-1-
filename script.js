const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = []

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  users.forEach(user => {
    const isVisible =
      user.name.toLowerCase().includes(value)  //||
     // user.brand.toLowerCase().includes(value)
    user.element.classList.toggle("hide", !isVisible)
  })
})

fetch("https://makeup-api.herokuapp.com/api/v1/products.json")
  .then(res => res.json())
  .then(data => {
    users = data.map(user => {
      const card = userCardTemplate.content.cloneNode(true).children[0]
      const header = card.querySelector("[data-header]")
      const body = card.querySelector("[data-body]")
      const body1 = card.querySelector("[data-body1]")
      const body2 = card.querySelector("[data-body2]")
    //  const body3 = card.querySelector("[data-body]")
      header.textContent = user.name
     // body.textContent.innerHTML = <img src="${user.api_featured_image}"  />
      body.textContent = user.brand
      body1.textContent = user.price_sign + user.price  
      body2.textContent = user.description
    
    /*  const imageUrl =  "";

        const reader = new FileReader();
        reader.onloadend = () => {
        const base64data = reader.result;                
        console.log(base64data);
        }

        (async () => {
        const response = await fetch(imageUrl)
        const imageBlob = await response.blob()
        reader.readAsDataURL(imageBlob);  
        })() */
      userCardContainer.append(card)
      return { 
        
       name: user.name, brand: user.brand, price: user.price ,element: card }
    })
  })