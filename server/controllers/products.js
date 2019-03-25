module.exports = {
    createProduct: async (req, res) => { 
        const{user_id, category, sub_category, image_url, product_name, product_desc} = req.body
        const db = req.app.get('db')

        let dupeProduct = await db.back_end.check_product({product_name})
        dupeProduct = +dupeProduct[0].count

        if (dupeProduct !== 0) {
            return res.sendStatus(409)
        }

        let product = await db.back_end.create_product({user_id, category, sub_category, image_url, product_name, product_desc})
        product = product[0]
        res.status(200).send(product)
    },
    viewAll: (req, res) => {
        const db = req.app.get('db')
        db.back_end.get_products().then(resp => {
            res.send(resp)
        }).catch((err) => {
            console.log(err)
        })
    },
    deleteProduct: (req, res) => {
        const db = req.app.get('db')
        const{id} = req.params

        db.back_end.delete_product([id]).then(resp => {
            res.status(200).send(resp)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
    },
    getProduct: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        
        db.back_end.get_product([id]).then(resp => {
            res.status(200).send(resp)
        }) .catch(err => res.status(500).send(err))
    },
    getCakes: (req, res) => {
        const db = req.app.get('db')

        db.front_end.get_cakes().then(resp => {
            res.status(200).send(resp)
        }) .catch(err => res.status(500).send(err))
    },
    getCupcakes: (req, res) => {
        const db = req.app.get('db')

        db.front_end.get_cupcakes().then(resp => {
            res.status(200).send(resp)
        }) .catch(err => res.status(500).send(err))
    },
    updateProduct: (req, res) => {
        const db = req.app.get('db')
        const {image_url, category, sub_category, product_name, product_desc} = req.body
        const {id} = req.params

        db.back_end.update_product([id, image_url, category, sub_category, product_name, product_desc])
            .then(resp => {
                res.status(200).send(resp)
            })
            
            .catch(err => {
                console.log(err)
                res.status(500).send(err)
            })
    }
    
    
}