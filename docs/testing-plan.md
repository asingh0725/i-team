# Testing Plan

Each product requirement should be considered in the plan.

Type(s): Manual acceptance testing, unit testing, and integration testing

Define the testing process. Define *who* will test and *when* tests will be executed. This may include details about the process for code merging to the main git branch or code deploying to production environments.

- Who: The designer and the PM conduct the manual acceptance tests, and the developers conduct the unit testing and integration testing
- When: After every sprint, a test will be executed
- Process: Create a feature on a different branch, create a pull request to merge into the main branch (need two reviewers to approve and unit/integration tests to pass), and have the designer and PM run it locally on their machines (on the new branch) and approve the pull request.

Define test environment(s). Location of code under test, which browsers and devices acceptance testers will use. Will code be tested when running on a developer's computer or deployed to production?

Initial testing will be conducted on the developer’s computer on Google Chrome during the initial development process for quick iterations and immediate feedback. Once the developer pushes the changes to a new branch, we will use GitHub Actions to automate the execution of our Jest tests in a controlled environment to ensure consistency and reliability. Once the tests are successfully executed, the developers will create a pull request to merge the code from the new branch into the main branch. At this point, the PM and the product designer will be the code reviewers of the pull request and run the new code on their local devices on Google Chrome using the developer tool to perform the manual acceptance tests. Once the manual acceptance tests are approved, the PM and the designer will approve the pull request, and the new code will be merged into the main branch.

Define the defect management (failure protocol) process for how defects found during testing will be tracked, triaged, and fixed. How does a tester report a found bug? How does the work to fix that bug get assigned?

After the PM and the Designer find a bug, we will put it on the pull request comments and/or message the developers about the issue on Discord so that they can be easily informed about it.

Create a user acceptance testing script. This script defines the contexts, actions, and expected outcomes for each test case. There should be test cases to cover all core product requirements (no need to write cases for stretch goals). Each case should reference the requirements it tests.

## Acceptance Test Case for Sprint 1

### Test Case 1:

**Contexts:** The user is on the homepage

**Actions:** The user clicks on the login button, enters their UW account information, and clicks sign in

**Expected outcomes:** By clicking the login button, the user is redirected to the UW sign-in form, and after signing in, they land on the feed page

### Test Case 2:

**Contexts:** Users want to see view the copyright info

**Actions:** User scrolls to the bottom

**Expected outcomes:** User can see the footer

### Test Case 3:

**Contexts:** The user is on any of the pages that are included in the tabs on the navbar

**Actions:** The user clicks on one of the buttons on the navigation bar

**Expected Outcome:** The user is redirected to the corresponding page

## Acceptance Test Case for Sprint 2

### Test Case 1:

**Contexts:** The user is on the post foods page

**Actions:** The user enters location information, an image, and a caption and clicks the post button

**Expected outcomes:** The food is posted, and other users can see the post on their feed

### Test Case 2:

**Context:** The user is on the login page

**Actions:** The user attempts to sign in with the wrong login information

**Expected Outcomes:** An error message appears to alert the user of their mistake

### Test Case 3:

**Context:** The user is on the post food page

**Actions:** The user attempts to post food while missing either the location, caption, or image

**Expected Outcomes:** An error message appears to alert the user that they are missing a required component to post something
