from reportlab.lib import colors
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle, KeepTogether
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics
from pathlib import Path

out = Path(r"C:\Users\potnu\Desktop\SMK_CASHEW\docs\SMK_CASHEW_step_by_step_backend_first_guide.pdf")
out.parent.mkdir(parents=True, exist_ok=True)

doc = SimpleDocTemplate(str(out), pagesize=LETTER, rightMargin=54, leftMargin=54, topMargin=54, bottomMargin=54)
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="TitleX", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=22, leading=27, textColor=colors.HexColor("#1F3A2E"), spaceAfter=12))
styles.add(ParagraphStyle(name="Subtle", parent=styles["Normal"], fontSize=10, leading=14, textColor=colors.HexColor("#555555"), spaceAfter=8))
styles.add(ParagraphStyle(name="H1X", parent=styles["Heading1"], fontName="Helvetica-Bold", fontSize=15, leading=19, textColor=colors.HexColor("#1F3A2E"), spaceBefore=16, spaceAfter=8))
styles.add(ParagraphStyle(name="H2X", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=12, leading=15, textColor=colors.HexColor("#6B4E16"), spaceBefore=10, spaceAfter=5))
styles.add(ParagraphStyle(name="BodyX", parent=styles["Normal"], fontSize=9.5, leading=13.5, spaceAfter=5))
styles.add(ParagraphStyle(name="CodeX", parent=styles["Code"], fontName="Courier", fontSize=8.2, leading=10.5, backColor=colors.HexColor("#F4F6F4"), borderColor=colors.HexColor("#D6DDD6"), borderWidth=0.4, borderPadding=5, spaceBefore=4, spaceAfter=8))
styles.add(ParagraphStyle(name="BulletX", parent=styles["BodyX"], leftIndent=14, bulletIndent=4, spaceAfter=3))
styles.add(ParagraphStyle(name="StepTitle", parent=styles["BodyX"], fontName="Helvetica-Bold", textColor=colors.HexColor("#1F3A2E"), spaceAfter=2))

story = []

def p(text, style="BodyX"):
    story.append(Paragraph(text, styles[style]))

def code(text):
    safe = text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    story.append(Paragraph(safe.replace("\n", "<br/>"), styles["CodeX"]))

def bullet(text):
    story.append(Paragraph(text, styles["BulletX"], bulletText="-"))

def h1(text): p(text, "H1X")
def h2(text): p(text, "H2X")

p("SMK_CASHEW Step-by-Step Project Guide", "TitleX")
p("Backend-first roadmap for your existing SMK_CASHEW project using Node.js, Express, MongoDB Atlas, and a separate frontend and docs folder.", "Subtle")
p("Current status: backend already started, Express/dotenv/cors/nodemon installed, MongoDB cluster created. This guide starts from that point and shows what to do next in order.", "BodyX")

h1("1. Final Folder Structure")
p("Your project root should look like this:")
code("SMK_CASHEW/\n  backend/\n  frontend/\n  database/\n  docs/")
p("Inside backend, build this structure:")
code("backend/\n  src/\n    config/\n      db.js\n    controllers/\n      productController.js\n      authController.js\n      cartController.js\n    middleware/\n      authMiddleware.js\n      errorMiddleware.js\n      validateMiddleware.js\n    models/\n      User.js\n      Product.js\n      Cart.js\n      Order.js\n    routes/\n      productRoutes.js\n      authRoutes.js\n      cartRoutes.js\n    seed/\n      productSeeder.js\n    server.js\n  .env\n  .env.example\n  package.json")

h1("2. Backend Setup")
p("Go to the backend folder and make sure the backend package is initialized.")
code("cd SMK_CASHEW/backend\nnpm init -y")
p("Install the important backend dependencies. You already installed some; running this command again is safe because npm will keep existing packages.")
code("npm install express mongoose dotenv cors bcryptjs jsonwebtoken cookie-parser express-validator helmet express-rate-limit morgan\nnpm install -D nodemon")
p("Update backend/package.json scripts:")
code('"scripts": {\n  "dev": "nodemon src/server.js",\n  "start": "node src/server.js",\n  "seed": "node src/seed/productSeeder.js"\n}')

h1("3. Environment Variables")
p("Create backend/.env with your actual MongoDB Atlas connection string. Never commit this file.")
code("PORT=5000\nMONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/smk_cashew\nJWT_SECRET=make_this_a_long_random_secret\nCLIENT_URL=http://localhost:5173\nNODE_ENV=development")
p("Create backend/.env.example with safe placeholder values so other developers know what keys are needed.")

