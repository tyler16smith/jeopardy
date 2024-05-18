import { type NextApiHandler } from 'next';
import formidable, { type Fields, type Files } from 'formidable';
import { importJeopardyCSV } from '@/server/services/import-csv';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const form = formidable({})
      const [fields, files]: [Fields<string>, Files<'file'>] = await form.parse(req)

      const doc = files.file
      if (!doc?.[0]?.filepath) {
        throw new Error('Error uploading file')
      }
      try {
        const gameId = await importJeopardyCSV(doc[0]?.filepath);
        res.status(200).json(gameId);
      } catch (error) {
        console.error('Error importing CSV:', error);
        res.status(500).json({ error: 'Error importing CSV' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error parsing form data' });
    }
  }
}

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
}

export default handler
