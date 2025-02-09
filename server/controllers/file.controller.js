import {dirname, join, resolve} from "path";
import fs from "fs-extra";
import Piscina from "piscina";
import ffmpeg from "fluent-ffmpeg";
import multer from "multer";
import {fileURLToPath} from "url";

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['video/mp4'];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only MP4 files are allowed!'), false);
    }
};
const upload = multer({ dest: 'uploads/', fileFilter });

const workerPool = new Piscina({
    filename: join(
        dirname(fileURLToPath(import.meta.url)),
        './worker.js'
    ),
    maxThreads: 5,
});

const validateFileMiddleware = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        await validateFile(req.file.path);
        next();
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

function validateFile(filePath) {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(filePath, (err, metadata) => {
            if (err) {
                reject(err);
            } else {
                if (metadata.format.duration > 10) {
                    reject(new Error('The video is too long!'));
                }

                const videoStream = metadata.streams.find(
                    (stream) => stream.codec_type === 'video'
                );

                if (videoStream) {
                    if (
                        !videoStream.width ||
                        videoStream.width > 1024 ||
                        !videoStream.height ||
                        videoStream.height > 768
                    ) {
                        reject(new Error('The video is too big!'));
                    }

                    resolve(true);
                } else {
                    reject(new Error('No video stream found'));
                }
            }
        });
    });
}

export default (app) => {
    app.post('/file', [upload.single('file'), validateFileMiddleware], async (req, res) => {
        try {
            const outputPath = await workerPool.run({
                filePath: req.file.path,
            });

            res.sendFile(resolve(outputPath), async () => {
                await fs.remove(req.file.path);
                await fs.remove(outputPath);
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
