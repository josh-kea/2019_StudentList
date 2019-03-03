"use strict";

window.addEventListener("DOMContentLoaded", init);

const heading = document.querySelector('h1.harry-font');
heading.addEventListener("click", () => { location.reload() });

//Below is for cloning each student block to the main student grid.
let studentBlockGrid = document.querySelector('#student-block-grid');
let studentBlockContent = document.querySelector('#student-block-template').content;
let expelledStudentCounter = document.querySelector('p#expelled span');
let inquisitorialSquadCounter = document.querySelector('p#inquisitorial span');
// Below is the counting requirement, to show how many students are currently in each house. Shown to the right of the buttons on the webpage.
let allBtnCount = document.querySelector('button#all span');
let slytherinBtnCount = document.querySelector('button#slytherin span');
let gryffindorBtnCount = document.querySelector('button#gryffindor span');
let hufflepuffBtnCount = document.querySelector('button#hufflepuff span');
let ravenclawBtnCount = document.querySelector('button#ravenclaw span');

//Sorting buttons
  const sortByFirstNameBtn = document.querySelector("button#sort-first-name");
  const sortByLastNameBtn = document.querySelector("button#sort-last-name");

  sortByFirstNameBtn.addEventListener("click", sortByFirstName);
  sortByLastNameBtn.addEventListener("click", sortByLastName);

function init() {
  getJSON()
  // console.log(arrayOfStudents)
  
  // TODO: Load JSON, create clones, build list, add event listeners, show modal, find images, and other stuff ...
}


