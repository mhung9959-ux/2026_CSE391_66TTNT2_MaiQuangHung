const form = document.getElementById("orderForm");

const product = document.getElementById("product");
const quantity = document.getElementById("quantity");
const date = document.getElementById("deliveryDate");
const address = document.getElementById("address");
const note = document.getElementById("note");

const noteCount = document.getElementById("noteCount");
const totalEl = document.getElementById("total");

const confirmBox = document.getElementById("confirmBox");
const summary = document.getElementById("summary");

const success = document.getElementById("success");

const prices = {
ao:150000,
quan:200000,
giay:300000
};


function showError(id,msg){
document.getElementById(id+"Error").textContent = msg;
}

function clearError(id){
document.getElementById(id+"Error").textContent = "";
}


function validateProduct(){

if(product.value===""){
showError("product","Chọn sản phẩm");
return false;
}

clearError("product");
return true;
}


function validateQuantity(){

let q = Number(quantity.value);

if(!Number.isInteger(q) || q<1 || q>99){
showError("quantity","1-99");
return false;
}

clearError("quantity");
return true;
}


function validateDate(){

let d = new Date(date.value);
let today = new Date();

today.setHours(0,0,0,0);

let max = new Date();
max.setDate(max.getDate()+30);

if(date.value===""){
showError("date","Chọn ngày");
return false;
}

if(d < today){
showError("date","Không được quá khứ");
return false;
}

if(d > max){
showError("date","Không quá 30 ngày");
return false;
}

clearError("date");
return true;
}


function validateAddress(){

let v = address.value.trim();

if(v.length<10){
showError("address","Ít nhất 10 ký tự");
return false;
}

clearError("address");
return true;
}


function validateNote(){

let len = note.value.length;

if(len>200){
showError("note","Tối đa 200 ký tự");
return false;
}

clearError("note");
return true;
}


function validatePayment(){

let radios = document.getElementsByName("payment");

for(let r of radios){
if(r.checked){
clearError("payment");
return true;
}
}

showError("payment","Chọn phương thức");
return false;
}


function updateTotal(){

let p = prices[product.value] || 0;

let q = Number(quantity.value) || 0;

let total = p*q;

totalEl.textContent = total.toLocaleString("vi-VN");

}


note.addEventListener("input",function(){

let len = note.value.length;

noteCount.textContent = len + "/200";

if(len>200){
noteCount.style.color="red";
}else{
noteCount.style.color="black";
}

validateNote();

});


product.addEventListener("change",updateTotal);
quantity.addEventListener("input",updateTotal);


form.addEventListener("submit",function(e){

e.preventDefault();

let valid =
validateProduct() &
validateQuantity() &
validateDate() &
validateAddress() &
validateNote() &
validatePayment();

if(valid){

let p = product.options[product.selectedIndex].text;

summary.innerHTML = `
Sản phẩm: ${p}<br>
Số lượng: ${quantity.value}<br>
Tổng tiền: ${totalEl.textContent} VND<br>
Ngày giao: ${date.value}
`;

confirmBox.style.display="block";

}

});


document.getElementById("confirmBtn").onclick=function(){

form.style.display="none";
confirmBox.style.display="none";

success.textContent="Đặt hàng thành công 🎉";

};

document.getElementById("cancelBtn").onclick=function(){

confirmBox.style.display="none";

};