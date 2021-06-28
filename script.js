// container class
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = parseInt(movieSelect.value);
populateUI();

function setMovieData(movieIndex,moviePrice){
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);

}

function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // copy selected seats into an array
    // map through array
    // return a new array indices
    // ... is a spread operator
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat)
    );
    // console.log(seatsIndex);

    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));

    const selectedseatsCount = selectedSeats.length;
    // console.log(selectedseatsCount);
    count.innerText = selectedseatsCount;
    total.innerText = selectedseatsCount * ticketPrice;
}
// get data from local storage and populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats!==null && selectedSeats.length > 0){
        seats.forEach((seat,index) =>{
        if(selectedSeats.indexOf(index) > -1){
            seat.classList.add('selected');
        }    
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex; 
        movieSelect.value = selectedMoviePrice;
    }
    // initial count and total set
    // updateSelectedCount();

}

// movieselect event

movieSelect.addEventListener('change', e=>{
    ticketPrice = parseInt(e.target.value);
    setMovieData(e.target.selectedIndex,e.target.value);
    updateSelectedCount();
});

// seat click event
container.addEventListener('click',(e) =>{
      if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        //   console.log(e.target);
        e.target.classList.toggle('selected');
        updateSelectedCount();
      }
  }
);

updateSelectedCount();