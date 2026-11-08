const workItemArr = [
    {
        id: 1,
        name: '골든스테이',
        img: 'goldencity.gif',
        year: '2020',
        period: '14일',
        skill : 'HTML | CSS | JQuery',
        plugin : 'bxslider | swiper | fancybox',
        link: 'http://hwlee.kr/goldencity/main.html',
    },
    {
        id: 2,
        name: 'UN DOLCE',
        img: 'un-dolce.gif',
        year: '2020',
        period: '7일',
        skill : 'HTML | CSS | JQuery',
        plugin : 'fancybox',
        link: 'http://hwlee.kr/un-dolce/',
    },
    {
        id: 3,
        name: 'WOODZ',
        img: 'woodz.gif',
        year: '2020',
        period: '14일',
        skill : 'HTML | CSS | JQuery',
        plugin : 'scrollmagic | wow.js',
        link: 'http://hwlee.kr/woodz/',
    },
    {
        id: 4,
        name: 'H',
        img: 'profile2020.gif',
        year: '2020',
        period: '6일',
        skill : 'HTML | CSS | JQuery',
        plugin : 'scrollmagic | wow.js',
        link: 'http://hwlee.kr/profile/',
    },
]

// 포폴 데이터 리스트
const workList = document.querySelector("ul.workList"); // 포폴리스트 ul.workList
const bar = document.querySelector(".bar");

workItemArr.forEach((item)=> {
    let workItem = document.createElement("li");
    workItem.classList.add("workItem", "windowStyle");
    workItem.innerHTML = `
        <h3 class="title">${item.name}</h3>
        <a href="${item.link}" target="_blank">
            <img class="workImg" src="./img/${item.img}" alt="${item.name}" />
            <div class="workDesc">
                <p>작업연도 : ${item.year}년</p>
                <p>소요기간 : ${item.period}</p>
                <p>사용스킬 : ${item.skill}</p>
                <p>플러그인 : ${item.plugin}</p>
                <p>기여도 : 100%</p>
            </div>
        </a>
    `

    workList.prepend(workItem);
});


// 포폴 리스트 & bar 가로 스크롤
const stickyElem = document.querySelector(".workBox");
const stickyElemParent = stickyElem.parentElement;

let scrollY = 0,
    percent = 0,
    mouseX = 0,
    mouseY = 0;
let stickyElemParentY = stickyElemParent.offsetTop,
    stickyElemParentHeight =  stickyElemParent.clientHeight,
    stickyElemHeight = stickyElem.clientHeight,
    fixedLength = stickyElemParentY + stickyElemParentHeight - stickyElemHeight;

window.addEventListener("resize", () => {
    stickyElemParentY = stickyElemParent.offsetTop;
    stickyElemParentHeight =  stickyElemParent.clientHeight;
    stickyElemHeight = stickyElem.clientHeight;
    fixedLength = stickyElemParentY + stickyElemParentHeight - stickyElemHeight;
});

window.addEventListener("scroll", () => {
    scrollY = window.scrollY;

    if ( scrollY >= stickyElemParentY && scrollY < fixedLength) {
        percent = (( (scrollY - stickyElemParentY) / (fixedLength - stickyElemParentY)) * 100).toFixed(0);

        stickyElem.style.position = 'fixed';
        workList.style.transform = `translateX(${-percent}%)`;
        bar.style.width = `${percent}%`;
    } else if ( scrollY < stickyElemParentY ) {
        stickyElem.style.position = 'relative';
        workList.style.transform = `translateX(0)`;
        bar.style.width = `0`;
    } else {
        stickyElem.style.position = 'sticky';
        bar.style.width = `100%`;
    }
});


// 포폴 리스트 설명칸 애니메이션 방향 체크.
const workItem = document.querySelectorAll(".workItem");
const dirClassArr = ["in-left", "in-right", "out-left", "out-right"]; // 방향 클래스 리스트
let prevX = 0 // 이전 clientX 값
let delay = 100; // 방향 체크 주기

for( let i = 0; i < workItem.length; i++ ){
    workItem[i].addEventListener("mouseenter", (e) => {
        const xDir = prevX <= e.pageX ? "in-right" : "in-left";

        setTimeout(()=> {
            prevX = e.pageX;
        }, delay)
        
        if (xDir == "in-left") { // 오른쪽 -> 왼쪽 마우스 이동하면서 진입
            workItem[i].classList.remove(...dirClassArr);
            workItem[i].classList.add("in-left");
        } else { // 왼쪽 -> 오른쪽 마우스 이동하면서 진입
            workItem[i].classList.remove(...dirClassArr);
            workItem[i].classList.add("in-right");
        }

    });
    workItem[i].addEventListener("mouseleave", (e) => {
        const xDir = prevX <= e.pageX ? "out-right" : "out-left";

        setTimeout(()=> {
            prevX = e.pageX;
        }, delay)
        
        if (xDir == "out-left") { // 오른쪽 -> 왼쪽 마우스 이동하면서 나감
            workItem[i].classList.remove(...dirClassArr);
            workItem[i].classList.add(xDir);
        } else { // 왼쪽 -> 오른쪽 마우스 이동하면서 나감
            workItem[i].classList.remove(...dirClassArr);
            workItem[i].classList.add(xDir);
        }

    });
}