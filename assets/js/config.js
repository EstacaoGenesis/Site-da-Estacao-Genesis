const range = document.getElementById('range');
const range2 = document.getElementById('range2');

// Função para atualizar o valor e a posição do rótulo
const updateLabel = (input) => {
    const label = input.nextElementSibling;
    const value = +input.value;
    const range_width = getComputedStyle(input).getPropertyValue('width');
    const label_width = getComputedStyle(label).getPropertyValue('width');
    const num_width = +range_width.substring(0, range_width.length - 2);
    const num_label_width = +label_width.substring(0, label_width.length - 2);
    const max = +input.max;
    const min = +input.min;
    const left = value * (num_width / max) - num_label_width / 2 + scale(value, min, max, 10, -10);

    label.style.left = `${left}px`;
    label.innerHTML = value;
};

// Adiciona o evento de input ao primeiro intervalo
range.addEventListener('input', (e) => updateLabel(e.target));

// Adiciona o evento de input ao segundo intervalo
range2.addEventListener('input', (e) => updateLabel(e.target));

// Função de escala para ajuste da posição do rótulo
const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};
