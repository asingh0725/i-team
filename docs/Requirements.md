# Phase 4: Requirements

# Non-Functional Requirements

**NF.1: Maintainability:** After 24 hours of a post being posted, it will be removed automatically. incomplete 

**NF.2: Security of Users:** Only UW students will be able to access our platform. Therefore, they will need to log in with their UW NetID credentials. complete issue #18 

# Site-wide requirements

**SWP.1: Footer:** A footer with the copyright name and creator names. complete issue #42

**SWP.2: Navigation Bar Button:** On click of a button on the navigation bar, it must take users to the corresponding page. complete issue #11

**SWP.3: Navigation Bar Logo:** On click of the logo on the navigation bar, it must navigate to the home page. complete issue #11

# Home Page

**When users are not logged in**, it will contain the following:

**HP.1: Navigation Bar:** Logo on the far right, home, about page, log-in buttons.

**HP.2: Welcome Sign:** Below the navigation bar, there must be a welcome sign that includes a picture of a husky.

**HP.3: Log In Button:** Below the welcome sign, there must be a button that, on click, prompts users to log in with their UW NetID.

**HP.4: Home Button:** On click of the home button, it will navigate users to a welcome page.

**When users are logged in**, it will contain the following:

**HP.5: Navigation Bar:** Logo on the far right, an avatar, home, about page, and create post buttons.

**HP.6: Feed:** A feed that includes a location, description, and pictures of food must be displayed. This functionality is similar to Instagram's feed, which provides a familiar experience for users.

**HP.7: Scrollable Feed:** Users must be able to scroll down the feed to view more content.

**HP.8: Avatars:** Student’s avatars will use the avatar that is linked to their email.

**HP.9: Home Button:** On click of the home button, it will navigate users to their feed.

# Log In

**LI.1: Log In Button:** On click of the "Log-in" button on the nav bar, users must be prompted to a new page where they can log in with their UW NetID.

**LI.2: Log In Prompt:** On click of the "click here to login" button, users must be prompted to a login screen where they can log in with their UW NetID.

**LI.3: Login Screen:** The login screen will be the same as all UW-related things that ask for your UW NetID.

**LI.4: Navigation Bar:** Logo on the far right, home, about page, log-in buttons.

# Login Error

**LE.1: Login Prompt:** Once users click on the "Log-in" button, then users will be prompted to log in with their UW NetID.

**LE.2: Login Screen:** The screen will be the same as all UW-related things that ask for your UW NetID.

**LE.3: Navigation Bar:** Logo on the far right, home, about page, log-in buttons.

**LE.4: Error Message:** If the user enters the wrong login information or uses a non-UW email, the sign-in process doesn’t render when clicked. It will give users an error message below the Washington watermark that has a purple “W” over the login text box where you enter the email/NetID and password information. This error will say "Please sign in with your UW NetID".

# Post Food Error: Missing Location

**Pl.1: Navigation Bar:** Logo on the far right, home, create post, and about buttons.

**Pl.2: Create Post Prompt:** On click of "create post", it prompts users to create a post which requires adding location, photo, caption.

**Pl.3: Location Box:** Under the location button, includes a box with a button that prompts users to upload their image on click.

**Pl.4: Image Box:** Under the image box, includes a button that prompts users to enter a caption on click, and to the right of this button is a green button that prompts users to post after clicking it.

**Pl.5: Error Message:** If the user tries to post without including a location, a brown error message appears on the body of the page that warns users to add a location.

# Post Food Error: Missing Image

**PI.1: Navigation Bar:** Logo on the far right, home, create post, and about buttons.

**PI.2: Image Box:** Under the location button, includes a box with a button that prompts users to upload their image on click.

**PI.3: Caption Box:** Under the image box, includes a button that prompts users to enter a caption on click, and to the right of this button is a green button that prompts users to post after clicking it.

**PI.4: Error Message:** If the user tries to post without including an image, a brown error message appears on the body of the page that warns users to add an image.

# Post Food Error: Missing Caption

**PC.1: Navigation Bar:** Logo on the far right, home, create post, and about buttons.

**PC.4: Location Box:** Under the location button, includes a box with a button that prompts users to upload their image on click.

**PC.5: Image Box:** Under the image box, includes a button that prompts users to enter a caption on click, and to the right of this button is a green button that prompts users to post after clicking it.

**PC.6: Error Message:** If the user tries to post without including a caption, a brown error message appears on the body of the page that warns users to add a caption.

# Post Food

**CP.1: Create Post Page:** The system must provide a "Create Post" page where users can initiate a new post.

**CP.2: Image Upload:** The "Create Post" page must have a mechanism for users to upload an image or multiple images. This action is mandatory for post-creation.

**CP.3: Image Validation:** The system should verify the validity of the uploaded image file(s) before accepting the upload.

**CP.4: Add Location:** The "Create Post" page must provide an "Add Location" option that triggers an input field for users to add a location to their post. This field is mandatory.

**CP.5: Include Caption:** The "Create Post" page must provide an "Include Caption" option that triggers a text box for users to add a caption to their post. The field is mandatory.

**CP.6: Error Handling:** The system should display an error message when a mandatory field is not filled or invalid.

**CP.7: Post Button:** The "Create Post" page must have a green "Post" button which becomes active only when all mandatory fields are filled and valid.

**CP.8: Successful Post Creation:** Upon successful post creation, the system must direct the user to the "Feed" page.

# Feed

**F.1: Feed Page:** The system must provide a "Feed" page where users can view all posts.

**F.2: Vertical Post Display:** Posts should be displayed vertically in the center of the "Feed" page.

**F.3: User Avatar:** Each post must display an image of the avatar of the post creator at the top left of the post. This avatar must be fetched from the user's profile.

**F.4: Display the location pin** Each post must display an icon of a location pin and the location of the post to the right of the avatar.

**F.5: Display the food images/captions with each post** Each post must display the uploaded image(s) and the caption below the image.

**F.6: Scrolling feature** The system must provide a scrolling feature, allowing users to browse multiple posts on the “Feed” page.

# About Us

**A.1: Access for All Users:** It does not matter if users are logged in or not, they will have access to the “About” page.

**A.2: Title:** The "About" page must display "About Us" at the middle top of the body.

**A.3: Why Share-A-Bite? Description:** The “About” page must display the paragraph that describes the reason why we created this app underneath the headline of “Why Share-A-Bite?”.

**A.4: How to Use the App:** The “About” page must display the paragraph that describes how users can use this app by breaking it down into four steps and explaining them underneath the headline of “How do I use it?”.

