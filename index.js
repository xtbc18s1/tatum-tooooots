class App {
  constructor(selectors) {
    this.flicks = []
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)
    this.template = document.querySelector(selectors.templateSelector)

    document
      .querySelector(selectors.formSelector)
      .addEventListener('submit', ev => {
        ev.preventDefault()
        this.handleSubmit(ev)
      })
  }

  removeFlick(flick, ev) {
    // remove from the DOM
    const item = ev.target.closest('.flick')
    item.remove()

    // remove from the array
    const i = this.flicks.indexOf(flick)
    this.flicks.splice(i, 1)
  }

  favFlick(flick, ev) {
    const item = ev.target.closest('.flick')
    flick.fav = item.classList.toggle('fav')
  }

  renderListItem(flick) {
    const item = this.template.cloneNode(true)
    item.classList.remove('template')
    item.dataset.id = flick.id
    item
      .querySelector('.flickName')
      .textContent = flick.name

    item
      .querySelector('.remove.button')
      .addEventListener(
        'click',
        this.removeFlick.bind(this, flick)
      )

    item
      .querySelector('.fav.button')
      .addEventListener(
        'click',
        this.favFlick.bind(this, flick)
      )


    return item
  }

  handleSubmit(ev) {
    const f = ev.target
    const flick = {
      id: ++this.max,
      name: f.flickName.value,
      fav: false,
    }

    this.flicks.unshift(flick)

    const item = this.renderListItem(flick)
    this.list.insertBefore(item, this.list.firstElementChild)

    f.reset()
  }
}

const app = new App({
  formSelector: '#flickForm',
  listSelector: '#flickList',
  templateSelector: '.flick.template',
})
