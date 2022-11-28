let index=0;
document.querySelector('#btn-prev-img').addEventListener('click',()=>changeDisplay(-1,ulImg));
document.querySelector('#btn-next-img').addEventListener('click',()=>changeDisplay(1,ulImg));
let hero =document.querySelectorAll('.hero');
window.addEventListener('scroll', showScroll)


let info_1 = document.querySelector('#info_1');
let altura_info_1 = info_1.offsetTop;

let info_2 = document.querySelector('#info_2');
let altura_info_2 = info_2.offsetTop;
let info_3 = document.querySelector('#info_3');
let altura_info_3 = info_3.offsetTop;
let info_content = document.querySelector('.info_content');


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

 function showScroll(){
    
    let scrollTop = document.documentElement.scrollTop;
    
    for (var i=0; i< hero.length; i++){
        let alturaHero = hero[i].offsetTop;

        if(alturaHero-500 < scrollTop){
            if(i<3){
                hero[i].classList.add('showLeft')
            }
            else{
                hero[i].classList.add('showRight')
            }
        }
        if(alturaHero-500 > scrollTop){
            if(i<3){
                hero[i].classList.remove('showLeft')
            }
            else{
                hero[i].classList.remove('showRight')
            }
        }
    
   
       
    }
    if(info_content.offsetTop > scrollTop){
        console.log("info1 " +altura_info_1)
        console.log("info2 " +altura_info_2)
        console.log("info3 " +altura_info_3)
        console.log(scrollTop)
        console.log(info_content.offsetTop) 
   if((altura_info_1-450 < scrollTop-200)){
        
        console.log("ee1")
        info_1.classList.add('showInfo');
        info_2.classList.add('notShowInfo');
        info_3.classList.add('notShowInfo');
        info_1.classList.remove('notShowInfo');
        info_2.classList.remove('showInfo');
        info_3.classList.remove('showInfo');
    }   
    if(((altura_info_1-350 < scrollTop-200))&&((altura_info_1-450 < scrollTop))){
        console.log("ee2")
        
        info_2.classList.add('showInfo');
        info_1.classList.add('notShowInfo');
        info_3.classList.add('notShowInfo');
        info_2.classList.remove('notShowInfo');
        info_3.classList.remove('showInfo');
        info_1.classList.remove('showInfo');

    }
    if((altura_info_1-250 < scrollTop-200)){
        console.log("eeee3")
        info_3.classList.add('showInfo')
        info_1.classList.add('notShowInfo');
        info_2.classList.add('notShowInfo');
        info_3.classList.remove('notShowInfo');
        info_2.classList.remove('showInfo');
        info_1.classList.remove('showInfo');
    }
}
 }