// Function to fetch data from JSON function getJSON(), it will then store them into objects

  function getJSON() {
    fetch("students1991.json")
      .then(e => e.json())
      .then(createStudents);
  }

  const Student = {
    firstname: "--First Name--",
    secondname: "None",
    lastname: "--Last Name--",
    house: "--House--",
    studentID: "--id--"
  }

  let arrayOfStudents = [];
  let currentArray = [];
  let expelledStudents = [];
  let studentCount = 0;
  let expelledStudentCount = 0;

  //Inquistitorial Squad array
  let inquisitorialArray = [];



  function createStudents(data){
    data.forEach(stud => {
        let newStudent = Object.create(Student);

        let fullName = stud.fullname.split(' ');

        //Checking to see if three names exist in a single students fullname
        if(fullName[2]){
          newStudent.firstname = fullName[0];
          newStudent.secondName = fullName[1]; 
          newStudent.lastname = fullName[2];
        } else {
          newStudent.firstname = fullName[0]; 
          newStudent.lastname = fullName[1];
        }
        
        
        newStudent.house = stud.house;
        newStudent.studentID = studentCount++;
        // console.log(newStudent);

        arrayOfStudents.push(newStudent);
      })

      // Displaying all students once the webpage has init(), the first time loading.
      displayStudents(arrayOfStudents);

      //Getting the blood type JSON once the array is filled
      getJSON2();
      
      //Initially setting the amount of students within their arrays to be shown on the screen
      //NOTE: filterHouse(house) returns an array of only students within that (house)!
       allBtnCount.textContent = arrayOfStudents.length;
       slytherinBtnCount.textContent = filterHouse("Slytherin").length;
       gryffindorBtnCount.textContent = filterHouse("Gryffindor").length;
       hufflepuffBtnCount.textContent = filterHouse("Hufflepuff").length;
       ravenclawBtnCount.textContent = filterHouse("Ravenclaw").length;
  }

  //Creating function to display students from the Student objects we've just created and stored into arrayOfStudents.

  function displayStudents(array){
      studentBlockGrid.innerHTML = "";
      inquisitorialSquadCounter.textContent = inquisitorialArray.length;
      array.forEach(newStud => {
      const clone = studentBlockContent.cloneNode(true);
      //console.log(newStud)
      
      clone.querySelector("#first-name span").textContent = newStud.firstname;
      
      clone.querySelector("#last-name span").textContent = newStud.lastname;
      clone.querySelector("#house").textContent = newStud.house;
      clone.querySelector("#house-color").classList.add(`${newStud.house}`);
        //setting dataset id to be equal to studentID from initialized when the object was created
      let studentBlock = clone.querySelector("#student-block");
      //Showing Modal When studentBlock is clicked.
      studentBlock.addEventListener('click', () => {
        console.log("clicked");
      });
      studentBlock.dataset.studentid = newStud.studentID;
      //console.log(array)

      // INQ BUTTON BELOW

      let inquisitorialBtn = clone.querySelector("button#inquisitorial");
        inquisitorialBtn.addEventListener("click", checkInquisitorialArray)
        //Setting text content of button if this student is already in the array
        if (inquisitorialArray.find( ele => ele.studentID === newStud.studentID)) {
          inquisitorialBtn.textContent = "Remove From Inquisitorial Squad";
        } else {
          inquisitorialBtn.textContent = "Add To Inquisitorial Squad";
        }

      function checkInquisitorialArray() {
        if (!inquisitorialArray.find( ele => ele.studentID === newStud.studentID)) {
         
          if (newStud.bloodStatus === "Pure"){
            inquisitorialArray.push(newStud);
            newStud.inquisitorialStatus = true;
            console.log(inquisitorialArray);  
            
            displayStudents(array);
            
          }else if (newStud.bloodStatus === "Half" && newStud.house === "Slytherin") {
            inquisitorialArray.push(newStud);
            newStud.inquisitorialStatus = true;
            console.log(inquisitorialArray); 
             
            displayStudents(array);
          } else {
            window.alert("Cannot be added to inquisitorial squad because this students bloodtype is " + newStud.bloodStatus)
            newStud.inquisitorialStatus = false;
          }
        } else {
          for (let i = inquisitorialArray.length - 1; i >= 0; --i) {
            if (inquisitorialArray[i].studentID == newStud.studentID) {
                inquisitorialArray.splice(i,1)
                console.log(inquisitorialArray)
                
                
                displayStudents(array);
            }
           }
      }
    }
      //
      //
      //
      // EXPELL BUTTON BELOW
      let expelBtn = clone.querySelector("button#expel");
      expelBtn.dataset.expelid = newStud.studentID;
      expelBtn.addEventListener("click", () => {
        // Removing the student from the current array
        //array.shift(newStud);
        // arrayOfStudents.shift(ele => ele.studentID === newStud.studentID);
        // Pushing the expelled student to the expelled students Array;
        
        //array.filter(ele => ele.studentID === newStud.studentID);
        
        for (let i = arrayOfStudents.length - 1; i >= 0; --i) {
          if (arrayOfStudents[i].studentID == newStud.studentID) {
              arrayOfStudents.splice(i,1)
              
              expelledStudents.push(newStud);
              
              expelledStudentCounter.textContent = expelledStudents.length;
              
              
              //Below I am updating the button counts that we initialized earlier on line 74 to be updated whenever a student is expelled !
              allBtnCount.textContent = arrayOfStudents.length;
              slytherinBtnCount.textContent = filterHouse("Slytherin").length;
              gryffindorBtnCount.textContent = filterHouse("Gryffindor").length;
              hufflepuffBtnCount.textContent = filterHouse("Hufflepuff").length;
              ravenclawBtnCount.textContent = filterHouse("Ravenclaw").length;
              
              console.log(array)
              displayStudents(array);
              
              
          }
        } 
        //Below is for removing array elements from the currently displaying array. So that the house can be filtered and then the house students being shown can also be sorted by names.
        for (let i = array.length - 1; i >= 0; --i) {
          if (array[i].studentID == newStud.studentID) {
              array.splice(i,1)  
              console.log(array);            
          }
        }

        for (let i = inquisitorialArray.length - 1; i >= 0; --i) {
          if (inquisitorialArray[i].studentID == newStud.studentID) {
              inquisitorialArray.splice(i,1)
              console.log(inquisitorialArray)
              displayStudents(array);
          }
         }
        
        
        displayStudents(array);
      }); 
      
      
      //Setting the number of students within each category
      
      studentBlockGrid.appendChild(clone);
    })
    
     // Making sure that the displayed array is the current array, to be sorted
    
      currentArray = array;
      //console.log(currentArray)
    
  }

    // We need to create a function that returns an array of only specific students.
  function filterHouse(house){
    let houseFiltered = [];

    houseFiltered = arrayOfStudents.filter(ele => ele.house === house);
    return houseFiltered;

  }

  //Testing -- WORKS!
  //filterHouse("Slytherin");
  //Now making buttons work to filter by house


  function displayAll(){
    displayStudents(arrayOfStudents);
  }

  function filterSlytherin (){
    
    displayStudents(filterHouse("Slytherin"));
  }
  function filterGryffindor (){
    displayStudents(filterHouse("Gryffindor"));
  }
  function filterHufflepuff (){
    displayStudents(filterHouse("Hufflepuff"));
  }
  function filterRavenclaw (){
    displayStudents(filterHouse("Ravenclaw"));
   
  }

  let allFilterBtn = document.querySelector("button#all");
  let slytherinFilterBtn = document.querySelector("button#slytherin");
  let gryffindorFilterBtn = document.querySelector("button#gryffindor");
  let hufflepuffFilterBtn = document.querySelector("button#hufflepuff");
  let ravenclawFilterBtn = document.querySelector("button#ravenclaw");

  allFilterBtn.addEventListener("click", displayAll);
  slytherinFilterBtn.addEventListener("click", filterSlytherin);
  gryffindorFilterBtn.addEventListener("click", filterGryffindor);
  hufflepuffFilterBtn.addEventListener("click", filterHufflepuff);
  ravenclawFilterBtn.addEventListener("click", filterRavenclaw);

  // Now allowing the sorting of whichever array is currently in use on the page
  // console.log(currentArray)

  // Sorting by last name, taking the current array
  function sortByFirstName(){
    let sortedArray;
    sortedArray = currentArray.sort((a, b) => a.firstname.localeCompare(b.firstname));
    displayStudents(sortedArray);
  }
  // Sorting by last name, taking the currenty array
  function sortByLastName(){
    let sortedArray;
    sortedArray = currentArray.sort((a, b) => a.lastname.localeCompare(b.lastname));
    displayStudents(sortedArray);
  }

  // Code below for adding blood types to student objects
  function getJSON2() {
    fetch("http://petlatkea.dk/2019/hogwarts/families.json")
      .then(e => e.json())
      .then(updateStudents);
  }

  function updateStudents(data){
    //console.log(data.half);
    data.half.forEach( personLastName => {
      
      const obj = arrayOfStudents.find( ele => ele.lastname === personLastName);
      // console.log(obj);
      if(obj){
      obj.bloodStatus = "Half";
      }
      // console.log(obj);  
    })
    data.pure.forEach( personLastName => {
      
      const obj = arrayOfStudents.find( ele => ele.lastname === personLastName);
      // console.log(obj);
      if (obj){
      obj.bloodStatus = "Pure";
      } 
      // console.log(obj);   
    })

    arrayOfStudents.forEach(obj => {
      if (!obj.bloodStatus){
        obj.bloodStatus = "Muggle";
        // console.log(obj);
      }
    })
  }











