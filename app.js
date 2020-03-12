const cafeList = document.querySelector('#cafe-list')
const cafeForm = document.querySelector('.add-cafe-form')

function renderCafe(doc){
    let li = document.createElement("li")
    let name = document.createElement("span")
    let city = document.createElement("span")
    let cross = document.createElement("div")

    li.setAttribute('data-id', doc.id)
    name.textContent = doc.data().name
    city.textContent = doc.data().city
    cross.textContent = "x"

    li.appendChild(name)
    li.appendChild(city)
    li.appendChild(cross)

    cafeList.appendChild(li)

    // deleting data
    cross.addEventListener("click", (e) => {
        e.stopPropagation()
        let id = e.target.parentElement.getAttribute("data-id")
        db.collection("cafes").doc(id).delete()
    })

}

// getting data
// db.collection('cafes').get().then((snapshot) => {
//     snapshot.docs.forEach(doc =>{
//         renderCafe(doc)
//     })
// })

// real-time listener
db.collection('cafes').onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type === "added"){
            renderCafe(change.doc)
        }else if(change.type === "removed"){
            let li = document.querySelector("[data-id="+change.doc.id+"]")
            cafeList.removeChild(li)
        }
    });
})

// saving data
cafeForm.addEventListener("submit", (e) => {
    e.preventDefault()
    db.collection("cafes").add({
        name: cafeForm.name.value,
        city: cafeForm.city.value,
    })
    cafeForm.name.value = ""
    cafeForm.city.value = ""

})