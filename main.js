let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let total = document.getElementById('total')
let count = document.getElementById('count');
let category = document.getElementById('category');
let discount = document.getElementById('discount');
let submit = document.getElementById('submit')
function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }
    else {
        total.innerHTML = '';
        total.style.background = 'rgb(172, 4, 4)'

    }


}

let products;
let mood = 'create';
let tmp;
if (localStorage.products != null) {
    products = JSON.parse(localStorage.products);
    display(products);
} else {
    products = [];
}

submit.onclick = function () {
    // if(validProductName()){
        let product = {
            title: title.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            count: count.value,
            total: total.innerHTML,
            category: category.value,
            discount: discount.value
        }
    if(mood==='create')  {  
        if(product.count>1){
            for(let i=0;i<product.count;i++){
            products.push(product);
            }
        }
        else{
            products.push(product);
        }
    }  else {
        products[tmp]=product;
        mood='create';
        submit.innerHTML="Create";
        count.style.display="block";
        
        
    }
        localStorage.setItem('products', JSON.stringify(products));
        clear();
        display(products);

    // }
    // else{
    //     alert("wrong input")
    // }
    

}

function clear() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    count.value = '';
    total.innerHTML = '';
    category.value = '';
    discount.value = '';
}

function display(newArray) {

    let table = ''
    getTotal();
    for (let i = 0; i < newArray.length; i++) {
        table += `
                    <tr>
                        <td>${i}</td>
                        <td>${newArray[i].title}</td>
                        <td>${newArray[i].price}</td>
                        <td>${newArray[i].taxes}</td>
                        <td>${newArray[i].ads}</td>
                        <td>${newArray[i].discount}</td>
                        <td>${newArray[i].total}</td>
                        <td>${newArray[i].category}</td>
                        <td><button onclick="updatePro(${i})" >update</button></td>
                        <td><button onclick="deletePro(${i})">delete</button></td>
                    </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    let deleteAllbtn = document.getElementById("deleteAll");
    if(newArray.length > 0){
        deleteAllbtn.innerHTML = `
        <button onclick="deleteAll()">Delete All  (${newArray.length})</button>
        `;
        
    }
    else{
        deleteAllbtn.innerHTML ="";
    }
}
function deleteAll(){
    if( window.prompt('you are going to delet All product ').toLocaleLowerCase()==='yes'){
        products.splice(0);
        localStorage.setItem('products', JSON.stringify(products));
        display(products);
    }
    else{
        return;
    }
}
function updatePro(index){
    title.value = products[index].title;
    price.value = products[index].price;
    taxes.value = products[index].taxes;
    ads.value = products[index].ads;
    category.value = products[index].category;
    discount.value = products[index].discount;
    getTotal();
    count.style.display="none"
    submit.innerHTML="Update"
    mood='update';
    tmp=index;
    scroll({
        top:0,
        behavior:"smooth"

    })
}

function search(term) {
    let searchContainer = [];
    for(let i=0;i<products.length;i++){
        if (products[i].title.toLowerCase().includes(term.toLowerCase())||products[i].category.toLowerCase().includes(term.toLowerCase())){
            searchContainer.push(products[i]);
        }
        display(searchContainer);
    }

}

function deletePro(index){
    products.splice(index,1);
    localStorage.setItem('products', JSON.stringify(products));
    display(products);

}
// function validProductName(){
//     let regx =/^[A-Z][a-z]{1,4}$/
//     if(regx.test(title.value)){
//         return true;
//     }
//     else{
//         return false;
//     }
    
// }
