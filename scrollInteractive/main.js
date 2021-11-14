(() => {
    const actions = {

        birdFlies(key) {
            if (key) {
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`;
            } else {
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`; //기존 css값으로 되돌림
            }
        },

        birdFlies2(key) {
            if (key) {
                document.querySelector('[data-index="5"] .bird').style.transform = `translate(${window.innerWidth}px,-${window.innerHeight *0.7}px)`;
            } else {
                document.querySelector('[data-index="5"] .bird').style.transform = `translateX(-100%)`;
            }
        }
    };

    const stepElems = document.querySelectorAll('.step'); //class step을 가진 모든 요소를 가져온다
    const graphicElems = document.querySelectorAll('.graphic-item');

    let currentItem = graphicElems[0]; //현재 활성화된(visible 클래스가 붙은) .graphic-item을 지정
    let ioIndex;

    const io = new IntersectionObserver((entries, observer) => {
        ioIndex = entries[0].target.dataset.index * 1; //검은색 문자열로 들어감, 숫자로 바꾸기

    });

    function activate(action) {
        currentItem.classList.add('visible'); //classList.add('','',''); 클래스 추가
        if (action) {
            actions[action](true); //.도 가능하지만 작은괄호[]도 가능하다
        }
    }

    function inactivate(action) {
        currentItem.classList.remove('visible');
        if (action) {
            actions[action](false); //.도 가능하지만 작은괄호[]도 가능하다
        }
    }

    for (let i = 0; i < stepElems.length; i++) {
        io.observe(stepElems[i]);

        //stepElems[i].setAttribute('data-index', i);
        stepElems[i].dataset.index = i; //이건 data 속성의 한요소
        graphicElems[i].dataset.index = i;
    }

    

    window.addEventListener('scroll', () => { //스크롤 시 이벤트를 발생시킨다.
        let step, boundingRect;


        //for (let i =0 ; i < stepElems.length; i++){
        for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
            step = stepElems[i];
            if (!step) continue; //포문 돌아가세요 step값이 없다면 
            boundingRect = step.getBoundingClientRect(); //rectDOM(step의 위치 좌표정보를 가지고 있음) 객체를 반환
            //console.log(boundingRect);  //

            if (boundingRect.top > window.innerHeight * 0.1 &&
                boundingRect.top < window.innerHeight * 0.8) {
                //console.log(step.dataset.index);
                inactivate(currentItem.dataset.action);
                currentItem = graphicElems[step.dataset.index];
                activate(currentItem.dataset.action);
            }
        }
    });

    window.addEventListener('load', () => {
        setTimeout(() => scrollTo(0, 0), 100);
    });
    activate();
})();