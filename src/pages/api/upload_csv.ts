import { NextApiHandler } from 'next'
import formidable from 'formidable'
import { importJeopardyCSV } from '@/server/services/import-csv'

const handler: NextApiHandler = async (req, res) => {
  debugger;
  if (req.method === 'POST') {
    const form = formidable({})
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parsing error:', err);
        return res.status(500).json({ success: false, errorMessage: 'Form parsing error' });
      }

      try {
        // Assuming single file upload under the 'file' field
        const file = files.file;
        if (!file) {
          throw new Error('No CSV file provided.');
        }
        // Directly access the uploaded file, no array assumption
        const filePath = file?.path;
        const response = await importJeopardyCSV(filePath);
        res.status(200).json({ url: response });
      } catch (error) {
        console.error('Failed to upload CSV file:', error);
        res.status(400).json({ success: false, errorMessage: error.message || 'Failed to upload CSV file' });
      }
    });
  } else {
    res.status(405).json({ success: false, errorMessage: 'Method not allowed' });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
