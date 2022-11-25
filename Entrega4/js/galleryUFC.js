let index=0;
document.querySelector('#btn-prev-img').addEventListener('click',()=>changeDisplay(-1,ulImg));
document.querySelector('#btn-next-img').addEventListener('click',()=>changeDisplay(1,ulImg));

function changeDisplay(num,liElement){
    console.log(liElement);
    if((num==-1)&&(index==0)){
     
     liElement[index].classList.toggle('notShow');
     liElement[index].classList.toggle('appear');
     index=liElement.length-1;
     liElement[index].classList.toggle('notShow');
     liElement[index].classList.toggle('appear');
    }else if((num==1)&&(index>=liElement.length-1) ){
     liElement[0].classList.toggle('appear');
     liElement[index].classList.toggle('notShow');
     liElement[index].classList.toggle('appear');
     index=0;
     liElement[index].classList.toggle('notShow');
     liElement[index].classList.toggle('appear');
    }else{
     liElement[index].classList.toggle('notShow');
     liElement[index].classList.toggle('appear');
     index+=num;
     liElement[index].classList.toggle('notShow');
     liElement[index].classList.toggle('appear');
     
    }
 }
