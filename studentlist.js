"use strict";

window.addEventListener("DOMContentLoaded", init);

let studentBlockGrid = document.querySelector('#student-block-grid');
let studentBlockContent = document.querySelector('#student-block-template').content;

function init() {
  getJSON();
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

  const arrayOfStudents = [];
  let currentArray = [];
  let expelledStudents = [];
  let studentCount = 0;
  // House Arrays
  let arrayOfGryffindor = [];
  let arrayOfSlytherin = [];
  let arrayOfHufflepuff = [];
  let arrayOfRavenclaw = [];

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
      displayStudents(arrayOfStudents);
      arrayOfGryffindor = filterHouse("Gryffindor");
      arrayOfSlytherin = filterHouse("Slytherin");
      arrayOfHufflepuff =  filterHouse("Hufflepuff"); 
      arrayOfRavenclaw =  filterHouse("Ravenclaw");
       
  }

  //Creating function to display students from the Student objects we've just created and stored into arrayOfStudents.

  function displayStudents(array){
      studentBlockGrid.innerHTML = "";
      
      array.forEach(newStud => {
      const clone = studentBlockContent.cloneNode(true);
      //console.log(newStud)
      
      clone.querySelector("#first-name span").textContent = newStud.firstname;
      
      clone.querySelector("#last-name span").textContent = newStud.lastname;
      clone.querySelector("#house").textContent = newStud.house;
      clone.querySelector("#house-color").classList.add(`${newStud.house}`);
        //setting dataset id to be equal to studentID from initialized when the object was created
      let studentBlock = clone.querySelector("#student-block");
      studentBlock.dataset.studentid = newStud.studentID;
      console.log(array)
      let expelBtn = clone.querySelector("button#expel");
      expelBtn.dataset.expelid = newStud.studentID;
      expelBtn.addEventListener("click", function(){
        // Removing the student from the current array
        array.shift(newStud);
        // Pushing the expelled student to the expelled students Array;
        studentBlock.style.display = "none";
        expelledStudents.push(newStud);
        console.log(array)
        console.log(studentCount)
        
      });   

      studentBlockGrid.appendChild(clone);
    })
    currentArray = array; // Making sure that the displayed array is the current array, to be sorted
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
    
    displayStudents(arrayOfSlytherin);
  }
  function filterGryffindor (){
    displayStudents(arrayOfGryffindor);
  }
  function filterHufflepuff (){
    displayStudents(arrayOfHufflepuff);
  }
  function filterRavenclaw (){
    displayStudents(arrayOfRavenclaw);
   
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

  //
  const sortByFirstNameBtn = document.querySelector("button#sort-first-name");
  const sortByLastNameBtn = document.querySelector("button#sort-last-name");

  sortByFirstNameBtn.addEventListener("click", sortByFirstName);
  sortByLastNameBtn.addEventListener("click", sortByLastName);

  // Function to remove blocks with specific dataset id's
  // $('[data-id="26"]').remove();

  function expelStudent(){
    if (this.dataset.expelid === this.dataset.studentid){
      document.querySelector("[data-studentid='1']").remove();
    }
  } 









