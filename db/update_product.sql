update products
set image_url = $2,
    category = $3,
    sub_category = $4,
    product_name = $5,
    product_desc = $6
where id = $1;

select *
from products