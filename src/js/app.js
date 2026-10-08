// import razmetka from './razmetka.js';
import correcter from './corrector.js';
import delert from './delert.js';
// import dater from './dater.js';
import adder from './adder.js';
import calculatePosition from './calculatePosition.js';
import ServerMethod from './query.js';

document.addEventListener('DOMContentLoaded', () => {
  const strt = new ServerMethod();

  let finish = 0

  
  strt.allTickets()
    .then(result => {
      console.log(result)
      result.forEach((rt) => {
        finish += 1,
        adder(rt)
      });
    })
    .catch(err => {
      console.error('Ошибка:', err);
    });
  
  let usedF = false;
  const columns = document.querySelectorAll('.container');
  columns.forEach((el)=>{
    el.addEventListener('click', (event)=>{// обработчик добавления карточек
      const chilr = event.target;
      if (chilr.tagName=='SPAN' && (document.querySelector('.warning')==null)){
        const ert = chilr.parentNode;
        const ertV = ert.parentNode;

        delert(ertV)//удаляем на сервере по id
          .then(result => {
            strt.deleteById(result)
            // strt.byId(result)
          })
          .catch(err => {
            console.log(`Ошибка: ${err}`)
          });

        const cort = document.querySelector('.warning');
        const position = calculatePosition(chilr, cort);
        cort.style.top = `${position.top}px`;
        cort.style.left = `${position.left}px`;;
      }
      else if (chilr.tagName == 'IMG' && (document.querySelector('.warning')==null)){
       
        correcter((event.target.parentNode).parentNode,1)
          .then(result => {
            console.log(result,(event.target.parentNode).parentNode)
            strt.updateTicker(
              (event.target.parentNode).parentNode.id,
              result.name,
              result.description,
              (event.target.parentNode).parentNode.querySelector('input').checked

            )
            //
          })
          .catch(err => {
            console.log(`Ошибка: ${err}`)
          })
        const cort = document.querySelector('.warning');
        const position = calculatePosition(chilr, cort);
        cort.style.top = `${position.top}px`;
        cort.style.left = `${position.left}px`;
        // if move

      }
      else {
        if (event.target.classList.contains('audio')){//создание нового тикера

          usedF = !usedF;
          if (usedF===true){
            usedF = !usedF;

            let nEl = correcter(event.target,0);
            const position = calculatePosition(nEl,event.target);
            nEl.style.top = `${position.top-150}px`;
            nEl.style.left = `${position.left+50}px`;

            nEl.querySelector('.group').addEventListener('click', (event) => {
              event.preventDefault();
              if(event.target.textContent == 'Ok'){

                finish +=1 
                strt.changeTicket(
                  nEl.querySelector('.short').value,
                  nEl.querySelector('.foolly').value,
                  false
                )

                strt.byId(finish)
                  .then(result => {                    
                    adder(result)                    
                  })
                  .catch(err => {
                    console.error('Ошибка:', err);
                  });

                let fieldz = {
                  id: finish,
                  name: nEl.querySelector('.short').value,
                  description: nEl.querySelector('.foolly').value,
                  status:false,
                  created:Date.now()
                }

                adder(fieldz);
                // запузыриваем новый объект

                // console.log()
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
          if (data.children.length == 1){//добавление описания на страницу при надатии на текст
            let element1 = document.createElement('p');
            data.append(element1);
            element1.textContent = data.dataset.content;
          } else {//скрытие описания
            data.children[1].remove();
          }
        }
        else if (event.target.tagName == 'INPUT'){//изменение статуса тикера
          let st = (event.target.parentNode).parentNode//.id
          //изменить состояние по id
          strt.updateTicker(
            st.id,
            st.querySelector('.mnems').dataset.content,
            st.parentNode.querySelector('P').textContent,
            event.target.checked
          );
        }
      };
    });
  });
});
