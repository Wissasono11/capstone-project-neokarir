const path = require('path');
const fs = require('fs');
const multer = require('multer');

const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
	fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, uploadsDir),
	filename: (req, file, cb) => {
		const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
		cb(null, `${Date.now()}_${safe}`);
	},
});

const upload = multer({
	storage,
	limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = {
	upload,
};
