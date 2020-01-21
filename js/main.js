
let containerProduct = [];
if (localStorage.getItem("product") == null) {
    containerProduct = []
} else {
    containerProduct = JSON.parse(localStorage.getItem("product"));
    showProduct();
}
/************************************************ */
function addProduct() {

    let nameProduct = document.getElementById("nameInp").value;
    let priceProduct = document.getElementById("priceInp").value;
    let typeProduct = document.getElementById("typeInp").value;
    let discountProduct = document.getElementById("discountInp").value;

    if (valid(nameProduct, priceProduct, typeProduct, discountProduct) == true) {
        if (discountProduct == 0) {

            var finishPrice = priceProduct;

            let myProduct = {
                name: nameProduct,
                price: priceProduct,
                type: typeProduct,
                discount: discountProduct,
                afterDiscount: finishPrice,
            }
            containerProduct.push(myProduct);
            localStorage.setItem("product", JSON.stringify(containerProduct));
            showProduct();
            resetForm();
        } else {
            let myDiscPrice = priceProduct * (discountProduct / 100);
            var finishPrice = priceProduct - myDiscPrice;

            let myProduct = {
                name: nameProduct,
                price: priceProduct,
                type: typeProduct,
                discount: discountProduct,
                afterDiscount: finishPrice,
            }
            containerProduct.push(myProduct);
            localStorage.setItem("product", JSON.stringify(containerProduct));
            showProduct();
            resetForm();

        }

    } else {
        alert("not")
    }

}
/**************************************************** */
function showProduct() {
    let temp = "";
    for (let i = 0; i < containerProduct.length; i++) {
        temp += `
        <div class="col-md-3 col-sm-6 my-2">
            <div class="product-grid">
                <div class="product-image">
                    <a href="#">
                        <img class="pic-1" src="http://bestjquery.com/tutorial/product-grid/demo9/images/img-5.jpg">
                        <img class="pic-2" src="http://bestjquery.com/tutorial/product-grid/demo9/images/img-6.jpg">
                    </a>
                    <ul class="social">
                        <li><a href="" data-tip="Quick View"><i class="fa fa-search"></i></a></li>
                        <li><a href="" data-tip="Add to Wishlist"><i class="fa fa-shopping-bag"></i></a></li>
                    </ul>
                    <span class="product-new-label">${containerProduct[i].type}</span>
                    <span class="product-discount-label">${containerProduct[i].discount}%</span>
                </div>
                <ul class="rating">
                    <li class="fa fa-star"></li>
                    <li class="fa fa-star"></li>
                    <li class="fa fa-star"></li>
                    <li class="fa fa-star"></li>
                    <li class="fa fa-star"></li>
                </ul>
                <div class="product-content">
                    <h3 class="title"><a href="#">${containerProduct[i].name}</a></h3>
                    <div class="price">$${containerProduct[i].afterDiscount}
                        <span>$${containerProduct[i].price}</span>
                    </div>
                    <a class="add-to-cart" href="">+ Add To Cart</a>
<div>                   <button class="btnfun" onclick="updateProduct(${i})">update</button>
                    <button class="btnfun" onclick="deleteProduct(${i})">delete</button>
     </div>

                    </div>
            </div>
        </div>`
    }

    document.getElementById("showProduct").innerHTML = temp;
}


/********************************** */
function updateProduct(index) {
    document.getElementById("nameInp").value = containerProduct[index].name;
    document.getElementById("priceInp").value = containerProduct[index].price;
    document.getElementById("typeInp").value = containerProduct[index].type;
    document.getElementById("discountInp").value = containerProduct[index].discount;
    containerProduct.splice(index, 1);
    localStorage.setItem("product", JSON.stringify(containerProduct));
    showProduct();
}
/*************************************** */
function deleteProduct(index2) {
    containerProduct.splice(index2, 1);
    localStorage.setItem("product", JSON.stringify(containerProduct));
    showProduct();
}
/********************************* */
function resetForm() {
    let inputs = document.getElementsByClassName("form-control");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}
