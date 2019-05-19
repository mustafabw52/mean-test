import fs from 'fs'
class HomeController {
  static async index (req, res) {
    try {
      let data = await JSON.parse(fs.readFileSync('files/initialValues.json', 'utf8'));
      return res.status(200).json({message:'success',data})
    } catch(error) {
      return res.status(400).json(error)
    }
  }

  static async update (req, res) {
    try {      
      console.log(req.body.data);
      const data = JSON.stringify(req.body.data, null, 2);
      console.log(data);
      const response = await fs.writeFileSync('files/initialValues.json',data , 'utf8');
      return res.status(200).json({message:'data updated succesfully'})
    } catch(error) {
      return res.status(400).json(error)
    }
  }
}

module.exports = HomeController;