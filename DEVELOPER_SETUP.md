# DEVELOPER SETUP GUIDE - CHALO GHUME

## 🚀 Quick Start After Code Fixes

### Prerequisites
- Node.js v14+ 
- npm or yarn

### 1. Setup Environment Variables

Create `.env.local` file in the project root (template provided in `.env.example`):

```bash
cp .env.example .env.local
```

**For Development:**
```env
# Firebase Config
REACT_APP_FIREBASE_API_KEY=AIzaSyBlKHCdVfQvMRKQf2B5UqaLfDkwm6T1apo
REACT_APP_FIREBASE_AUTH_DOMAIN=challo-ghume-fa22c.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=challo-ghume-fa22c
REACT_APP_FIREBASE_STORAGE_BUCKET=challo-ghume-fa22c.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=411994731743
REACT_APP_FIREBASE_APP_ID=1:411994731743:web:a02cec85eb6aa66ddbe56a
REACT_APP_FIREBASE_MEASUREMENT_ID=G-5KYMV9KZ2D

# API URLs
REACT_APP_AUTH_API_URL=http://localhost:8080
REACT_APP_FLIGHT_API_URL=http://localhost:8080
REACT_APP_FLIGHT_CART_API_URL=http://localhost:8000
REACT_APP_HOTEL_API_URL=http://localhost:8080
REACT_APP_STAY_API_URL=https://happy-sunglasses-eel.cyclic.app
REACT_APP_THINGS_TODO_API_URL=https://happy-sunglasses-eel.cyclic.app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
# Terminal 1: Start React app
npm start

# Terminal 2: Start JSON Server (for local API)
npm run server
```

The app will open at `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
```

---

## 📋 What Changed - Developer Notes

### Environment Variables
All API URLs and Firebase credentials are now in `.env.local`:
- ✅ Never commit `.env.local` to git
- ✅ Use `.env.example` as a template
- ✅ For production, create `.env.production` with production values

### Import Paths
All imports now use lowercase folder names:
```javascript
// ❌ OLD (wrong)
import { addFlight } from "../../Redux/AdminFlights/action"

// ✅ NEW (correct)
import { addFlight } from "../../redux/flights/actions"
```

### State Messages in Login/Signup
No more direct DOM manipulation:
```javascript
// ❌ OLD (XSS vulnerability)
document.querySelector("#loginMesageSuccess").innerHTML = `Otp Send To ${number}`;

// ✅ NEW (safe React state)
const [successMsg, setSuccessMsg] = useState("");
// ... then use: {successMsg}
```

### Redux Reducers
Fixed immutability issues:
```javascript
// ❌ OLD (mutating state)
return {...state, isLoading: state.isLoading = true}

// ✅ NEW (immutable)
return {...state, isLoading: true}
```

### API Calls
All URLs now use environment variables:
```javascript
// ❌ OLD
axios.get(`http://localhost:8080/users`)

// ✅ NEW
axios.get(`${process.env.REACT_APP_AUTH_API_URL}/users`)
```

---

## 🔄 Common Development Tasks

### Adding a New API Endpoint

1. **Add to `.env.local`:**
   ```env
   REACT_APP_NEW_API_URL=http://localhost:8080
   ```

2. **Use in code:**
   ```javascript
   const response = await axios.get(
     `${process.env.REACT_APP_NEW_API_URL}/endpoint`
   );
   ```

### Adding a New Component

Use lowercase folder names:
```
src/components/newFeature/NewComponent.jsx

✅ CORRECT IMPORT:
import NewComponent from "../../components/newFeature/NewComponent"

❌ WRONG:
import NewComponent from "../../Components/NewFeature/NewComponent"
```

### Fixing Import Issues

If you get "Module not found" errors:
1. Check folder names are lowercase
2. Check file names match exactly (case-sensitive on Mac/Linux)
3. Check file path from current location

---

## 🐛 Debugging Tips

### Common Issues After Updates

**"Module not found" errors:**
- Check import paths are lowercase
- Verify folder structure matches import path
- Clear `node_modules` and reinstall if needed

**"Cannot find module" for env variables:**
- Restart dev server after adding env variables
- Env variables only load on server start
- Make sure `.env.local` exists and has correct path

**Firebase authentication not working:**
- Verify `.env.local` has Firebase credentials
- Check Firebase project is active
- Verify phone number has correct format (+91...)

---

## ✅ Testing Checklist Before Commit

- [ ] App starts without errors (`npm start`)
- [ ] Login/Signup pages work
- [ ] Can view flights, hotels, things to do
- [ ] API calls return data correctly
- [ ] No console.log statements in code
- [ ] No hardcoded URLs visible
- [ ] `.env.local` is in `.gitignore`

---

## 📚 Key Files Reference

| File | Purpose |
|------|---------|
| `.env.local` | Development configuration (never commit) |
| `.env.example` | Template for environment variables |
| `src/redux/auth/authActions.js` | Authentication API calls |
| `src/redux/flights/actions.js` | Flight API calls |
| `src/redux/hotels/actions.js` | Hotel admin API calls |
| `src/redux/stay/actions.js` | Stay/hotel search API calls |
| `src/pages/Login.jsx` | Login page (updated with state management) |
| `src/pages/Signup.jsx` | Signup page (updated with state management) |

---

## 🔐 Security Reminders

✅ **DO:**
- Use environment variables for all sensitive data
- Add `.env.local` to `.gitignore`
- Use React state for UI messages (not direct DOM)
- Implement proper error handling

❌ **DON'T:**
- Commit `.env.local` to git
- Use hardcoded API URLs
- Manipulate DOM directly with `innerHTML`
- Leave console.log statements in production code

---

## 📞 Support

If you encounter issues:
1. Check the `FIX_SUMMARY.md` for detailed changes
2. Review this guide for common tasks
3. Check git history to see what was changed
4. Ensure `.env.local` is properly configured

**Happy coding! 🎉**
