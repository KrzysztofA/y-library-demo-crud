<!--
{
  "meta":
  {
    "type": "WebAppFULLSTACK",
    "ready": true,
    "version": "1.0.0",
    "main":
    [
      "React",
	"ASP.Net",
      "WebDevelopment"
    ],
    "tags":
    [
      "JavaScript",
      "JSX",
      "SCSS",
      "CSS",
      "React",
      "UX",
      "GitHub",
      "FrontEnd",
      "BackEnd",
      "Database",
      "NoSQL",
      "API"
    ],
    "satisfaction": "2",
    "difficulty": "6",
    "challange": "5",
    "complexity": "8"
  }
}
-->

# My Portfolio

## 3 Parts Portfolio - "Hero" Site, Blog and Projects Repository

This project contains my portfolio, which was a massive UX project for me,
supported by React and Next JS for my frontend and backend. This project has
already been revised thrice, with two global style changes and a code revision
and repository switch.

## Stack

### Frameworks and Libraries

- Next.JS #**13**
- React #**18**
- SASS (SCSS) #**1.5**
- TypeScript #**4.9**

### Integrated APIs

- GitHub API

## Background

The project was first developed long time ago and was an important one for me.
It started as an assignment in my first year of University, where we were tasked
with creation of a portfolio for a Professional Environments module.

I managed to put mine together with some basic JavaScript, HTML and CSS to leave
it for the next 2-3 years untouched.

When doing my Master's it was a time to take it a step further. Creating a blog
was our another small assignment, which I also decided to put together myself,
rather than to use ready tools. For me, it gave extra satisfaction, as well as a
challange. I wasn't a big fan of my initial design after prototyping it, and got
tangled in the code for my second one. I decided to create it with Next.JS and
learn all common practices around it along with learning React. Both of these
weren't really my go-to frameworks, but it was fun and challenging to work on
them.

The final piece is in fact 3 projects stitched up together, featuring my main
Portfolio, explaining my background and displaying my main projects and
achievements; Blog site with subscription API and database for posts; and
finally the Skills page, which lists all my projects by fetching them from
GitHub (later possibly Itch.io too) and categorising them, and showing which -
by my own measure - skills I excel in and which ones I am still working on.

## Features

### Technical

Here technical details are listed along with some examples and (technical)
features:

<details>
<summary>
**SCSS Powered Universal Media Quaries**
</summary>

```scss
$desktop: "only screen and (max-width: #{$large-screen-size}) and (orientation: landscape) and (max-resolution: 1.4dppx), only screen and (max-width: #{$tablet-screen-size}) and (min-resolution: 1.4dppx) and (orientation: landscape)";
$tablet: "only screen and (max-width: #{$tablet-screen-size}) and (orientation: landscape) and (max-resolution: 1.4dppx), only screen and (max-width: #{$mobile-screen-size}) and (min-resolution: 1.4dppx) and (orientation: landscape)";
$mobile: "only screen and (max-width #{$mobile-screen-size}) and (orientation: landscape), only screen and (max-width: #{$tablet-screen-size})  and (orientation: portrait)";
```

This feature enables the configuration of Media Queries that can be invoked with
(for instance):

`@media #{$desktop} { // Content }`

These queries are universal for the entire application and enable semantic
determination of the target device.

</details>

## Contributions

- KrzysztofA

Thus far it's just me

## Gallery

TBA

## Implementation Progress (TODOs)

- [ ] Home Page
  - [x] Front Page
    - [x] Links
    - [x] Avatar
    - [x] Profile
  - [ ] Projects Reel (Video and quick presentation)
  - [ ] Projects Cards (Top 3)
  - [x] Background Cards
    - [x] Undergraduate Studies
    - [x] Postgraduate Studies
    - [x] Work Experience
  - [ ] Surprise Page (Dog Gallery)
- [ ] Blog Page
  - [ ] Posts Database
  - [x] Posts View
  - [ ] Single Post View
    - [ ] Post Section
    - [ ] Comments Section
    - [ ] Comment Text
  - [ ] Subscription Feature
    - [ ] Registration (Email, Password only)
    - [ ] Subscribers Database
    - [ ] Subscribers Users UI
      - [ ] Login Option
      - [ ] Delete Account Option
      - [ ] Send Notification Option
  - [ ] Comment (Subscribers only)
  - [ ] Utilities
    - [ ] Search
    - [ ] Filter
    - [x] Display
      - [x] List
      - [x] Thumbnails
- [ ] Skills Page
  - [ ] Projects Database
    - [x] Github Integration
    - [x] Caching System
    - [ ] Database Container (With Caching System)
  - [ ] Skill Widget
    - [ ] Skill Statistics
    - [ ] Skill Recent Posts
    - [ ] Skill Projects List
    - [ ] Skill Top Projects
  - [ ] Skill Page
  - [ ] Project Page
    - [ ] Project Section
    - [ ] Blog Posts Section
    - [ ] Comments Section
  - [ ] Only Projects View
    - [ ] List View
    - [ ] Thumbnail View
    - [ ] Utilities
      - [ ] Search
      - [ ] Filter

## Final Words

Thank you for checking it out, that's a big one for me
