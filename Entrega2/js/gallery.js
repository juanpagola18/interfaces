let index=0;
document.querySelector('#btn-prev-img').addEventListener('click',()=>changeDisplay(-1,ulImg));
document.querySelector('#btn-next-img').addEventListener('click',()=>changeDisplay(1,ulImg));

function changeDisplay(num,liElement){
    if((num==-1)&&(index==0)){
     liElement[index].classList.toggle('notShow');
     index=liElement.length-1;
     liElement[index].classList.toggle('notShow');
    }else if((num==1)&&(index>=liElement.length-1) ){
     liElement[index].classList.toggle('notShow');
     index=0;
     liElement[index].classList.toggle('notShow');
    }else{
     liElement[index].classList.toggle('notShow');
     index+=num;
     liElement[index].classList.toggle('notShow');
     
    }
 }