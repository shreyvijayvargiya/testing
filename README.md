# Blogit
Ultimate boilerplate for all content creation platforms!!

## How to Get Started

```
- Download the repository
- Check "node -v" which version is installed or not, if not install node using brew
- Go inside the directory in the terminal or open directory in vs-code and open terminal
- Get firebase API keys from the Firebase console
- Add API keys inside .env file, (API object structure is defined below)
- Enter "yarn" command to install packages
- Run "yarn run dev" to run server at PORT 3001
- Open localhost:3001 to see thigns working well
```

## Architechture

- **components**: directory that contains all UI components + UI logic + state management for each page
- **modules**: directory that contains all reusable code components such as Cards, UI components, Login Modal
- **packages**: directory that contians third-party APIs, Firebase APIs, Storage and Analytics APIs
- **redux**: redux directory for state management
- **public**: directory for static files such as images or html
- **utils**: directory for all hooks and configurations such as firebase
- **jsconfig** - file to add absolute imports
- **next.config.js** - file for adding next.js configurations such as ENV keys
- **package.json** - file that contains the project details such as author, how to run, packages installed
- **postcss.config.js** -
- **styles.css** - Global CSS styles for the entire project, take it as a parent or root CSS
- **tailwind.config.js** - Tailwind configurations

##

## API Explanation

### Blog API overview (/packages/api/blogApi/index.js)

- **createBlogApi**: Creates a new blog with generated sample content and stores it in Firestore.
- **getAllBlogsApi**: Fetches all blogs from Firestore and sorts them by timestamp in descending order.
- **getBlogByIdApi**: Retrieves a single blog by its ID from Firestore.
- **makeBlogPublicApi**: Publishes a blog by moving it to a public collection and associating it with user details.
- **removeBlogFromPublicApi**: Removes a blog from the public collection and updates its private status.
- **getPublicBlogByIdApi**: Fetches a public blog by its ID.
- **deleteBlogApi**: Deletes a blog from Firestore.
- **updateBlogDetailsApi**: Updates the details of an existing blog with a batch update.
- **uploadFileInFirestorageApi**: Uploads a file (like an image) to Firebase storage and returns the file’s download URL.

### User API Overview: (packages/api/userApi/index.js)

- **getAllPublicBlogsApi**: Fetches all public blogs stored in the `PublicBlogs` collection.
- **storeUserInDatabaseApi**: Stores user details in the `Users` collection in Firestore.
