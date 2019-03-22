## Rentle coding exercise

How many hours did you spend doing the assignment?

* It took me around 12h, but it didn’t feel like that long!

Short summary of what you built, how, and why?

* I built 2 different components: DatePicker and Card.

* To the DatePicker I imported a DateRangePicker from where I got the start and end date of the selected date range. With the dispatchedProps of ”updateValue” I updated the startDate and endDate of the search terms for the Firebase-query. I built the query so that it check that the endDate is before or same as the range’s endDate and then from the received list I only chose the ones that had a startDate same or later than the chosen range’s startDate.

* I chose to use DateRangePicker for two reasons: 1) easiest way to get both the start- and endDate 2) it looked better with just one calendar.

* For the Card I sent a props with the specific label so that I could with if-statements choose what to display in the chosen card.

Tell about your process: how did you get familiar with the existing code, where did you start first, which parts of the exercise did you focus on the most?

* I started by looking at how the overall layout of the application was made and how it was segmented. Then I first looked at the views to get an understanding of how the report-view was built. After that I started working on the DateRange picker, the part that I focused most of my time on. When I got stuck with the date range picker I created the Card component to get the most important data highlighted to the top of the page and then worked on the table view. After all that was done I focused my energy on getting the Date range picker to work and finished it.

Was there some parts of the exercise that were challenging, or you could not do? What took most of your time?

* By far the most time took to get a date range picker working. I just couldn’t figure out how to get one working properly. I feel that i must have tried almost all of the possible pickers… :D Then getting the dates from the picker to the report was hard because of the unfamiliar stack. I ended up doing it straight with react since I couldn’t figure out how to do it with redux in a working matter. I also had to use a class of any since I couldn’t get the DateRange-type added. I also didn’t have time to come up with an effective way of getting the most popular product, so I decided to scratch it from my todo.

If you had more time, what would you develop more for your Reporting view?

* top 5 most sold items, top 5 least used items, expandable accordion for each order so that you can see all the data, how many items were out at the exactly same time, graph of how the rentals have occurred during the selected time period, and so on and so on..


Which technologies/libraries/frameworks in the coding exercise were new to you, and which were you already familiar with? What was your first impression of the new technologies that you tried?
* Almost all of it was relatively new. The date range picker was totally new. I have used very little Typescript (some at Trimble) so that was a challenge for me. I definitely liked it, since it is very precise in what and how you can write. 
Was there something in the database architecture of the rentals that was odd or that you would change to make it easier to compose data for the Reporting view?

* Nothing odd, I would’ve preferred a shorter route to the rented items since it didn’t feel optimal to go through each renter to find all the rented items for each order, but that’s just a preference.

Any other comments about the existing code or about the exercise?

* I felt that the exercise gave a fairly good overview of what developing with your stack could look like. I liked it, even though I’m sure I haven’t been able to follow the best practices in every part.

Feedback to us: How did you like the coding exercise? What could we improve in it?
* A static dataset could be good. There’s nothing wrong with doing the queries to Firebase, but it might be a waste of your resources.


### Case description

Our imaginary pilot customer is a ski rental shop owner and super excited about Rentle, but he is really looking for a way to get good reports out of all the rentals that are made through the Rentle software.
For this requirement, the Rentle team formed a user story for the Reporting feature:

---

Our customer wants to get a reporting view of all the rentals that are going through the software.
The report should show all the completed rentals from the selected date ranges.
The report should also show data that is interesting for our customer, who is operating a rental business (such as amount of rentals, total revenue from the rentals, most popular products, average rental prices, average rental durations etc.)

---

A developer of the Rentle team was only able to create a dummy Report view that only fetches all the shop's rentals from the Firestore database, and lists them all to a simple HTML table. The Reports component was **not** optimally made, and the Reporting view is not sufficient to meet the requirements of the described user story.

### The content of the code exercise

Your task is to fulfill the requirements of the user story by modifying the Reports view (and other parts of the code if needed to structure your implementation).
To help you complete the task, Rentle team has listed some steps that should be in the final submitted version:

1. Create a component that allows the user to select a specific date range to view all the completed rentals from that date range. You can take advantage of other libraries or implement it by yourself, whichever you think is better.

   *Optional*: Edit the database fetching logic, so that you fetch only the rentals that you need to show in the UI based on the selected date range. (If you think of a case, where there is 10000 rentals, it is not very efficient to fetch all of them if the UI needs to show only 100)

2. Fulfill the requirements of the user story by adding more information to the reporting view. Think yourself in the shoes of the rental shop owner, and think which kind of data would be beneficial for them to see in order to improve their daily rental business. Moreover, take advantage of the Material UI library and improve the UI of your Reports view to make it easier to read and more informative (the final visual design of the Reporting view is not important, but focus more on the functionality).

3. Structure your code so that it follows React/Redux best practices.

4. Answer to the questions in the end of the readme-file after the other parts are done and before you submit your exercise.

### Running the exercise locally

1. Clone the code-exercise repository
2. In the root folder:

`npm install`


`npm start`



CLI should open your browser and the app should start running in localhost:8000

For the exercise, you can login with Rentle Shop user credentials:

Username: `rentleshop@rentle.io`

Password: `RentleShop`


We have added some mock rental data to Rentle Shop user that the project fetches from the database. You should use this data to complete the exercise.

### Submit instructions

Clone this repository and make all the changes to your own repository that you push to your own GitHub / other collaboration platform. You can push your result to a private or public repository.

When you are ready to submit, send us an email to `founders@rentle.io` to let us know that you have submitted the exercise. If the solution is in a public repository, give us the URL for the repository. If it is in a private repository in GitHub, invite also `tooga` GitHub username as a collaborator. If it is in some other platform, give us instructions on how to access your submitted solution.

Remember to answer to the questions in the readme. You can either send them to us in the submit email, or write them directly to your readme file.