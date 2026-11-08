import { createInputList, createCheckList } from './input.js';
import { createButtons } from './button.js'


export function createPopup( popupData ) {
    const layerPopup = document.createElement('div');
    let popupName = popupData.info.category + popupData.info.date;
    let popupId = `popup_${popupName}`;
    layerPopup.id = popupId;
    layerPopup.tabIndex = '0';
    layerPopup.classList.add('layerPopup', 'hide');

    layerPopup.innerHTML = `
        <div class="popupBox">
            <div class="popupTit">
                <h3>${popupData.info.title}</h3>
                <button class="btn btnClose X" type="button">닫기</button>
            </div>
            <div class="popupCont"></div>
        </div>
    `;
    document.body.append(layerPopup);


    const popupCont = layerPopup.querySelector(".popupCont");

    if ( popupData.info.content ) {
        const contentBox = document.createElement('div');
        contentBox.classList.add('contentBox');
        contentBox.innerHTML = `<p>${popupData.info.content}</p>`

        popupCont.append(contentBox);
    }
    if( popupData.inputFields ) {
        const inputList = createInputList(popupName, popupData.inputFields);
        popupCont.append(inputList);
    }
    if ( popupData.checkFields ) {
        const checkWrapper = createCheckList(popupName, popupData.checkFields);
        popupCont.append(checkWrapper);
    }
    if ( popupData.buttonFields ) {
        const btnBox = createButtons(popupData.buttonFields);
        popupCont.append(btnBox);
    }

    const btnCloses = layerPopup.querySelectorAll('.btnClose');
    btnCloses.forEach(btnClose => {
        btnClose.onclick = () => closePopup(popupId);
    });
}

function resetInput(targetElementId) {
    const resetElements = document.getElementById(targetElementId).querySelectorAll('input, textarea');
    
    resetElements.forEach(el => {
        el.value = '';
        el.checked = false;
    })
}

// 팝업 열기 함수
export function openPopup(targetElementId) {
    document.getElementById(targetElementId).classList.add("show");
    document.getElementById(targetElementId).classList.remove("hide");
    document.body.classList.add("scrollLock");

    setTimeout ( () => {
        document.getElementById(targetElementId).style.overflowY = "auto";
    }, 500)

    document.getElementById(targetElementId).focus();
}

// 팝업 닫기 함수
export function closePopup(targetElementId) {
    document.getElementById(targetElementId).classList.remove("show");
    document.getElementById(targetElementId).style.overflowY = "hidden";
    setTimeout ( () => {
        document.getElementById(targetElementId).classList.add("hide");
        document.body.classList.remove("scrollLock");
        resetInput(targetElementId);
    }, 500)
}

// 전역으로 등록
window.openPopup = openPopup;
window.closePopup = closePopup;