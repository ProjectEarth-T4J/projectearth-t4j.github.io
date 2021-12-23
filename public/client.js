let box = document.querySelector('.box');
let shadow = '';
// for (var i = 0; i< 50; i++){
//     shadow += (shadow? ',':'')+ i*-1+'px '+ i*1+'px 0 #423a57';
// }
// box.style.boxShadow = shadow;


let text = document.getElementById('text');
let bard1 = document.getElementById('bird1');
let bard2 = document.getElementById('bird2');
let forest = document.getElementById('forest');
let rocks = document.getElementById('rocks');
let water = document.getElementById('water');
let btn = document.getElementById('btn');
let header = document.getElementById('header');

window.addEventListener('scroll',function(){
    let value = window.scrollY;
    
    // HEADER ANIMATION
    text.style.top = 40 + value * -0.5 + '%';
    bird1.style.top = value * -1.5 + 'px';
    bird1.style.left = value * 2 + 'px';
    bird2.style.top = value * -1.5 + 'px';
    bird2.style.left = value * -5 + 'px';
    
    btn.style.marginTop = value * 1.5 + 'px';
    rocks.style.top = value * -0.12 + 'px';
    forest.style.top = value * -0.12 + 'px';
    // header.style.top = value * -0.5 + 'px';
    
})



mediumZoom('.zoom', {
    margin: 50,
    scrollOffset: 200,
    background: '#000'
})

mediumZoom('.zoom-tmp', {
    margin: 24,
    scrollOffset: 0,
    template: '#zoom-template',
    container: '#zoom-container'
})

let tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.dark',
        start: "center bottom"
    }
});

tl.from('.img_sub', { x: 200, opacity: 0, duration: 1.5 })
    .from(".content", { y: 300, opacity: 0, duration: 1 }, '-=1')