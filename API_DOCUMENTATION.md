# 🛡️ Admin Panel API Documentation

## Authentication Endpoints

### Login
- **POST** `/api/auth/login`
- **Body**: `{ email, password }`
- **Response**: `{ token, role, message }`

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@art.com","password":"Admin@123"}'
```

### Register
- **POST** `/api/auth/register`
- **Body**: `{ name, email, password }`
- **Response**: `{ token, role, message }`

---

## Admin Management Endpoints (Requires ADMIN role)

### Get All Admins
- **GET** `/api/admin/list/admins`
- **Header**: `Authorization: Bearer <token>`
- **Response**: `{ data: [...admins] }`

### Promote User to Admin
- **POST** `/api/admin/promote-to-admin`
- **Header**: `Authorization: Bearer <token>`
- **Body**: `{ userId }`
- **Response**: `{ data: user, message }`

### Demote Admin to User
- **POST** `/api/admin/demote-to-user`
- **Header**: `Authorization: Bearer <token>`
- **Body**: `{ adminId }`
- **Response**: `{ data: user, message }`

---

## Users Management Endpoints (Requires ADMIN role)

### Get All Users
- **GET** `/api/admin/list/users`
- **Header**: `Authorization: Bearer <token>`
- **Response**: `{ data: [...users] }`

### Delete User (Soft Delete)
- **POST** `/api/admin/delete-user`
- **Header**: `Authorization: Bearer <token>`
- **Body**: `{ userId }`
- **Response**: `{ data: user, message }`

### Restore User
- **POST** `/api/admin/restore-user`
- **Header**: `Authorization: Bearer <token>`
- **Body**: `{ userId }`
- **Response**: `{ data: user, message }`

---

## Admin Profile Endpoints (Requires ADMIN role)

### Get Admin Profile
- **GET** `/api/admin/profile`
- **Header**: `Authorization: Bearer <token>`
- **Response**: `{ data: profile }`

### Update Profile
- **PUT** `/api/admin/profile/update`
- **Header**: `Authorization: Bearer <token>`
- **Body**: `{ name, email }`
- **Response**: `{ data: profile, message }`

### Change Password
- **POST** `/api/admin/profile/change-password`
- **Header**: `Authorization: Bearer <token>`
- **Body**: `{ oldPassword, newPassword }`
- **Response**: `{ message }`

---

## Error Responses

All error responses follow this format:
```json
{
  "success": false,
  "error": "Error message here"
}
```

## Security Features

✅ **Encrypted Primary Keys** - UUID instead of integer IDs
✅ **Role-Based Access Control** - ADMIN-only routes protected
✅ **JWT Authentication** - All protected routes require token
✅ **Password Hashing** - bcryptjs with salt rounds
✅ **Soft Deletes** - Users can be restored
✅ **AES-256 Encryption** - Payloads can be encrypted (optional)

## Seeded Admin User

**Email**: `admin@art.com`
**Password**: `Admin@123`
**Role**: `ADMIN`
