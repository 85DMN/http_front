export default function delert(z){
  const parent = document.querySelector('body');
  let element = document.createElement('div');
  element.classList.add('warning');
  element.innerHTML = `
    <div class="modalDel">
        <p>Удалить тикет?</p>
        <p>Вы уверены, что хотите это сделать? Действия необратимы...</p>            
        
        <div class="group">
            <button>Отмена</button>
            <button type = 'submit'>Ok</button>
        </div>        
    </div>`;
  parent.append(element);
  return new Promise ((resolve,reject) => {
    element.addEventListener('click', (event)=>{
      if (event.target.textContent=='Ok'){
        
        z.parentNode.remove();//удаление элемента по ID!!!

        // console.log(z.id)
        
        resolve(z.id)
      }
      else{
        reject(console.log('XЗ'))
      }
      element.remove();

    });
  })
}