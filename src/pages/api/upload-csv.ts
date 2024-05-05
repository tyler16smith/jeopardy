// import { importJeopardyCSV } from '@/server/services/import-csv';
// import formidable from 'formidable';
// import fs from 'fs';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     res.status(405).json({ error: 'Method Not Allowed' });
//     return;
//   }
//   debugger
//   const form = new formidable.IncomingForm();

//   form.parse(req, async (err, fields, files) => {
//     if (err) {
//       res.status(500).json({ error: 'Error parsing form data' });
//       return;
//     }

//     const file = files.file;
//     if (!file) {
//       res.status(400).json({ error: 'No file uploaded' });
//       return;
//     }

//     const text = fs.readFileSync(file.path, 'utf8');
//     try {
//       const gameId = await importJeopardyCSV(text);
//       res.status(200).json(gameId);
//     } catch (error) {
//       console.error('Error importing CSV:', error);
//       res.status(500).json({ error: 'Error importing CSV' });
//     }

//     fs.unlinkSync(file.path);
//   });
// }