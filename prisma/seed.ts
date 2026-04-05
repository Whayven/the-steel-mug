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
        {
          name: "Espresso",
          description: "A rich, concentrated shot of coffee.",
          price: 3.0,
          assets: [
            { url: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800&q=80", featured: true },
            { url: "https://images.unsplash.com/photo-1485808191679-5f86510681f1?w=800&q=80", featured: false },
          ],
        },
        {
          name: "Americano",
          description: "Espresso with hot water for a smooth, bold cup.",
          price: 3.5,
          assets: [
            { url: "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=800&q=80", featured: true },
          ],
        },
        {
          name: "Flat White",
          description: "Velvety microfoam over a double ristretto.",
          price: 4.5,
          assets: [
            { url: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=800&q=80", featured: true },
          ],
        },
        {
          name: "Cappuccino",
          description: "Equal parts espresso, steamed milk, and foam.",
          price: 4.5,
          assets: [
            { url: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80", featured: true },
          ],
        },
        {
          name: "Latte",
          description: "Espresso with plenty of steamed milk and a thin layer of foam.",
          price: 5.0,
          assets: [
            { url: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80", featured: true },
          ],
        },
        {
          name: "Cold Brew",
          description: "Steeped overnight for a smooth, low-acid brew.",
          price: 5.5,
          assets: [
            { url: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&q=80", featured: true },
          ],
        },
      ],
    },
    {
      name: "Tea",
      order: 1,
      items: [
        {
          name: "Matcha Latte",
          description: "Ceremonial grade matcha with oat milk.",
          price: 5.5,
          assets: [
            { url: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=800&q=80", featured: true },
          ],
        },
        {
          name: "Chai Latte",
          description: "Spiced black tea with steamed milk.",
          price: 5.0,
          assets: [
            { url: "https://images.unsplash.com/photo-1557006021-b85faa2bc5e2?w=800&q=80", featured: true },
          ],
        },
        {
          name: "Earl Grey",
          description: "Classic bergamot-scented black tea.",
          price: 3.5,
          assets: [
            { url: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=800&q=80", featured: true },
          ],
        },
        {
          name: "Chamomile",
          description: "Calming floral herbal infusion.",
          price: 3.5,
          assets: [
            { url: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&q=80", featured: true },
          ],
        },
      ],
    },
    {
      name: "Food",
      order: 2,
      items: [
        {
          name: "Almond Croissant",
          description: "Flaky butter pastry filled with almond cream.",
          price: 4.5,
          assets: [
            { url: "https://images.unsplash.com/photo-1623334044303-241021148842?w=800&q=80", featured: true },
          ],
        },
        {
          name: "Avocado Toast",
          description: "Sourdough with smashed avocado, chilli flakes, and lemon.",
          price: 9.0,
          assets: [
            { url: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&q=80", featured: true },
          ],
        },
        {
          name: "Banana Bread",
          description: "House-baked with walnuts and a hint of cinnamon.",
          price: 4.0,
          assets: [
            { url: "https://images.unsplash.com/photo-1595348020949-87cdfbb44174?w=800&q=80", featured: true },
          ],
        },
        {
          name: "Granola Bowl",
          description: "House granola with yogurt, honey, and seasonal fruit.",
          price: 8.0,
          assets: [
            { url: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=800&q=80", featured: true },
          ],
        },
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
      const menuItem = await db.menuItem.upsert({
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

      // Replace assets on every seed run to pick up URL fixes
      await db.menuItemAsset.deleteMany({ where: { menuItemId: menuItem.id } });
      for (const asset of item.assets) {
        await db.menuItemAsset.create({
          data: {
            url: asset.url,
            featured: asset.featured,
            menuItemId: menuItem.id,
          },
        });
      }
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
