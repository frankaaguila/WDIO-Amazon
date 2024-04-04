import {browser, expect} from '@wdio/globals'

describe('Amazon home Page', () => {

    it('Access URL, Verify URL and Title', async () => {
        //Access URL
        await browser.url('/');
        //Assert URL
        await expect(browser).toHaveUrlContaining('amazon');
        //Assert title
        await expect(browser).toHaveTitleContaining('Amazon.com');
    });
    
    it('Search Content and Verify Text', async () => {
        const searchInput = await $('#twotabsearchtextbox');
        const searchButton = await $('#nav-search-submit-button')

        //Add Value to serach box
        searchInput.addValue('laptop');
        //Submit value to search for
        searchButton.click();
        //Verify text
        const text = await expect($('.a-color-state.a-text-bold')).toHaveTextContaining('laptop');
    });
});