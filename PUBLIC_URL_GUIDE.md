# How to Generate a Shareable User Link

Your web server is now configured to accept connections from anywhere! Here's how to get a shareable link:

## ✅ What Was Fixed

1. **CORS Configuration** - Added to allow external access
2. **Server Binding** - Changed to `0.0.0.0` to accept connections from any network interface
3. **Security Config** - Updated to allow cross-origin requests

## 🚀 Step 1: Start the Server

### Option A: Using RUN.bat (Easiest)
1. Double-click `RUN.bat` in the project folder
2. Wait for "Started SeatBookingApplication" message
3. Keep the window open (don't close it!)

### Option B: Using Command Line
```bash
cd "D:\2YR 1SEM\KLH\PROJECTS\BEEC PROJECT\JAVA PROJECT"
mvn spring-boot:run
```

### Option C: Using IDE
- IntelliJ: Right-click `SeatBookingApplication.java` → Run
- Eclipse: Right-click `SeatBookingApplication.java` → Run As → Spring Boot App

## 🌐 Step 2: Get Your Public URL

### Method 1: Local Network Access (Same WiFi)

1. **Find your local IP:**
   - Windows: Open Command Prompt, type: `ipconfig`
   - Look for "IPv4 Address" (usually starts with 192.168.x.x or 10.x.x.x)
   - Or run: `GET_PUBLIC_URL.bat`

2. **Share this URL:**
   ```
   http://YOUR_LOCAL_IP:8080
   ```
   Example: `http://192.168.1.100:8080`

3. **Users on the same WiFi can access it!**

### Method 2: Internet Access (ngrok - Easiest)

1. **Download ngrok:**
   - Go to: https://ngrok.com/download
   - Download for Windows
   - Extract `ngrok.exe` to any folder

2. **Start your server first** (see Step 1)

3. **Run ngrok:**
   ```bash
   ngrok http 8080
   ```

4. **Copy the URL:**
   - You'll see something like: `https://abc123.ngrok.io`
   - This is your public URL!
   - Share this with anyone, anywhere!

5. **Note:** Free ngrok URLs expire after 2 hours. For permanent URLs, upgrade to paid plan.

### Method 3: Port Forwarding (Permanent Solution)

1. **Find your public IP:**
   - Visit: https://whatismyipaddress.com
   - Note your public IP address

2. **Configure Router:**
   - Log into your router admin panel (usually 192.168.1.1)
   - Find "Port Forwarding" or "Virtual Server" settings
   - Add rule:
     - External Port: 8080
     - Internal IP: Your computer's local IP (from Method 1)
     - Internal Port: 8080
     - Protocol: TCP

3. **Share this URL:**
   ```
   http://YOUR_PUBLIC_IP:8080
   ```

4. **Important:** 
   - Your computer must stay on
   - Your router must allow incoming connections
   - Some ISPs block port 8080 - try port 80 or 443 instead

### Method 4: Cloud Deployment (Best for Production)

Deploy to:
- **Render.com** (Free tier available)
- **Railway.app** (Free tier available)
- **Heroku** (Paid)
- **AWS/Azure/GCP** (Various pricing)

They provide permanent URLs like: `https://your-app.onrender.com`

## ✅ Step 3: Verify It Works

1. **Test locally first:**
   - Open: `http://localhost:8080`
   - Should see the login page

2. **Test from another device:**
   - Use the URL from Step 2
   - Should see the same login page

3. **Test API endpoint:**
   - Visit: `http://YOUR_URL/api/seats`
   - Should see JSON response

## 🔧 Troubleshooting

### "Connection Refused"
- Make sure the server is running
- Check Windows Firewall - allow port 8080
- Verify the URL is correct

### "This site can't be reached"
- Server might not be started
- Check if port 8080 is blocked
- Try a different port in `application.properties`

### "CORS Error" in Browser Console
- Already fixed! But if you see this, restart the server

### Port 8080 Already in Use
- Change port in `src/main/resources/application.properties`:
  ```
  server.port=8081
  ```
- Then use port 8081 in all URLs

## 📝 Quick Reference

**Local Access:**
- `http://localhost:8080` (same computer)
- `http://YOUR_LOCAL_IP:8080` (same network)

**Public Access:**
- `https://YOUR_NGROK_URL.ngrok.io` (temporary, via ngrok)
- `http://YOUR_PUBLIC_IP:8080` (permanent, via port forwarding)
- `https://your-app.onrender.com` (permanent, via cloud deployment)

## 🎯 Recommended for Your Use Case

**For quick testing/demo:**
→ Use **ngrok** (Method 2) - fastest, easiest

**For same-network access:**
→ Use **Local Network** (Method 1) - no setup needed

**For permanent public access:**
→ Use **Cloud Deployment** (Method 4) - most reliable

---

**Need help?** Check `TROUBLESHOOTING.md` or `QUICK_FIX.md`

