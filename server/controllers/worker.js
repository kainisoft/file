import ffmpeg from 'fluent-ffmpeg';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { v4 } from 'uuid';

export default async function ({ filePath }) {
    return new Promise((resolve, reject) => {
        const outputPath = join(
            dirname(fileURLToPath(import.meta.url)),
            `uploads/${v4()}.gif`
        );

        ffmpeg(filePath)
            .output(outputPath)
            .outputOptions(['-vf', 'scale=-1:400,fps=5', '-y'])
            .toFormat('gif')
            .on('end', () => resolve(outputPath))
            .on('error', (err) => reject(err))
            .run();
    });
}
