let index=0;
document.querySelector('#btn-prev-img').addEventListener('click',()=>changeDisplay(-1,ulImg));
document.querySelector('#btn-next-img').addEventListener('click',()=>changeDisplay(1,ulImg));
let hero =document.querySelectorAll('.hero_image');
window.addEventListener('scroll', showScroll)
let feature =document.querySelectorAll('.feature');
let circle =document.querySelectorAll('.efect_circle');
let stats =document.querySelectorAll('.hero_stats');

let info_1 = document.querySelector('#info_1');
let altura_info_1 = info_1.offsetTop;

let info_2 = document.querySelector('#info_2');
let altura_info_2 = info_2.offsetTop;
let info_3 = document.querySelector('#info_3');
let altura_info_3 = info_3.offsetTop;
let info_content = document.querySelector('.info_content');


function changeDisplay(num,liElement){
    
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
            
                hero[i].classList.add('showUp');
                hero[i].classList.remove('showDown');
                circle[i].classList.add('showUp');
                circle[i].classList.remove('showDown');
                stats[i].classList.add('showUp');
                stats[i].classList.remove('showDown');
           
        }
        if(alturaHero-500 > scrollTop){
            
                hero[i].classList.add('showDown');
                hero[i].classList.remove('showUp');
                circle[i].classList.add('showDown');
                circle[i].classList.remove('showUp');
                stats[i].classList.add('showDown');
                stats[i].classList.remove('showUp');
          
        }

       
    }
    for (var i=0; i< feature.length; i++){
        let alturafeature = feature[i].offsetTop;

        if(alturafeature-500 < scrollTop){
            if(i<2){
                feature[i].classList.add('showLeft')
            }
            else{
                feature[i].classList.add('showRight')
            }
        }
        if(alturafeature-500 > scrollTop){
            if(i<2){
                feature[i].classList.remove('showLeft')
            }
            else{
                feature[i].classList.remove('showRight')
            }
        }
    }
    if(info_content.offsetTop > scrollTop){
        console.log(altura_info_1)
        console.log(scrollTop)
   if((altura_info_1-450 < scrollTop-300)){
        
        info_1.classList.add('showInfo');
        info_2.classList.add('notShowInfo');
        info_3.classList.add('notShowInfo');
        info_1.classList.remove('notShowInfo');
        info_2.classList.remove('showInfo');
        info_3.classList.remove('showInfo');
    }   
    if(((altura_info_1-150 < scrollTop-200))&&((altura_info_1-450 < scrollTop))){
       
        
        info_2.classList.add('showInfo');
        info_1.classList.add('notShowInfo');
        info_3.classList.add('notShowInfo');
        info_2.classList.remove('notShowInfo');
        info_3.classList.remove('showInfo');
        info_1.classList.remove('showInfo');

    }
    if((altura_info_1 < scrollTop-100)){
        
        info_3.classList.add('showInfo')
        info_1.classList.add('notShowInfo');
        info_2.classList.add('notShowInfo');
        info_3.classList.remove('notShowInfo');
        info_2.classList.remove('showInfo');
        info_1.classList.remove('showInfo');
    }
}
}

