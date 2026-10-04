export default function razmetka(first,secont,third) {
  let razmt = `
    <div class="modalDel">
        <h4>${first}</h4>

        <p>Краткое описание</p>

        <div class='fp'>
          <input type='text' class='short' value='${secont}'>
        </div>
        <p>Подробное описание</p>
        <div class='sp'>
          <input type='text' class='foolly' value='${third}'>            
        </div>
        
        <div class="group">
            <button>Отмена</button>
            <button type = 'submit'>Ok</button>
        </div>        
    </div>`;
  return razmt;
}