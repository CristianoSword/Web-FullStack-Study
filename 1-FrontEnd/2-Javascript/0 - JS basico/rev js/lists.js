const users = [
    { age: 37, name: "Moore Hampton" },
    { age: 25, name: "Stephanie Clayton" },
    { age: 30, name: "Pratt Cash" },
    { age: 21, name: "Kenya Gould" },
    { age: 38, name: "Dodson Romero" },
    { age: 34, name: "Weiss Bush" },
    { age: 27, name: "Myrtle Hatfield" },
    { age: 36, name: "Bertie Spencer" },
    { age: 35, name: "Fisher Arnold" },
    { age: 24, name: "Susie Hebert" },
    { age: 37, name: "Beth Lloyd" },
    { age: 24, name: "Keisha Gilliam" },
    { age: 38, name: "Rachel Schultz" },
    { age: 25, name: "Jeanine Flores" },
    { age: 27, name: "Jensen Maddox" },
    { age: 24, name: "Callie Crawford" },
    { age: 22, name: "Campbell Chase" },
    { age: 39, name: "Collins Mercado" },
    { age: 38, name: "Cantu Mcclure" },
    { age: 37, name: "Duffy Buckley" },
    { age: 36, name: "Suzette Navarro" },
    { age: 40, name: "Aida Murray" },
    { age: 35, name: "Alyssa Humphrey" }
];


const usersByAge = {};

users.forEach((user) => {
    if (!usersByAge[user.age]) {
        usersByAge[user.age] = [];
    }

    usersByAge[user.age].push(user);
});

// Usuários com 35 anos
console.log(usersByAge[35]);

// Usuários com 37 anos
console.log(usersByAge[37]);