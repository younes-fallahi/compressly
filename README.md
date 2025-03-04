# Compressly – Telegram Bot for PDF & Image Compression

Compressly is a Telegram bot designed to help users compress PDFs and images efficiently. It utilizes Ghostscript for PDF compression and Sharp for image compression. The bot is built with TypeScript, Telegraf, Prisma, and PostgreSQL for user management.
---

## Features
- **PDF Compression**: Reduces PDF file sizes using Ghostscript.
- **Image Compression**: Optimizes images with Sharp, maintaining quality while reducing size.
- **User Management**: Manages user data with PostgreSQL via Prisma ORM.
- **Bilingual Support**: Supports English and Persian languages using Polyglot.js.
- **Inline Keyboard**: Enhances user experience with inline buttons for interactions.
- **Logging**: Implements structured logging with Winston.
---

## Tech Stack

- **Bot Framework**: [Telegraf](https://github.com/telegraf/telegraf)
- **Programming Language**: TypeScript
- **Database**: PostgreSQL managed with Prisma ORM
- **Image Compression**: [Sharp](https://www.npmjs.com/package/sharp)
- **PDF Compression**: [Ghostscript](https://www.ghostscript.com/)
- **Logging**: [Winston](https://www.npmjs.com/package/winston)
- **Internationalization**: [Polyglot.js](https://www.npmjs.com/package/node-polyglot)
---

## Setup & Installation

### Development Setup (Without Docker)

### 1. Clone the Repository

```sh
git clone https://github.com/younes-fallahi/compressly.git
cd compressly
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following:

```env
BOT_TOKEN=your_telegram_bot_token
DATABASE_URL=postgresql://user:password@localhost:5432/compressly
```

Replace `your_telegram_bot_token` with your actual Telegram bot token and adjust the `DATABASE_URL` as per your PostgreSQL configuration.

### 4. Set Up the Database

```sh
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Start the Bot (Development Mode)

```sh
npm run dev
```

---

## Production Setup (Using Docker)

### 1. Clone the Repository

```sh
git clone https://github.com/younes-fallahi/compressly.git
cd compressly
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory and set up the required environment variables:

```env
BOT_TOKEN=your_telegram_bot_token
POSTGRES_PASSWORD=your_database_password
```

### 3. Build and Start the Docker Containers

```sh
docker-compose up -d --build
```

### 4. Check Running Containers

```sh
docker ps
```

### 5. View Logs (Optional)

```sh
docker logs -f telegram_bot
```

To stop the containers, use:

```sh
docker-compose down
```

---

## Project Structure

```
compressly/
├── src/
│   ├── bot.ts              # Main bot initialization
│   ├── index.ts            # Entry point
│   ├── commands/           # Bot command handlers
│   ├── handlers/           # Callback query & message handlers
│   ├── middlewares/        # Middleware (logging, error handling, polyglot)
│   ├── services/           # Business logic (compression, user management)
│   ├── types/              # Customized types
│   ├── locales/            # Translations for internationalization
│   ├── keyboards/          # Inline keyboards
│   ├── utils/              # Utility and helper functions
├── prisma/                 # Prisma schema & migrations
├── logs/                   # Logs generated by Winston
├── dist/                   # Compiled TypeScript output
├── tmp/                    # Temporary storage for compressed files
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose setup
├── .dockerignore           # Docker ignore file
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Dependencies
├── README.md               # Project documentation
```

---

## Usage

1. **Start the Bot**: Initiate the bot on Telegram using `@compresslybot`.
2. **Send a File**: Upload an image or PDF file to the bot.
3. **Compression**: The bot will compress the file and send it back to you.
4. **Settings**: Use the inline buttons to adjust settings or change the language.

---

## API & Database

### User Model (`prisma/schema.prisma`)

```prisma
model User {
  id        String   @id @default(uuid()) // Telegram chat ID
  name      String
  username  String?
  language  String   @default("en")
  createdAt DateTime @default(now())
}
```

---

## Logging & Error Handling

- **Logging**: Utilizes Winston to log all operations in the `logs/` directory.
- **Error Handling**: Managed through a global middleware located in `middlewares/errorHandler.ts`.

---

## Contributing

1. **Fork the Repository**
2. **Create a Feature Branch**:

   ```sh
   git checkout -b feature/new-feature
   ```

3. **Commit Changes**:

   ```sh
   git commit -m "Added new feature"
   ```

4. **Push and Create a Pull Request**

---

## Useful Commands

| Command                                   | Description                         |
|-------------------------------------------|-------------------------------------|
| `npm run dev`                             | Start the bot in development mode   |
| `npm run build`                           | Build TypeScript code               |
| `npm start`                               | Start the bot in production         |
| `npx prisma migrate dev --name init`      | Run Prisma migrations               |
| `npx prisma studio`                       | Open Prisma database UI             |
| `docker-compose up -d --build`            | Start the bot in Docker (Production) |
| `docker-compose down`                     | Stop the Docker containers          |
| `docker logs -f telegram_bot`             | View bot logs in Docker             |

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## Support

If you encounter any issues, please create a [GitHub Issue](https://github.com/younes-fallahi/compressly/issues). If you find this project helpful, consider giving it a star on [GitHub](https://github.com/younes-fallahi/compressly).

