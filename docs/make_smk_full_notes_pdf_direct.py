from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUT_PDF = ROOT / "docs" / "SMK_CASHEW_full_stack_notes_interview_guide.pdf"


styles = getSampleStyleSheet()
styles.add(
    ParagraphStyle(
        "TitleCenter",
        parent=styles["Title"],
        alignment=TA_CENTER,
        fontName="Helvetica-Bold",
        fontSize=22,
        leading=27,
        textColor=colors.HexColor("#1F4D78"),
        spaceAfter=8,
    )
)
styles.add(
    ParagraphStyle(
        "SubTitle",
        parent=styles["Normal"],
        alignment=TA_CENTER,
        fontName="Helvetica",
        fontSize=10,
        leading=14,
        textColor=colors.HexColor("#555555"),
        spaceAfter=14,
    )
)
styles.add(
    ParagraphStyle(
        "H1x",
        parent=styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=15,
        leading=19,
        textColor=colors.HexColor("#2E74B5"),
        spaceBefore=16,
        spaceAfter=8,
    )
)
styles.add(
    ParagraphStyle(
        "H2x",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=12,
        leading=16,
        textColor=colors.HexColor("#2E74B5"),
        spaceBefore=10,
        spaceAfter=5,
    )
)
styles.add(
    ParagraphStyle(
        "BodyX",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=9.5,
        leading=13,
        spaceAfter=6,
    )
)
styles.add(
    ParagraphStyle(
        "SmallX",
        parent=styles["BodyText"],
        fontName="Helvetica",
        fontSize=8,
        leading=10.5,
    )
)
styles.add(
    ParagraphStyle(
        "CodeX",
        parent=styles["Code"],
        fontName="Courier",
        fontSize=8,
        leading=10,
        leftIndent=12,
        textColor=colors.HexColor("#222222"),
        backColor=colors.HexColor("#F4F6F9"),
        borderPadding=5,
        spaceAfter=8,
    )
)


def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#666666"))
    canvas.drawString(inch, 0.55 * inch, "SMK_CASHEW Study Guide")
    canvas.drawRightString(letter[0] - inch, 0.55 * inch, f"Page {doc.page}")
    canvas.restoreState()


def p(text, style="BodyX"):
    return Paragraph(text, styles[style])


def h1(text):
    return Paragraph(text, styles["H1x"])


def h2(text):
    return Paragraph(text, styles["H2x"])


def bullets(items):
    return ListFlowable(
        [ListItem(p(item), leftIndent=12) for item in items],
        bulletType="bullet",
        leftIndent=16,
        bulletFontName="Helvetica",
        bulletFontSize=8,
    )


def nums(items):
    return ListFlowable(
        [ListItem(p(item), leftIndent=12) for item in items],
        bulletType="1",
        leftIndent=18,
    )


def code(text):
    return Paragraph(text.replace("\n", "<br/>"), styles["CodeX"])


