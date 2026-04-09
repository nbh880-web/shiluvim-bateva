# שילובים בטבע — Family Resort

## איך מעלים את האתר

### שלב 1: Firebase
1. נכנס ל-https://console.firebase.google.com
2. לוחצים "Create a project" ונותנים שם (למשל shiluvim-bateva)
3. אחרי שהפרויקט נוצר, הולכים ל-Project Settings (גלגל שיניים)
4. גוללים למטה ולוחצים על אייקון Web (</>)
5. נותנים שם לאפליקציה ולוחצים Register
6. מעתיקים את המספרים (apiKey, authDomain וכו')
7. יוצרים קובץ `.env.local` בתיקיית הפרויקט ומדביקים את המספרים (לפי הדוגמה ב-.env.local.example)

### שלב 1.5: הפעלת Firestore
1. בתפריט הצד של Firebase לוחצים "Firestore Database"
2. לוחצים "Create Database"
3. בוחרים "Start in test mode"
4. בוחרים מיקום (europe-west1)
5. לוחצים "Enable"

### שלב 1.6: הפעלת Authentication
1. בתפריט הצד לוחצים "Authentication"
2. לוחצים "Get started"
3. בוחרים "Email/Password" ומפעילים
4. הולכים ל-Users ומוסיפים משתמש (האימייל והסיסמה שלכם — לממשק המנהל)

### שלב 2: GitHub
1. נכנס ל-https://github.com ונרשם (אם אין חשבון)
2. לוחצים "New repository"
3. נותנים שם (shiluvim-bateva)
4. מעלים את כל הקבצים מהתיקייה הזו

### שלב 3: Vercel
1. נכנס ל-https://vercel.com ומתחברים עם GitHub
2. לוחצים "Add New" > "Project"
3. בוחרים את ה-repository שיצרתם
4. ב-Environment Variables מוסיפים את כל המשתנים מ-.env.local
5. לוחצים "Deploy"
6. תוך דקה האתר באוויר!

### שלב 4: דומיין (אופציונלי)
1. קונים דומיין (למשל shiluvim-bateva.co.il)
2. ב-Vercel הולכים ל-Settings > Domains
3. מוסיפים את הדומיין ומעדכנים DNS
