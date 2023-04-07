const { Genre } = require("./models/genre");
const { Movie } = require("./models/movie");
const { Track } = require("./models/track");
const { Menu } = require("./models/menu");
const mongoose = require("mongoose");
const config = require("config");

const data = [
  {
    name: "Comedy",
    movies: [
      { title: "Airplane", numberInStock: 5, dailyRentalRate: 2,releaseDate:"13900429" },
      { title: "The Hangover", numberInStock: 10, dailyRentalRate: 2,releaseDate:"13861025" },
      { title: "Wedding Crashers", numberInStock: 15, dailyRentalRate: 2,releaseDate:"14000211" }
    ]
  },
  {
    name: "Action",
    movies: [
      { title: "Die Hard", numberInStock: 5, dailyRentalRate: 2,releaseDate:"13850617" },
      { title: "Terminator", numberInStock: 10, dailyRentalRate: 2,releaseDate:"13890701" },
      { title: "The Avengers", numberInStock: 15, dailyRentalRate: 2,releaseDate:"14000114" }
    ]
  },
  {
    name: "Romance",
    movies: [
      { title: "The Notebook", numberInStock: 5, dailyRentalRate: 2,releaseDate:"13921104" },
      { title: "When Harry Met Sally", numberInStock: 10, dailyRentalRate: 2,releaseDate:"14000319" },
      { title: "Pretty Woman", numberInStock: 15, dailyRentalRate: 2,releaseDate:"13870806" }
    ]
  },
  {
    name: "Thriller",
    movies: [
      { title: "The Sixth Sense", numberInStock: 5, dailyRentalRate: 2,releaseDate:"13870519" },
      { title: "Gone Girl", numberInStock: 10, dailyRentalRate: 2,releaseDate:"13910222" },
      { title: "The Others", numberInStock: 15, dailyRentalRate: 2,releaseDate:"14000102" }
    ]
  }
];
const tracks = [
  
     { name: "LostChameleonGenesis", file: "Jazz" },
      { name: "TheHipstaShakenSoda", file:"Rock" },
      { name: "TobuSuchFun", file:"Tobu" }
    
    ];

const menus = [
  
       {id:1,parentId:0, label: "Home",  url: "/home" ,component:"MovieForm",needPassParams: false,path:"MoviesForm"},
       {id:2,parentId:0, label: "Rentals", url:"/rentals",component:"Rentals",needPassParams: false,path:"Rentals" },
       {id:3,parentId:0, label: "Register", url:"/register",component:"RegisterForm",needPassParams: false,path:"RegisterForm" },
       {id:4,parentId:0, label: "Login", url:"/login",component:"",needPassParams: false,path:"" },
       {id:5,parentId:0, label: "Other Sections", url:"",component:"",needPassParams: false,path:"" },
       {id:6,parentId:5, label: "Music", url:"/music",component:"MusicForm",needPassParams: false,path:"Music/MusicForm" },
       {id:7,parentId:5, label: "Movies",  url: "/movies",component:"MoviesForm",needPassParams: true,path:"MoviesForm" },
       {id:8,parentId:5, label: "Movie",  url: "/movie/:id",component:"MovieForm",needPassParams: false,path:"MovieForm" },
       {id:9,parentId:0, label: "Logout", url:"/logout",component:"",needPassParams: false,path:"" },
       {id:10,parentId:0, label: "بخش ویژه", url:"",component:"",needPassParams: false,path:"" },
       {id:11,parentId:10, label: "موقعیت یابی", url:"/getposition",component:"getposition",needPassParams: false,path:"Location/GetPositionForm" },
     ];


async function seed() {
  await mongoose.connect(config.get("db"));

   await Movie.deleteMany({});
   await Genre.deleteMany({});
  await Track.deleteMany({});
  await Menu.deleteMany({});

  for (let genre of data) {
    const { _id: genreId } = await new Genre({ name: genre.name }).save();
    const movies = genre.movies.map(movie => ({
      ...movie,
      genre: { _id: genreId, name: genre.name }
    }));
    await Movie.insertMany(movies);
  }
 
  for (let track of tracks) {
    await new Track({ name: track.name,file:track.file }).save();
   
  }
 
  for (let menu of menus) {
    await new Menu({ id:menu.id,parentId:menu.parentId, label:menu.label, url:menu.url,component:menu.component,path:menu.path,needPassParams:menu.needPassParams }).save();
   
  }

 
  
  mongoose.disconnect();

  console.info("Done!");
}

seed();
