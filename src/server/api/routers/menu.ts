import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const menuRouter = createTRPCRouter({
  getPoints: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      select: { points: true },
    });
    return user?.points ?? 0;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session?.user?.id;

      const item = await ctx.db.menuItem.findUnique({
        where: { id: input.id },
        include: {
          category: { select: { name: true } },
          assets: { orderBy: { createdAt: "asc" } },
          _count: { select: { likes: true } },
        },
      });

      if (!item) return null;

      const liked = userId
        ? !!(await ctx.db.menuItemLike.findUnique({
            where: { userId_menuItemId: { userId, menuItemId: item.id } },
          }))
        : false;

      return {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category.name,
        likeCount: item._count.likes,
        liked,
        assets: item.assets.map((a) => ({
          id: a.id,
          url: a.url,
          featured: a.featured,
        })),
      };
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;

    const categories = await ctx.db.menuCategory.findMany({
      orderBy: { order: "asc" },
      include: {
        items: {
          include: {
            _count: { select: { likes: true } },
            assets: { where: { featured: true }, take: 1, select: { url: true } },
          },
          orderBy: { name: "asc" },
        },
      },
    });

    const userLikes = userId
      ? await ctx.db.menuItemLike.findMany({
          where: { userId },
          select: { menuItemId: true },
        })
      : [];
    const likedSet = new Set(userLikes.map((l) => l.menuItemId));

    return categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      items: cat.items.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        likeCount: item._count.likes,
        liked: likedSet.has(item.id),
        imageUrl: item.assets[0]?.url ?? null,
      })),
    }));
  }),

  toggleLike: protectedProcedure
    .input(z.object({ itemId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const existing = await ctx.db.menuItemLike.findUnique({
        where: { userId_menuItemId: { userId, menuItemId: input.itemId } },
      });

      if (existing) {
        await ctx.db.menuItemLike.delete({
          where: { userId_menuItemId: { userId, menuItemId: input.itemId } },
        });
        await ctx.db.user.update({
          where: { id: userId },
          data: { points: { decrement: 1 } },
        });
        return { liked: false };
      } else {
        await ctx.db.menuItemLike.create({
          data: { userId, menuItemId: input.itemId },
        });
        await ctx.db.user.update({
          where: { id: userId },
          data: { points: { increment: 1 } },
        });
        return { liked: true };
      }
    }),
});