h1("4. MongoDB Connection")
p("Create backend/src/config/db.js:")
code('const mongoose = require("mongoose");\n\nconst connectDB = async () => {\n  try {\n    await mongoose.connect(process.env.MONGO_URI);\n    console.log("MongoDB connected");\n  } catch (error) {\n    console.error("MongoDB connection failed:", error.message);\n    process.exit(1);\n  }\n};\n\nmodule.exports = connectDB;')

h1("5. Express Server")
p("Create backend/src/server.js. Start with health check, security middleware, JSON parsing, CORS, and route registration.")
code('require("dotenv").config();\nconst express = require("express");\nconst cors = require("cors");\nconst helmet = require("helmet");\nconst morgan = require("morgan");\nconst rateLimit = require("express-rate-limit");\nconst connectDB = require("./config/db");\n\nconst app = express();\nconnectDB();\n\napp.use(helmet());\napp.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));\napp.use(express.json());\napp.use(morgan("dev"));\napp.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));\n\napp.get("/api/health", (req, res) => {\n  res.json({ status: "ok", service: "SMK_CASHEW API" });\n});\n\nconst PORT = process.env.PORT || 5000;\napp.listen(PORT, () => console.log(`Server running on port ${PORT}`));')
p("Run and test:")
code("npm run dev\n# Open http://localhost:5000/api/health")

h1("6. Product Model")
p("Create backend/src/models/Product.js:")
code('const mongoose = require("mongoose");\n\nconst productSchema = new mongoose.Schema({\n  name: { type: String, required: true, trim: true },\n  slug: { type: String, required: true, unique: true, lowercase: true },\n  type: { type: String, enum: ["raw", "roasted", "salted", "flavored", "organic"], required: true },\n  grade: { type: String, required: true },\n  weightGrams: { type: Number, required: true },\n  price: { type: Number, required: true, min: 0 },\n  stock: { type: Number, required: true, min: 0 },\n  images: [{ type: String }],\n  description: { type: String, required: true },\n  isActive: { type: Boolean, default: true }\n}, { timestamps: true });\n\nmodule.exports = mongoose.model("Product", productSchema);')

h1("7. Product API")
p("Create backend/src/controllers/productController.js:")
code('const Product = require("../models/Product");\n\nexports.getProducts = async (req, res, next) => {\n  try {\n    const { type, minPrice, maxPrice, page = 1, limit = 12 } = req.query;\n    const filter = { isActive: true };\n    if (type) filter.type = type;\n    if (minPrice || maxPrice) filter.price = {};\n    if (minPrice) filter.price.$gte = Number(minPrice);\n    if (maxPrice) filter.price.$lte = Number(maxPrice);\n\n    const skip = (Number(page) - 1) * Number(limit);\n    const products = await Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));\n    const total = await Product.countDocuments(filter);\n    res.json({ products, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });\n  } catch (error) { next(error); }\n};\n\nexports.getProductById = async (req, res, next) => {\n  try {\n    const product = await Product.findById(req.params.id);\n    if (!product || !product.isActive) return res.status(404).json({ message: "Product not found" });\n    res.json(product);\n  } catch (error) { next(error); }\n};')
p("Create backend/src/routes/productRoutes.js:")
code('const express = require("express");\nconst { getProducts, getProductById } = require("../controllers/productController");\nconst router = express.Router();\n\nrouter.get("/", getProducts);\nrouter.get("/:id", getProductById);\n\nmodule.exports = router;')
p("Register the route in server.js before app.listen:")
code('app.use("/api/products", require("./routes/productRoutes"));')

