"use strict";

window.addEventListener("DOMContentLoaded", init);

let studentBlockGrid = document.querySelector('#student-block-grid');
let studentBlock = document.querySelector('#student-block-template').content;

function init() {
  getJSON();
  console.log(arrayOfStudents)

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
    house: "--House--"
  }

  const arrayOfStudents = [];

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

        // console.log(newStudent);

        arrayOfStudents.push(newStudent);
      })
      displayStudents(arrayOfStudents);
  }

  //Creating function to display students from the Student objects we've just created and stored into arrayOfStudents.

  function displayStudents(array){
      array.forEach(newStud => {
      const clone = studentBlock.cloneNode(true);
      console.log(newStud)
      
      clone.querySelector("#first-name span").textContent = newStud.firstname;
      
      clone.querySelector("#last-name span").textContent = newStud.lastname;
      clone.querySelector("#house").textContent = newStud.house;
      clone.querySelector("#house-color").classList.add(`${newStud.house}`);
      studentBlockGrid.appendChild(clone);
    })
  }

    // We need to create a function that returns an array of only specific students.

  function filterHouse(house){
    let houseFiltered;

    houseFiltered = arrayOfStudents.filter(ele => ele.house === house);
    
    return houseFiltered;

  }

  //Testing -- WORKS!
  filterHouse("Slytherin");
  //Now making buttons work to filter by house






