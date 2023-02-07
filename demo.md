new Date(Date.now()).toISOString()

bucketPath Enum value
item-images
category-images

<!-- -------------------------------------AUTH MODULE -->

Admin
{  
 "email": "Phamphu040411@gmail.com",
"password": "Phamvanphu123"
}

Register:
{
"userName": "Pham Van Phu",
"email": "Phamphu0404@gmail.com",
"password": "Phamvanphu123",
"phone": "012679999",
"address": "Nam Dinh"
}

<!-- ------------------------------UPLOAD MODULE -->

bucketPath Enum value
item-images
category-images

<!-- -------------------------------CATEGORY MODULE -->

create:
{
"categoryName":"Dien thoai",
"image":"https://van-phu.s3-hcm-r1.longvan.net/item-images/avatar/1657874287583-download%20-%20Copy.jpg"
}
update:
update categoryName sẽ update toàn bộ category name của item, update độ ưu tiên sẽ điền số sau đó gán lại priority

{
"categoryName":"MAY TINH BAN",
"image":"{{publicUrl}}",
"status": "ACTIVE",
"priority": number
}

<!-- ------------------------------------------FLASHSALE MODULE -->

ITEMS:
"itemId": "62d42456751b0a6072c1c7a2",
"name": "Applewatch1",
"itemId": "62d4243f751b0a6072c1c79c",
"name": "Applewatch2",
"itemId": "62d421a9751b0a6072c1c787",
"name": "Iphone 1",
"itemId": "62d421bb751b0a6072c1c78a",
"name": "Iphone 2",

create:
{
"name":"Flash sale 01 ",
"startTime": "2022-07-22T23:00:47.591Z",
"endTime": "2022-07-24T20:55:47.591Z",
"items":
[
{
"itemId": "62d421a9751b0a6072c1c787",
"flashSaleQuantity": 30,
"discount": 10
},
{
"itemId": "62d42456751b0a6072c1c7a2",
"flashSaleQuantity": 30,
"discount": 20
}
]
}

UPDATE
{
"status": "ACTIVE",
"startTime": "2022-07-17T14:20:57.703Z",
"endTime": "2022-07-18T15:19:27.724Z"
}

Check endTime > startTime :dto custom
Check startTime > endTime mới nhất : pre
Check itemId exist :pre
Check stocks >= flashSale quantity :ptr

<!-- --------------------------------ITEMS MODULE -->

Categoty:
{"id": "62d420ca751b0a6072c1c783","name": "Smartwatch"}

{"id": "62d420b4751b0a6072c1c781","name": "Smartphone"}

CREATe, Update
{
"name": "Applewatch2",
"barCode": "AW2",
"cost": 100,
"price": 150,
"weight": 150,
"avatarImg": "https://van-phu.s3-hcm-r1.longvan.net/category-images/banner/1658069098161-280299338_525686842567779_117513972089786567_n.jpg",
"detailImgs": ["https://van-phu.s3-hcm-r1.longvan.net/category-images/banner/1658069098161-280299338_525686842567779_117513972089786567_n.jpg", "https://van-phu.s3-hcm-r1.longvan.net/category-images/banner/1658069098161-280299338_525686842567779_117513972089786567_n.jpg"],
"descriptions": "Sieu pham 2022",
"category": {"id": "62d420ca751b0a6072c1c783","name": "Smartwatch"},
"quantity": 100,
"tags": ["Iphone", "dien thoai"]
}

GET ALL
http://localhost:3000/api/v1/items?page=2&limit=2&sortBy=name&options=ASC | DEST

<!-------------------------------------------VOUCHER -->

CATEGORIS
{"id": "62d420ca751b0a6072c1c783","name": "Smartwatch"}

{"id": "62d420b4751b0a6072c1c781","name": "Smartphone"}

CREATE:
{
"startTime":"2022-07-19T16:00:47.591Z",
"endTime": "2022-07-20T19:00:47.591Z",
"nameVoucher": "04/04 Sieu Sale",
"code":"Code123",
"description": "",
"quantity": 20,
"discount": 50,
"categories": [ "Smartphone"]
}

update:
{
"description": "Sieu sale ngay u",
"quantity": "100",
"discount": "100",
"categories": ["Laptop", "Dien thoai", "May tinh"]
}

<!-- --------------------------------ORDER -->

ITEMS:
"itemId": "62d42456751b0a6072c1c7a2",
"name": "Applewatch1",
"itemId": "62d4243f751b0a6072c1c79c",
"name": "Applewatch2",
"itemId": "62d421a9751b0a6072c1c787",
"name": "Iphone 1",
"itemId": "62d421bb751b0a6072c1c78a",
"name": "Iphone 2",

CREATE ORDER
{
"items":[
{
"itemId": "62d42456751b0a6072c1c7a2",
"amount": 1
},
{
"itemId": "62d421bb751b0a6072c1c78a",
"amount": 1
}
],
"user": {
"phone": "1234665656",
"address": "Nam dinh"
},
"voucherCode": "Code123"
}
