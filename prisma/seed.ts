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

  // --- Events ---
  const events = [
    // April 2026
    { id: "evt-open-mic-apr-4", title: "Open Mic Night", description: "Poets, musicians, comedians — the mic is yours. Sign up at the counter starting at 6 PM.", date: new Date("2026-04-04"), startTime: "7:00 PM", endTime: "10:00 PM", category: "music", location: "The Steel Mug" },
    { id: "evt-yoga-apr-5", title: "Morning Yoga on the Patio", description: "Start your Sunday with a gentle flow and a free drip coffee after class.", date: new Date("2026-04-05"), startTime: "8:00 AM", endTime: "9:00 AM", category: "wellness", location: "Back Patio" },
    { id: "evt-latte-art-apr-11", title: "Latte Art Throwdown", description: "Our baristas go head to head. Audience votes decide the winner. Free samples for everyone.", date: new Date("2026-04-11"), startTime: "3:00 PM", endTime: "5:00 PM", category: "coffee", location: "The Steel Mug" },
    { id: "evt-book-club-apr-15", title: "Neighbourhood Book Club", description: "This month: \"Open City\" by Teju Cole. Grab a copy, grab a coffee, join the conversation.", date: new Date("2026-04-15"), startTime: "6:30 PM", endTime: "8:00 PM", category: "community", location: "The Steel Mug" },
    { id: "evt-open-mic-apr-18", title: "Open Mic Night", description: "Poets, musicians, comedians — the mic is yours. Sign up at the counter starting at 6 PM.", date: new Date("2026-04-18"), startTime: "7:00 PM", endTime: "10:00 PM", category: "music", location: "The Steel Mug" },
    { id: "evt-popup-apr-19", title: "Local Ceramics Pop-Up", description: "Handmade mugs and planters by Brooklyn ceramicist Ada Moreno. Shop while you sip.", date: new Date("2026-04-19"), startTime: "10:00 AM", endTime: "4:00 PM", category: "market", location: "The Steel Mug" },
    { id: "evt-cupping-apr-25", title: "Coffee Cupping Session", description: "Taste four single-origin coffees side by side and learn what makes each one unique.", date: new Date("2026-04-25"), startTime: "11:00 AM", endTime: "12:30 PM", category: "coffee", location: "The Steel Mug" },
    { id: "evt-vinyl-apr-26", title: "Vinyl & Vibes", description: "Our neighbour DJ Kenji spins soul, jazz, and funk on real wax. BYO records welcome.", date: new Date("2026-04-26"), startTime: "5:00 PM", endTime: "8:00 PM", category: "music", location: "The Steel Mug" },
    { id: "evt-giveaway-apr-7", title: "Free Coffee Monday", description: "First 50 customers get a free drip coffee on us. No strings, just good vibes to start the week.", date: new Date("2026-04-07"), startTime: "7:00 AM", endTime: "11:00 AM", category: "community", location: "The Steel Mug" },
    { id: "evt-karaoke-apr-9", title: "Karaoke in the Park", description: "We're bringing the mic to Fort Greene Park. Sing your heart out under the trees. Cold brew provided.", date: new Date("2026-04-09"), startTime: "5:00 PM", endTime: "8:00 PM", category: "music", location: "Fort Greene Park" },
    { id: "evt-picnic-apr-12", title: "Picnic by the Bridge", description: "Pack a blanket, we'll bring the iced lattes and pastries. Meet us at Brooklyn Bridge Park, Pier 1.", date: new Date("2026-04-12"), startTime: "11:00 AM", endTime: "3:00 PM", category: "community", location: "Brooklyn Bridge Park" },
    { id: "evt-tote-apr-14", title: "Tote Bag Giveaway", description: "Spend $15 or more today and take home a limited-edition Steel Mug canvas tote. While supplies last.", date: new Date("2026-04-14"), startTime: "8:00 AM", endTime: "6:00 PM", category: "market", location: "The Steel Mug" },
    { id: "evt-sketch-apr-16", title: "Sketch & Sip", description: "Bring your sketchbook or borrow one of ours. Casual figure drawing session with a live model and bottomless drip.", date: new Date("2026-04-16"), startTime: "6:00 PM", endTime: "8:30 PM", category: "community", location: "The Steel Mug" },
    { id: "evt-trivia-apr-21", title: "Coffee Trivia Night", description: "How well do you know your beans? Teams of up to four compete for a $50 gift card. Losers still get free samples.", date: new Date("2026-04-21"), startTime: "7:00 PM", endTime: "9:00 PM", category: "coffee", location: "The Steel Mug" },
    { id: "evt-sunrise-apr-22", title: "Earth Day Sunrise Walk", description: "Meet at the shop at 5:45 AM for a guided walk across the Brooklyn Bridge at sunrise. Free oat milk latte after.", date: new Date("2026-04-22"), startTime: "5:45 AM", endTime: "8:00 AM", category: "wellness", location: "Brooklyn Bridge" },
    { id: "evt-plant-apr-23", title: "Plant Swap", description: "Bring a plant, take a plant. Repotting station and free espresso for all swappers.", date: new Date("2026-04-23"), startTime: "10:00 AM", endTime: "2:00 PM", category: "market", location: "Back Patio" },
    { id: "evt-karaoke-apr-28", title: "Karaoke Night", description: "Indoor karaoke is back. Request list goes up at 6. Duets encouraged, stage fright respected.", date: new Date("2026-04-28"), startTime: "7:00 PM", endTime: "10:00 PM", category: "music", location: "The Steel Mug" },
    { id: "evt-sticker-apr-30", title: "Sticker & Zine Drop", description: "Local artists drop off original stickers, zines, and prints. Pay what you want, all proceeds to the creators.", date: new Date("2026-04-30"), startTime: "9:00 AM", endTime: "5:00 PM", category: "market", location: "The Steel Mug" },
    // May 2026
    { id: "evt-open-mic-may-2", title: "Open Mic Night", description: "Poets, musicians, comedians — the mic is yours. Sign up at the counter starting at 6 PM.", date: new Date("2026-05-02"), startTime: "7:00 PM", endTime: "10:00 PM", category: "music", location: "The Steel Mug" },
    { id: "evt-yoga-may-3", title: "Morning Yoga on the Patio", description: "Start your Sunday with a gentle flow and a free drip coffee after class.", date: new Date("2026-05-03"), startTime: "8:00 AM", endTime: "9:00 AM", category: "wellness", location: "Back Patio" },
    { id: "evt-mothers-day-may-10", title: "Mother's Day Brunch", description: "Bring your mom, your grandma, your chosen family. Special brunch menu and free pastry for moms.", date: new Date("2026-05-10"), startTime: "9:00 AM", endTime: "2:00 PM", category: "community", location: "The Steel Mug" },
    { id: "evt-book-club-may-20", title: "Neighbourhood Book Club", description: "This month: \"Parable of the Sower\" by Octavia Butler. All are welcome.", date: new Date("2026-05-20"), startTime: "6:30 PM", endTime: "8:00 PM", category: "community", location: "The Steel Mug" },
    { id: "evt-latte-art-may-23", title: "Latte Art Throwdown", description: "May edition — new challengers welcome. Think you can pour a better rosetta?", date: new Date("2026-05-23"), startTime: "3:00 PM", endTime: "5:00 PM", category: "coffee", location: "The Steel Mug" },
    { id: "evt-block-party-may-30", title: "Memorial Day Block Party", description: "Live music, cold brew on tap, and food from three local vendors. The whole block is invited.", date: new Date("2026-05-30"), startTime: "12:00 PM", endTime: "6:00 PM", category: "community", location: "The Steel Mug + Sidewalk" },
  ];

  for (const evt of events) {
    await db.event.upsert({
      where: { id: evt.id },
      update: { title: evt.title, description: evt.description, date: evt.date, startTime: evt.startTime, endTime: evt.endTime, category: evt.category, location: evt.location },
      create: evt,
    });
  }

  console.log("Seeded events data.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
