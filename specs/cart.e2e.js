import {browser, expect, $} from '@wdio/globals'

describe('Cart FLow', () => {
    
    let productPrice;

    before(async () => {
        //Access URL
        await browser.url('/'); 
        const searchInput = await $('#twotabsearchtextbox');
        const searchButton = await $('#nav-search-submit-button');
        await searchInput.addValue('telecaster');
        await searchButton.click();
    });

    it('Add to Cart', async () => {
        //Get the first element
        await $('.s-product-image-container').click();
        //get product price
        /*
        const productPrice = await browser.execute(() => {
            return document.querySelector('#corePriceDisplay_desktop_feature_div span[class="aok-offscreen"]').textContent
        })*/
        productPrice = await $('#apex_offerDisplay_desktop span[aria-hidden="true"]').getText();
        //Add to cart
        (await $('#add-to-cart-button')).click();
        //Assurance box
        await browser.waitUntil(async function(){
            //Coverage NO Button
            if (await $('#attach-desktop-sideSheet').isDisplayed()) {
                return (await $('#attachSiNoCoverage')).click();
            }
            else return "Not here"
        }, {
            timeoutMsg: "Could not find element"
        });
        //Assert Confirmation Text
        await expect($('#NATC_SMART_WAGON_CONF_MSG_SUCCESS h1')).toHaveText('Agregado al carrito');
        //#sw-subtotal span[class=a-offscreen] Opacity set to 0 
        /*
        const subtotal = await browser.execute(() => {
            return document.querySelector('#sw-subtotal span[class="a-offscreen"]').textContent
        })
        */
        //Get total after add to cart
        const subtotal = await $('#sw-subtotal span[aria-hidden="true"]').getText();
        //Assert Price 
        await expect(subtotal).toEqual(productPrice);
        //#sw-subtotal .a-offscreen or #sw-subtotal span[class=a-offscreen]

    });

    it('Update Cart Quantity', async() => {
        //Click cart Item
        (await $('#nav-cart')).click();
        //Clcik to change quantity
        await $('#a-autoid-0-announce').click();
        //Select quantity
        await $('#quantity_3').click();
        //Updated subtotal
        const updatedSubtotal = await $('#sc-subtotal-amount-activecart');
        //Assert subtotal not equal to 1 item
        await expect(updatedSubtotal).not.toEqual(productPrice);
    });
});