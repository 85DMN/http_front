import razmetka from './razmetka.js';
import dater from './dater.js';

export default function correcter(z,m){
  let varter = [
    'Создание тикера','Корректировка тикера'
  ];
  let header = varter[m];
  const parent = document.querySelector('body');
  let element = document.createElement('div');
  element.classList.add('warning');

  if (m==1){//для старого
    let analiz = z.querySelector('.mnems');
    let short = `${analiz.querySelector('p').textContent}`;
    let foolly = `${analiz.dataset.content}`;

    element.innerHTML = razmetka(header,short,foolly);

    parent.append(element);
    return new Promise ((resolve,reject) => {
      element.querySelector('.group').addEventListener('click', (event)=>{
        event.preventDefault();
        
        if (event.target.textContent=='Ok'){
          // console.log(analiz);
          analiz.querySelector('p').textContent = element.querySelector('.short').value;
          analiz.dataset.content = element.querySelector('.foolly').value;
          let timer = dater();
          // let tm = (analiz.parentNode).querySelector('.time');

          // tm.textContent = `${timer[0]}:${timer[1]}:${timer[2]} ${timer[3]}:${timer[4]}`;
          element.remove();
          resolve({
            name: element.querySelector('.short').value,
            description: element.querySelector('.foolly').value
          })
          //удалить элемент на сервере по id
        } 
        else {
          element.remove();
          reject(0)
        }
      })
    })    
  }
  else {//для нового
    let header = varter[m];
    let short = '';
    let foolly = '';
    element.innerHTML = razmetka(header,short,foolly);
    parent.append(element);
    return element;
  }
}