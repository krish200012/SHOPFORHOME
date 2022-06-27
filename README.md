# ShopForHome

> Frontend-> React JS

> Backend-> Node JS & Express JS

> Database-> MongoDB

1.## Installation process

````
2. #### install npm packages
1. install backend packages
```bash
cd ShopForHome
npm install
````

2.  install frontend packages

```bash
cd client
npm install
```

3. go to the parent folder of ShopForHome & create .env for connection, JWT_SECRET, BRAINTREE_MERCHANT_ID, BRAINTREE_PUBLIC_KEY and BRAINTREE_PRIVATE_KEY.

   ```bash
   cd ShopForHome
   sudo nano .env
   ```

   (ctrl+x to save & nano follow instruction there)

   ##### sample code for backend .env

   ```env
   MONGODB_URI=YOUR_MONGODB_URI
   JWT_SECRET=YOUR_JWT_SECRET
   BRAINTREE_MERCHANT_ID=YOUR_BRAINTREE_MERCHANT_ID
   BRAINTREE_PUBLIC_KEY=YOUR_BRAINTREE_PUBLIC_KEY
   BRAINTREE_PRIVATE_KEY=YOUR_BRAINTREE_PRIVATE_KEY
   ```

4. create another .env file inside client directory for REACT_APP_API_URL.

   ```bash
   cd ShopForHome/client
   sudo nano .env
   ```

   ##### sample code for frontend .env

   ```env
   REACT_APP_API_URL=YOUR_API_URL
   ```

   ##### Instructions:

   1. for mongodb atlas database creation follow this tutorial->https://www.youtube.com/watch?v=KKyag6t98g8
   2. you can use any random string as JWTSECRET
   3. for localhost REACT_APP_API_URL is http://localhost:5000/api
   4. #### note: add .env on .gitignore
   5. for server deployment use secrets directly

5. <b>deploy this project</b> on your local server by using this command

   ```bash
   cd ShopForHome
   npm run dev
   ```

   #### note: both backend & frontend server will start at once with the above command.

6. #### Database Structure: (Table: columns)
   1. categories: \_id, name, createdAt, updatedAt;
   2. orders: \_id, status, products (Array), transaction_id, amount, address, user (Object), createdAt, updatedAt
   3. products: \_id, photo (Object), sold, name, description, price, category, shipping, quantity, createdAt, updatedAt
   4. users: \_id, role, history (Array), name, email, salt, hashed_password, createdAt, updatedAt
