// var trash = document.getElementsByClassName("fa-trash");

// document.querySelector('button').addEventListener('click', getWorkout)

// function getWorkout(e){
//   e.preventDefault()
//     const focusType = document.querySelector('input[class = type]:checked').value
//     const focusMuscle = document.querySelector('input[class = muscle]:checked').value
//     const focusDifficulty = document.querySelector('input[name = difficulty]:checked').value;
        
//     const url = `https://api.api-ninjas.com/v1/exercises?x-api-key=ZtXysEAnTDhvYJoFgTOTfFCutwSsamA5e2DQXAuT`
   
//   fetch(url)
//   .then(res => res.json())
//   .then(data => {
//     console.log(data)
//     for (let i = 0; i < 3; i++){
//       let apiWorkouts = document.querySelector('#apiWorkouts')
//       let apiName = document.createElement('li')
//       let apiDifficulty = document.createElement('li')
//       let apiEquipment = document.createElement('li')
//       let apiMuscle = document.createElement('li')
//       let apiType = document.createElement('li')

//       apiName.innerText = data[i].name
//       apiDifficulty.innerText = data[i].difficulty
//       apiEquipment.innerText = data[i].equipment
//       apiMuscle.innerText = data[i].muscle
//       apiType.innerText = data[i].type

//       apiWorkouts.appendChild(apiName)
//       apiWorkouts.appendChild(apiDifficulty)
//       apiWorkouts.appendChild(apiEquipment)
//       apiWorkouts.appendChild(apiMuscle)
//       apiWorkouts.appendChild(apiType )
//     }

//   }, error => {
//     console.log(error);
//   });
// }

// 

var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var trash = document.getElementsByClassName("fa-trash");

Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const type = this.parentNode.parentNode.childNodes[3].innerText
        const muscle = this.parentNode.parentNode.childNodes[5].innerText
        const equipment = this.parentNode.parentNode.childNodes[7].innerText
        const difficulty = this.parentNode.parentNode.childNodes[9].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[11].innerText)
        fetch('workouts/thumbUp', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'type': type,
            'muscle': muscle,
            'equipment': equipment,
            'difficulty': difficulty,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(thumbDown).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
        const type = this.parentNode.parentNode.childNodes[3].innerText
        const muscle = this.parentNode.parentNode.childNodes[5].innerText
        const equipment = this.parentNode.parentNode.childNodes[7].innerText
        const difficulty = this.parentNode.parentNode.childNodes[9].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[11].innerText)
    // const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
    fetch('workouts/thumbDown', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
            'type': type,
            'muscle': muscle,
            'equipment': equipment,
            'difficulty': difficulty,
            'thumbUp':thumbUp
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const type = this.parentNode.parentNode.childNodes[3].innerText
        const muscle = this.parentNode.parentNode.childNodes[5].innerText
        const equipment = this.parentNode.parentNode.childNodes[7].innerText
        const difficulty = this.parentNode.parentNode.childNodes[9].innerText
        fetch('workouts', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'type': type,
            'muscle': muscle,
            'equipment': equipment,
            'difficulty': difficulty

          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

