import {arr} from './store.js'

document.getElementById('btn1')
    .addEventListener('click', () => {

        let input_word = document.getElementById('search_word')
        input_word = input_word.value
        let a = arr.filter(e => e.includes(input_word)); // 기존배열유지

        a.forEach(e => {
            let ul = document.getElementById('result')
            let li = document.createElement("li");
            li.textContent = e;
            ul.appendChild(li)
        })
    })

document.getElementById('btn2')
    .addEventListener('click', () => {
        let input_word = document.getElementById('search_word')
        input_word = input_word.value

        let aa = arr.map((title, i) => ({ title, rank: i + 1 }))
        let bb = aa.filter(e => e.title.includes(input_word))
        console.log(bb)

        bb.forEach((e) => {
            let ul = document.getElementById('result')
            let li = document.createElement("li");
            li.textContent = `${e.rank}위 : ${e.title}`
            ul.appendChild(li)
        })
    })