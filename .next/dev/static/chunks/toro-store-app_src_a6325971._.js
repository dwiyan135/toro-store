(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/toro-store-app/src/components/Navigation.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navigation",
    ()=>Navigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function Navigation() {
    _s();
    const [scrolled, setScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navigation.useEffect": ()=>{
            const handleScroll = {
                "Navigation.useEffect.handleScroll": ()=>{
                    setScrolled(window.scrollY > 20);
                }
            }["Navigation.useEffect.handleScroll"];
            window.addEventListener('scroll', handleScroll);
            return ({
                "Navigation.useEffect": ()=>window.removeEventListener('scroll', handleScroll)
            })["Navigation.useEffect"];
        }
    }["Navigation.useEffect"], []);
    // Prevent scrolling when mobile menu is open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navigation.useEffect": ()=>{
            if (mobileMenuOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    }["Navigation.useEffect"], [
        mobileMenuOpen
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || mobileMenuOpen ? 'bg-neutral-950/80 backdrop-blur-md border-b border-white/5 py-4 shadow-lg' : 'bg-transparent py-5'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-4 flex justify-between items-center relative z-20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "flex items-center",
                        onClick: ()=>setMobileMenuOpen(false),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: "/logo.png",
                            alt: "Toro Store",
                            width: 120,
                            height: 60,
                            className: "object-contain drop-shadow-lg",
                            priority: true
                        }, void 0, false, {
                            fileName: "[project]/toro-store-app/src/components/Navigation.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/toro-store-app/src/components/Navigation.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "md:hidden text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors",
                        onClick: ()=>setMobileMenuOpen(!mobileMenuOpen),
                        "aria-label": "Toggle Menu",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            className: `fa-solid ${mobileMenuOpen ? 'fa-xmark text-red-400' : 'fa-bars text-white'} transition-all`
                        }, void 0, false, {
                            fileName: "[project]/toro-store-app/src/components/Navigation.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/toro-store-app/src/components/Navigation.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "hidden md:flex items-center gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "#produk",
                                className: "font-medium text-neutral-300 hover:text-blue-400 transition-colors",
                                children: "Produk"
                            }, void 0, false, {
                                fileName: "[project]/toro-store-app/src/components/Navigation.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "#harga",
                                className: "font-medium text-neutral-300 hover:text-blue-400 transition-colors",
                                children: "Harga"
                            }, void 0, false, {
                                fileName: "[project]/toro-store-app/src/components/Navigation.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "#cara-order",
                                className: "font-medium text-neutral-300 hover:text-blue-400 transition-colors",
                                children: "Cara Order"
                            }, void 0, false, {
                                fileName: "[project]/toro-store-app/src/components/Navigation.tsx",
                                lineNumber: 47,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/toro-store-app/src/components/Navigation.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "#checkout",
                        className: "hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-blue-500/50 hover:bg-blue-500 hover:border-blue-400 font-semibold transition-all",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fa-brands fa-whatsapp lg:text-green-400 text-white"
                            }, void 0, false, {
                                fileName: "[project]/toro-store-app/src/components/Navigation.tsx",
                                lineNumber: 51,
                                columnNumber: 11
                            }, this),
                            " Order Sekarang"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/toro-store-app/src/components/Navigation.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/toro-store-app/src/components/Navigation.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `fixed inset-0 bg-neutral-950 z-10 md:hidden transition-transform duration-300 flex flex-col pt-24 px-6 ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-6 text-xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "#produk",
                                className: "font-medium p-4 border-b border-neutral-800 text-white hover:text-blue-400",
                                onClick: ()=>setMobileMenuOpen(false),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fa-solid fa-gift w-8 text-neutral-400"
                                    }, void 0, false, {
                                        fileName: "[project]/toro-store-app/src/components/Navigation.tsx",
                                        lineNumber: 59,
                                        columnNumber: 16
                                    }, this),
                                    " Produk Layanan"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/toro-store-app/src/components/Navigation.tsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "#harga",
                                className: "font-medium p-4 border-b border-neutral-800 text-white hover:text-blue-400",
                                onClick: ()=>setMobileMenuOpen(false),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fa-solid fa-tag w-8 text-neutral-400"
                                    }, void 0, false, {
                                        fileName: "[project]/toro-store-app/src/components/Navigation.tsx",
                                        lineNumber: 62,
                                        columnNumber: 16
                                    }, this),
                                    " Daftar Harga"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/toro-store-app/src/components/Navigation.tsx",
                                lineNumber: 61,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "#cara-order",
                                className: "font-medium p-4 border-b border-neutral-800 text-white hover:text-blue-400",
                                onClick: ()=>setMobileMenuOpen(false),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "fa-solid fa-clipboard-list w-8 text-neutral-400"
                                    }, void 0, false, {
                                        fileName: "[project]/toro-store-app/src/components/Navigation.tsx",
                                        lineNumber: 65,
                                        columnNumber: 16
                                    }, this),
                                    " Tata Cara Pemesanan"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/toro-store-app/src/components/Navigation.tsx",
                                lineNumber: 64,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/toro-store-app/src/components/Navigation.tsx",
                        lineNumber: 57,
                        columnNumber: 10
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "#checkout",
                            onClick: ()=>setMobileMenuOpen(false),
                            className: "w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-blue-500 hover:bg-blue-400 text-neutral-950 font-bold transition-colors shadow-lg shadow-blue-500/20",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: "fa-brands fa-whatsapp text-2xl"
                                }, void 0, false, {
                                    fileName: "[project]/toro-store-app/src/components/Navigation.tsx",
                                    lineNumber: 71,
                                    columnNumber: 14
                                }, this),
                                " Mulai Pemesanan"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/toro-store-app/src/components/Navigation.tsx",
                            lineNumber: 70,
                            columnNumber: 12
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/toro-store-app/src/components/Navigation.tsx",
                        lineNumber: 69,
                        columnNumber: 10
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/toro-store-app/src/components/Navigation.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/toro-store-app/src/components/Navigation.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(Navigation, "3dkQbJ67xTX3HLMt6OvJfxq79dI=");
_c = Navigation;
var _c;
__turbopack_context__.k.register(_c, "Navigation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/toro-store-app/src/actions/data:d2d6d7 [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createOrder",
    ()=>$$RSC_SERVER_ACTION_0
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"406c58de2a8d107d69f717d1ea428917143219f5a2":"createOrder"},"toro-store-app/src/actions/order.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("406c58de2a8d107d69f717d1ea428917143219f5a2", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "createOrder");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vb3JkZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzZXJ2ZXInO1xyXG5cclxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSAnQC9saWIvcHJpc21hJztcclxuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tICduZXh0L2NhY2hlJztcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVPcmRlcihkYXRhOiB7XHJcbiAgcGFja2FnZUlkOiBzdHJpbmc7XHJcbiAgaXRlbU5hbWU6IHN0cmluZztcclxuICBtbGJiSWQ6IHN0cmluZztcclxuICBzZXJ2ZXJJZDogc3RyaW5nO1xyXG4gIG5pY2tuYW1lPzogc3RyaW5nO1xyXG4gIG5vdGU/OiBzdHJpbmc7XHJcbiAgd2FOdW1iZXI/OiBzdHJpbmc7XHJcbn0pIHtcclxuICB0cnkge1xyXG4gICAgLy8gMS4gVmVyaWZ5IHBhY2thZ2UgZXhpc3RzIGFuZCBoYXMgc3RvY2tcclxuICAgIGNvbnN0IHBrZyA9IGF3YWl0IHByaXNtYS5wYWNrYWdlLmZpbmRVbmlxdWUoeyB3aGVyZTogeyBpZDogZGF0YS5wYWNrYWdlSWQgfSB9KTtcclxuICAgIGlmICghcGtnKSByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6ICdQYWtldCB0aWRhayBkaXRlbXVrYW4uJyB9O1xyXG4gICAgaWYgKCFwa2cuaXNBY3RpdmUpIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1Bha2V0IHRpZGFrIGFrdGlmLicgfTtcclxuICAgIGlmIChwa2cuc3RvY2sgPD0gMCkgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnU3RvayBoYWJpcy4nIH07XHJcblxyXG4gICAgLy8gMi4gR2VuZXJhdGUgdW5pcXVlIG9yZGVyIGNvZGUgKFRTLVlZWVktUk5ENClcclxuICAgIGNvbnN0IHllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XHJcbiAgICBjb25zdCBybmQgPSBNYXRoLmZsb29yKDEwMDAgKyBNYXRoLnJhbmRvbSgpICogOTAwMCk7XHJcbiAgICBjb25zdCBvcmRlckNvZGUgPSBgVFMtJHt5ZWFyfS0ke3JuZH1gO1xyXG5cclxuICAgIC8vIDMuIFNhdmUgb3JkZXIgdG8gZGF0YWJhc2VcclxuICAgIGNvbnN0IG9yZGVyID0gYXdhaXQgcHJpc21hLm9yZGVyLmNyZWF0ZSh7XHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBvcmRlckNvZGUsXHJcbiAgICAgICAgcGFja2FnZUlkOiBkYXRhLnBhY2thZ2VJZCxcclxuICAgICAgICBpdGVtTmFtZTogZGF0YS5pdGVtTmFtZSxcclxuICAgICAgICBtbGJiSWQ6IGRhdGEubWxiYklkLFxyXG4gICAgICAgIHNlcnZlcklkOiBkYXRhLnNlcnZlcklkLFxyXG4gICAgICAgIG5pY2tuYW1lOiBkYXRhLm5pY2tuYW1lLFxyXG4gICAgICAgIG5vdGU6IGRhdGEubm90ZSxcclxuICAgICAgICB3YU51bWJlcjogZGF0YS53YU51bWJlcixcclxuICAgICAgICBzdGF0dXM6ICdORVcnLFxyXG4gICAgICAgIGV2ZW50czoge1xyXG4gICAgICAgICAgY3JlYXRlOiB7XHJcbiAgICAgICAgICAgIGV2ZW50VHlwZTogJ09SREVSX0NSRUFURUQnLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiAnT3JkZXIgcGxhY2VkIGJ5IHVzZXInLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHsgc3VjY2VzczogdHJ1ZSwgb3JkZXJDb2RlOiBvcmRlci5vcmRlckNvZGUsIHBhY2thZ2VOYW1lOiBwa2cubmFtZSB9O1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gY3JlYXRlIG9yZGVyOicsIGVycm9yKTtcclxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvcjogJ1RlcmphZGkga2VzYWxhaGFuIHNpc3RlbS4nIH07XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QWRtaW5PcmRlcnMoKSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IG9yZGVycyA9IGF3YWl0IHByaXNtYS5vcmRlci5maW5kTWFueSh7XHJcbiAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiAnZGVzYycgfSxcclxuICAgICAgdGFrZTogMTAwLFxyXG4gICAgICBpbmNsdWRlOiB7IHBhY2thZ2U6IHsgc2VsZWN0OiB7IG5hbWU6IHRydWUsIGNhdGVnb3J5OiB0cnVlIH0gfSB9LFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gb3JkZXJzO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggYWRtaW4gb3JkZXJzOicsIGVycm9yKTtcclxuICAgIHJldHVybiBbXTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVPcmRlclN0YXR1cyhcclxuICBvcmRlcklkOiBzdHJpbmcsXHJcbiAgbmV3U3RhdHVzOiAnTkVXJyB8ICdDT05GSVJNRUQnIHwgJ0RPTkUnIHwgJ0NBTkNFTEVEJ1xyXG4pIHtcclxuICB0cnkge1xyXG4gICAgYXdhaXQgcHJpc21hLm9yZGVyLnVwZGF0ZSh7XHJcbiAgICAgIHdoZXJlOiB7IGlkOiBvcmRlcklkIH0sXHJcbiAgICAgIGRhdGE6IHsgc3RhdHVzOiBuZXdTdGF0dXMgfSxcclxuICAgIH0pO1xyXG4gICAgYXdhaXQgcHJpc21hLm9yZGVyRXZlbnQuY3JlYXRlKHtcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIG9yZGVySWQsXHJcbiAgICAgICAgZXZlbnRUeXBlOiAnU1RBVFVTX1VQREFURUQnLFxyXG4gICAgICAgIG1lc3NhZ2U6IGBTdGF0dXMgZGl1YmFoIG1lbmphZGkgJHtuZXdTdGF0dXN9YCxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbicpO1xyXG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbi9vcmRlcnMnKTtcclxuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHVwZGF0ZSBzdGF0dXM6JywgZXJyb3IpO1xyXG4gICAgcmV0dXJuIHsgc3VjY2VzczogZmFsc2UsIGVycm9yOiAnR2FnYWwgbWVuZ3VwZGF0ZSBzdGF0dXMnIH07XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoibVNBS3NCLHdMQUFBIn0=
}),
"[project]/toro-store-app/src/components/CheckoutForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckoutForm",
    ()=>CheckoutForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$toro$2d$store$2d$app$2f$src$2f$actions$2f$data$3a$d2d6d7__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/toro-store-app/src/actions/data:d2d6d7 [app-client] (ecmascript) <text/javascript>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function CheckoutForm({ stock }) {
    _s();
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Form states
    const [packageType, setPackageType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [itemName, setItemName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [mlbbId, setMlbbId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [serverId, setServerId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [nickname, setNickname] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [note, setNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [waNumber, setWaNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!packageType || !itemName || !mlbbId || !serverId) {
            setError('Harap isi semua field wajib (*)');
            return;
        }
        setLoading(true);
        setError('');
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$toro$2d$store$2d$app$2f$src$2f$actions$2f$data$3a$d2d6d7__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["createOrder"])({
            packageType,
            itemName,
            mlbbId,
            serverId,
            nickname,
            note,
            waNumber
        });
        if (res.success && res.orderCode) {
            // Redirect to WhatsApp
            const adminWa = '6281234567890'; // Base admin number
            const mappedPkg = packageType === 'BASIC' ? 'Basic Gift' : packageType === 'PREMIUM' ? 'Premium Gift' : 'Special / Event';
            const msg = `Halo Toro Store, saya mau order gift skin MLBB.\nOrder: ${res.orderCode}\nPaket: ${mappedPkg}\nNama Skin/Event: ${itemName}\nID: ${mlbbId}\nServer: ${serverId}\nNickname: ${nickname || '-'}\nCatatan: ${note || '-'}\nTerima kasih.`;
            const url = `https://wa.me/${adminWa}?text=${encodeURIComponent(msg)}`;
            window.open(url, '_blank');
            window.location.href = '/order-success';
        } else {
            setError(res.error || 'Terjadi kesalahan sistem');
            setLoading(false);
        }
    };
    const getPackageStatus = (type)=>{
        const val = type === 'BASIC' ? stock.basic : type === 'PREMIUM' ? stock.premium : stock.special;
        if (val === 0) return 'Habis (PO)';
        if (val <= 5) return `Sisa ${val} Slot`;
        return `Tersedia (${val})`;
    };
    const isSelectedDisabled = packageType === 'BASIC' ? stock.basic === 0 : packageType === 'PREMIUM' ? stock.premium === 0 : packageType === 'SPECIAL' ? stock.special === 0 : false;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-2xl font-bold mb-6 font-sans",
                children: "Form Pemesanan"
            }, void 0, false, {
                fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg mb-6 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                        className: "fa-solid fa-circle-exclamation mr-2"
                    }, void 0, false, {
                        fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this),
                    " ",
                    error
                ]
            }, void 0, true, {
                fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                lineNumber: 79,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "space-y-6 relative z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-lg font-bold text-blue-400 border-b border-neutral-800 pb-2",
                                children: "1. Pilih Paket & Skin"
                            }, void 0, false, {
                                fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm font-medium text-neutral-300",
                                                children: "Tipe Layanan *"
                                            }, void 0, false, {
                                                fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                                lineNumber: 91,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: packageType,
                                                onChange: (e)=>setPackageType(e.target.value),
                                                className: "w-full bg-neutral-950/50 border border-neutral-800 rounded-lg p-3.5 outline-none focus:border-blue-500 transition-colors appearance-none",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        disabled: true,
                                                        children: "Pilih Paket..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                                        lineNumber: 97,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "BASIC",
                                                        disabled: stock.basic === 0,
                                                        children: [
                                                            "Basic Gift - ",
                                                            getPackageStatus('BASIC')
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                                        lineNumber: 98,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "PREMIUM",
                                                        disabled: stock.premium === 0,
                                                        children: [
                                                            "Premium Gift - ",
                                                            getPackageStatus('PREMIUM')
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                                        lineNumber: 101,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "SPECIAL",
                                                        disabled: stock.special === 0,
                                                        children: [
                                                            "Event Pass / Special - ",
                                                            getPackageStatus('SPECIAL')
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                                        lineNumber: 104,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                                lineNumber: 92,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                        lineNumber: 90,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm font-medium text-neutral-300",
                                                children: "Nama Skin/Event *"
                                            }, void 0, false, {
                                                fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                                lineNumber: 111,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: itemName,
                                                onChange: (e)=>setItemName(e.target.value),
                                                placeholder: "Contoh: Chou KOF",
                                                className: "w-full bg-neutral-950/50 border border-neutral-800 rounded-lg p-3.5 outline-none focus:border-blue-500 transition-colors"
                                            }, void 0, false, {
                                                fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                                lineNumber: 112,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                        lineNumber: 110,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-lg font-bold text-blue-400 border-b border-neutral-800 pb-2 mt-4",
                                children: "2. Data Akun MLBB"
                            }, void 0, false, {
                                fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-4 gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2 md:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm font-medium text-neutral-300",
                                                children: "User ID *"
                                            }, void 0, false, {
                                                fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                                lineNumber: 128,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                value: mlbbId,
                                                onChange: (e)=>setMlbbId(e.target.value),
                                                placeholder: "12345678",
                                                className: "w-full bg-neutral-950/50 border border-neutral-800 rounded-lg p-3.5 outline-none focus:border-blue-500 transition-colors font-mono"
                                            }, void 0, false, {
                                                fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                                lineNumber: 129,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                        lineNumber: 127,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2 md:col-span-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm font-medium text-neutral-300",
                                                children: "Zone ID (Server) *"
                                            }, void 0, false, {
                                                fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                                lineNumber: 139,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                value: serverId,
                                                onChange: (e)=>setServerId(e.target.value),
                                                placeholder: "1234",
                                                className: "w-full bg-neutral-950/50 border border-neutral-800 rounded-lg p-3.5 outline-none focus:border-blue-500 transition-colors font-mono"
                                            }, void 0, false, {
                                                fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                                lineNumber: 140,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                        lineNumber: 138,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                lineNumber: 126,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm font-medium text-neutral-300",
                                                children: "Nickname (Opsional)"
                                            }, void 0, false, {
                                                fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                                lineNumber: 152,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: nickname,
                                                onChange: (e)=>setNickname(e.target.value),
                                                placeholder: "Toro Gaming",
                                                className: "w-full bg-neutral-950/50 border border-neutral-800 rounded-lg p-3.5 outline-none focus:border-blue-500 transition-colors"
                                            }, void 0, false, {
                                                fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                                lineNumber: 153,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                        lineNumber: 151,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-sm font-medium text-neutral-300",
                                                children: "Nomor WA Anda (Opsional)"
                                            }, void 0, false, {
                                                fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                                lineNumber: 162,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                value: waNumber,
                                                onChange: (e)=>setWaNumber(e.target.value),
                                                placeholder: "0812xxxx",
                                                className: "w-full bg-neutral-950/50 border border-neutral-800 rounded-lg p-3.5 outline-none focus:border-blue-500 transition-colors font-mono"
                                            }, void 0, false, {
                                                fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                                lineNumber: 163,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                        lineNumber: 161,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-medium text-neutral-300",
                                    children: "Catatan Tambahan (Opsional)"
                                }, void 0, false, {
                                    fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                    lineNumber: 176,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: note,
                                    onChange: (e)=>setNote(e.target.value),
                                    placeholder: "Pesan khusus untuk admin...",
                                    className: "w-full bg-neutral-950/50 border border-neutral-800 rounded-lg p-3.5 outline-none focus:border-blue-500 transition-colors resize-none h-24 text-sm"
                                }, void 0, false, {
                                    fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                    lineNumber: 177,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                            lineNumber: 175,
                            columnNumber: 12
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                        lineNumber: 174,
                        columnNumber: 9
                    }, this),
                    isSelectedDisabled && packageType !== '' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-amber-500/10 border border-amber-500/20 text-amber-400 p-4 rounded-lg mt-6 mb-2 text-sm text-center font-medium",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "fa-solid fa-triangle-exclamation mr-2"
                            }, void 0, false, {
                                fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                lineNumber: 188,
                                columnNumber: 14
                            }, this),
                            " Paket ini sedang habis / penuh antrian. Silakan chat admin untuk sistem Pre-Order (PO).",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: `https://wa.me/6281234567890?text=Halo admin, saya mau PO paket ${packageType}`,
                                target: "_blank",
                                className: "block mt-2 text-white bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-md transition border border-amber-600",
                                children: "Pre-Order via WhatsApp →"
                            }, void 0, false, {
                                fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                lineNumber: 189,
                                columnNumber: 14
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                        lineNumber: 187,
                        columnNumber: 12
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: loading,
                        className: "w-full bg-blue-500 hover:bg-blue-400 text-neutral-950 font-bold py-4 px-6 rounded-xl transition-all disabled:opacity-50 mt-6 shadow-lg shadow-blue-500/20 flex justify-center items-center gap-2 group",
                        children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "animate-pulse",
                            children: "Memproses..."
                        }, void 0, false, {
                            fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                            lineNumber: 198,
                            columnNumber: 15
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: "fa-brands fa-whatsapp text-xl"
                                }, void 0, false, {
                                    fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                    lineNumber: 201,
                                    columnNumber: 17
                                }, this),
                                "Kirim Order ke WhatsApp",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: "fa-solid fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"
                                }, void 0, false, {
                                    fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                                    lineNumber: 203,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                        lineNumber: 192,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-center text-neutral-500 mt-4",
                        children: "Dengan klik tombol di atas, Anda setuju dengan syarat dan ketentuan gift skin Toro Store."
                    }, void 0, false, {
                        fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                        lineNumber: 209,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/toro-store-app/src/components/CheckoutForm.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
}
_s(CheckoutForm, "oLXTk0hzMUbe83cV/0Pea5ZxYS4=");
_c = CheckoutForm;
var _c;
__turbopack_context__.k.register(_c, "CheckoutForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=toro-store-app_src_a6325971._.js.map