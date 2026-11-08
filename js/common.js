// .intro 타자 효과 
function typeEffect(element, text, speed = 50) {
    // 태그와 텍스트를 구분하는 정규 표현식
    const textArray = text.match(/(<[^>]*>|[^<]+)/g); // 태그는 한 번에, 텍스트는 글자 단위로
    let arrayIndex = 0;
    let charIndex = 0;
  
    function type() {
        const current = textArray[arrayIndex];
  
        if (current.startsWith("<")) {
            // 태그일 경우 전체를 한 번에 추가
            element.innerHTML += current;
            arrayIndex++;
            charIndex = 0;
        } else {
            // 텍스트일 경우 한 글자씩 추가
            element.innerHTML += current[charIndex];
            charIndex++;
            // 현재 텍스트 조각의 마지막 글자에 도달하면 다음 텍스트나 태그로 넘어감
            if (charIndex >= current.length) {
            arrayIndex++;
            charIndex = 0;
            }
        }
  
        // 전체 텍스트가 출력될 때까지 반복
        if (arrayIndex < textArray.length) {
            setTimeout(type, speed);
        }
    }
  
    type();
}

const element = document.getElementById("typingEffect");
const text = '안녕하세요!<br><br>저는 이혜원이라고 합니다.<br>1993년생으로 올해 만 31살입니다.<br>원래 전공은 영문학과 경영학이었으나..<br>우연한 계기로 웹 퍼블리셔의 길을 걷게 되어<br>2년 넘게 경력을 쌓았습니다.<br>전부 유지보수 경력이었지만<br>구축에도 관심이 많습니다.<br><br>취미는 맛집 블로그 운영하기,<br>특기는 맛집 찾기 입니다.<br><br>잘 부탁드립니다!';
typeEffect(element, text);


// intro
const intro = document.querySelector("#intro");
const dim = intro.querySelector(".dim");
const introWindow = intro.querySelector(".windowStyle");

let x = 0,
    y = 0;

let targetX = 0,
    targetY = 0;

let speed = 0.08;


intro.addEventListener("mousemove", (event) => {
    x = event.pageX - ( window.innerWidth / 2 ) ;
    y = event.pageY - ( window.innerHeight / 2 );
})

const loop = () => {
    targetX += (x - targetX) * speed;
    targetY += (y - targetY) * speed;

    dim.style.transform = `translate3d(${targetX / 10}px, ${targetY /10}px, 0)`;
    introWindow.style.transform = `translate3d(${targetX / 30}px, ${targetY / 70}px, 0)`;
    window.requestAnimationFrame(loop);
}

loop();


//scroll 시 title과 element에 효과 주기 
document.addEventListener("DOMContentLoaded", () => {
    // 관찰할 요소들 선택
    const sections = document.querySelectorAll("h2.sectionTit");
    const windows = document.querySelectorAll("#skill .windowStyle");

    // Intersection Observer 옵션
    const options = {
        root: null,          // 뷰포트를 기준으로 관찰
        rootMargin: "50px",
        threshold: 0
    };

    // Intersection Observer 설정
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");   // 화면에 보이면 active 클래스 추가
            } else {
                entry.target.classList.remove("active"); // 화면에서 사라지면 active 클래스 제거
            }
        });
    }, options);

    // 각 요소에 대해 observer 등록
    sections.forEach((section) => observer.observe(section));
    windows.forEach((window) => observer.observe(window));
});



// .cursor 커서
const cursor = document.querySelector('.cursor');
const cursorBall = document.querySelector('.cursor_ball');

// 마우스가 움직일 때마다 커서 위치 업데이트
document.addEventListener('mousemove', (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    cursorBall.style.left = `${event.clientX}px`;
    cursorBall.style.top = `${event.clientY}px`;
});

// particle 애니메이션
const particleBox = document.querySelector(".particleBox");
let particleNum = 30;

for (let i = 0; i < particleNum; i++) {
    let size = getRandomNumber(4, 16),
        positionL = getRandomNumber(30, 100),
        animationName = `particle-move${getRandomNumber(1,2)}`,
        duration = getRandomNumber(15, 30),
        delay = getRandomNumber(0, 9);

    let newDiv = document.createElement("div");
    newDiv.classList.add("particle");

    newDiv.style.width = `${size}px`;
    newDiv.style.height = `${size}px`;
    newDiv.style.backgroundColor = `${getRandomColor()}`;
    newDiv.style.left = `${positionL}%`;

    newDiv.style.animationName = `${animationName}`;
    newDiv.style.animationDuration = `${duration}s`;
    newDiv.style.animationDelay = `${delay}s`

    particleBox.appendChild(newDiv);
}

function getRandomColor () {
    let letters = '0123456789ABCDEF',
        color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};
function getRandomNumber (min, max) {
    let randomNumber = Math.floor(Math.random()*(max-min+1) + min);
    return randomNumber;
};
