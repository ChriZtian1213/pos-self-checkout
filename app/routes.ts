import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("order", "routes/order.tsx"),
    route("produce", "routes/produce.tsx"),
    route("pay", "routes/pay.tsx"),
    route('addItem', 'routes/addItem.tsx'),
    route('cashierSignIn', 'routes/cashierSignIn.tsx'),
] satisfies RouteConfig;
