
// Psychic Puzzle Handler - Static Version
(function() {
    'use strict';
    
    const CORRECT_CHOICES = [
        "5", "4", "5",
        "3", "2", "1",
        "4", "3", "4",
        "1", "5", "2",
        "2", "1", "3",
    ];
    const CORRECT_USERNAME = "anbichenduer";
    const CORRECT_PASSWORD = "laptop";
    
    let passedStage1 = sessionStorage.getItem('psychic_stage1') === 'true';
    let passedStage2 = sessionStorage.getItem('psychic_stage2') === 'true';
    
    function loginCheck(username, password) {
        return username === CORRECT_USERNAME && password === CORRECT_PASSWORD;
    }
    
    function choicesCheck(choices) {
        if (choices.length !== CORRECT_CHOICES.length) return false;
        for (let i = 0; i < CORRECT_CHOICES.length; i++) {
            if (CORRECT_CHOICES[i] !== choices[i]) return false;
        }
        return true;
    }
    
    function handleStage1Submit(event) {
        event.preventDefault();
        const username = document.querySelector('input[name="username"]').value;
        const password = document.querySelector('input[name="password"]').value;
        
        if (loginCheck(username, password)) {
            sessionStorage.setItem('psychic_stage1', 'true');
            location.reload();
        } else {
            const errorEl = document.getElementById('global-error');
            if (errorEl) {
                errorEl.textContent = 'Error: 登录失败。';
                errorEl.classList.remove('d-none');
            }
        }
    }
    
    function handleStage2Submit(event) {
        event.preventDefault();
        const choices = [];
        for (let i = 1; i <= 15; i++) {
            const select = document.querySelector(`select[name="choice${i}"]`);
            if (select) choices.push(select.value);
        }
        
        if (choicesCheck(choices)) {
            sessionStorage.setItem('psychic_stage2', 'true');
            location.reload();
        } else {
            const errorEl = document.getElementById('global-error');
            if (errorEl) {
                errorEl.textContent = 'Error: 提交失败。';
                errorEl.classList.remove('d-none');
            }
        }
    }
    
    function init() {
        const stage1Form = document.getElementById('psychic');
        const stage2Form = document.getElementById('psychic-stage2');
        
        if (stage1Form && !passedStage1) {
            stage1Form.addEventListener('submit', handleStage1Submit);
        }
        
        if (stage2Form && passedStage1 && !passedStage2) {
            stage2Form.addEventListener('submit', handleStage2Submit);
        }
        
        if (passedStage2) {
            const audio = document.getElementById('audio');
            if (audio) audio.volume = 0.2;
            const selects = document.querySelectorAll('select');
            selects.forEach(s => s.disabled = true);
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
