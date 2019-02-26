"use strict";

window.addEventListener("DOMContentLoaded", init);



function init() {
  getJSON();
  console.log(JSON)

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

  function createStudents(data){
    data.forEach(student => {
        let newStudent = Object.create(Student);

        let fullName = student.fullname.split(' ');
        
        newStudent.firstname = fullName[0];
        newStudent.lastname = fullName[1];
        

      })
  }