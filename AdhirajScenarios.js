const LoginPage = require('../pageobjects/login.page');
const SecurePage = require('../pageobjects/secure.page');

describe('Progressbar Scenario', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open();
        await LoginPage.startButton();
        await LoginPage.CalculateProgress();
        await expect(SecurePage.flashAlert).toHaveTextContaining(
            'You logged into a secure area!');
    });
});