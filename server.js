require('dotenv').config();
// Backend (Node.js + Express)
// Manages authentication, form submission, and file uploads

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { supabase, supabaseAdmin } = require('./supabaseClient'); // ✅ Import both clients
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

// Set security headers
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; font-src 'self' data: https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;"
    );
    next();
});

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

/* ==========================
   ✅ AUTHENTICATION ROUTES
   ========================== */

// Signup (Uses `supabase`)
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) return res.status(400).json({ error: error.message });

    res.json({ user: data.user });
});

// Login (Uses `supabase`)
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return res.status(400).json({ error: error.message });

    res.json({ session: data.session });
});

// Request Password Reset
app.post('/reset-password', async (req, res) => {
    const { email } = req.body;

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.CLIENT_URL}/update-password`
    });

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: "Password reset email sent!" });
});

// Update Password (after reset)
app.post('/update-password', async (req, res) => {
    const { new_password } = req.body;

    const { data, error } = await supabase.auth.updateUser({
        password: new_password
    });

    if (error) return res.status(400).json({ error: error.message });

    res.json({ message: "Password updated successfully!" });
});

/* ==========================
   ✅ COMPLIANCE FORM ROUTES
   ========================== */

// Submit Compliance Form (Uses `supabase`)
app.post('/submit-form', async (req, res) => {
    const { userId, formData } = req.body;

    const { data, error } = await supabase
        .from('compliance_forms')
        .insert([{ user_id: userId, form_data: formData }]);

    if (error) return res.status(400).json({ error: error.message });

    res.json({ data });
});

// Get All Compliance Forms (Admin only - Uses `supabaseAdmin`)
app.get('/admin/forms', async (req, res) => {
    const { data, error } = await supabaseAdmin
        .from('compliance_forms')
        .select('*');

    if (error) return res.status(400).json({ error: error.message });

    res.json({ data });
});

/* ==========================
   ✅ FILE UPLOAD ROUTE
   ========================== */

// Upload PDF (Uses `supabase`)
app.post('/upload', upload.single('file'), async (req, res) => {
    const { originalname, buffer } = req.file;
    const filePath = `uploads/${Date.now()}-${originalname}`;

    const { data, error } = await supabase.storage.from('uploads').upload(filePath, buffer);

    if (error) return res.status(400).json({ error: error.message });

    res.json({ url: data.publicURL });
});

/* ==========================
   ✅ SERVER SETUP
   ========================== */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
