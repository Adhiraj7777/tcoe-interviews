const Page = require('./page');
const assert = require("assert")

class LoginPage extends Page {
    get startButton() () {
        return $('#startButton');
    }
    get stopButton () {
        return $('#stopButton');
    }
    get ProgressBar() {
        return $("//div[id='progressBar']");
    }
   get ajaxRequestButton() {
        return $("//div[id='ajaxButton']");
    }
   get ajaxMessage() {
        return $("//p[text()='Data loaded with AJAX get request.']");
    }
   get ajaxMessageSecondIteration() {
        return $("(//p[text()='Data loaded with AJAX get request.'])[2]");
    }
   get hideButton() {
        return $('#hideButton');
    }
   get removedButton() {
        return $('#removedButton');
    }
   get zeroWidthButton() {
        return $('#zeroWidthButton');
    }
  get overLappedButton() {
        return $('#overlappedButton');
    }
  get opacityButton() {
        return $('#transparentButton');
    }
  get invisibleButton() {
        return $('#invisibleButton');
    }
  get displayNoneButton() {
        return $('#notdisplayedButton');
    }
  get offScreenButton() {
        return $('#offscreenButton');
    }
  get unHideButton() {
        return $("//button[id='unhideButton']");
    }
  get generateButton() {
        return $("//button[id='buttonGenerate']");
    }
  get copyButton() {
        return $("//button[id='buttonCopy']");
    }
 get editTextBox() {
        return $("//button[id='editField']");
    }

get redColorChangeButton() {
        return $("//button[id='badButton']");
    }


    async verifyProgressBar() {
        await this.startButton.click();
 	  await this.verifyProgressBarReachesSeventyFivePercentage();  
    }
    async open (path) {
        return browser.url(`http://uitestingplayground.com/${path}`)
    }
   async verifyAjaxButtonMessages() {
         await this.ajaxRequestButton.click();
	   await ajaxMessage.waitForDisplayed({ timeout: 15000 });
	   assert.equal(await ajaxMessage.isDisplayed(), true);
      
     //Clicking one more time on AJax Button and verifying Message not displaying twice
        await this.ajaxRequestButton.click();
	  await ajaxMessageSecondIteration.waitForDisplayed({ timeout: 15000 }); //checking for 2nd iteration xpath
	  assert.equal(await ajaxMessage.isDisplayed(), false); //as the second iteration is displayed the assertion will fail the testcase
    }

   async verifyHideUnhideButton() {
         await this.hideButton.click();
   try{
      await expect(unHideButton).toBeDisplayed();  // Or- >  unHideButton.waitForDisplayed();
      assert.equal(await hideButton.isDisplayed(), true); 
      }
      catch(Exception e)
    {
       assert.equal(await false, true);  //As try block failed with element not visible, Assertion will be failed.
     }         
    }

   async visibilityOfOtherElementsAfterClickonHideButton() {
         assert.equal(await removeButton.isDisplayed(), true); 
	   assert.equal(await zeroWidthButton.isDisplayed(), true); 
         assert.equal(await overLappedButton.isDisplayed(), true); 
         assert.equal(await opacityButton.isDisplayed(), true); 
         assert.equal(await invisibleButton.isDisplayed(), true); 
         assert.equal(await displayNoneButton.isDisplayed(), true); 
         assert.equal(await offScreenButton.isDisplayed(), true);
       }

async verifyCopyPasteText() {
         await this.generateButton.click();
         const actualText = await $('#editField').shadow$('#innerEl').getValue();     //Generated Text
         console.log(actualText);   

         await this.copyButton.click();    //Text copied
         await this.editTextBox.click(); 
         await browser.keys([Key.Ctrl, 'a')
         await this.editTextBox.clear();     //Clear the textbox
         await this.editTextBox.click();
         await browser.keys([Key.Ctrl, 'v'])  // Paste the copied text from copied button

         const copiedText = await $('#editField').shadow$('#innerEl').getValue();   //Copied Text
         console.log(copiedText); 

        if(actualText.equals(copiedText))
       {
            assert.equal(await true, true);
      }
       else
     {
           assert.equal(await false, true);
      }	   
    }

 async verifyButtonChangeColor() {
         await redColorChangeButton.waitForDisplayed();
         await browser.executeScript("document.querySelector(redColorChangeButton).click()")  //Javascript executor click- Forcefully
	   const colorOfButton=  await redColorChangeButton.getCSSProperty('border-color')    // Also can get Attribute 'color' or 'Background-color' for RGB
         console.Log("border color is" + colorOfButton)
	   const ActualhexBorderColor = Color.FormString().asHex();
         console.Log("border color is" + hexBorderColor)
	   const expectedlimeButtonColor = "#1e7e34";
         const expectedlightButtonColor = "#28a745";


       if(ActualhexBorderColor.equals(expectedlimeButtonColor) || ActualhexBorderColor.equals(expectedlightButtonColor))
       {
            assert.equal(await true, true);
      }
       else
     {
          console.Log("After Clicking on Button, color is not turning to Red");
           assert.equal(await false, true);
      }
	   
    }

    async verifyProgressBarReachesSeventyFivePercentage() {
	for(int i=0; i<=25; i++)
     {
	const statusVal = await this.ProgressBar.getAttribute('aria-valuenow');
      console.Log("Current Status Percentage Value" + finalStatusVal)
     if(statusVal >=71){
        await this.stopButton.click(); 
	  console.Log("User Clicks on Stop Button");
	  const finalStatusVal = await this.ProgressBar.getAttribute('aria-valuenow');
        console.Log("Final Status Percentage Value" + finalStatusVal)
        break;
    }
      else
       {
	Timeunit.seconds.sleep(1);
       }
}
}

module.exports = new LoginPage();
