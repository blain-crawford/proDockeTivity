import './styles.css';
import { compareAsc, format } from 'date-fns';

format(new Date(2014, 1, 11), 'yyy-MM-dd');
const dates = [
  new Date(1995, 6, 2),
  new Date(1987, 1, 11),
  new Date(1989, 6, 10),
];

let h1 = document.createElement('h1');
h1.innerText = 'Hello, World!';
document.body.appendChild(h1);
console.log(dates);

const printDates = (() => {
  dates.forEach((date) => {
    let h2 = document.createElement('h2');
    let dateDiv = document.createElement('div');
    h2.innerText = date;
    dateDiv.appendChild(h2);
    document.body.appendChild(dateDiv);
  })
})();

printDates();
