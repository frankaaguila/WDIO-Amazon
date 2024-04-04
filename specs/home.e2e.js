import {browser, expect, $} from '@wdio/globals'

describe('Amazon home Page', () => {

    beforeEach(async () => {
        //Access URL
        await browser.url('/'); 
    });

    //URL
    it('Access URL, Verify URL and Title', async () => {
        
        await browser.url('/');
        //Assert URL
        await expect(browser).toHaveUrlContaining('amazon');
        //Assert title
        await expect(browser).toHaveTitleContaining('Amazon.com');
    });
    
    //Search
    it('Search Content and Verify Text', async () => {
        const searchInput = await $('#twotabsearchtextbox');
        const searchButton = await $('#nav-search-submit-button')
        const searchedText = await $('.a-color-state.a-text-bold')

        //Add Value to serach box
        await searchInput.addValue('laptop');
        //Submit value to search for
        await searchButton.click();
        //Verify text
        await expect(searchedText).toHaveTextContaining('laptop');
    });

    //Auto Suggestion
    it('Auto Suggestion', async () => {

        const searchInput = await $('#twotabsearchtextbox');
        const searchedText = await $('.a-color-state.a-text-bold');
        const suggestions = await $('.left-pane-results-container');
        const firstElement = await suggestions.$('div')
        
         //Add Value to serach box
        await searchInput.click();
        
        //Wait for the suggestion box to be displayed
        await expect(suggestions).toBeDisplayed();

        //Select Suggestion option
        await browser.keys('ArrowDown');

        //Get Text from the Selected Suggestion
        const expectedText = await firstElement.getText();
        
        //Search Suggestion
        await browser.keys('Enter');
        
        //Verify text
        await expect(searchedText).toHaveTextContaining(expectedText);
    });



});