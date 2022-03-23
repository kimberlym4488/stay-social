const { User, Thoughts } = require("../models");


const users = [
  
    { 
        // "_id":"1111111111111111111111",
        "username": "kimbro11",
        "email": "kimsdf@gmail.com",
        // "thoughts":
        //   {
        //     "thoughtText":"11I love this so much",
        //     "username":"kimbro11",
            // "reactions":
          //     {
          //       // "reactionId":"116540df6aasdfasdf6540",
          //       "reactionBody":"11This is great",
          //       "username":"11MklaBrc"
          //     }
          // }, 
        // "friends":
        //   {
        //     // "_id": "2222222222222222222222222"
        //   },
        // },  
    },
    {
      // "_id":"2222222222222222222222222",
      "username": "kimbro22",
      "email": "kimsd22f@gmail.com",
      // "thoughts":
      //   {
      //     "thoughtText":"22I love this so much",
      //     "username":"kimbro22",
      //     "reactions":
      //       {
      //         // "reactionId":"226540df6aasdfasdf6540",
      //         "reactionBody":"22This is great",
      //         "username":"22MklaBrc"
      //       }
      //   },
        // "friends":
        // {
        //   // "_id": "2222222222222222222222222"
        // },  
    },   
     
  
]

// const thoughts = [
//   {
    
//     "thoughtText":"22I love this so much",
//     "username":"kimbro22",
//     "reactions":
//       {
//         // "reactionId":"226540df6aasdfasdf6540",
//         "reactionBody":"22This is great",
//         "username":"22MklaBrc"
//       }
         
//     },   
//     {
//       "thoughtText":"11I love this so much",
//       "username":"kimbro11",
//       "reactions":
//         {
//           // "reactionId":"116540df6aasdfasdf6540",
//           "reactionBody":"11This is great",
//           "username":"11MklaBrc"
//         }
//     },
// ] 
   
module.exports = { users };
