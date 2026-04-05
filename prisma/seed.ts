import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
const db = new PrismaClient({ adapter: new PrismaPg(process.env.DATABASE_URL) });

async function main() {
  const categories = [
    {
      name: "Coffee",
      order: 0,
      items: [
        { name: "Espresso", description: "A rich, concentrated shot of coffee.", price: 3.0 },
        { name: "Americano", description: "Espresso with hot water for a smooth, bold cup.", price: 3.5 },
        { name: "Flat White", description: "Velvety microfoam over a double ristretto.", price: 4.5 },
        { name: "Cappuccino", description: "Equal parts espresso, steamed milk, and foam.", price: 4.5 },
        { name: "Latte", description: "Espresso with plenty of steamed milk and a thin layer of foam.", price: 5.0 },
        { name: "Cold Brew", description: "Steeped overnight for a smooth, low-acid brew.", price: 5.5 },
      ],
    },
    {
      name: "Tea",
      order: 1,
      items: [
        { name: "Matcha Latte", description: "Ceremonial grade matcha with oat milk.", price: 5.5 },
        { name: "Chai Latte", description: "Spiced black tea with steamed milk.", price: 5.0 },
        { name: "Earl Grey", description: "Classic bergamot-scented black tea.", price: 3.5 },
        { name: "Chamomile", description: "Calming floral herbal infusion.", price: 3.5 },
      ],
    },
    {
      name: "Food",
      order: 2,
      items: [
        { name: "Almond Croissant", description: "Flaky butter pastry filled with almond cream.", price: 4.5 },
        { name: "Avocado Toast", description: "Sourdough with smashed avocado, chilli flakes, and lemon.", price: 9.0 },
        { name: "Banana Bread", description: "House-baked with walnuts and a hint of cinnamon.", price: 4.0 },
        { name: "Granola Bowl", description: "House granola with yogurt, honey, and seasonal fruit.", price: 8.0 },
      ],
    },
  ];

  for (const cat of categories) {
    const category = await db.menuCategory.upsert({
      where: { id: cat.name },
      update: {},
      create: {
        id: cat.name,
        name: cat.name,
        order: cat.order,
      },
    });

    for (const item of cat.items) {
      await db.menuItem.upsert({
        where: { id: `${cat.name}-${item.name}` },
        update: {},
        create: {
          id: `${cat.name}-${item.name}`,
          name: item.name,
          description: item.description,
          price: item.price,
          categoryId: category.id,
        },
      });
    }
  }

  console.log("Seeded menu data.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
