import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const cartRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const items = await ctx.db.cartItem.findMany({
      where: { userId: ctx.session.user.id },
      include: { item: true },
      orderBy: { createdAt: "asc" },
    });

    return items.map((ci) => ({
      menuItemId: ci.menuItemId,
      name: ci.item.name,
      price: ci.item.price,
      quantity: ci.quantity,
    }));
  }),

  count: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.db.cartItem.aggregate({
      where: { userId: ctx.session.user.id },
      _sum: { quantity: true },
    });
    return result._sum.quantity ?? 0;
  }),

  addItem: protectedProcedure
    .input(z.object({ itemId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.cartItem.upsert({
        where: {
          userId_menuItemId: {
            userId: ctx.session.user.id,
            menuItemId: input.itemId,
          },
        },
        update: { quantity: { increment: 1 } },
        create: {
          userId: ctx.session.user.id,
          menuItemId: input.itemId,
          quantity: 1,
        },
      });
    }),

  updateQuantity: protectedProcedure
    .input(z.object({ itemId: z.string(), quantity: z.number().int().min(0) }))
    .mutation(async ({ ctx, input }) => {
      if (input.quantity === 0) {
        await ctx.db.cartItem.delete({
          where: {
            userId_menuItemId: {
              userId: ctx.session.user.id,
              menuItemId: input.itemId,
            },
          },
        });
      } else {
        await ctx.db.cartItem.update({
          where: {
            userId_menuItemId: {
              userId: ctx.session.user.id,
              menuItemId: input.itemId,
            },
          },
          data: { quantity: input.quantity },
        });
      }
    }),

  clear: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db.cartItem.deleteMany({
      where: { userId: ctx.session.user.id },
    });
  }),
});
