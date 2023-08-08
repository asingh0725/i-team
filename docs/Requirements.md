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

**HP.1: Navigation Bar:** Logo on the far right, home, about page, log-in buttons. complete issue #11

**HP.2: Welcome Sign:** Below the navigation bar, there must be a welcome sign that includes a picture of a husky. complete issue #4

**HP.3: Log In Button:** Below the welcome sign, there must be a button that, on click, prompts users to log in with their UW NetID. complete issue #6

**HP.4: Home Button:** On click of the home button, it will navigate users to a welcome page. complete #6

**When users are logged in**, it will contain the following:

**HP.5: Navigation Bar:** Logo on the far right, an avatar, home, about page, and create post buttons. complete issue #11

**HP.6: Feed:** A feed that includes a location, description, and pictures of food must be displayed. This functionality is similar to Instagram's feed, which provides a familiar experience for users. complete issue #17

**HP.7: Scrollable Feed:** Users must be able to scroll down the feed to view more content. complete issue #17

**HP.8: Avatars:** Student’s avatars will use the avatar that is linked to their email. can't do this because we can't use the UW API incomplete 

**HP.9: Home Button:** On click of the home button, it will navigate users to their feed. complete issue #11


# Log In

**LI.1: Log In Button:** On click of the "Log-in" button on the nav bar, users must be prompted to a new page where they can log in with their UW NetID. Completed: Issue #6

**LI.2: Log In Prompt:** On click of the "click here to login" button, users must be prompted to a login screen where they can log in with their UW NetID. Completed: Issue #12

**LI.3: Login Screen:** The login screen will be the same as all UW-related things that ask for your UW NetID. Completed: Issue #18

**LI.4: Navigation Bar:** Logo on the far right, home, about page, log-in buttons. Completed: Issue #11

# Login Error

**LE.1: Login Prompt:** Once users click on the "Log-in" button, then users will be prompted to log in with their UW NetID.
Completed: Issue #12

**LE.2: Login Screen:** The screen will be the same as all UW-related things that ask for your UW NetID. 
Completed: Issue #18

**LE.3: Navigation Bar:** Logo on the far right, home, about page, log-in buttons.
Completed: Issue #11

**LE.4: Error Message:** If the user enters the wrong login information or uses a non-UW email, the sign-in process doesn’t render when clicked. It will give users an error message below the Washington watermark that has a purple “W” over the login text box where you enter the email/NetID and password information. This error will say "Please sign in with your UW NetID".
Completed: Issue #10

# Post Food Error: Missing Location

**Pl.1: Navigation Bar:** Logo on the far right, home, create post, and about buttons.
 Completed: Issue #11
 
**Pl.2: Create Post Prompt:** On click of "create post", it prompts users to create a post which requires adding location, photo, caption.
Complete: Issue #16

**Pl.3: Location Box:** Under the location button, includes a box with a button that prompts users to upload their image on click.
Complete: Issue #14

**Pl.4: Image Box:** Under the image box, includes a button that prompts users to enter a caption on click, and to the right of this button is a green button that prompts users to post after clicking it.
Complete: Issue #15 and #16

**Pl.5: Error Message:** If the user tries to post without including a location, a brown error message appears on the body of the page that warns users to add a location.
Complete: Issue #10

# Post Food Error: Missing Image

**PI.1: Navigation Bar:** Logo on the far right, home, create post, and about buttons.
Completed: Issue #11

**PI.2: Image Box:** Under the location button, includes a box with a button that prompts users to upload their image on click.
Complete: Issue #14

**PI.3: Caption Box:** Under the image box, includes a button that prompts users to enter a caption on click, and to the right of this button is a green button that prompts users to post after clicking it.
Complete: Issue #15 and #16

**PI.4: Error Message:** If the user tries to post without including an image, a brown error message appears on the body of the page that warns users to add an image.
Complete: Issue #10

# Post Food Error: Missing Caption

**PC.1: Navigation Bar:** Logo on the far right, home, create post, and about buttons.
Completed: Issue #11

**PC.4: Location Box:** Under the location button, includes a box with a button that prompts users to upload their image on click.
Complete: Issue #14

**PC.5: Image Box:** Under the image box, includes a button that prompts users to enter a caption on click, and to the right of this button is a green button that prompts users to post after clicking it.
Complete: Issue #15 and #16

**PC.6: Error Message:** If the user tries to post without including a caption, a brown error message appears on the body of the page that warns users to add a caption.
Complete: Issue #10

# Post Food

**CP.1: Create Post Page:** The system must provide a "Create Post" page where users can initiate a new post.
Complete: Issue #16

**CP.2: Image Upload:** The "Create Post" page must have a mechanism for users to upload an image or multiple images. This action is mandatory for post-creation.
Complete: Issue #45

**CP.3: Image Validation:** The system should verify the validity of the uploaded image file(s) before accepting the upload.
Complete: Issue #14

**CP.4: Add Location:** The "Create Post" page must provide an "Add Location" option that triggers an input field for users to add a location to their post. This field is mandatory.
Complete: Issue #13

**CP.5: Include Caption:** The "Create Post" page must provide an "Include Caption" option that triggers a text box for users to add a caption to their post. The field is mandatory.
Complete: Issue #15

**CP.6: Error Handling:** The system should display an error message when a mandatory field is not filled or invalid.
Complete: Issue #10

**CP.7: Post Button:** The "Create Post" page must have a green "Post" button which becomes active only when all mandatory fields are filled and valid.
Complete: Issue #16

**CP.8: Successful Post Creation:** Upon successful post creation, the system must direct the user to the "Feed" page.
Complete: Issue #17
# Feed

**F.1: Feed Page:** The system must provide a "Feed" page where users can view all posts. complete issue #17

**F.2: Vertical Post Display:** Posts should be displayed vertically in the center of the "Feed" page. complete issue #17

**F.3: User Avatar:** Each post must display an image of the avatar of the post creator at the top left of the post. This avatar must be fetched from the user's profile. complete issue #17

**F.4: Display the location pin** Each post must display an icon of a location pin and the location of the post to the right of the avatar.
complete issue #17
**F.5: Display the food images/captions with each post** Each post must display the uploaded image(s) and the caption below the image. complete issue #14

**F.6: Scrolling feature** The system must provide a scrolling feature, allowing users to browse multiple posts on the “Feed” page.
complete issue #17
# About Us

**A.1: Access for All Users:** It does not matter if users are logged in or not, they will have access to the “About” page. complete #5

**A.2: Title:** The "About" page must display "About Us" at the middle top of the body. complete #5

**A.3: Why Share-A-Bite? Description:** The “About” page must display the paragraph that describes the reason why we created this app underneath the headline of “Why Share-A-Bite?”. complete #5

**A.4: How to Use the App:** The “About” page must display the paragraph that describes how users can use this app by breaking it down into four steps and explaining them underneath the headline of “How do I use it?”. complete #5

