# Basic Blog

## User Story
**AS A** developer who writes about tech<br>
**I WANT** a CMS-style blog site<br>
**SO THAT** I can publish articles, blog posts, and my thoughts and opinions

## Acceptance Criteria
**GIVEN** a CMS-style blog site
1. **WHEN** I visit the site for the first time<br>
**THEN** I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
2. **WHEN** I click on the homepage option<br>
**THEN** I am taken to the homepage
3. **WHEN** I click on any other links in the navigation<br>
**THEN** I am prompted to either sign up or sign in
4. **WHEN** I choose to sign up<br>
**THEN** I am prompted to create a username and a password
5. **WHEN** I click on the sign-up button<br>
**THEN** my user credentials are saved and I am logged into the site
6. **WHEN** I revisit the site at a later time and choose to sign in<br>
**THEN** I am prompted to enter my username and password
7. **WHEN** I am signed in to the site<br>
**THEN** I see navigation links for the homepage, the dashboard, and the option to log out
8. **WHEN** I click on the homepage option in the navigation<br>
**THEN** I am taken to the homepage and presented with existing blog posts that include the post title and the date created
9. **WHEN** I click on an existing blog post<br>
**THEN** I am presented with the post title, contents, post creator's username, and date created for that post and have the option to leave a comment
10. **WHEN** I enter a comment and click on the submit button while signed in<br>
**THEN** the comment is saved and the post is updated to display the comment, the comment creator's username, and the date created
11. **WHEN** I click on the dashboard option in the navigation<br>
**THEN** I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
12. **WHEN** I click on the button to add a new blog post<br>
**THEN** I am prompted to enter both a title and contents for my blog posts
13. **WHEN** I click on the button to create a new blog post<br>
**THEN** the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
14. **WHEN** I click on one of my existing blog posts in the dashboard<br>
**THEN** I am able to delete or update my post and taken back to an updated dashboard
15. **WHEN** I click on the logout option in the navigation<br>
**THEN** I am signed out of the site
16. **WHEN** I am idle on the site for more than a set time<br>
**THEN** I am able to view comments but I am prompted to log in again before I can add, update, or delete comments