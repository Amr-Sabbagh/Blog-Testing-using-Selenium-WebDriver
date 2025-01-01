/*
 ============================================================================
 Name        : Blog Create Post Tests Suit.js
 Copyright   : Amr El Sabbagh
 Description : This file contains Selenium test cases for Create Post 
                functionality of a one page web application.
 ============================================================================
 */

 import { Builder, By, Key, until } from 'selenium-webdriver';
 import { expect } from 'chai';
 
 let driver;
 const url = 'http://localhost:3000'; // Replace with your app's URL

 describe('Create Post Tests Suit', function () {

    before(async function(){
        //open google chrome browser
        driver = await new Builder().forBrowser('chrome').build();
        // load the Blog web application
        await driver.get(`${url}/`);
        // locate the login button
        await driver.findElement(By.xpath("//li[text()='Login']")).click();
        //locate the username input and enter a valid username
        await driver.findElement(By.xpath("//input[@placeholder='Username']")).sendKeys("admin");
        //locate the password input and enter a valid passowrd
        await driver.findElement(By.xpath("//input[@placeholder='Password']")).sendKeys("admin123");
        //locate the login button and click
        await driver.findElement(By.xpath("//button[text()='Login']")).click();
    });

    after(async function () {
        //close the browser
        await driver.quit();
    });

    it('tc1: check if user can create a post while logged in', async function () {
       //locate create post button and click it
       await driver.findElement(By.xpath("//li[text()='Create Post']")).click();
       //locate the post title box and enter any text
       await driver.findElement(By.xpath("//input[@placeholder='Post title']")).sendKeys("Logged In User Post");
       //locate the post content box and enter any text
       await driver.findElement(By.xpath("//textarea[@placeholder='Post content']")).sendKeys("logged in user can create a post content");
       //locate the create post button and click it
       await driver.findElement(By.xpath("//button[text()='Create Post']")).click();
       //locate post's card
       let posttitle = await driver.findElement(By.css(".posts-list > .post-card:first-child")).getText();
       let postcontent = await driver.findElement(By.css(".posts-list > .post-card:first-child > p")).getText();
       //check if the post were created
       expect(posttitle).to.include('Logged In User Post');
       expect(postcontent).to.equal('logged in user can create a post content');
    });

    it('tc2: check if create a post with a blank title', async function () {
        //locate create post button and click it
        await driver.findElement(By.xpath("//li[text()='Create Post']")).click();
        //locate the post content box and enter any text
        await driver.findElement(By.xpath("//textarea[@placeholder='Post content']")).sendKeys("This is a post without a title");
        //locate the create post button and click it
        await driver.findElement(By.xpath("//button[text()='Create Post']")).click();
        //locate post's card
        let postcard = await driver.findElement(By.css(".posts-list > .post-card:first-child > p")).getText();
        //check if the post were created
        expect(postcard).to.equal('This is a post without a title');
    });

    it('tc3: check if create a post with a blank title', async function () {
        //locate create post button and click it
        await driver.findElement(By.xpath("//li[text()='Create Post']")).click();
        //locate the post title box and enter any text
        await driver.findElement(By.xpath("//input[@placeholder='Post title']")).sendKeys("This is a post without a content");
        //locate the create post button and click it
        await driver.findElement(By.xpath("//button[text()='Create Post']")).click();
        //locate post's cards
        let postcard = await driver.findElement(By.css(".posts-list")).getText();
        //check if the post were created
        expect(postcard).to.include('This is a post without a content');
    });

    it('tc4: check if user can create a post with a special char title', async function () {
        //locate create post button and click it
        await driver.findElement(By.xpath("//li[text()='Create Post']")).click();
        //locate the post title box and enter any text
        await driver.findElement(By.xpath("//input[@placeholder='Post title']")).sendKeys("@@@");
        //locate the create post button and click it
        await driver.findElement(By.xpath("//button[text()='Create Post']")).click();
        //locate post's cards
        let postcard = await driver.findElement(By.css(".posts-list")).getText();
        //check if the post were created
        expect(postcard).to.include('@@@');
    });

    it('tc5: check if user can create a post with a special char content', async function () {
        //locate create post button and click it
        await driver.findElement(By.xpath("//li[text()='Create Post']")).click();
        //locate the post content box and enter any text
        await driver.findElement(By.xpath("//textarea[@placeholder='Post content']")).sendKeys("@@@");
        //locate the create post button and click it
        await driver.findElement(By.xpath("//button[text()='Create Post']")).click();
        //locate post's cards
        let postcard = await driver.findElement(By.css(".posts-list > .post-card:first-child > p")).getText();
        //check if the post were created
        expect(postcard).to.equal('@@@');
    });

    it('tc6: if post would be erased if you navigated to another element and got back to all posts', async function () {
        //locate create post button and click it
        await driver.findElement(By.xpath("//li[text()='Create Post']")).click();
        //locate  all posts page and click it
        await driver.findElement(By.xpath("//li[text()='All Posts']")).click();
        //locate post's cards
        let postcard = await driver.findElement(By.css(".posts-list > .post-card:first-child")).getText();
        //check if the post were created
        expect(postcard).to.not.equal('First Blog Post');

    })

    it('tc7: check if user can create a post while not logged in',async function () {
        //locate the logout button and click it
        await driver.findElement(By.xpath("//li[text()='Logout']")).click();
        //locate the navigation element to check if logout passed
        let loggeoutelements = await driver.findElements(By.xpath("//ul"));
        //check if the application logged out the user
        expect(loggeoutelements).to.not.include('Create Post');
    });
    
 });