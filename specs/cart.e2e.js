import {browser, expect, $} from '@wdio/globals'

describe('Cart FLow', () => {
    
    before(async () => {
        //Access URL
        await browser.url('/'); 
        const searchInput = await $('#twotabsearchtextbox');
        const searchButton = await $('#nav-search-submit-button');
        await searchInput.addValue('telecaster');
        await searchButton.click();
    });

    it('Add to Cart', async () => {
        //get the first element
        await $('.s-product-image-container').click();
        const productPrice = await $('#corePriceDisplay_desktop_feature_div span[class="a-price-whole"]').getText();
        
        (await $('#add-to-cart-button')).click();
        //Coverage NO Button
        if (await $('#attachSiNoCoverage-announce').isDisplayed()) {
            (await $('#attachSiNoCoverage-announce')).click();
        }
        browser.pause(5000);
    });

});