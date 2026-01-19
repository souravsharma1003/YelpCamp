const connectToDb = require("./config/db");
const Campground = require("./models/campground");
const generateImage = require("./utils/coverimage.util");
require("dotenv").config();

const mockData = [
  {
    title: "Pine Woods Retreat",
    price: "1200",
    description: "A peaceful campground surrounded by tall pine trees and fresh air.",
    location: "Manali, Himachal Pradesh"
  },
  {
    title: "Riverbend Camps",
    price: "1500",
    description: "Camp beside a flowing river with beautiful sunset views.",
    location: "Rishikesh, Uttarakhand"
  },
  {
    title: "Desert Star Camp",
    price: "1800",
    description: "Experience camping under the stars in the golden desert.",
    location: "Jaisalmer, Rajasthan"
  },
  {
    title: "Hilltop Escape",
    price: "1000",
    description: "A budget-friendly hilltop campsite with panoramic views.",
    location: "Mussoorie, Uttarakhand"
  },
  {
    title: "Lakeside Haven",
    price: "2000",
    description: "Relax near the lake with boating and campfire activities.",
    location: "Nainital, Uttarakhand"
  },
  {
    title: "Jungle Trails Camp",
    price: "1400",
    description: "Stay close to nature with guided jungle trails.",
    location: "Wayanad, Kerala"
  },
  {
    title: "Snow Peak Camp",
    price: "2200",
    description: "Camp near snow-covered mountains with breathtaking views.",
    location: "Gulmarg, Jammu & Kashmir"
  },
  {
    title: "Beachside Tents",
    price: "1700",
    description: "Wake up to ocean waves and golden beaches.",
    location: "Gokarna, Karnataka"
  },
  {
    title: "Forest Glow Camp",
    price: "1300",
    description: "Eco-friendly camp located deep inside the forest.",
    location: "Coorg, Karnataka"
  },
  {
    title: "Sunset Valley Camp",
    price: "1600",
    description: "Perfect spot to enjoy sunsets and evening bonfires.",
    location: "Mount Abu, Rajasthan"
  }
];

async function seedDB() {
  await connectToDb();

  await Campground.deleteMany({});
  console.log("Old campgrounds deleted");

 const campgroundsWithImages = await Promise.all(
  mockData.map(async (camp) => {
    const img = await generateImage(camp.title);

    return {
      ...camp,
      image: img.src.large // or img.src.medium / img.src.original
    };
  })
);

  await Campground.insertMany(campgroundsWithImages);
  console.log("Database seeded with campgrounds");
}

seedDB();
