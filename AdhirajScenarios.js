const LoginPage = require('../pageobjects/login.page');

describe('Progressbar, AjaxClick, HideUnHide, ShadowdomCopyPaste ButtonColorChange Scenarios', () => {
    it('Verify Progress Bar Stop at 75 Percentage functionality', async () => {
        await LoginPage.open(progressbar);
        await LoginPage. verifyProgressBar();  
    });
 
    it('Verify Ajax Message Clicking more than once functionality', async () => {
        await LoginPage.open(ajax);
        await LoginPage. verifyAjaxButtonMessages();      
    });

   it('Verify Hide and Unhide Button functionality', async () => {
        await LoginPage.open(visibility);
        await LoginPage.verifyHideUnhideButton();
       await LoginPage.visibilityOfOtherElementsAfterClickonHideButton();
    });

  it('Verify copy and paste functionality', async () => {
        await LoginPage.open(shadowdom);
        await LoginPage.verifyCopyPasteText();   
    });
  
   it('Verify Button Turns red after clicking functionality', async () => {
        await LoginPage.open(click);
        await LoginPage.verifyButtonChangeColor();   
    });

});
