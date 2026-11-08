function buttonItem(fields = []) {
    return `
        ${fields.map(field => `
            <button 
                ${field.id ? 'id='+field.id : ''} 
                class="btn ${field.style==='primary'?'btnPrimary':''} ${field.func==='close'?'btnClose':''}" 
                type="${field.type}"
            >${field.name}</button>
        `).join('')}
    `;
}

export function createButtons(fields) {
    if (!fields) return;

    const btnBox = document.createElement('div');
    btnBox.classList.add('btnBox');
    btnBox.innerHTML = buttonItem(fields);

    return btnBox;
}