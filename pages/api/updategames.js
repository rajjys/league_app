export default async function handler(req, res) {
    const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Request-Headers": "*",
          "api-key": process.env.MONGODB_DATA_API_KEY,
        },
      };
      const fetchBody = {
        dataSource: process.env.MONGODB_DATA_SOURCE,
        database: 'cercleSport',
        collection: 'games',
      };
      const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;
  
    try {
      switch (req.method) {
        case "POST":
          const games = req.body;
          const insertData = await fetch(`${baseUrl}/insertMany`, {
              ...fetchOptions,
              body: JSON.stringify({
                ...fetchBody, document: games,
              }),
          });
          res.status(201).json({ success: true, data: insertData });
        break;
        default:
          res.status(405).end();
        break;
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  }