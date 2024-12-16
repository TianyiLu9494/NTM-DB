function handleRadioChange() {
    const input1 = document.querySelector('#id_number_of_nodes_in_tree');
    const select1 = document.querySelector('.js-example-basic-single');
    const input2 = document.querySelector('#id_species_list');
    const select2 = document.querySelector('.js-example-basic-multiple');

    if (input1.checked) {
        select1.disabled = false;
        select2.disabled = true;
    } else {
        select1.disabled = true;
        select2.disabled = false;
    }
}



window.onload = function () {
    const switchBtn = document.querySelector('#id_build_tree');
    const radio1 = document.querySelector('#id_number_of_nodes_in_tree');
    const radio2 = document.querySelector('#id_species_list');
    const select1 = document.querySelector('.js-example-basic-single');
    const select2 = document.querySelector('.js-example-basic-multiple');

    if (!switchBtn.checked) {
        radio1.disabled = true;
        radio2.disabled = true;
        select1.disabled = true;
        select2.disabled = true;
    }

    switchBtn.addEventListener('change', () => {
        if (switchBtn.checked) {
            radio1.disabled = false;
            radio2.disabled = false;
            select1.disabled = false;
            select2.disabled = false;
        } else {
            radio1.disabled = true;
            radio2.disabled = true;
            select1.disabled = true;
            select2.disabled = true;
        }
    });
}






$(document).ready(function () {
    $('.js-example-basic-single').select2();
});

$(document).ready(function () {
    $('.js-example-basic-multiple').select2();
});