function valid(name, price, type, disc) {
    let nameRegex = /^[A-z ]{2,}$/;
    let typeRegex = /^[A-z ]{2,}$/;
    let priceRegex = /^[1-9][0-9]{0,}$/;
    let discRegex = /^[0-9]{1,2}$/;
    if (nameRegex.test(name) == true && typeRegex.test(type) == true && priceRegex.test(price) && discRegex.test(disc)) {
        return true;
    } else {
        return false;
    }
}

/************************************* */
function validName(name) {
    let nameRegex = /^[A-z ]{2,}$/;

    if (nameRegex.test(name)) {
        return true;
    } else {
        return false;
    }
}

function validPrice(price) {
    let priceRegex = /^[1-9][0-9]{0,}$/;
    if (priceRegex.test(price)) {
        return true;
    } else {
        return false;
    }
}

function validDisc(disc) {
    let discRegex = /^[0-9]{1,2}$/;
    if (discRegex.test(disc)) {
        return true;
    } else {
        return false;
    }
}



function validType(type) {
    let typeRegex = /^[A-z ]{2,}$/;
    if (typeRegex.test(type)) {
        return true;
    } else {
        return false;
    }
}


function testDiscount(valueDiscoun) {
    if (validDisc(valueDiscoun) == false) {
        $("#discountError").css("display", "block");
        $("#add").attr("disabled", "true");
    } else {

        $("#discountError").css("display", "none");
        $("#add").removeAttr("disabled", "true");
    }
}


function testType(type) {
    if (validType(type) == false) {
        $("#typeError").css("display", "block");
        $("#add").attr("disabled", "true");

    } else {

        $("#typeError").css("display", "none");
        $("#add").removeAttr("disabled", "true");
    }
}
function testPrice(price) {
    if (validPrice(price) == false) {
        $("#priceError").css("display", "block");
        $("#add").attr("disabled", "true");
    } else {

        $("#priceError").css("display", "none");
        $("#add").removeAttr("disabled", "true");
    }
}

function testName(name) {
    if (validName(name) == false) {
        $("#nameError").css("display", "block");
        $("#add").attr("disabled", "true");
    } else {

        $("#nameError").css("display", "none");
        $("#add").removeAttr("disabled", "true");
    }
}

function search(term) {
    let temp = "";
    for (let i = 0; i < containerProduct.length; i++) {
        if (containerProduct[i].name.toLocaleLowerCase().includes(term.toLocaleLowerCase())) {
            temp += `
        <div class="col-md-3 col-sm-6 my-2">
            <div class="product-grid">
                <div class="product-image">
                    <a href="#">
                        <img class="pic-1" src="http://bestjquery.com/tutorial/product-grid/demo9/images/img-5.jpg">
                        <img class="pic-2" src="http://bestjquery.com/tutorial/product-grid/demo9/images/img-6.jpg">
                    </a>
                    <ul class="social">
                        <li><a href="" data-tip="Quick View"><i class="fa fa-search"></i></a></li>
                        <li><a href="" data-tip="Add to Wishlist"><i class="fa fa-shopping-bag"></i></a></li>
                    </ul>
                    <span class="product-new-label">${containerProduct[i].type}</span>
                    <span class="product-discount-label">${containerProduct[i].discount}%</span>
                </div>
                <ul class="rating">
                    <li class="fa fa-star"></li>
                    <li class="fa fa-star"></li>
                    <li class="fa fa-star"></li>
                    <li class="fa fa-star"></li>
                    <li class="fa fa-star"></li>
                </ul>
                <div class="product-content">
                    <h3 class="title"><a href="#">${containerProduct[i].name}</a></h3>
                    <div class="price">$${containerProduct[i].afterDiscount}
                        <span>$${containerProduct[i].price}</span>
                    </div>
                    <a class="add-to-cart" href="">+ Add To Cart</a>
<div>                   <button class="btnfun" onclick="updateProduct(${i})">update</button>
                    <button class="btnfun" onclick="deleteProduct(${i})">delete</button>
     </div>

                    </div>
            </div>
        </div>`

        }
    }
    document.getElementById("showProduct").innerHTML = temp;
}



