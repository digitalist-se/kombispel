const hej = (hej) => {return hej};
var cars = [
{
brand: "bmw",
produced: 1991,
status: "good",
seat: 2
},
{
brand: "volvo",
produced: 2001,
status: "ok",
seat: 5
},
{
brand: "saab",
produced: 2007,
status: "bad",
seat: 5
},
{
brand: "volkswagen",
produced: 2011,
status: "new",
seat: 7
}
]
cars.map(function(car) {
  // console.log(car.brand);
})
cars.map((car,index,all) => {
  // console.log(car.brand);
  // console.log(index);
  // console.log(all);
})
function onlyNew(car) {
  return car.produced > 2000;
}

let newCars = cars.filter((car) => car.produced > 2000)

let opel = {
brand: "opel",
produced: 1997,
status: "ok",
seat: 3
}
let moreCars = cars.concat(opel)


var header = document.getElementsByTagName('header')[0]
// console.log(header);
header.addEventListener("click",() => {
  // console.log("tjena tjabba");
})

// console.log(moreCars);
