module.exports = [
"[project]/toro-store-app/src/actions/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00dc57a7e72aa127a22f927d7f8e3616ac24788e84":"logout","4025e65bfb6e1a12a6ca50f55980e736da30d029c6":"login"},"",""] */ __turbopack_context__.s([
    "login",
    ()=>login,
    "logout",
    ()=>logout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/webapi/jwt/sign.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
const secret = new TextEncoder().encode(process.env.ADMIN_PASSWORD || 'admin_toro_fallback_secret_key');
async function login(password) {
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin_toro';
    if (password !== adminPassword) {
        return {
            error: 'Password salah'
        };
    }
    // Create JWT token using edge-compatible formatting
    const token = await new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SignJWT"]({
        admin: true
    }).setProtectedHeader({
        alg: 'HS256'
    }).setIssuedAt().setExpirationTime('24h') // Set 24 hour session
    .sign(secret);
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.set('admin_session', token, {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === 'production',
        sameSite: 'lax',
        path: '/admin',
        maxAge: 60 * 60 * 24
    });
    return {
        success: true
    };
}
async function logout() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.delete('admin_session');
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    login,
    logout
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(login, "4025e65bfb6e1a12a6ca50f55980e736da30d029c6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(logout, "00dc57a7e72aa127a22f927d7f8e3616ac24788e84", null);
}),
"[project]/toro-store-app/src/lib/prisma.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
    log: ("TURBOPACK compile-time truthy", 1) ? [
        'query',
        'error',
        'warn'
    ] : "TURBOPACK unreachable"
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[project]/toro-store-app/src/actions/order.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00986472927b213c1b5796c3ffe41b461afec1415a":"getAdminOrders","406c58de2a8d107d69f717d1ea428917143219f5a2":"createOrder","60bcc6ce0e61c46f6b09126728ced90dd495cd3557":"updateOrderStatus"},"",""] */ __turbopack_context__.s([
    "createOrder",
    ()=>createOrder,
    "getAdminOrders",
    ()=>getAdminOrders,
    "updateOrderStatus",
    ()=>updateOrderStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$toro$2d$store$2d$app$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/toro-store-app/src/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function createOrder(data) {
    try {
        // 1. Verify package exists and has stock
        const pkg = await __TURBOPACK__imported__module__$5b$project$5d2f$toro$2d$store$2d$app$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].package.findUnique({
            where: {
                id: data.packageId
            }
        });
        if (!pkg) return {
            success: false,
            error: 'Paket tidak ditemukan.'
        };
        if (!pkg.isActive) return {
            success: false,
            error: 'Paket tidak aktif.'
        };
        if (pkg.stock <= 0) return {
            success: false,
            error: 'Stok habis.'
        };
        // 2. Generate unique order code (TS-YYYY-RND4)
        const year = new Date().getFullYear();
        const rnd = Math.floor(1000 + Math.random() * 9000);
        const orderCode = `TS-${year}-${rnd}`;
        // 3. Save order to database
        const order = await __TURBOPACK__imported__module__$5b$project$5d2f$toro$2d$store$2d$app$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].order.create({
            data: {
                orderCode,
                packageId: data.packageId,
                itemName: data.itemName,
                mlbbId: data.mlbbId,
                serverId: data.serverId,
                nickname: data.nickname,
                note: data.note,
                waNumber: data.waNumber,
                status: 'NEW',
                events: {
                    create: {
                        eventType: 'ORDER_CREATED',
                        message: 'Order placed by user'
                    }
                }
            }
        });
        return {
            success: true,
            orderCode: order.orderCode,
            packageName: pkg.name
        };
    } catch (error) {
        console.error('Failed to create order:', error);
        return {
            success: false,
            error: 'Terjadi kesalahan sistem.'
        };
    }
}
async function getAdminOrders() {
    try {
        const orders = await __TURBOPACK__imported__module__$5b$project$5d2f$toro$2d$store$2d$app$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].order.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            take: 100,
            include: {
                package: {
                    select: {
                        name: true,
                        category: true
                    }
                }
            }
        });
        return orders;
    } catch (error) {
        console.error('Failed to fetch admin orders:', error);
        return [];
    }
}
async function updateOrderStatus(orderId, newStatus) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$toro$2d$store$2d$app$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].order.update({
            where: {
                id: orderId
            },
            data: {
                status: newStatus
            }
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$toro$2d$store$2d$app$2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].orderEvent.create({
            data: {
                orderId,
                eventType: 'STATUS_UPDATED',
                message: `Status diubah menjadi ${newStatus}`
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])('/admin/orders');
        return {
            success: true
        };
    } catch (error) {
        console.error('Failed to update status:', error);
        return {
            success: false,
            error: 'Gagal mengupdate status'
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createOrder,
    getAdminOrders,
    updateOrderStatus
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createOrder, "406c58de2a8d107d69f717d1ea428917143219f5a2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAdminOrders, "00986472927b213c1b5796c3ffe41b461afec1415a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateOrderStatus, "60bcc6ce0e61c46f6b09126728ced90dd495cd3557", null);
}),
"[project]/toro-store-app/.next-internal/server/app/admin/orders/page/actions.js { ACTIONS_MODULE0 => \"[project]/toro-store-app/src/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/toro-store-app/src/actions/order.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$toro$2d$store$2d$app$2f$src$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/toro-store-app/src/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$toro$2d$store$2d$app$2f$src$2f$actions$2f$order$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/toro-store-app/src/actions/order.ts [app-rsc] (ecmascript)");
;
;
;
}),
"[project]/toro-store-app/.next-internal/server/app/admin/orders/page/actions.js { ACTIONS_MODULE0 => \"[project]/toro-store-app/src/actions/auth.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/toro-store-app/src/actions/order.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00986472927b213c1b5796c3ffe41b461afec1415a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$toro$2d$store$2d$app$2f$src$2f$actions$2f$order$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAdminOrders"],
    "00dc57a7e72aa127a22f927d7f8e3616ac24788e84",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$toro$2d$store$2d$app$2f$src$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logout"],
    "60bcc6ce0e61c46f6b09126728ced90dd495cd3557",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$toro$2d$store$2d$app$2f$src$2f$actions$2f$order$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateOrderStatus"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$toro$2d$store$2d$app$2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$orders$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$toro$2d$store$2d$app$2f$src$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$toro$2d$store$2d$app$2f$src$2f$actions$2f$order$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/toro-store-app/.next-internal/server/app/admin/orders/page/actions.js { ACTIONS_MODULE0 => "[project]/toro-store-app/src/actions/auth.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/toro-store-app/src/actions/order.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$toro$2d$store$2d$app$2f$src$2f$actions$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/toro-store-app/src/actions/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$toro$2d$store$2d$app$2f$src$2f$actions$2f$order$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/toro-store-app/src/actions/order.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=toro-store-app_49c5eb2d._.js.map