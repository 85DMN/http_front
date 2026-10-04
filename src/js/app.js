import razmetka from './razmetka.js';

import correcter from './corrector.js';

import delert from './delert.js';

import dater from './dater.js';

import adder from './adder.js';

import calculatePosition from './calculatePosition.js';

document.addEventListener('DOMContentLoaded', () => {
  let uchet = 0;

  // 'http://localhost:7070/?method=allTickets'

  // const xhr = new XMLHttpRequest();

  // // const body = new FormData(document)
  // encodeURIComponent
  // xhr.onreadystatechange = function() {/*write ghange*/
  //   if (xhr.readyState !==4) return
  //   console.log(xhr.readyState);
  // }
  // xhr.open("GET", 'http://localhost:7070/?method=allTickets')/*connect server*/
  // xhr.send()
  // console.log(xhr)

  let usedF = false;
  const columns = document.querySelectorAll('.container');
  columns.forEach((el)=>{
    el.addEventListener('click', (event)=>{// обработчик добавления карточек
      const chilr = event.target;
      if (chilr.tagName=='SPAN' && (document.querySelector('.warning')==null)){
        const ert = chilr.parentNode;
        const ertV = ert.parentNode;
        delert(ertV);
        const cort = document.querySelector('.warning');
        const position = calculatePosition(chilr, cort);
        cort.style.top = `${position.top}px`;
        cort.style.left = `${position.left}px`;;
      }
      else if (chilr.tagName == 'IMG' && (document.querySelector('.warning')==null)){
        correcter((event.target.parentNode).parentNode,1);
        const cort = document.querySelector('.warning');
        const position = calculatePosition(chilr, cort);
        cort.style.top = `${position.top}px`;
        cort.style.left = `${position.left}px`;
      }
      else {
        if (event.target.classList.contains('audio')){

          usedF = !usedF;
          if (usedF===true){
            usedF = false;

            let nEl = correcter(event.target,0);
            const position = calculatePosition(nEl,event.target);
            nEl.style.top = `${position.top-150}px`;
            nEl.style.left = `${position.left+50}px`;

            nEl.querySelector('.group').addEventListener('click', (event) => {
              event.preventDefault();
              if(event.target.textContent == 'Ok'){
                adder(nEl.querySelector('.short').value, nEl.querySelector('.foolly').value,uchet);
                uchet +=1;
                nEl.remove();
              }
              else {
                nEl.remove();
              }
            });
          }
        }
        else if (event.target.tagName == 'P' ){
          let data = event.target.parentNode;
          if (data.children.length == 1){
            let element1 = document.createElement('p');
            data.append(element1);
            element1.textContent = data.dataset.content;
          } else {
            data.children[1].remove();
          }
        }
        else if(event.target.tagName == 'INPUT'){
          console.log((event.target.parentNode).parentNode.id,'__changed__',event.target.checked);
          //изменить состояние по id
        }
      };
    });
  });
});
