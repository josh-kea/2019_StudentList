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
    secondname: "--Second Name--",
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
      displayStudents();
  }

  //Creating function to display students from the Student objects we've just created and stored into arrayOfStudents.

  function displayStudents(){
    arrayOfStudents.forEach(newStud => {
      let clone = studentBlock.cloneNode(true);
      console.log(newStud)

      clone.querySelector("#first-name span").textContent = newStud.firstname;
      clone.querySelector("#second-name span").textContent = newStud.secondname;;
      clone.querySelector("#last-name span").textContent = newStud.lastname;;
      clone.querySelector("#house span").textContent = newStud.house;

      studentBlockGrid.appendChild(clone);


    })
  }