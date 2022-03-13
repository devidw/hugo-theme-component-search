const RSS_URL = '/index.xml'

fetch(RSS_URL)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
    .then(data => {
        const items = data.querySelectorAll('item')
        const search = document.querySelector('input[type="search"]')
        const results = document.querySelector('#results')

        search.addEventListener('input', () => {
            const query = search.value.toLowerCase().trim()

            // exit when empty value or just whitespace
            if (query === '') {
                results.innerHTML = ''
                return
            }

            const filtered = [...items].filter(item => {
                const title = item.querySelector('title').textContent.toLowerCase()
                const description = item.querySelector('description').textContent.toLowerCase()
                return title.includes(query) || description.includes(query)
            })

            results.innerHTML = ''
            filtered.forEach(item => {
                const title = item.querySelector('title').textContent
                const description = item.querySelector('description').textContent
                const link = item.querySelector('link').textContent
                const li = document.createElement('li')
                li.innerHTML = `<a href="${link}">${title}</a>`
                results.appendChild(li)
            })
        })
    })