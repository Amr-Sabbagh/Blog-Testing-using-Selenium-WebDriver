/*
 ============================================================================
 Name        : Blog Login Tests Suit.js
 Copyright   : Amr El Sabbagh
 Description : This file contains Selenium test cases for the login functionality
               of a one page web application.
 ============================================================================
 */

 import { Builder, By, Key, until } from 'selenium-webdriver';
 import { expect } from 'chai';
 
 let driver;
 const url = 'http://localhost:3000'; // Replace with your app's URL
 
 describe('Login Tests Suit', function () {
 
     before(async function () {
         driver = await new Builder().forBrowser('chrome').build();
     });

     beforeEach(async function(){
         // load the Blog web application
         await driver.get(`${url}/`);
         // locate the login button
         await driver.findElement(By.xpath("//li[text()='Login']")).click();
     });
 
     after(async function () {
         await driver.quit();
     });
 
     it('tc1: check if user can login with a blank username', async function(){
         //locate the login button and click
         await driver.findElement(By.xpath("//button[text()='Login']")).click();
         //locate the error element to check if the login failed
         let errormsg = await driver.findElement(By.xpath("//p[text()='Username field is required!']")).getText();
         //check if the application gave the error msg
         expect(errormsg).to.equal('Username field is required!');
     });

     it('tc2: check if user can login with a blank password', async function () {
         //locate the username input and fill it with a valid username 
         await driver.findElement(By.xpath("//input[@placeholder='Username']")).sendKeys("admin");
         //locate the login button and click
         await driver.findElement(By.xpath("//button[text()='Login']")).click();
         //locate the error element to check if the login failed
         let errormsg = await driver.findElement(By.xpath("//p[text()='Password field is required!']")).getText();
         //check if the application gave the error msg
         expect(errormsg).to.equal('Password field is required!');
     });

     it('tc3: check if user can login with a username less than 3 characters', async function () {
         //locate the username input and fill it with an invalid username that is less than 3 char
         await driver.findElement(By.xpath("//input[@placeholder='Username']")).sendKeys("ad");
         //locate the login button and click
         await driver.findElement(By.xpath("//button[text()='Login']")).click();
         //locate the error element to check if the login failed
         let errormsg = await driver.findElement(By.xpath("//p[text()='Username field must be at least 3 characters']")).getText();
         //check if the application gave the error msg
         expect(errormsg).to.equal('Username field must be at least 3 characters');
     });

     it('tc4: check if user can login with a password that is less than 8 characters', async function () {
         //locate the username input and fill it with a valid username
         await driver.findElement(By.xpath("//input[@placeholder='Username']")).sendKeys("admin");
         //locate the password input and fill it with a passowrd that is less than 8 characters
         await driver.findElement(By.xpath("//input[@placeholder='Password']")).sendKeys("admin12");
         //locate the login button and click
         await driver.findElement(By.xpath("//button[text()='Login']")).click();
         //locate the error element to check if the login failed
         let errormsg = await driver.findElement(By.xpath("//p[text()='Password must be at least 8 characters long!']")).getText();
         //check if the application gave the error msg
         expect(errormsg).to.equal('Password must be at least 8 characters long!');
     });

     
     it('tc5: check if user can login with a password that is less than 3 numbers', async function () {
         //locate the username input and fill it with a valid username
         await driver.findElement(By.xpath("//input[@placeholder='Username']")).sendKeys("admin");
         //locate the password input and fill it with a passowrd that is less than 3 numbers
         await driver.findElement(By.xpath("//input[@placeholder='Password']")).sendKeys("adminn12");
         //locate the login button and click
         await driver.findElement(By.xpath("//button[text()='Login']")).click();
         //locate the error element to check if the login failed
         let errormsg = await driver.findElement(By.xpath("//p[text()='Password must have at least 3 numbers']")).getText();
         //check if the application gave the error msg
         expect(errormsg).to.equal('Password must have at least 3 numbers');
     });

     it('tc6: check if user can login with an invalid username', async function () {
         //locate the username input and fill it with an invalid username
         await driver.findElement(By.xpath("//input[@placeholder='Username']")).sendKeys("notad");
         //locate the password input and fill it with a valid passowrd
         await driver.findElement(By.xpath("//input[@placeholder='Password']")).sendKeys("admin123");
         //locate the login button and click
         await driver.findElement(By.xpath("//button[text()='Login']")).click();
         //locate the error element to check if the login failed
         let errormsg = await driver.findElement(By.xpath("//p[text()='Invalid Credentials']")).getText();
         //check if the application gave the error msg
         expect(errormsg).to.equal('Invalid Credentials');
     });

     it('tc7: check if user can login with an invalid password', async function () {
         //locate the username input and fill it with an valid username
         await driver.findElement(By.xpath("//input[@placeholder='Username']")).sendKeys("admin");
         //locate the password input and fill it with a invalid passowrd
         await driver.findElement(By.xpath("//input[@placeholder='Password']")).sendKeys("notad123");
         //locate the login button and click
         await driver.findElement(By.xpath("//button[text()='Login']")).click();
         //locate the error element to check if the login failed
         let errormsg = await driver.findElement(By.xpath("//p[text()='Invalid Credentials']")).getText();
         //check if the application gave the error msg
         expect(errormsg).to.equal('Invalid Credentials');
     });
     
     
     it('tc8: check if user can login if valid credentials were  entered', async function () {
         //locate the username input and fill it with an valid username
         await driver.findElement(By.xpath("//input[@placeholder='Username']")).sendKeys("admin");
         //locate the password input and fill it with a valid passowrd
         await driver.findElement(By.xpath("//input[@placeholder='Password']")).sendKeys("admin123");
         //locate the login button and click
         await driver.findElement(By.xpath("//button[text()='Login']")).click();
         //locate a logged in user functuinality to check if login passed
         let loggedinelement = await driver.findElement(By.xpath("//li[text()='Create Post']")).getText();
         //check if the application logged in the user
         expect(loggedinelement).to.equal('Create Post');
     });

     it('tc9: check if user can logout after login', async function () {
      //locate the username input and fill it with an valid username
      await driver.findElement(By.xpath("//input[@placeholder='Username']")).sendKeys("admin");
      //locate the password input and fill it with a valid passowrd
      await driver.findElement(By.xpath("//input[@placeholder='Password']")).sendKeys("admin123");
      //locate the login button and click
      await driver.findElement(By.xpath("//button[text()='Login']")).click();
      //locate the logout button and click it
      await driver.findElement(By.xpath("//li[text()='Logout']")).click();
      //locate the navigation element to check if logout passed
      let loggeoutelements = await driver.findElements(By.xpath("//ul"));
      //check if the application logged out the user
      expect(loggeoutelements).to.not.include('Create Post');
  });

});     