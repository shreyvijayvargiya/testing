const data = [
	{
		id: 1,
		title: "Morning Bliss",
		description: "Experience the serenity of dawn with calming melodies.",
	},
	{
		id: 2,
		title: "Tech Trends",
		description: "Stay updated with the latest in technology and innovation.",
	},
	{
		id: 3,
		title: "Culinary Delights",
		description: "Explore recipes that tantalize your taste buds.",
	},
	{
		id: 4,
		title: "Artistic Vision",
		description: "Dive into the world of contemporary art and design.",
	},
	{
		id: 5,
		title: "Fitness Fusion",
		description: "Blend various workouts for optimal health benefits.",
	},
	{
		id: 6,
		title: "Travel Diaries",
		description: "Journey through mesmerizing destinations worldwide.",
	},
	{
		id: 7,
		title: "Financial Freedom",
		description: "Strategies to achieve and maintain economic stability.",
	},
	{
		id: 8,
		title: "Mindful Living",
		description: "Embrace practices that promote mental well-being.",
	},
	{
		id: 9,
		title: "Eco Warriors",
		description: "Initiatives and tips for sustainable living.",
	},
	{
		id: 10,
		title: "Literary Gems",
		description: "Discover books that leave a lasting impact.",
	},
	{
		id: 11,
		title: "Music Maestro",
		description: "Insights into the world of classical compositions.",
	},
	{
		id: 12,
		title: "Fashion Forward",
		description: "Stay ahead with the latest style trends.",
	},
	{
		id: 13,
		title: "Digital Nomads",
		description: "Navigating the lifestyle of working remotely.",
	},
	{
		id: 14,
		title: "Science Simplified",
		description: "Breaking down complex concepts for everyone.",
	},
	{
		id: 15,
		title: "Home Hacks",
		description: "Tips to make household tasks easier and efficient.",
	},
	{
		id: 16,
		title: "Pet Paradise",
		description: "Creating the best environment for your furry friends.",
	},
	{
		id: 17,
		title: "Gardening Guide",
		description: "Cultivate a thriving garden with expert advice.",
	},
	{
		id: 18,
		title: "Cinema Classics",
		description: "Revisiting films that shaped the industry.",
	},
	{
		id: 19,
		title: "Startup Stories",
		description: "Inspiring journeys of successful entrepreneurs.",
	},
	{
		id: 20,
		title: "Healthy Habits",
		description: "Incorporate routines that boost overall wellness.",
	},
	{
		id: 21,
		title: "Astronomy Awe",
		description: "Explore the mysteries of the universe.",
	},
	{
		id: 22,
		title: "Language Lab",
		description: "Techniques to master new languages efficiently.",
	},
	{
		id: 23,
		title: "Mind Games",
		description: "Puzzles and challenges to sharpen your intellect.",
	},
	{
		id: 24,
		title: "Craft Corner",
		description: "DIY projects to unleash your creativity.",
	},
	{
		id: 25,
		title: "Historical Highlights",
		description: "Events that shaped the course of history.",
	},
	{
		id: 26,
		title: "Urban Exploration",
		description: "Discover hidden gems in bustling cities.",
	},
	{
		id: 27,
		title: "Ocean Odyssey",
		description: "Dive deep into the wonders of marine life.",
	},
	{
		id: 28,
		title: "Mental Math",
		description: "Techniques to calculate swiftly in your mind.",
	},
	{
		id: 29,
		title: "Photography Pointers",
		description: "Enhance your skills to capture perfect shots.",
	},
	{
		id: 30,
		title: "Birdwatcher's Log",
		description: "A guide to identifying various bird species.",
	},
	{
		id: 31,
		title: "Space Tech",
		description: "Advancements propelling space exploration.",
	},
	{
		id: 32,
		title: "Poetry Palette",
		description: "Expressive verses that touch the soul.",
	},
	{
		id: 33,
		title: "Myth Busters",
		description: "Debunking common misconceptions and myths.",
	},
	{
		id: 34,
		title: "Coding Chronicles",
		description: "Journey through the evolution of programming.",
	},
	{
		id: 35,
		title: "Nutrition Nuggets",
		description: "Essential tips for a balanced diet.",
	},
	{
		id: 36,
		title: "Architectural Marvels",
		description: "Structures that redefine design boundaries.",
	},
	{
		id: 37,
		title: "Dance Dynamics",
		description: "Exploring various dance forms across cultures.",
	},
	{
		id: 38,
		title: "Philosophy 101",
		description: "An introduction to fundamental philosophical ideas.",
	},
	{
		id: 39,
		title: "Comedy Central",
		description: "Laughs guaranteed with top comedic acts.",
	},
	{
		id: 40,
		title: "Wildlife Wonders",
		description: "Encounters with nature's majestic creatures.",
	},
	{
		id: 41,
		title: "Startup Toolkit",
		description: "Resources essential for budding entrepreneurs.",
	},
	{
		id: 42,
		title: "Game Reviews",
		description: "In-depth analysis of the latest video games.",
	},
	{
		id: 43,
		title: "Sculpture Spotlight",
		description: "Celebrating masterpieces in sculpture art.",
	},
	{
		id: 44,
		title: "Cultural Cuisine",
		description: "Delve into dishes from around the world.",
	},
	{
		id: 45,
		title: "Environmental Echoes",
		description: "Understanding our impact on the planet.",
	},
	{
		id: 46,
		title: "Psychology Perspectives",
		description: "Insights into human behavior and mind.",
	},
	{
		id: 47,
		title: "Fitness Fundamentals",
		description: "Basics to kickstart your health journey.",
	},
	{
		id: 48,
		title: "Vocal Virtuosos",
		description: "Highlighting voices that mesmerize.",
	},
	{
		id: 49,
		title: "DIY Decor",
		description: "Transform spaces with handmade decorations.",
	},
	{
		id: 50,
		title: "Tech Tutorials",
		description: "Step-by-step guides to master new gadgets.",
	},
];

export const sampleBlogGenerator = () => {
	const randomNum = Math.round(Math.random() * 50 + 1);
	return data.filter((item) => item.id === randomNum)[0];
};

