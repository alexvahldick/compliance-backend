// Backend (Node.js + Express)
// Manages authentication, form submission, and file uploads
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; font-src 'self' data: https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;");
    next();
  });  
// Supabase setup
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// User Authentication (Signup/Login via Supabase Auth)
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) return res.status(400).json({ error: error.message });
    res.json({ user });
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const { session, error } = await supabase.auth.signInWithPassword({ email, password });

    console.log("Supabase Response:", { session, error }); // 🛠 Debugging line

    if (error) return res.status(400).json({ error: error.message });

    res.json({ session });
});


// Submit Compliance Form
app.post('/submit-form', async (req, res) => {
    const { userId, formData } = req.body;
    const { data, error } = await supabase
        .from('compliance_forms')
        .insert([{ user_id: userId, form_data: formData }]);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ data });
});

// Upload PDF
app.post('/upload', upload.single('file'), async (req, res) => {
    const { originalname, buffer } = req.file;
    const filePath = `uploads/${Date.now()}-${originalname}`;
    const { data, error } = await supabase.storage.from('uploads').upload(filePath, buffer);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ url: data.publicURL });
});


// Submit Compliance Form
app.post('/submit-form', async (req, res) => {
    const { userId, formData } = req.body;
    const { data, error } = await supabase
        .from('compliance_forms')
        .insert([{ user_id: userId, form_data: formData }]);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ data });
});

// Upload PDF
app.post('/upload', upload.single('file'), async (req, res) => {
    const { originalname, buffer } = req.file;
    const filePath = `uploads/${Date.now()}-${originalname}`;
    const { data, error } = await supabase.storage.from('uploads').upload(filePath, buffer);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ url: data.publicURL });
});

// Submit Compliance Form
app.post('/submit-form', async (req, res) => {
    const { userId, formData } = req.body;
    const { data, error } = await supabase
        .from('compliance_forms')
        .insert([{ user_id: userId, form_data: formData }]);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ data });
});

// Upload PDF
app.post('/upload', upload.single('file'), async (req, res) => {
    const { originalname, buffer } = req.file;
    const filePath = `uploads/${Date.now()}-${originalname}`;
    const { data, error } = await supabase.storage.from('uploads').upload(filePath, buffer);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ url: data.publicURL });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
