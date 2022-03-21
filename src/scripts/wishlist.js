class HotelWishlist extends HTMLElement
{
    constructor() {
        super()
        this._shadow = this.attachShadow({ mode: "open" })
        this._hotels = {}
    }

    connectedCallback() {
        this._shadow.innerHTML = `
            <style>
                .main                   { position: relative; font-size: 13px; }


                .summary                { margin: 0; padding: 0.5rem 1rem; font-size: 15px; font-weight: bold; color: #fff; cursor: pointer;
                                          border-radius: 5px 5px 0 0; border: 1px solid #222; border-bottom: 0 }
                .main:hover .summary    { background: #fff; color: #222 }

                .details                {  }
                .details                { display: none; background: #fff; color: #222; position: absolute; right: 0; margin: 0; padding: 0; border: 1px solid #222; border-top: 0 }
                .main:hover .details:not(:empty) { display: block }
                .details li             { margin: 0; padding: 0.5rem 1rem; width: 100%; width: 15rem; list-style: none;
                                          display: flex; align-items: flex-start; justify-content: space-between; border-top: 1px solid #999 }
                .details li:first-child { border: 0 }

                .title                  { margin-right: 1rem; }

                a                       { color: #2f8db5; cursor: pointer; }
                a:hover                 { color: #165d7c; text-decoration: underline }
            </style>

            <div class=main>
                <p class=summary>❤ <span class=count>0</span></p>
                <ul class=details></ul>
            </div>
        `

        this._count = this._shadow.querySelector(".summary .count")
        this._list = this._shadow.querySelector(".details")

        const hotels = JSON.parse(localStorage.getItem('hotel-wishlist')) || {}
        Object.values(hotels).forEach(hotel => this.addHotel(hotel))
    }

    addHotel(hotel) {
        if (this._hotels[hotel.id]) {
            return
        }

        this._hotels[hotel.id] = hotel
        localStorage.setItem('hotel-wishlist', JSON.stringify(this._hotels))

        const li = document.createElement("li")
        li.innerHTML = `<span class=title>${hotel.name}</span><a class=remove>remove</a>`

        this._list.appendChild(li)
        this._count.textContent = Object.keys(this._hotels).length

        li.querySelector('.remove').addEventListener('click', () => {
            delete(this._hotels[hotel.id])
            localStorage.setItem('hotel-wishlist', JSON.stringify(this._hotels))
            this._count.textContent = Object.keys(this._hotels).length
            this._list.removeChild(li)
        })
    }
}

customElements.define('hotel-wishlist', HotelWishlist)
