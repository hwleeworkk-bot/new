function inputListItem(name, fields = []) {
    return `
        ${fields.map(field => `
            <div class="inputBox ${field.required ? 'required': ''}">
                ${field.type === 'textarea' ? '<textarea' : ' <input'}
                    type="${field.type}" 
                    id="${name+field.id}" 
                    placeholder="${field.placeholder}" 
                    maxlength="${field.maxlength}"
                    ${field.type === 'textarea' ? '></textarea>' : ' />'}
                <label for="${name+field.id}">
                    <span>${field.label}</span>
                </label>
                <p class="errorMessage">${field.errorMessage}</p>
            </div>
        `).join('')}
    `;
}

export function createInputList(name, fields) {
    if (!fields) return;

    const inputList = document.createElement('div');
    inputList.classList.add('inputList');
    inputList.innerHTML = inputListItem(name, fields);

    // 이벤트 리스너 추가
    const inputs = inputList.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        if (input.type === 'text') {
            input.addEventListener('input', (e) => {
                allowKoreanOnly(e.target); // 한국어 입력 제한
                removeWhitespace(e.target);  // 공백 제거
            });
        } else if (input.type === 'tel') {
            input.addEventListener('input', (e) => {
                formatPhoneNumber(e.target); // 전화번호 포맷
            });
        }
    });

    return inputList;
}

function checkListItem(name, fields = []) {
    return `
        ${fields.map((field, index) => `
            <div class="checkBox ${field.required ? 'required' : ''}">
                <input id="${name + index}" type="checkbox" class="invisible">
                <label for="${name + index}" class="checkLabel">
                    <div class="svgBox">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                            <polyline points="4 11 8 15 16 6"></polyline>
                        </svg>
                    </div>
                    <span>${field.label}</span>
                </label>
            </div>
        `).join('')}
    `;
}

export function createCheckList(name, fields) {
    if (!fields) return;

    const checkWrapper = document.createElement('div'); // 전체동의 + 체크리스트 담을 element
    checkWrapper.classList.add('checkWrapper');
    
    const checkList = document.createElement('div');
    checkList.classList.add('checkList');
    checkList.innerHTML = checkListItem(name, fields);

    checkWrapper.append(checkList);

    if ( fields.length > 1 ) { // 체크리스트 개수가 2개부터는 전체동의 항목 추가
        const checkControl = document.createElement('div');
        checkControl.classList.add('checkControl');
        checkControl.innerHTML = `
            <div class="checkBox">
                <input id="${name}_checkAll" type="checkbox" class="invisible">
                <label for="${name}_checkAll" class="checkLabel">
                    <div class="svgBox">
                        <svg width="20" height="20" viewBox="0 0 20 20">
                            <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                            <polyline points="4 11 8 15 16 6"></polyline>
                        </svg>
                    </div>
                    <span><b>전체 동의</b></span>
                </label>
            </div>
        `;

        checkWrapper.prepend(checkControl);

        const checkAll = checkControl.querySelector(`#${name}_checkAll`); // 전체 동의
        const allCheckboxes = checkList.querySelectorAll('.checkBox input[type="checkbox"]'); // 동의 개별 항목
        

        // 전체 동의 클릭시 전체 체크
        checkAll.addEventListener('change', () => {
            allCheckboxes.forEach(checkbox => {
                checkbox.checked = checkAll.checked;
            });
        });

        // 개별로 움직이는 아이들
        allCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const allChecked = Array.from(allCheckboxes).every(checkbox => checkbox.checked);
                checkAll.checked = allChecked;
            });
        });
    }


    return checkWrapper;
}



function allowKoreanOnly(input) { // 한글만 허용
    input.value = input.value.replace(/[^ㄱ-ㅎ가-힣ㅏ-ㅣ\s]/g, "");
}

function allowNumberOnly(input) { // 숫자만 허용
    input.value = input.value.replace(/[^0-9]/g, '');
}

function removeWhitespace(input) { // 공백 지우기
    input.value = input.value.replace(/\s+/g, '');
}

function formatPhoneNumber(input) { // 핸드폰 형식으로 변환
    allowNumberOnly(input); // 숫자만 남기기
    
    // 핸드폰 번호 형식으로 변환 (예: 010-0000-0000)
    let phoneNumber = input.value;
    if (phoneNumber.length < 4) {
        input.value = phoneNumber;
    } else if (phoneNumber.length < 8) {
        input.value = phoneNumber.slice(0, 3) + '-' + phoneNumber.slice(3);
    } else {
        input.value = phoneNumber.slice(0, 3) + '-' + phoneNumber.slice(3, 7) + '-' + phoneNumber.slice(7);
    }
}