h1("8. Product Seeder")
p("Create backend/src/seed/productSeeder.js and seed at least 10 products before starting the frontend.")
code('require("dotenv").config();\nconst connectDB = require("../config/db");\nconst Product = require("../models/Product");\n\nconst products = [\n  { name: "Raw Whole Cashews W240", slug: "raw-whole-cashews-w240", type: "raw", grade: "W240", weightGrams: 500, price: 649, stock: 50, images: [], description: "Premium whole raw cashews with rich creamy texture." },\n  { name: "Raw Whole Cashews W320", slug: "raw-whole-cashews-w320", type: "raw", grade: "W320", weightGrams: 500, price: 549, stock: 60, images: [], description: "Everyday premium raw cashews for snacking and cooking." },\n  { name: "Roasted Salted Cashews", slug: "roasted-salted-cashews", type: "salted", grade: "W320", weightGrams: 250, price: 329, stock: 80, images: [], description: "Crunchy roasted cashews with balanced salt." },\n  { name: "Masala Cashews", slug: "masala-cashews", type: "flavored", grade: "W320", weightGrams: 250, price: 349, stock: 45, images: [], description: "Spiced cashews with Indian masala seasoning." },\n  { name: "Organic Cashews", slug: "organic-cashews", type: "organic", grade: "W240", weightGrams: 500, price: 749, stock: 30, images: [], description: "Organic cashews sourced for premium quality." }\n];\n\nconst seed = async () => {\n  await connectDB();\n  await Product.deleteMany();\n  await Product.insertMany(products);\n  console.log("Products seeded");\n  process.exit();\n};\n\nseed();')
p("Run:")
code("npm run seed\n# Then test GET http://localhost:5000/api/products")

h1("9. Authentication")
p("After products work, build auth. Create User model, auth controller, routes, and JWT middleware.")
bullet("POST /api/auth/register: create user with hashed password")
bullet("POST /api/auth/login: verify password and return token")
bullet("GET /api/auth/me: return current logged-in user")
p("Use bcryptjs for hashing and jsonwebtoken for token creation.")

h1("10. Cart")
p("After auth works, build cart endpoints. Keep cart server-side for logged-in users and localStorage later for guests on frontend.")
bullet("GET /api/cart: get current user's cart")
bullet("POST /api/cart: add item")
bullet("PUT /api/cart/:productId: update quantity")
bullet("DELETE /api/cart/:productId: remove item")

h1("11. Frontend Starts Only After Backend Products Work")
p("Once GET /api/products returns real data, scaffold frontend:")
code("cd SMK_CASHEW\nnpm create vite@latest frontend\n# Choose React\ncd frontend\nnpm install axios react-router-dom lucide-react")
p("Frontend order:")
bullet("Navbar")
bullet("Home page")
bullet("Product listing page")
bullet("Product detail page")
bullet("Cart context and cart page")
bullet("Login and register pages")

h1("12. Immediate Checklist")
rows = [["Order", "Task", "Success check"],
        ["1", "Confirm backend structure", "src/config, controllers, models, routes exist"],
        ["2", "Add .env", "MongoDB URI is loaded"],
        ["3", "Create db.js", "MongoDB connected appears"],
        ["4", "Create server.js", "/api/health returns ok"],
        ["5", "Create Product model", "No schema errors"],
        ["6", "Create product routes", "/api/products works"],
        ["7", "Seed products", "Products visible in API response"],
        ["8", "Start auth", "Register/login works"],
        ["9", "Start cart", "Logged-in cart works"],
        ["10", "Then frontend", "Product list consumes backend API"]]
table = Table(rows, colWidths=[0.55*inch, 2.55*inch, 3.05*inch])
table.setStyle(TableStyle([
    ("BACKGROUND", (0,0), (-1,0), colors.HexColor("#E8F0EA")),
    ("TEXTCOLOR", (0,0), (-1,0), colors.HexColor("#1F3A2E")),
    ("FONTNAME", (0,0), (-1,0), "Helvetica-Bold"),
    ("FONTSIZE", (0,0), (-1,-1), 8.5),
    ("LEADING", (0,0), (-1,-1), 10.5),
    ("GRID", (0,0), (-1,-1), 0.35, colors.HexColor("#BFC8BF")),
    ("VALIGN", (0,0), (-1,-1), "TOP"),
    ("ROWBACKGROUNDS", (0,1), (-1,-1), [colors.white, colors.HexColor("#FAFBFA")]),
    ("LEFTPADDING", (0,0), (-1,-1), 5),
    ("RIGHTPADDING", (0,0), (-1,-1), 5),
    ("TOPPADDING", (0,0), (-1,-1), 5),
    ("BOTTOMPADDING", (0,0), (-1,-1), 5),
]))
story.append(table)

h1("13. Do Not Skip These Rules")
bullet("Do not hard-code your MongoDB password in code. Keep it only in .env.")
bullet("Do not start payment integration before cart and order creation work.")
bullet("Do not start admin dashboard before product browsing and cart are stable.")
bullet("Keep docs/api-spec.md updated while you build endpoints.")
bullet("Commit after each working milestone: health route, products route, auth, cart, frontend scaffold.")

doc.build(story)
print(out)
