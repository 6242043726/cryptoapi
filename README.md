# Cryptocurrency Exchange API

  ระบบแลกเปลี่ยน Cryptocurrency ที่ใช้ Node.js และ Sqlite โดยมีฟังก์ชั่นต่างๆเช่น การสร้างบัญชีผู้ใช้, การตั้งซื้อ-ขาย Cryptocurrencies (trade-order), การบันทึกการโอนเงินและซื้อ-ขายแลกเปลี่ยน (transaction)

## ขั้นตอนการใช้งาน
  หลังจาก clone project ใช้คำสั่ง
  ```bash
  npm install
  ```
  และ
  ```bash
   npm start
  ```
   เพื่อเริ่มทำงาน
   
## API Endpoints

### 1. การจัดการผู้ใช้
- **POST /api/register**
  - ลงทะเบียนผู้ใช้ใหม่
  - Request body:
    ```json
    {
      "username": "string",
      "password": "string",
      "email": "string",
    }
    ```

- **GET /api/users**
  - เรียกดูรายชื่อผู้ใช้ทั้งหมด

### 2. การจัดการกระเป๋าเงิน
- **GET /api/wallets/user/{id}**
  - เรียกดูข้อมูลกระเป๋าเงินของผู้ใช้ตาม ID

### 3. การจัดการคำสั่งซื้อการเทรด
- **POST /api/trade-order**
  - สร้างคำสั่งซื้อ-ขาย ถ้าคำสั่งซื้อมีการจับคู่ ระบบจะสร้างธุรกรรมและทำการปรับยอดกระเป๋าเงินที่เกี่ยวข้อง
  - Request body:
    ```json
    {
      "userId": "int",
      "fromCurrencyId": "int",
      "toCurrencyId": "int",
      "amount": "decimal",
      "price": "decimal"
    }
    ```
    
- **GET /api/trade-orders**
  - เรียกดูคำสั่งซื้อ-ขายทั้งหมด

### 4. การจัดการธุรกรรม
- **GET /api/transactions**
  - เรียกดูข้อมูลธุรกรรมทั้งหมด

## ER Diagram
![crypto drawio](https://github.com/user-attachments/assets/65a6bf17-f7c4-4d34-9ef2-e17ba6d80450)

