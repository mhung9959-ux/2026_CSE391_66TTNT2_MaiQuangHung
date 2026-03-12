let students = [];
let filteredStudents = [];

let sortAsc = true;

const nameInput = document.getElementById("nameInput");
const scoreInput = document.getElementById("scoreInput");
const addBtn = document.getElementById("addBtn");

const searchInput = document.getElementById("searchInput");
const rankFilter = document.getElementById("rankFilter");

const tableBody = document.getElementById("tableBody");
const stats = document.getElementById("stats");

const scoreHeader = document.getElementById("scoreHeader");
const arrow = document.getElementById("arrow");


function getRank(score){
    if(score >= 8.5) return "Giỏi";
    if(score >= 7) return "Khá";
    if(score >= 5) return "Trung bình";
    return "Yếu";
}


function addStudent(){

    let name = nameInput.value.trim();
    let score = parseFloat(scoreInput.value);

    if(name === ""){
        alert("Họ tên không được để trống");
        return;
    }

    if(isNaN(score) || score < 0 || score > 10){
        alert("Điểm phải từ 0 đến 10");
        return;
    }

    students.push({name, score});

    nameInput.value = "";
    scoreInput.value = "";
    nameInput.focus();

    applyFilters();
}


function applyFilters(){

    let keyword = searchInput.value.toLowerCase();
    let rank = rankFilter.value;

    filteredStudents = students.filter(function(sv){

        let matchName = sv.name.toLowerCase().includes(keyword);

        let matchRank = rank === "all" || getRank(sv.score) === rank;

        return matchName && matchRank;
    });

    if(sortAsc){
        filteredStudents.sort(function(a,b){
            return a.score - b.score;
        });
    }else{
        filteredStudents.sort(function(a,b){
            return b.score - a.score;
        });
    }

    renderTable();
}


function renderTable(){

    tableBody.innerHTML = "";

    if(filteredStudents.length === 0){

        tableBody.innerHTML =
        "<tr><td colspan='5'>Không có kết quả</td></tr>";

        updateStats();
        return;
    }

    for(let i = 0; i < filteredStudents.length; i++){

        let sv = filteredStudents[i];

        let tr = document.createElement("tr");

        if(sv.score < 5){
            tr.classList.add("low-score");
        }

        tr.innerHTML = `
        <td>${i+1}</td>
        <td>${sv.name}</td>
        <td>${sv.score}</td>
        <td>${getRank(sv.score)}</td>
        <td><button data-index="${i}">Xóa</button></td>
        `;

        tableBody.appendChild(tr);
    }

    updateStats();
}


function updateStats(){

    let total = students.length;

    let sum = 0;

    for(let i = 0; i < students.length; i++){
        sum += students[i].score;
    }

    let avg = total ? (sum / total).toFixed(2) : 0;

    stats.textContent = "Tổng SV: " + total + " | Điểm TB: " + avg;
}


addBtn.addEventListener("click", addStudent);

scoreInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addStudent();
    }
});


searchInput.addEventListener("input", applyFilters);

rankFilter.addEventListener("change", applyFilters);


scoreHeader.addEventListener("click", function(){

    sortAsc = !sortAsc;

    arrow.textContent = sortAsc ? "▲" : "▼";

    applyFilters();
});


tableBody.addEventListener("click", function(e){

    if(e.target.tagName === "BUTTON"){

        let index = e.target.dataset.index;

        let sv = filteredStudents[index];

        students = students.filter(function(s){
            return !(s.name === sv.name && s.score === sv.score);
        });

        applyFilters();
    }
});


applyFilters();