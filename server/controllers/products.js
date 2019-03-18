module.exports = {
    createProduct: async (req, res) => { 
        const{user_id, category, sub_category, image_url, product_name, product_desc} = req.body
        const db = req.app.get('db')

        let dupeProduct = await db.check_product({product_name})
        dupeProduct = +dupeProduct[0].count

        if (dupeProduct !== 0) {
            return res.sendStatus(409)
        }

        let product = await db.create_product({user_id, category, sub_category, image_url, product_name, product_desc})
        product = product[0]
        res.status(200).send(product)
    },
    viewAll: (req, res) => {
        const db = req.app.get('db')
        db.get_products().then(resp => {
            console.log(resp)
            res.send(resp)
        }).catch((err) => {
            console.log(err)
        })
    }
    
    
}