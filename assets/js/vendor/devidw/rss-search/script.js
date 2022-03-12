const RSS_URL = '/index.xml'

fetch(RSS_URL)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, 'text/xml'))
    .then(data => {
        const items = data.querySelectorAll('item')
        const search = document.querySelector('input[type="search"]')
        const results = document.querySelector('#results')

        search.addEventListener('input', () => {
            const value = search.value.toLowerCase()

            if (value === '') {
                results.innerHTML = ''
                return
            }

            const filtered = [...items].filter(item => {
                const title = item.querySelector('title').textContent.toLowerCase()
                const description = item.querySelector('description').textContent.toLowerCase()
                return title.includes(value) || description.includes(value)
            })

            results.innerHTML = ''
            filtered.forEach(item => {
                const title = item.querySelector('title').textContent
                const description = item.querySelector('description').textContent
                const link = item.querySelector('link').textContent
                const article = document.createElement('article')
                article.innerHTML = `
                <header>
                    <h2>
                        <a href="${link}">
                            ${title}
                        </a>
                    </h2>
                </header>
                <div class="content">
                    ${description}
                </div>
                `
                results.appendChild(article)
            })
        })
    })