async function onSearch() {
    let apiKey = 'X4CEJfKuVc8P7QjETcDaANxOeZcumtiY';
    let input = document.querySelector('.search').value;
    let limit = 5;
    let offset = Math.round(Math.random() * 32);

    return fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=${limit}&offset=${offset}&q=${input}`)
        .then(response => response.json())
        .then((content) => {
            giphs = content.data;
            console.log(giphs);
        })
        .catch(error => console.log(error))
}

async function getContent() {
    await onSearch();

    addContent(giphs);
}

function addContent(giphs) {
    let result = document.querySelector('.result');
    
    if (giphs == '') {
        result.innerHTML += 'Not Found :(';
    } else {
        for (let giphy of giphs) {
            if (giphy.images.downsized.url !== '') {
                let img = document.createElement('img');
                img.src = giphy.images.downsized.url;
                result.appendChild(img);
            } 
        }
    }

}

document.querySelector('.btn').addEventListener('click', () => {
    document.querySelector('.result').innerHTML = '';
    getContent();
    document.querySelector('.search').value = '';
})