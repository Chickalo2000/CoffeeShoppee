# CoffeeShoppee

CoffeeShoppee is a dynamic, full-stack project that seamlessly blends technology and creativity to bring coffee enthusiasts a unique global experience. The centerpiece of the website is a visually engaging 3D rotating globe, built using Planetary.js, which allows users to explore and discover coffee recipes from different countries by interacting with clickable coffee bean markers. Each recipe provides a comprehensive view of the coffee culture it represents, including ingredients, preparation steps, cultural background, and embedded YouTube videos. With an emphasis on accessibility and user engagement, CoffeeShoppee incorporates responsive design, ensuring smooth navigation and aesthetic appeal across all devices. Additionally, a Coffee Fun Fact Generator and a recipe submission form invite users to actively participate, either by enjoying entertaining coffee trivia or by contributing their own recipes to celebrate their culture. Powered by robust backend technology, including Node.js, Express.js, and MongoDB, this project also demonstrates proficient use of version control with Git and GitHub, modular code organization, and a collaborative approach to development. CoffeeShoppee is designed not just to inform and delight, but to connect coffee lovers around the world through an interactive and user-friendly platform.

### Key Features
1. **Interactive 3D Rotating Globe:**  
   Developed using Planetary.js, the globe features clickable coffee bean markers for each country, enabling users to discover recipes from different regions. Each click fetches and displays recipe videos, immersing users in the coffee culture of that region.

2. **Recipe Submission Form:**  
   Users can submit their own coffee recipes, contributing to the platform's community-driven approach. The form captures essential details, including recipe name, ingredients, preparation steps, and cultural background. Backend processes ensure secure storage and proper validation of user submissions.

3. **Coffee Fun Fact Generator:**  
   A playful feature that dynamically pulls coffee-related trivia from Firebase. It seamlessly integrates fun facts into the frontend, enhancing engagement and adding a layer of entertainment. Recent debugging ensures the generator runs smoothly across all devices.

---

### Technologies and Tools
- **Front-End:** HTML5, CSS3 with responsive media queries, JavaScript  
- **Back-End:** Node.js and Express.js  
- **Database:** Firebase for dynamic data handling and Pantry for recipe storage  
- **Interactive Map:** Planetary.js, along with TopoJSON/GeoJSON for geographical data integration  
- **Version Control:** Git and GitHub for collaborative development and code management 

---

### Integration Highlights
- **Globe Functionality:** Created using Planetary.js with customized event handling for interactive coffee bean markers.  
- **Responsive Design:** Developed layouts optimized for desktops, tablets, and mobile devices.  
- **Recipe Videos:** Embedded YouTube videos for a rich user experience.

---

### User Flow

1. Navigate to the homepage, running on (http://127.0.0.1:3001/index.html)showcasing the 3D rotating globe.  
2. Click on coffee bean markers over various countries.  
3. View recipe videos.  
4. Submit your own recipe through the dedicated form, follow steps below regarding how to form submission.

---

### Project Installation & Setup
1. **Clone the Repository:**  
   `git clone https://github.com/yourusername/CoffeeShoppee.git`  
2. **Navigate to Project Directory:**  
   `cd CoffeeShoppee/`  
3. **Install Dependencies:**  
   `npm install`
   `npm run`
4. **Run Locally:**
   http://localhost:3000
   type...
   `node submissionform.js` - runs the submission form server from Pantry
             & 
   `npx nodemon server.js` - runs the server for fun facts with firebase
   Open http://localhost:3000
   Server will run on PORT 3000
   Press `Ctrl + C` to stop the server when finished.
5. **Form Submission:**  
   Hit `Submit Recipe` and form will populate
   Input each field
   Hit `submit recipe` - If done correctly, system will advise "recipe submitted correctly."
   Submitted information will then populate in the your terminal and will also be store in the Pantry database.

Firebase database: https://console.firebase.google.com/project/coffeeshoppee-b3a30/database/coffeeshoppee-b3a30-default-rtdb/data
Pantry database: https://getpantry.cloud/apiv1/pantry/28486b5b-2c1c-4633-9b7d-035657f988cc/basket/recipeSubmissions
---