def tbl(headers, rows, widths):
    data = [[Paragraph(f"<b>{h}</b>", styles["SmallX"]) for h in headers]]
    for row in rows:
        data.append([Paragraph(str(c), styles["SmallX"]) for c in row])
    table = Table(data, colWidths=widths, hAlign="LEFT", repeatRows=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#E8EEF5")),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.HexColor("#1F4D78")),
                ("GRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#D0D7DE")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    return KeepTogether([table, Spacer(1, 8)])


def callout(title, body):
    table = Table(
        [[Paragraph(f"<b>{title}</b><br/>{body}", styles["SmallX"])]],
        colWidths=[6.3 * inch],
        hAlign="LEFT",
    )
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#F4F6F9")),
                ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#D0D7DE")),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    return KeepTogether([table, Spacer(1, 8)])


def build():
    doc = BaseDocTemplate(
        str(OUT_PDF),
        pagesize=letter,
        leftMargin=0.85 * inch,
        rightMargin=0.85 * inch,
        topMargin=0.75 * inch,
        bottomMargin=0.8 * inch,
        title="SMK_CASHEW Full Stack Notes and Interview Guide",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="normal")
    doc.addPageTemplates([PageTemplate(id="main", frames=frame, onPage=header_footer)])

    story = [
        p("SMK_CASHEW Full Stack Notes and Interview Guide", "TitleCenter"),
        p("Backend + Frontend flow, packages, middleware, modules, debugging lessons, and interview preparation", "SubTitle"),
        callout(
            "How to use this PDF",
            "Read Sections 1-7 to understand the project flow. Revise Sections 8-10 before interviews. The examples and bugs are based on the SMK_CASHEW app you built.",
        ),
        h1("1. Project Overview"),
        p(
            "SMK_CASHEW is a MERN-style ecommerce app for cashew products. The backend is an Express REST API with MongoDB Atlas and Mongoose. The frontend is a Vite React app that uses Axios, React Router, AuthContext, and CartContext."
        ),
        tbl(
            ["Layer", "Responsibility", "Files"],
            [
                ["Server", "Starts Express, connects MongoDB, mounts APIs", "backend/src/server.js"],
                ["Models", "Define data shape and validation", "User, Product, Cart, Order"],
                ["Controllers", "Business logic and JSON response", "auth, product, cart, checkout, admin order controllers"],
                ["Routes", "URL + method mapping", "authRoutes, productRoutes, cartRoutes, checkoutRoutes, adminRoutes"],
                ["Middleware", "Reusable logic before controller", "protect, adminOnly, validate, notFound, errorHandler"],
                ["Frontend", "Pages, contexts, API calls, UI state", "frontend/src"],
            ],
            [0.9 * inch, 2.55 * inch, 2.85 * inch],
        ),
        h1("2. End-to-End Flow"),
        nums(
            [
                "React page/component triggers an action.",
                "Axios sends an API request to the backend base URL.",
                "AuthContext adds Authorization: Bearer <token> when logged in.",
                "Express server receives the request.",
                "Route module matches the path and HTTP method.",
                "Middleware runs before controller: auth, validation, admin checks.",
                "Controller calls Mongoose model methods.",
                "MongoDB returns data.",
                "Controller sends JSON response.",
                "React stores response in state and re-renders UI.",
            ]
        ),
        code("React -> Axios -> Express route -> Middleware -> Controller -> Mongoose Model -> MongoDB -> JSON -> React state"),
        h1("3. Backend Architecture"),
        h2("server.js"),
        p("server.js is the backend entry point. It loads .env, creates the app, connects DB, installs middleware, mounts routes, then starts the server."),
        code(
            "app.use('/api/products', productRoutes)\napp.use('/api/auth', authRoutes)\napp.use('/api/cart', cartRoutes)\napp.use('/api/checkout', checkoutRoutes)\napp.use('/api/admin', adminRoutes)\n\napp.use(notFound)\napp.use(errorHandler)"
        ),
        callout(
            "Route order matters",
            "All real routes must be mounted before notFound and errorHandler. If adminRoutes is mounted after notFound, /api/admin/orders will never run.",
        ),
        h2("Models, schemas, and mongoose.model"),
        p("A schema is the blueprint. A model is the database interface. That is why Product.js exports mongoose.model('Product', productSchema), not only productSchema."),
        tbl(
            ["Term", "Meaning", "Example"],
            [
                ["Schema", "Field types, validation, defaults", "productSchema"],
                ["Model", "Class with DB methods", "Product.find(), Product.create()"],
                ["Document", "One saved record", "product._id, product.save()"],
            ],
            [1.0 * inch, 2.5 * inch, 2.8 * inch],
        ),
        h2("Controllers"),
        tbl(
            ["Controller", "Important methods", "Purpose"],
            [
                ["authController", "register, login, getMe", "User creation, login, JWT, current user"],
                ["productController", "getProducts, getProductById, createProduct, updateProduct, deleteProduct", "Product listing and admin product management"],
                ["cartController", "getCart, addToCart, updateCartItem, removeCartItem", "Cart lifecycle for logged-in users"],
                ["checkoutController", "createOrder, getMyOrders", "Convert cart into order and show user orders"],
                ["adminOrderController", "getAllOrders, updateOrderStatus", "Admin order dashboard and status updates"],
            ],
            [1.2 * inch, 2.6 * inch, 2.5 * inch],
        ),
        h1("4. Authentication and Authorization"),
        p("Authentication means proving who the user is. Authorization means deciding whether that user can perform an action."),
        tbl(
            ["Part", "What it does"],
            [
                ["JWT", "Stores signed userId after login/register"],
                ["protect", "Reads Bearer token, verifies it, loads user, assigns req.user"],
                ["adminOnly", "Allows only req.user.role === 'admin'"],
                ["AuthContext", "Stores token, calls /auth/me, sets Axios Authorization header"],
            ],
            [1.4 * inch, 4.9 * inch],
        ),
        code("Authorization: Bearer <token>\nprotect -> jwt.verify -> User.findById(decoded.userId) -> req.user\nadminOnly -> req.user.role === 'admin'"),
        callout("Debug tip", "If admin routes return 403, call GET /api/auth/me with the same token. The token may belong to a customer user even if another user in MongoDB is admin."),
        h1("5. Product, Cart, Checkout, and Admin Order Flow"),
        h2("Product flow"),
        bullets(
            [
                "GET /api/products returns active products with pagination/filter query support.",
                "GET /api/products/:id uses MongoDB _id and Product.findById.",
                "POST/PUT/DELETE /api/products are admin-only.",
                "DELETE is a soft delete: it sets isActive: false instead of removing the record.",
            ]
        ),
        h2("Cart flow"),
        bullets(
            [
                "POST /api/cart accepts productId and quantity.",
                "Cart stores product ObjectId, quantity, and priceSnapshot.",
                "GET /api/cart populates items.product to show product details.",
                "Using populate('item.product') fails because the schema field is items, plural.",
            ]
        ),
        h2("Checkout flow"),
        nums(
            [
                "Find current user's cart and populate items.product.",
                "Reject empty cart.",
                "Verify each product is active and stock is enough.",
                "Create orderItems from cart items.",
                "Calculate subtotal, shippingFee, totalAmount.",
                "Create Order document.",
                "Decrease product stock.",
                "Clear cart.items.",
                "Return populated order.",
            ]
        ),
        callout("Why cart is empty after checkout", "The cart is intentionally cleared because the items moved into an order. Use /api/checkout/my-orders or /api/admin/orders to view order details after checkout."),
        h1("6. Frontend Architecture"),
        tbl(
            ["Module", "Purpose"],
            [
                ["services/api.js", "One Axios instance with baseURL"],
                ["AuthContext.jsx", "Token, user, login/logout, /auth/me"],
                ["CartContext.jsx", "Cart items and add/update/remove/fetch functions"],
                ["App.jsx", "React Router path mapping"],
                ["Navbar.jsx", "Navigation based on auth/admin state"],
                ["Products.jsx", "Fetches product list"],
                ["AdminOrders.jsx", "Fetches all orders and updates status"],
            ],
            [1.7 * inch, 4.6 * inch],
        ),
        h2("React hooks in this app"),
        tbl(
            ["Hook/pattern", "Use", "Example"],
            [
                ["useState", "Store render-driving state", "products, status, error"],
                ["useState(() => value)", "Lazy initial value once", "localStorage token"],
                ["setState(value)", "When new value is known", "setStatus('loading')"],
                ["setState(prev => next)", "When next depends on previous", "setItems(prev => ...)"],
                ["useEffect", "External sync/fetch", "fetch products, fetch current user"],
                ["useMemo", "Memoize context value", "AuthContext/CartContext value"],
            ],
            [1.5 * inch, 2.3 * inch, 2.5 * inch],
        ),
        h1("7. Packages and Middleware"),
        tbl(
            ["Backend package", "Why used"],
            [
                ["express", "Server, routes, middleware pipeline"],
                ["mongoose", "Schemas, models, MongoDB queries, populate"],
                ["dotenv", "Loads PORT, MONGO_URI, JWT_SECRET, CLIENT_URL"],
                ["bcryptjs", "Password hashing and compare"],
                ["jsonwebtoken", "JWT creation and verification"],
                ["cors", "Allows frontend origin to call backend"],
                ["helmet", "Security HTTP headers"],
                ["morgan", "Request logging"],
                ["express-rate-limit", "Basic abuse protection"],
                ["express-validator", "Body/query/param validation"],
                ["nodemon", "Auto restart during dev"],
            ],
            [1.55 * inch, 4.75 * inch],
        ),
        tbl(
            ["Frontend package", "Why used"],
            [
                ["vite", "Fast dev server and build"],
                ["react/react-dom", "Component UI and DOM rendering"],
                ["react-router-dom", "Client routes like /products and /admin/orders"],
                ["axios", "Reusable API client"],
                ["lucide-react", "Icons"],
                ["tailwindcss", "Utility styling"],
                ["eslint", "Finds hook/import/quality problems"],
            ],
            [1.55 * inch, 4.75 * inch],
        ),
        h1("8. API Reference"),
        tbl(
            ["Method", "Endpoint", "Access", "Purpose"],
            [
                ["GET", "/api/health", "Public", "Health check"],
                ["GET", "/api/products", "Public", "List products"],
                ["GET", "/api/products/:id", "Public", "Get product by _id"],
                ["POST", "/api/products", "Admin", "Create product"],
                ["PUT", "/api/products/:id", "Admin", "Update product"],
                ["DELETE", "/api/products/:id", "Admin", "Soft delete product"],
                ["POST", "/api/auth/register", "Public", "Register"],
                ["POST", "/api/auth/login", "Public", "Login"],
                ["GET", "/api/auth/me", "User", "Current user"],
                ["GET", "/api/cart", "User", "Cart"],
                ["POST", "/api/cart", "User", "Add item"],
                ["PUT", "/api/cart/:productId", "User", "Update quantity"],
                ["DELETE", "/api/cart/:productId", "User", "Remove item"],
                ["POST", "/api/checkout", "User", "Create order"],
                ["GET", "/api/checkout/my-orders", "User", "My orders"],
                ["GET", "/api/admin/orders", "Admin", "All orders"],
                ["PUT", "/api/admin/orders/:id/status", "Admin", "Update order status"],
            ],
            [0.65 * inch, 2.15 * inch, 0.75 * inch, 2.75 * inch],
        ),
        PageBreak(),
        h1("9. Debugging Lessons From This Project"),
        tbl(
            ["Symptom", "Root cause", "Fix"],
            [
                ["Mongo URI undefined", ".env had MONG0_URI with zero", "Rename to MONGO_URI"],
                ["Function not defined", "Export name did not match function name", "Match createProduct/createProduct"],
                ["JSON parse error", "Single quotes or JS object syntax", "Use valid JSON double quotes"],
                ["/auth/me not found", "Route was POST but request was GET", "Use router.get('/me')"],
                ["Populate error", "item.product vs items.product", "Use populate('items.product')"],
                ["cart before initialization", "Used cart.findOne instead of Cart.findOne", "Use model Cart"],
                ["Admin route 404", "adminRoutes after notFound", "Mount before notFound"],
                ["Admin access only", "Token belonged to customer", "Login as admin and verify /auth/me"],
                ["Atlas crash", "Current IP not whitelisted", "Add IP in Network Access"],
                ["Register page blank", "/regiter typo", "Use /register"],
            ],
            [1.6 * inch, 2.4 * inch, 2.3 * inch],
        ),
        h1("10. Interview Questions and Answers"),
    ]

    qa = [
        ("What is Express used for?", "Express creates the backend server, routes, middleware chain, and JSON responses."),
        ("What is Mongoose used for?", "Mongoose defines schemas/models and provides database methods such as find, create, findById, update, and populate."),
        ("Why export mongoose.model instead of schema?", "The schema is a blueprint. The model is the object that performs database operations."),
        ("How is _id generated?", "MongoDB automatically creates a unique ObjectId for each document."),
        ("What is JWT?", "A signed token that lets the backend identify the user without storing session state on the server."),
        ("What does protect middleware do?", "It reads the Authorization header, verifies token, loads user, and sets req.user."),
        ("What does adminOnly do?", "It checks req.user.role === 'admin' and returns 403 otherwise."),
        ("Why use bcrypt?", "To store password hashes instead of plain passwords."),
        ("Why use express-validator?", "To reject invalid request data before controller/database logic."),
        ("Why use priceSnapshot?", "To remember the item price at cart/order time even if product price changes later."),
        ("What is populate?", "Mongoose replaces an ObjectId reference with document data from the referenced collection."),
        ("Why clear cart after checkout?", "The cart has been converted into an order, so active cart should be empty."),
        ("Why can admin token still fail?", "The token may point to a different user. Always check /auth/me with the same token."),
        ("What is React Router?", "It maps browser paths to React components without full page reload."),
        ("Why use Axios?", "It centralizes API baseURL and headers and simplifies request/response handling."),
        ("Why use Context API?", "To share auth/cart state across components without prop drilling."),
        ("Can setState be used in useEffect?", "Yes, especially after async fetches. Avoid infinite loops caused by dependencies."),
        ("What does dependency array do?", "It controls when an effect reruns."),
        ("Why use useState lazy initializer?", "To compute/read an initial value only once, such as localStorage token."),
        ("What status codes matter here?", "201 create, 400 validation error, 401 no/invalid auth, 403 forbidden, 404 not found, 500 server error."),
        ("How do you debug Node crashes?", "Read stack trace, identify file/line, inspect imports/exports, reproduce with one route, patch root cause."),
        ("How do you debug Atlas connection failure?", "Check MONGO_URI, Atlas Network Access IP whitelist, username/password, cluster status."),
    ]
    for i, (q, a) in enumerate(qa, 1):
        story.append(KeepTogether([p(f"<b>{i}. {q}</b>"), p(a)]))

    story += [
        h1("11. Revision Checklist"),
        bullets(
            [
                "Explain full request lifecycle from React to MongoDB and back.",
                "Explain schema vs model vs document.",
                "Explain protect vs adminOnly.",
                "Explain why route order matters in Express.",
                "Explain cart -> checkout -> order flow.",
                "Explain useState, useEffect, useMemo, and Context in the frontend.",
                "Explain common backend status codes.",
                "Explain how to verify token role with /api/auth/me.",
                "Explain MongoDB Atlas IP whitelist issue.",
            ]
        ),
        callout(
            "Best interview framing",
            "When asked about this project, start with the business flow, then the technical architecture, then one debugging story. That shows both product understanding and engineering maturity.",
        ),
    ]

    doc.build(story)
    print(OUT_PDF)


if __name__ == "__main__":
    build()
