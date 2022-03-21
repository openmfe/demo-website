// this is the orchestration layer of the host site.
// it is the integration point between the host page and microfrontends.

window.addEventListener("load", () => {

    // getting an instance of our own wishlist component (not a microfrontend!)
    const wishlist = document.querySelector("hotel-wishlist")

    // listening to the wishlist event from the hotel-offers microfrontend.
    document.addEventListener("hotel-offers.add-to-wishlist", ev => {
        wishlist.addHotel(ev.detail)
    })
})
