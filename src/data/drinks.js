export const drinks = [
  {
    drink_name: "冰美式",
    caffeine_mg: 140,
    sugar_g: 0,
    image: "/drinks/iced-americano.png",
  },
  {
    drink_name: "燕麦拿铁",
    caffeine_mg: 95,
    sugar_g: 8,
    image: "/drinks/oat-latte.png",
  },
  {
    drink_name: "冷萃",
    caffeine_mg: 180,
    sugar_g: 0,
    image: "/drinks/cold-brew.png",
  },
  {
    drink_name: "红牛",
    caffeine_mg: 80,
    sugar_g: 27,
    image: "/drinks/energy-drink.png",
  },
];

export const drinkImageByName = Object.fromEntries(
  drinks.map((drink) => [drink.drink_name, drink.image]),
);
