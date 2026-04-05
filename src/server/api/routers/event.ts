import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
  getByMonth: publicProcedure
    .input(z.object({ year: z.number(), month: z.number().min(0).max(11) }))
    .query(async ({ ctx, input }) => {
      // Use UTC dates to match how dates are stored (ISO strings → UTC midnight)
      const start = new Date(Date.UTC(input.year, input.month, 1));
      const end = new Date(Date.UTC(input.year, input.month + 1, 1));

      const events = await ctx.db.event.findMany({
        where: { date: { gte: start, lt: end } },
        orderBy: [{ date: "asc" }, { startTime: "asc" }],
      });

      return events.map((e) => ({
        id: e.id,
        title: e.title,
        description: e.description,
        date: e.date.toISOString(),
        startTime: e.startTime,
        endTime: e.endTime,
        location: e.location,
        category: e.category,
      }));
    }),
});
