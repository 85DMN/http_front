export default function dater(){
  let date = new Date();
  let analiz = [
    date.getDate(),date.getMonth()+1,date.getFullYear(),date.getHours(),date.getMinutes()
  ];
  let s = 0;
  let result = [];
  analiz.forEach((evt)=>{
    let nW = (evt.toString()).split('');
    let nWm;
    if (s!=2){
      if (nW.length==1){
        nWm = ([
          '0',nW[0]
        ]).join('');
      } else {
        nWm = nW.join('');
      }
    } else {
      nWm = (nW.slice(2, nW.length)).join('');
    }
    result.push(nWm);
    s+=1;

  });
  return result;
}
