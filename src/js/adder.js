import logo from '../images/pencil-crayon.png';
import dater from './dater.js';

export default function adder(ofg){
  let result = dater(ofg.created);

  const parent = document.querySelector('.content');
  let element = document.createElement('div');
  element.classList.add('element');
  element.innerHTML = `
        <div class='firstPart' id='${ofg.id}'> 
          <div class='checked'>
            <input type="checkbox"'>            
          </div>
          <div class='mnems'
                data-content = '${ofg.description}'>
            <p>${ofg.name}</p>
          </div>
          
          <div class='contT'>        
            <p class='time'>${result[0]}.${result[1]}.${result[2]} ${result[3]}:${result[4]}</p>
          </div>
          <div class='correct'>
            <img src = '${logo}'>
          </div>
          <div class='contain'>
            <span class="close-button">&times;</span>
          </div>                                         
        </div>        
    `;
  parent.append(element);

}