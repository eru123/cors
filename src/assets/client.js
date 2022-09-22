function render_result(res) {
    if (typeof res !== 'string') {
        res = JSON.stringify(res, null, 2);
    }

    const root = document.querySelector('#result-root');
    const wrapper = root.querySelector('.result-wrapper');
    wrapper.innerHTML = "";

    const h3 = document.createElement('h3');
    h3.innerText = "Result";

    const pre = document.createElement('pre');
    pre.classList.add('result');

    const code = document.createElement('code');
    code.innerText = res;

    pre.appendChild(code);
    wrapper.appendChild(h3);
    wrapper.appendChild(pre);

}

function init() {
    form = document.querySelector('form');
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const raw = document.querySelector('input[type=text]').value;
        const query = encodeURIComponent(raw);
        
        const root = document.querySelector('#result-root');
        let result_wrapper = root.querySelector('.result-wrapper');
        if (result_wrapper) {
            result_wrapper.innerHTML = '<pre class="result">Loading...</pre>';
        } else {
            result_wrapper = document.createElement('div');
            result_wrapper.classList.add('result-wrapper');
            result_wrapper.innerHTML = '<pre class="result">Loading...</pre>';
            root.appendChild(result_wrapper);
        }

        const res = await fetch(`/cors/${query}`)
        if (res.headers.get('content-type').includes('application/json')) {
            const data = await res.json();
            render_result(data)
        }
        else {
            const data = await res.text();
            render_result(data)
        }
    });
}

window.onload = init;