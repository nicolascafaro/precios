const $ = (selector = '') => document.querySelector(selector)
const _$ = (element = HTMLElement, selector = '') => element.querySelector(selector)
const $$ = (selector = '') => document.querySelectorAll(selector)
const _$$ = (element = HTMLElement, selector = '') => element.querySelectorAll(selector)
// const { format } = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ARS', currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0 })


// Carga de datos

const container = $('#data')

fetch('src/output.json').then(response => response.json()).then(data => {

  

  const empresas = Object.keys(data)

  empresas.shift()


  for (const empresa of empresas) {

    const div = document.createElement('div')
    div.classList.add('row')

    let articles = ''

    for (const articulo in data[empresa]) {
      const precio = data[empresa][articulo]

      articles += `
      <article>
        <p>${articulo}</p><p>${precio}</p>
      </article>
      `
    }

    div.innerHTML = `
    <section class="group stack">
      <p class="group_name">${empresa}</p>
      <label class="stack">
        <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.96352 6.59896L0.677063 1.31251C0.604146 1.23959 0.549702 1.16084 0.51373 1.07625C0.477758 0.991671 0.459285 0.900283 0.458313 0.802088C0.458313 0.607644 0.525396 0.437505 0.659563 0.291671C0.79373 0.145838 0.969702 0.0729218 1.18748 0.0729218L12.2708 0.0729218C12.4896 0.0729218 12.666 0.145838 12.8002 0.291671C12.9344 0.437505 13.001 0.607644 13 0.802088C13 0.8507 12.9271 1.02084 12.7812 1.31251L7.49477 6.59896C7.37324 6.72049 7.25172 6.80556 7.13019 6.85417C7.00866 6.90278 6.87498 6.92709 6.72915 6.92709C6.58331 6.92709 6.44963 6.90278 6.32811 6.85417C6.20658 6.80556 6.08505 6.72049 5.96352 6.59896Z" fill="#262205"/>
          </svg>
          
        <input type="checkbox">
      </label>
    </section>
    <section class="list-container">
      ${articles}
    </section>
  `

    container.append(div)

  }

})

// Buscar por productos o empresas

const input = $('[role="group"] input')

input.addEventListener('input', ({ target }) => {
  let text = target.value.trim().toLowerCase()

  container.classList.toggle('searching', !!text)

  if (text) {
    const rows = $$('.row')

    for (const row of rows) {

      const articles = _$$(row, 'article')

      for (const article of articles) {
        article.classList.remove('found')
      }

      const group_name = _$(row, '.group_name').textContent.toLowerCase()


      for (const article of articles) {   
        
        let article_name = article.textContent.toLowerCase().split('$')[0]
        
        article.classList.toggle('found', article_name.includes(text))
        
        if (group_name.includes(text)) {
          article.classList.add('found')
          
        }
      }









    }
  }
})