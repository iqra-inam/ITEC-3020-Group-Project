//JS for Calculator
function calculateBMI() {
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    // Calculate BMI
    const bmi = weight / ((height / 100) * (height / 100));
    let category = "";
    if (bmi < 18.5) {
        category = "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = "Normal weight";
    } else if (bmi >= 25 && bmi < 29.9) {
        category = "Overweight";
    } else {
        category = "Obesity";
    }
    document.getElementById('result').innerHTML = `Age: ${age}, Gender: ${gender},<br>BMI: ${bmi.toFixed(2)},<br>Category: ${category}`;
}




//Calculator for Ideal Body Weight
function calculateIdealWeight() {
    const age = parseInt(document.getElementById('age-iw').value);
    const gender = document.getElementById('gender-iw').value;
    const height = parseFloat(document.getElementById('height-iw').value);

    let idealWeight = 0;

    if (gender === 'Male') {
        idealWeight = height - 100 - ((height - 150) / 4);
    } else if (gender === 'Female') {
        idealWeight = height - 100 - ((height - 150) / 2.5);
    }
    document.getElementById('result-iw').innerHTML = `Age: ${age}, Gender: ${gender},<br>Ideal Weight: ${idealWeight.toFixed(2)} kg`;
}


//Calculator for Body Fat
function calculateBodyFat() {
    const age = parseInt(document.getElementById('age-bf').value);
    const gender = document.getElementById('gender-bf').value;
    const height = parseFloat(document.getElementById('height-bf').value);
    const weight = parseFloat(document.getElementById('weight-bf').value);
    const neck = parseFloat(document.getElementById('neck-bf').value);
    const waist = parseFloat(document.getElementById('waist-bf').value);

    let bodyFat = 0;

    if (gender === 'Male') {
        bodyFat = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
    } else if (gender === 'Female') {
        bodyFat = 163.205 * Math.log10(waist + 0) - 97.684 * Math.log10(height) - 78.387;
    }
    document.getElementById('result-age').innerHTML = `Age: ${age}`;
    document.getElementById('result-gender').innerHTML = `Gender: ${gender}`;
    document.getElementById('result-bodyfat').innerHTML = `Body Fat Percentage: ${bodyFat.toFixed(2)}%`;
}



//JS for Blogs
let row = null;
function Submit() {
    let dataEntered = retrieveData();
    if (dataEntered === false) {
        document.getElementById("msg").innerHTML = "Please enter all data!";
    } else {
        if (row === null) {
            insert(dataEntered);
            document.getElementById("msg").innerHTML = "Data Inserted!";
        } else {
            update(dataEntered);
            document.getElementById("msg").innerHTML = "Data Updated!";
        }
    }
    document.getElementById("form").reset();
}


function retrieveData() {
    let blog = document.getElementById("blog").value;
    let message = document.getElementById("message").value;
    let imageFile = document.getElementById("image").files[0];


    if (blog === "" || message === "" || !imageFile) {
        return false;
    } else {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = function() {
                resolve([blog, message, reader.result]);
            };
            reader.onerror = function() {
                reject("Error reading file");
            };
            reader.readAsDataURL(imageFile);
        });
    }
}


function insert(dataEnteredPromise) {
    dataEnteredPromise.then(dataEntered => {
        let existingData = JSON.parse(localStorage.getItem("blogData")) || [];
        existingData.push(dataEntered);
        localStorage.setItem("blogData", JSON.stringify(existingData));
        window.location.href = "inbox.html";
    }).catch(error => {
        console.error(error);
    });
}

function loadData() {
    let dataContainer = document.getElementById("dataContainer");
    if (!dataContainer) return;


    dataContainer.innerHTML = "";


    let existingData = JSON.parse(localStorage.getItem("blogData")) || [];
    existingData.forEach((data, index) => {
        let entryDiv = document.createElement("div");
        entryDiv.className = "entry";


        let blogElement = document.createElement("p");
        blogElement.innerHTML = `<strong>Blog Post:</strong> ${data[0]}`;
        let messageElement = document.createElement("p");
        messageElement.innerHTML = `<strong>Travel Description:</strong> ${data[1]}`;
        let imageElement = document.createElement("img");
        imageElement.src = data[2];
        imageElement.alt = data[0];
        imageElement.style.maxWidth = '100%';


        let actionsElement = document.createElement("p");
        actionsElement.innerHTML = `
            <button onclick="edit(${index})">Edit</button>
            <button onclick="remove(${index})">Delete</button>
        `;


        entryDiv.appendChild(blogElement);
        entryDiv.appendChild(messageElement);
        entryDiv.appendChild(imageElement);
        entryDiv.appendChild(actionsElement);


        dataContainer.appendChild(entryDiv);
    });
}


function edit(index) {
    let existingData = JSON.parse(localStorage.getItem("blogData")) || [];
    row = index;
    window.location.href = "blogs.html";
    document.getElementById("blog").value = existingData[index][0];
    document.getElementById("message").value = existingData[index][1];
}


function update(dataEnteredPromise) {
    dataEnteredPromise.then(dataEntered => {
        let existingData = JSON.parse(localStorage.getItem("blogData")) || [];
        existingData[row] = dataEntered;
        localStorage.setItem("blogData", JSON.stringify(existingData));
        window.location.href = "inbox.html";
        row = null;
    }).catch(error => {
        console.error(error);
    });
}


function remove(index) {
    let ans = confirm("Are you sure you want to delete this record?");
    if (ans) {
        let existingData = JSON.parse(localStorage.getItem("blogData")) || [];
        existingData.splice(index, 1);
        localStorage.setItem("blogData", JSON.stringify(existingData));
        loadData();
    }
}


document.addEventListener('DOMContentLoaded', loadData);



//JS for Login
document.addEventListener("DOMContentLoaded", function () {
    const lForm = document.getElementById("loginForm");
 
 
    lForm.addEventListener("submit", function (event) {  
        event.preventDefault();
        const pass = document.getElementById("password").value;
        const uname = document.getElementById("username").value;
 
 
        if (uname === "" || pass === "") {  
            alert("Please fill in all fields.");
            return;
        }
 
 
        const savedP = localStorage.getItem(uname);  
 
        const lButton = event.submitter.name === "login";
 
 
        if (lButton) {
            if (savedP != null) {
                if (pass === savedP) {
                    window.location.href = "main.html";
                } else {
                    alert("Incorrect password.");
                }
            } else {
                alert("This account does not exist. Please be redirected to the registration page.");
                window.location.href = "register.html";
            }
        } else {
            window.location.href = "register.html";
        }
    });
 });
 
 
 
 
//JS for Register
document.addEventListener("DOMContentLoaded", function () {
    const rForm = document.querySelector("form");
 
 
    rForm.addEventListener("submit", function (event) {
        event.preventDefault();
 
 
        const uname = document.getElementById("username").value;
        const pass = document.getElementById("password").value;
        const cPass = document.getElementById("confirmpassword").value;
 
 
        if (uname === "" || pass === "" || cPass === "") {
            alert("Please fill in all fields.");
            return;
        }
 
 
        if (pass !== cPass) {
            alert("Passwords do not match. Please try again.");
            return;
        }
 
 
        localStorage.setItem(uname, pass);  
        window.location.href = "main.html";
    });
 });